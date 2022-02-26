import { Link } from 'react-router-dom';
import styles from './ProjectMini.module.css';

export default function ProjectMini({ project }) {

  return (
    <>
    <Link to={'/projectdetail/'+Number( project && project.projectNo)}>
      <img src ={require(`../../${ project && project.projectImage }`)} className={styles.itemImage}  alt={project && project.projectNo}/>
    </Link>

    {project && project.loginedUserProjectInterest === true ? 
      <button className={styles.like}/> : <button className={styles.notLike}/>
    }

    <div className={styles.info}>

        <div className={styles.catelink}>
            <span className={styles.category}> {project && project.category.categoryName} </span>
            <span className={styles.category}>|</span>
            <span className={styles.company}> {project && project.maker.userName} </span>
        </div>

        <Link to={'/projectdetail/'+Number(project && project.projectNo)}>
        <span className={styles.title}>{project && project.longTitle}</span> 
        </Link>
        <div className={styles.priceAndPercent}>
            <span className={styles.percent}>50% 달성</span>
        </div>
    </div>

    </>
  );
}