import styled from "styled-components";


const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};

    &::placeholder {
        color: ${props => props.theme['gray-500']};
    }

    &:focus-visible,
    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme['green-500']};
    }

    &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px transparent inset !important;
        -webkit-text-fill-color: ${props => props.theme['gray-100']} !important;
        transition: background-color 5000s ease-in-out 0s;
        font-weight: bold;
        font-size: 1.125rem;
    }
`

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`

export const MinutesAmmountInput = styled(BaseInput)`
    width: 4rem;
`

export const FomrContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`