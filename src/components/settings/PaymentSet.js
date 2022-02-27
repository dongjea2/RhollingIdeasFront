import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect, useRef } from "react";
import { CardList, getCards } from "./payment/ShowPayment";

export default function PaymentSet() {
  const [cards, setCards] = useState([]);
  const [addBtnText, setAddBtnText] = useState("+추가");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [check, setCheck] = useState("0");

  const cardRef = useRef();
  const expireDtRef = useRef();
  const birthDtRef = useRef();
  const pwdRef = useRef();

  useEffect(() => {
    //userNo 변경 필요
    const cards = getCards({ userNo: 1 });
    cards.then((res) => {
      setCards(res);
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
          userNo: 1, //수정필요
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
    <div className="setting-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">
          등록된 결제수단
          <button className="add-btn" onClick={addClick}>
            {addBtnText}
          </button>
          {isAddOpen && (
            <form>
              <input placeholder="카드번호" ref={cardRef} />
              <input placeholder="비밀번호" ref={pwdRef} />
              <input type="date" placeholder="유효기간" ref={expireDtRef} />
              <input placeholder="생년월일" ref={birthDtRef} />
              <input type="checkbox" onClick={clickCheck} />
              기본결제수단 등록
              <button onClick={handleSubmit}>카드 저장</button>
            </form>
          )}
        </div>
        <CardList cards={cards} />
      </section>
    </div>
  );
}
