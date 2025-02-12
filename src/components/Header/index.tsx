import { Scroll, Timer } from "phosphor-react";
import { HeaderContainer } from "./styles";
import Clover from "../../assets/clover.svg";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <div>
                <img src={Clover} alt="" />
                <span>Pomodoro</span>
            </div>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Historico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}