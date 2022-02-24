import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";

function Address({ addr }) {
  return (
    <div className="address">
      <div>이름: {addr.name}</div>
      <div>우편번호: {addr.zipcode}</div>
      <div>주소: {addr.address}</div>
      <div>상세주소: {addr.addressDetail}</div>
      <div>전화번호: {addr.phone}</div>
    </div>
  );
}

function AddressList({ addrs }) {
  return (
    <ul>
      {addrs.map((addr) => (
        <li key={addr.addressNo}>
          <Address addr={addr} />
        </li>
      ))}
    </ul>
  );
}

async function getAddress(requestBody) {
  const resAddress = await fetch("/profile/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const resBody = await resAddress.json();
  return resBody;
}

export default function AddressSet() {
  const [addrs, setAddrs] = useState([]);

  useEffect(() => {
    //userNo 수정 필요
    const addrs = getAddress({ userNo: 1 });
    addrs.then((res) => {
      setAddrs(res);
    });
  }, []);

  return (
    <div className="setting-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">등록된 배송지</div>
        <AddressList addrs={addrs} />
      </section>
    </div>
  );
}
