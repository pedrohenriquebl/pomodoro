import { styled } from 'styled-components';

export type ButtonVariantColor = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
    variant: ButtonVariantColor
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 0.5rem;

    background-color: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};
`