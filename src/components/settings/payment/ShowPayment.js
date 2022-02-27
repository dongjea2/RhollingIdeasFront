function Card({ card }) {
  return (
    <div className="card">
      <div>카드번호: {card.cardNum}</div>
      <div>유효기간: {card.validDate}</div>
      <div>생년월일: {card.ownerBirth}</div>
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
