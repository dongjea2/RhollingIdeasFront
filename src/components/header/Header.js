import HeaderUpper from "./HeaderUpper.js";
import './Header.css';
import HeaderContent from "./HeaderContent.js";

export default function Header() {
    if (window.location.pathname === '/signup') return null;

    return (
        <div className="header">
            <div className="header-container">
                <HeaderUpper />
                <HeaderContent />
            </div>
        </div>
    )
}