import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";
import { AddressList, getAddress } from "./address/ShowAddress";
import AddressPopup from "./address/KakaoAddress";

export default function AddressSet() {
  const [addrs, setAddrs] = useState([]);
  const [addBtnText, setAddBtnText] = useState("+추가");
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    //userNo 수정 필요
    const addrs = getAddress({ userNo: 1 });
    addrs.then((res) => {
      setAddrs(res);
    });
  }, []);

  function addClick() {
    if (isAddOpen === false) {
      setIsAddOpen(true);
      setAddBtnText("닫기");
    } else {
      setIsAddOpen(false);
      setAddBtnText("+추가");
    }
  }

  function submitAddr(e) {
    e.preventDefault();

    fetch("/profile/addaddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), //추가필요
    });
  }

  return (
    <div className="setting-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">
          등록된 배송지
          <button className="add-btn" onClick={addClick}>
            {addBtnText}
          </button>
          {isAddOpen && (
            <form onClick={submitAddr}>
              <input placeholder="이름" />
              <AddressPopup />
              <input placeholder="우편번호" />
              <input placeholder="주소" />
              <input placeholder="상세주소" />
              <input placeholder="전화번호" />
            </form>
          )}
        </div>
        <AddressList addrs={addrs} />
      </section>
    </div>
  );
}
