import { Play } from 'phosphor-react';
import { HomeContainer, FomrContainer, CountdownContainer, Separator, StartCountdownButton, MinutesAmmountInput, TaskInput } from './styles';

export function Home() {
    return (
        <HomeContainer>
            <form>
                <FomrContainer>                
                    <label htmlFor="task"> Vou trabalhar em</label>
                    <TaskInput 
                        id="task"   
                        list="task-suggestions"                       
                        placeholder='Dê um nome para o seu projeto'
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
                    />

                    <span>minutos.</span>                  
                </FomrContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>            
        </HomeContainer>
    )
}