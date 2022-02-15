//import './ProjectList.css';
import items from '../../api/mock/projectMock.json';



function Project({ item }) {
  const {  id ,imgUrl, category,maker, title,
            brief,sumPrice ,ahchiveRate, remainingDate } = item;


  return (
    <div className="item">
         <img className="item-image" src={imgUrl} alt={title}/> 
        <button className="like"></button>
        <button className="not-like"></button>

        <div className="info">
             <span className="title">{title}</span> 
            <div className="catelink">
                <span className="category"> {category} </span>
                <span className="category">|</span>
                <span className="company"> {maker} </span>
            </div>

            <span className="iteminfo">{brief}</span>

            <div className="priceAndPercent">
                      <span className="price">{sumPrice}원</span>
                      <span className="percent">{ahchiveRate}%</span>
                      <span className="leftDay"> <img src="/rhollEE/images/mainpage/time.PNG"/> {remainingDate} </span>
            </div>
        </div>
    </div>

  );
}

export default function ProjectList() {
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li key={item.id}>
          <Project item={item} />
        </li>
      ))}
    </ul>
  );
}