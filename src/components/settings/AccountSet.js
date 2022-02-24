import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";

export default function AccountSet() {
  const [data, setData] = useState([]);

  // 기능 미구현
  function handleWithdrawal(e) {
    e.preventDefault();
    window.location.replace("/");
  }

  //유저번호로 계정정보 조회. 토큰으로 로그인시 변경
  useEffect(() => {
    axios({
      method: "post",
      url: "/profile/account",
      data: {
        userNo: 1, //수정필요
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="settings-default">
      <SettingsHeader />
      <section className="settings-box">
        <Profile name={"프로필 사진"} data={data.image} />
        <Profile name={"이름"} data={data.name} />
        <Profile name={"소개"} data={data.intro} />
        <Profile name={"이메일"} data={data.email} />
        <Profile name={"연락처"} data={data.phone} />
        <Profile name={"비밀번호"} data={""} />
        <div>
          <p className="settings_subtitle">회원탈퇴</p>
          <button className="withdrawal" onClick={handleWithdrawal}>
            탈퇴
          </button>
        </div>
      </section>
    </div>
  );
}
