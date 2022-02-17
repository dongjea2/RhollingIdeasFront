import SettingsHeader from "./SettingsHeader";
import './SettingsDefault.css';

export default function PaymentSet() {
    return (
    <div className="setting-default">
    <SettingsHeader />
    <section class="settings-box">
		<div class="settings_subtitle">결제수단 추가</div>
		<div class="card_box">
            <span class="address_value_name">카드번호</span> <input /><br/>
            <span class="address_value_name">유효기한</span> <input /><br/>
            <span class="address_value_name">비밀번호</span> <input /><br/>
            <span class="address_value_name">생년월일</span> <input /><br/>
            기본결제수단으로 등록 <input />
            <button>추가</button>
		</div>
		<hr/>
		<div class="settings_subtitle">등록된 결제수단</div>

		<div class="card_box">
			<span class="address_value_name">카드번호</span> <input /><br/>
			<span class="address_value_name">유효기간</span> <input /><br/>
			<span class="address_value_name">생년월일</span> <input /><br/>
			<span id="default_value">기본배송지여부</span> <br/>
            <input />
            <button id="card_default">기본결제수단으로 변경</button>
            <input />
            <button id="card_remove">삭제</button>
		</div>
    </section> 
    </div>
    )
}