import styled from 'styled-components'

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        span {
            font-weight: bold;
        }
    }

    nav {
        display: flex;
        gap: 0.5rem;

        a {
            width: 3rem;
            height: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            color: ${props => props.theme['gray-100']};

            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            &:hover {
                border-bottom-color: ${props => props.theme['green-500']};
            }

            &.active {
                color: ${props => props.theme['green-500']};
            }

            &:focus {
                box-shadow: none;
            }
        }

        img {
            color: ${props => props.theme['green-500']}
        }
    }
` 
