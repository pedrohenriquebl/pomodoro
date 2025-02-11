import { Play, HandPalm } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { 
    HomeContainer, 
    FomrContainer, 
    CountdownContainer, 
    Separator, 
    StartCountdownButton, 
    StopCountdownButton,
    MinutesAmmountInput, 
    TaskInput 
} from './styles'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, { message: 'Informe a tarefa' }),
    minutesAmount: zod
        .number()
        .min(5, 'O tempo deve ser entre 5 e 60 minutos')
        .max(60, 'O tempo deve ser entre 5 e 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedData?: Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const activeCyle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    const totalSeconds = activeCyle ? activeCyle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number;
        

        if (activeCyle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    activeCyle.startDate
                )

                if (secondsDifference >= totalSeconds) {
                    setCycles((state) => state.map((cycle) => {
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

                setAmountSecondsPassed(totalSeconds)
                clearInterval(interval)
                                
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCyle, totalSeconds, activeCycleId])

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
    

    const currentSeconds = activeCyle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCyle) {
            document.title = `${minutes}:${seconds} | Pomodoro`
        }
    }, [minutes, seconds, activeCyle])

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FomrContainer>                
                    <label htmlFor="task"> Vou trabalhar em</label>
                    <TaskInput 
                        id="task"
                        list="task-suggestions"                       
                        placeholder='Dê um nome para o seu projeto'
                        {...register('task')}
                        disabled={!!activeCyle}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 4" />
                        <option value="Projeto 3" />
                        <option value="Projeto 2" />
                    </datalist>

                    <label htmlFor="mminutesAmount"> durante</label>
                    <MinutesAmmountInput 
                        id="mminutesAmount" 
                        type="number"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true })} 
                        disabled={!!activeCyle}
                    />

                    <span>minutos.</span>                  
                </FomrContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                { activeCyle ? (
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