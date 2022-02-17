import { Link } from "react-router-dom";
import './SettingsHeader.css'
import ProfileSet from "./ProfileSet";

export default function SettingsHeader() {
    return (
        <div className="setting-header">
        <h1>설정</h1>
        <ul className="settings_list">
            <li><Link to={'/profile/profileset'}>프로필</Link></li>
            <li><Link to={'/profile/accountset'}>계정</Link></li>
            <li><Link to={'/profile/paymentset'}>결제수단</Link></li>
            <li><Link to={'/profile/addressset'}>배송지</Link></li>
        </ul>
        </div>
    )
}