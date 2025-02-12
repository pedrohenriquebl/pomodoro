import { FomrContainer, MinutesAmmountInput, TaskInput } from "./styles";
import { CyclesContext } from "../../../../context/CyclesContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FomrContainer>                
            <label htmlFor="task"> Vou trabalhar em</label>
            <TaskInput 
                id="task"
                list="task-suggestions"                       
                placeholder='Dê um nome para o seu projeto'
                {...register('task')}
                disabled={!!activeCycle}
            />

            <label htmlFor="mminutesAmount"> durante</label>
            <MinutesAmmountInput 
                id="mminutesAmount" 
                type="number"
                placeholder="00"
                step={5}
                min={1}
                max={60}
                {...register('minutesAmount', { valueAsNumber: true })} 
                disabled={!!activeCycle}
            />
            
            <span>minutos.</span>                  
        </FomrContainer>
    )
}