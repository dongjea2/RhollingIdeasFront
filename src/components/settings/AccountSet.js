import SettingsHeader from "./SettingsHeader";
import './SettingsDefault.css'

export default function AccountSet() {
    return (
    <div className="settings-default">
    <SettingsHeader />
    <section class="settings-box">
        <div class="settings_subtitle">이메일</div>
        <button>변경</button>
        <hr/>
        
        <div class="settings_subtitle">비밀번호</div>
        <button>변경</button>
        <hr/>
        
        <div class="settings_subtitle">연락처</div>
        <button>변경</button>
        <hr/>
        
        <div class="settings_subtitle">변경을 위해 현재 비밀번호가 필요합니다</div>
        <button>변경</button>

        <div class="settings_subtitle">회원탈퇴</div>
        <button>탈퇴</button>
    </section>
    </div>
    )
}