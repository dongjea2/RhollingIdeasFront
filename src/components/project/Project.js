import './Project.css';
import leftDayImg from '../../images/mainpage/time.PNG'
import { Link } from 'react-router-dom';


function Project({ item }) {
  const {  id ,imgUrl, category,maker, title,
            brief,sumPrice ,ahciveRate, remainingDate } = item;

  console.log(id);
  console.log(title);

  return (
    <>
        <Link to={'/projectdetail/'+Number(id)}>
          <img className="item-image" src={imgUrl} alt={title}/> 
        </Link>
        {/*<button className="like"></button>*/}
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
                      <span className="percent">{ahciveRate}%</span>
                      <span className="leftDay"> <img src={leftDayImg}/> {remainingDate} </span>
            </div>
         </div>
    </>
  );
}

export default function ProjectList({items}) {
  return (
    <div className="item-rapper">
      <div className="item-inrap1">

      {items.map((item) => (
      <div className="item" key={item.id}>
          <Project item={item} />
      </div>
      ))}
      </div>
      </div>
  );
}