import { useState, useEffect, useRef } from "react";
import { getCards } from "../../settings/payment/ShowPayment";
import styled from "styled-components";

export default function UserCard() {
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const cards = getCards({ userNo: window.sessionStorage.getItem("userNo") });
    cards.then((res) => {
      setCards(res);
    });
  }, []);



  return (
    <>
          <h3>등록된 결제수단</h3>
          <Box>
            <OrderCardList cards={cards} />
          </Box>
    </>
  );
}

export function OrderCardList({ cards }) {
  return (
    <ul className="cardList">
      {cards.map((card) => (
        <li key={card.cardNum}>
          <OrderCard card={card} />
        </li>
      ))}
    </ul>
  );
}

function OrderCard({ card }) {
  return (
    <Box>
      <Card>
        {card.isDefault ==="1" ?<Default>선택</Default>:""  }
        <div>카드번호: {card.cardNum}</div>
        <div>유효기간: {card.validDate}</div>
        <div>생년월일: {card.ownerBirth}</div>
      </Card>
    </Box>
  );
}


//=====================================
//Styled Componets

const Box = styled.div`
    width: 730px;
    margin-top: 10px;
    max-width: 1100px;
`

const Card= styled.div`
    border: 1px solid darkgrey;
    border-radius: 4px;
    margin-top: 10px;
`

const Default = styled.div`
  position: absolute;
  background-color: rgb(255, 87, 87);
  width: 50px;
  height: 30px;
  margin-left: 678px;
  margin-bottom: 100px;
  color: aliceblue;
  text-align: center;
  font-size: 16px;
`