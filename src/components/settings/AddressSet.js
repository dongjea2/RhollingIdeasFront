import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";
import { AddressList, getAddress } from "./address/ShowAddress";
import AddAddress from "./address/AddAddress";

export default function AddressSet() {
  const userNo = window.sessionStorage.getItem("userNo");

  const [addrs, setAddrs] = useState([]);
  const [addBtnText, setAddBtnText] = useState("+추가");
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const addrs = getAddress({ userNo: userNo });
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

  return (
    <div className="setting-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">
          등록된 배송지
          <button className="add-btn" onClick={addClick}>
            {addBtnText}
          </button>
          {isAddOpen && <AddAddress />}
        </div>
        <AddressList addrs={addrs} />
      </section>
    </div>
  );
}
