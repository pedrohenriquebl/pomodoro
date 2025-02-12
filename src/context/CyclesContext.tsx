import { createContext, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    CreateNewCycle: (data: CreateCycleData) => void
    InterruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: React.ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducer, 
        {
            cycles: [],
            activeCycleId: null
        },
        () => {
            const storageStateAsJSON = localStorage.getItem(
                '@timer:cycles-state-1.0.0'
            )
            
            if (storageStateAsJSON) {
                try {
                    const parsedState = JSON.parse(storageStateAsJSON)

                    return {
                        cycles: parsedState.cycles || [],
                        activeCycleId: parsedState.activeCycleId || null
                    }
                } catch (error) {
                    console.error('Error parsing cycles state from localStorage -> ', error)
                    return {
                        cycles: [],
                        activeCycleId: null
                    }
                }
            }

            return {
                cycles: [],
                activeCycleId: null
            }
        }
    )

    const { cycles, activeCycleId } = cyclesState    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            const secondsDifference = differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )

            return secondsDifference
        }
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])   

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function CreateNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle));
        
        setAmountSecondsPassed(0)
    }

    function InterruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            CreateNewCycle,
            InterruptCurrentCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )
}