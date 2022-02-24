import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AccountSet() {
  const [data, setData] = useState([]);

  //토큰으로 로그인시 변경될 수 있음
  const loginedId = window.localStorage.getItem("userId");

  useEffect(() => {
    axios({
      method: "post",
      url: "/profile/account",
      data: {
        userId: loginedId,
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="settings-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">프로필 사진</div>
        {/* 프로필 사진 백엔드 연결 후 수정 필요 */}
        {/* <img className="profile-img-viewer" width="50px" src={profileDefaultImg}/> */}
        {/* 사진 업로드 추가 필요 */}
        <button>변경</button>
        <hr />

        <div className="settings_subtitle">이름</div>
        <div>{data.name}</div>
        <button>변경</button>
        <hr />

        <div className="settings_subtitle">소개</div>
        <div>{data.intro}</div>
        <button>변경</button>
        <hr />

        <div className="settings_subtitle">이메일</div>
        <div>{data.email}</div>
        <button>변경</button>
        <hr />

        <div className="settings_subtitle">비밀번호</div>
        <button>변경</button>
        <hr />

        <div className="settings_subtitle">연락처</div>
        <div>{data.phone}</div>
        <button>변경</button>
        <hr />

        <div className="settings_subtitle">회원탈퇴</div>
        <button>탈퇴</button>
      </section>
    </div>
  );
}
