import { useState } from 'react';
import styles from './OrderProject.module.css';

export default function OrderProject({project}){

    return(
		<div className={styles.itemParent}>
          <img className={styles.itemImage} 
		  		src={require(`../../../${project && project.projectImage}`)}
				alt={project.longTitle}/> 
				<div className={styles.itemInfo}>

					<h1>{project.title}</h1>
					{project && project.projectChange.sumPrice}원
					{project && project.achiveRate}%
					{project.remainingDays}
				</div>
		</div>
    );
}
