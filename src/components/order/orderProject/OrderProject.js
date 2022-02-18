import styles from './OrderProject.module.css';

export default function OrderProject({project}){

	  const {  id,imgUrl, category,maker, title,
            brief,sumPrice ,ahciveRate, remainingDate } = project;				
    return(
        		<div className={styles.itemParent}>
          <img className={styles.itemImage} src={imgUrl} alt={title}/> 
				<div className={styles.itemInfo}>

					{category} | {maker} 
					<h1>{title}</h1>
					{sumPrice}원
					{ahciveRate}%
					{remainingDate}
				</div>
		</div>
		
    );
}
