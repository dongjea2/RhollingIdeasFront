import styles from './Project.module.css';
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
          <img className={styles.itemImage} src={imgUrl} alt={title}/> 
        </Link>
        {/*<button className={styles.like"></button>*/}
        <button className={styles.notLike}></button>

        <div className={styles.info}>
            <Link to={'/projectdetail/'+Number(id)}>
             <span className={styles.title}>{title}</span> 
             </Link>
            <div className={styles.catelink}>
                <span className={styles.category}> {category} </span>
                <span className={styles.category}>|</span>
                <span className={styles.company}> {maker} </span>
            </div>

            <span className={styles.iteminfo}>{brief}</span>

            <div className={styles.priceAndPercent}>
                      <span className={styles.price}>{sumPrice}원</span>
                      <span className={styles.percent}>{ahciveRate}%</span>
                      <span className={styles.leftDay}> <img src={leftDayImg}/> {remainingDate} </span>
            </div>
         </div>
    </>
  );
}

export default function ProjectList({items}) {
  return (
    <div className={styles.itemRapper}>
      <div className={styles.itemInrap1}>

      {items.map((item) => (
      <div className={styles.item} key={item.id}>
          <Project item={item} />
      </div>
      ))}
      </div>
      </div>
  );
}