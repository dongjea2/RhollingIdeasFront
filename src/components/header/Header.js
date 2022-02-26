import HeaderUpper from "./HeaderUpper.js";
import './Header.css';
import HeaderContent from "./HeaderContent.js";
import { readBuilderProgram } from "typescript";

export default function Header() {
    if (window.location.pathname === '/signup' || window.location.pathname === '/login') return null;

    return (
        <div className="header">
            <div className="header-container">
                <HeaderUpper />
                <HeaderContent />
            </div>
        </div>
    )
}