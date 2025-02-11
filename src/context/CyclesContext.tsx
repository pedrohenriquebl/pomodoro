import { createContext, useState, useReducer } from "react";

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedData?: Date
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

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

        if (action.type === 'ADD_NEW_CYCLE') {
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id
            }
        }

        if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return {
                            ...cycle,
                            interruptedDate: new Date()
                        }
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null
            }
        }

        if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === activeCycleId) {
                        return {
                            ...cycle,
                            finishedData: new Date()
                        }
                    } else {
                        return cycle
                    }
                })
            }
        }

        return state
    }, {
        cycles: [],
        activeCycleId: null
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { cycles, activeCycleId } = cyclesState    

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId
            }
        });
    }

    function CreateNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        });
        
        setAmountSecondsPassed(0)
    }

    function InterruptCurrentCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId
            }
        });
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