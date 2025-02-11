import { Play, HandPalm } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CyclesContext } from '../../context/CyclesContext';
import { useContext } from 'react';


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, { message: 'Informe a tarefa' }),
    minutesAmount: zod
        .number()
        .min(5, 'O tempo deve ser entre 5 e 60 minutos')
        .max(60, 'O tempo deve ser entre 5 e 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { activeCycle, CreateNewCycle, InterruptCurrentCycle } = 
        useContext(CyclesContext)
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    
    const { handleSubmit, watch, reset } = newCycleForm
    
    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: NewCycleFormData) {
        CreateNewCycle(data)
        reset()
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>                
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                { activeCycle ? (
                    <StopCountdownButton type="button" onClick={InterruptCurrentCycle}>
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