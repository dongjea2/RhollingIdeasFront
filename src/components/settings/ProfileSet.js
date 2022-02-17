import SettingsHeader from "./SettingsHeader";
import profileDefaultImg from '../../images/profile/default.png';
import './SettingsDefault.css';
import { useState } from "react";

export default function ProfileSet() {
    {/* 로그인 확인하고 사용자 정보 가져오기 추가 */}
    let loginedId = window.localStorage.getItem('userId');
    console.log(loginedId);
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [url, setUrl] = useState();
    const [intro, setIntro] = useState();
    const [website, setWebsite] = useState();

    return (
        <div className="settings-default">
        <SettingsHeader />
        <section className="settings-box">
            <div className="settings_subtitle">프로필 사진</div>
            {/* 프로필 사진 백엔드 연결 후 수정 필요 */}
            {/* <img className="profile-img-viewer" width="50px" src={profileDefaultImg}/> */}
            {/* 사진 업로드 추가 필요 */}
            <button>변경</button>
            <hr/>
            
            <div className="settings_subtitle">이름</div>
            
            <button>변경</button>
            <hr/>
            
            <div class="settings_subtitle">사용자 이름(URL)</div>		
            Rholling Ideas URL/
            <button>변경</button>
            <hr/>
            
            <div class="settings_subtitle">소개</div>
            
            <button>변경</button>
            <hr/>
            
            <div class="settings_subtitle">웹사이트</div>
            
            <button>변경</button>
        </section>
        </div>
    )
}