import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserName from "./account/UserName";
import Introduction from "./account/Introduction";
import Password from "./account/Password";
import Email from "./account/Email";
import Phone from "./account/Phone";
import ProfileImage from "./account/ProfileImage";
import Withdrawal from "./account/Withdrawal";

export default function AccountSet() {
  const [data, setData] = useState("");
  const userNo = window.sessionStorage.getItem("userNo");

  //유저번호로 계정정보 조회
  useEffect(() => {
    axios({
      method: "POST",
      url: "/profile/account",
      data: {
        userNo: userNo, //수정필요
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="settings-default">
      <SettingsHeader />
      <section className="settings-box">
        <ProfileImage data={data && data.image} />
        <UserName data={data.name} />
        <Introduction data={data.intro} />
        <Email data={data.email} />
        <Phone data={data.phone} />
        <Password />
        <Withdrawal />
      </section>
    </div>
  );
}
