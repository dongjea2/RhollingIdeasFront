import { Link } from "react-router-dom";
import "./SettingsHeader.css";

export default function SettingsHeader() {
  return (
    <div className="setting-header">
      <div className="setting-title">
        <h1>설정</h1>
      </div>
      <ul className="settings_list">
        <li>
          <Link to={"/profile/accountset"}>계정</Link>
        </li>
        <li>
          <Link to={"/profile/paymentset"}>결제수단</Link>
        </li>
        <li>
          <Link to={"/profile/addressset"}>배송지</Link>
        </li>
      </ul>
    </div>
  );
}
