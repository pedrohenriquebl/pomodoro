import { useContext } from "react";
import { HistoryContainer, HistoryList, Status, MobileHistoryList } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR'

export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                { window.innerWidth > 768 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Tarefa</th>
                                <th>Duração</th>
                                <th>Início</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cycles.map((cycle) => {
                                return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                            addSuffix: true,
                                            locale: ptBR
                                        })}</td>
                                        <td>
                                            { cycle.finishedData && (
                                                <Status $statusColor="green">Concluído</Status> 
                                            )}
                                            { cycle.interruptedDate && (
                                                <Status $statusColor="red">Interrompido</Status> 
                                            )}
                                            { !cycle.finishedData  && !cycle.interruptedDate && (
                                                <Status $statusColor="yellow">Em andamento</Status> 
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ): (
                    <ul>
                        {cycles.map((cycle) => {
                            return (
                                <MobileHistoryList key={cycle.id}>
                                    <span><b>Tarefa:</b> {cycle.task}</span>
                                    <span><b>Duração:</b> {cycle.minutesAmount} minutos</span>
                                    <span><b>Início:</b> {formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}</span>
                                    <span>
                                    <b>Status:</b>
                                        { cycle.finishedData && (
                                            <Status $statusColor="green">Concluído</Status> 
                                        )}
                                        { cycle.interruptedDate && (
                                            <Status $statusColor="red">Interrompido</Status> 
                                        )}
                                        { !cycle.finishedData  && !cycle.interruptedDate && (
                                            <Status $statusColor="yellow">Em andamento</Status> 
                                        )}
                                    </span>
                                </MobileHistoryList>
                            )
                        })}
                    </ul>
                )}
            </HistoryList>
        </HistoryContainer>
    )
}