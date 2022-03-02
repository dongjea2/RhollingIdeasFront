import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect, useRef } from "react";
import { CardList, getCards } from "./payment/ShowPayment";
import { AddCard } from "./payment/AddCard";

export default function PaymentSet() {
  const userNo = window.sessionStorage.getItem("userNo");

  const [cards, setCards] = useState([]);
  const [addBtnText, setAddBtnText] = useState("+추가");
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const cards = getCards({ userNo: userNo });
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

  return (
    <div className="setting-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">
          등록된 결제수단
          <button className="add-btn" onClick={addClick}>
            {addBtnText}
          </button>
          {isAddOpen && <AddCard />}
        </div>
        <CardList cards={cards} />
      </section>
    </div>
  );
}
