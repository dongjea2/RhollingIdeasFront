import HeaderUpper from "./HeaderUpper.js";
import './Header.css';
import HeaderContent from "./HeaderContent.js";

export default function Header() {
    return (
        <div className="header-container">
            <HeaderUpper />
            <HeaderContent />
        </div>
    )
}