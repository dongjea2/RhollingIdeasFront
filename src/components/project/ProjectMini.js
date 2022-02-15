import { Link } from 'react-router-dom';
import styles from './ProjectMini.module.css';

export default function ProjectMini({ item }) {
  const {  id ,imgUrl, category,maker, title,
            ahciveRate } = item;

  console.log(id);
  console.log(title);

  return (
    <>
    <Link to={'/projectdetail/'+Number(id)}>
    <img className={styles.itemImage} src={imgUrl} alt={title}/>
    </Link>

    {/*<button className={styles.like}></button>*/}
    <button className={styles.notLike}></button>

    <div className={styles.info}>

        <div className={styles.catelink}>
            <span className={styles.category}> {category} </span>
            <span className={styles.category}>|</span>
            <span className={styles.company}> {maker} </span>
        </div>

        <Link to={'/projectdetail/'+Number(id)}>
        <span className={styles.title}>{title}</span> 
        </Link>



        <div className={styles.priceAndPercent}>
            <span className={styles.percent}>{ahciveRate}% 달성</span>
        </div>
    </div>

    </>
  );
}