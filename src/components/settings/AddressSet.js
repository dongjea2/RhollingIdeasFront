import SettingsHeader from "./SettingsHeader";
import './SettingsDefault.css';

export default function AddressSet() {
    return (
    <div className="setting-default">
    <SettingsHeader />
    <section class="settings-box">
		<div class="settings_subtitle">배송지 추가</div>
		<div class="address_box">
            <input />
            <span class="address_value_name">이름</span> <input /><br/>
            <span class="address_value_name">우편번호</span> <input /><br/>
            <span class="address_value_name">주소</span> <input /><br/>
            <span class="address_value_name">상세주소</span> <input /><br/>
            <span class="address_value_name">전화번호</span> <input /><br/>
            기본배송지로 등록 <input />
            <button>추가</button>
		</div>
		<hr/>
		<div class="settings_subtitle">등록된 배송지</div>
	
		<div class="address_box">
            <span class="address_value_name">이름</span> <input /><br/>
            <span class="address_value_name">우편번호</span> <input /><br/>
            <span class="address_value_name">주소</span> <input /><br/>
            <span class="address_value_name">상세주소</span> <input /><br/>
            <span class="address_value_name">전화번호</span> <input /><br/>
            <span id="default_value">기본배송지여부</span> <br/>
            <input />
            <button>수정</button>

            <input />
            <button>기본배송지로 변경</button>
            <input type="text" class="invisible" name="addressNo" value="<%=addressNo%>"/>
            <button>삭제</button>
		</div>   
    </section>
    </div>
    )
}