import { FomrContainer, MinutesAmmountInput, TaskInput } from "./styles";
import { CyclesContext } from "../..";
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
                disabled={!!activeCycle}
            />

            <span>minutos.</span>                  
        </FomrContainer>
    )
}