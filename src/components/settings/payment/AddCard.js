import { useState, useRef } from "react";

export function AddCard() {
  const userNo = window.sessionStorage.getItem("userNo");
  const [check, setCheck] = useState("0");

  const cardRef = useRef();
  const expireDtRef = useRef();
  const birthDtRef = useRef();
  const pwdRef = useRef();

  function clickCheck() {
    if (check === "0") {
      setCheck("1");
    } else {
      setCheck("0");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const cardNum = cardRef.current.value;
    const expireDt = expireDtRef.current.value;
    const birthDt = birthDtRef.current.value;
    const pwd = pwdRef.current.value;

    fetch("/profile/addpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userNo: userNo,
        },
        cardNum: cardNum,
        cardValidDate: expireDt,
        cardPwd: pwd,
        cardOwnerBirth: birthDt,
        defaultCard: check,
      }),
    });
    window.location.replace("/profile/paymentset");
  }

  return (
    <form>
      <input placeholder="카드번호" ref={cardRef} />
      <input placeholder="비밀번호" ref={pwdRef} />
      <input type="date" placeholder="유효기간" ref={expireDtRef} />
      <input placeholder="생년월일" ref={birthDtRef} />
      <span className="additional-description">기본결제수단 등록</span>
      <input type="checkbox" onClick={clickCheck} className="inline-style" />
      <button onClick={handleSubmit} className="add-btn">
        등록
      </button>
    </form>
  );
}
