import { useRef, useState } from "react";

export default function AddAddress() {
  const userNo = window.sessionStorage.getItem("userNo");
  const [check, setCheck] = useState("0");

  const nameRef = useRef();
  const addrNoRef = useRef();
  const addrRef = useRef();
  const addrDetailRef = useRef();
  const phoneRef = useRef();

  function clickCheck() {
    if (check === "0") {
      setCheck("1");
    } else {
      setCheck("0");
    }
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
        receiverName: nameRef.current.value,
        receiverZipcode: addrNoRef.current.value,
        receiverAddress: addrRef.current.value,
        receiverAddressDetailed: addrDetailRef.current.value,
        receiverPhone: phoneRef.current.value,
        defaultAddress: check,
      }),
    });
    window.location.replace("/profile/addressset");
  }

  return (
    <form>
      <input placeholder="이름" ref={nameRef} />
      <input placeholder="우편번호" ref={addrNoRef} />
      <input placeholder="주소" ref={addrRef} />
      <input placeholder="상세주소" ref={addrDetailRef} />
      <input placeholder="전화번호" ref={phoneRef} />
      <span className="additional-description">기본배송지 등록</span>
      <input type="checkbox" onClick={clickCheck} className="inline-style" />
      <button onClick={handleSubmit}>등록</button>
    </form>
  );
}
