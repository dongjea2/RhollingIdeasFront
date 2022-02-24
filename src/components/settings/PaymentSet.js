import SettingsHeader from "./SettingsHeader";
import "./SettingsDefault.css";
import { useState, useEffect } from "react";

function Card({ card }) {
  const { cardNum, validDate, ownerBirth, isDefault } = card;

  return (
    <div className="card">
      <div>카드번호: {card.cardNum}</div>
      <div>유효기간: {card.validDate}</div>
      <div>생년월일: {card.ownerBirth}</div>
    </div>
  );
}

function CardList({ cards }) {
  return (
    <ul className="cardList">
      {cards.map((card) => (
        <li key={card.cardNum}>
          <Card card={card} />
        </li>
      ))}
    </ul>
  );
}

async function getCards(requestBody) {
  const resCard = await fetch("/profile/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const resBody = await resCard.json();
  return resBody;
}

export default function PaymentSet() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    //userNo 변경 필요
    const cards = getCards({ userNo: 1 });
    cards.then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <div className="setting-default">
      <SettingsHeader />
      <section className="settings-box">
        <div className="settings_subtitle">등록된 결제수단</div>
        <CardList cards={cards} />
      </section>
    </div>
  );
}
