import { useState } from "react";

export default function AddAddress() {
  const userNo = window.sessionStorage.getItem("userNo");

  const [inputs, setInputs] = useState({
    name: "",
    zipcode: "",
    addr: "",
    addrDetail: "",
    phone: "",
  });

  const { name, zipcode, addr, addrDetail, phone } = inputs;

  function onChange(e) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/profile/addaddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userNo: userNo,
        },
        receiverName: name,
        receiverZipcode: zipcode,
        receiverAddress: addr,
        receiverAddressDetailed: addrDetail,
        receiverPhone: phone,
        defaultAddress: "0",
      }),
    });
    window.location.replace("/profile/addressset");
  }

  return (
    <form>
      <input name="name" placeholder="이름" value={name} onChange={onChange} />
      <input
        name="zipcode"
        placeholder="우편번호"
        value={zipcode}
        onChange={onChange}
      />
      <input name="addr" placeholder="주소" value={addr} onChange={onChange} />
      <input
        name="addrDetail"
        placeholder="상세주소"
        value={addrDetail}
        onChange={onChange}
      />
      <input
        name="phone"
        placeholder="전화번호"
        value={phone}
        onChange={onChange}
      />
      <button onClick={handleSubmit}>등록</button>
    </form>
  );
}
