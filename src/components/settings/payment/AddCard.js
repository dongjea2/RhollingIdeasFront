import { useState, useRef } from "react";

export function AddCard() {
  const userNo = window.sessionStorage.getItem("userNo");

  const [inputs, setInputs] = useState({
    cardNum: "",
    expireDt: new Date(),
    birthDt: "",
    pwd: "",
  });

  const { cardNum, expireDt, birthDt, pwd } = inputs;

  function onChange(e) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

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
        defaultCard: "0",
      }),
    });
    window.location.replace("/profile/paymentset");
  }

  return (
    <form>
      <input
        name="cardNum"
        placeholder="카드번호"
        value={cardNum}
        onChange={onChange}
      />
      <input
        name="pwd"
        placeholder="비밀번호"
        value={pwd}
        onChange={onChange}
      />
      <input
        name="expireDt"
        type="date"
        placeholder="유효기간"
        value={expireDt}
        onChange={onChange}
      />
      <input
        name="birthDt"
        placeholder="생년월일"
        value={birthDt}
        onChange={onChange}
      />
      <button onClick={handleSubmit} className="add-btn">
        등록
      </button>
    </form>
  );
}
