import { useState, useRef } from "react";

function Card({ card }) {
  const userNo = window.sessionStorage.getItem("userNo");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateBtn, setUpdateBtn] = useState("수정");
  const [inputs, setInputs] = useState({
    cardNum: card.cardNum,
    expireDt: card.validDate,
    birthDt: card.ownerBirth,
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

    fetch("/profile/payment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userNo: userNo,
        },
        cardNo: card.cardNo,
        cardNum: cardNum,
        cardValidDate: expireDt,
        cardPwd: pwd,
        cardOwnerBirth: birthDt,
        defaultCard: card.isDefault,
      }),
    });
    window.location.replace("/profile/paymentset");
  }

  function clickUpdate(e) {
    e.preventDefault();
    if (isUpdate === false) {
      setIsUpdate(true);
      setUpdateBtn("닫기");
    } else {
      setIsUpdate(false);
      setUpdateBtn("수정");
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    fetch("/profile/payment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardNo: card.cardNo,
      }),
    });
    window.location.replace("/profile/paymentset");
  }

  function handleDefault(e) {
    e.preventDefault();
    fetch("/profile/paymentdefault", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardNo: card.cardNo,
        user: {
          userNo: userNo,
        },
      }),
    });
    window.location.replace("/profile/paymentset");
  }

  return (
    <div className="card">
      {isUpdate ? (
        <form>
          <input
            name="cardNum"
            placeholder="카드번호"
            className="card-input"
            value={cardNum}
            onChange={onChange}
          />
          <input
            name="pwd"
            placeholder="비밀번호"
            className="card-input"
            value={pwd}
            onChange={onChange}
          />
          <input
            name="expireDt"
            type="date"
            placeholder="유효기간"
            className="card-input"
            value={expireDt}
            onChange={onChange}
          />
          <input
            name="birthDt"
            placeholder="생년월일"
            className="card-input"
            value={birthDt}
            onChange={onChange}
          />
          <button onClick={handleSubmit} className="add-btn">
            수정
          </button>
        </form>
      ) : (
        <>
          <div className="hidden-data">cardNo: {card.cardNo}</div>
          <div>카드번호: {card.cardNum}</div>
          <div>유효기간: {card.validDate}</div>
          <div>생년월일: {card.ownerBirth}</div>
          {card.isDefault === "1" && (
            <div className="default-data">기본결제수단</div>
          )}
        </>
      )}
      <div className="card-buttons-container">
        <button className="card-button" onClick={handleDefault}>
          기본결제수단 등록
        </button>
        <button className="card-button" onClick={clickUpdate}>
          {updateBtn}
        </button>
        <button className="card-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

export function CardList({ cards }) {
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

export async function getCards(requestBody) {
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
