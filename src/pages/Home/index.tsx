import { Play, HandPalm } from 'phosphor-react';
import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedData?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, { message: 'Informe a tarefa' }),
    minutesAmount: zod
        .number()
        .min(5, 'O tempo deve ser entre 5 e 60 minutos')
        .max(60, 'O tempo deve ser entre 5 e 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) 

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }
    
    function markCurrentCycleAsFinished() {
        setCycles((state) => 
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        finishedData: new Date()
                    }
                } else {
                    return cycle
                }
            })
        )
    }
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    
    const { handleSubmit, watch, reset } = newCycleForm
    
    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }

    function handleInterruptCycle() {        
        setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    interruptedDate: new Date()
                }
            } else {
                return cycle
            }
        }))

        setActiveCycleId(null)
    }
    
    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider value={{ 
                    activeCycle, 
                    activeCycleId, 
                    amountSecondsPassed,
                    markCurrentCycleAsFinished, 
                    setSecondsPassed 
                }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                { activeCycle ? (
                    <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                    <HandPalm size={24} />
                        Interrompoer
                    </StopCountdownButton>
                ): (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>            
        </HomeContainer>
    )
}