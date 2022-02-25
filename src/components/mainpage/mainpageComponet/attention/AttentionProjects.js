import styles from './AttentionProjects.module.css';
import ProjectMini from '../../../project/ProjectMini';


export default function AttentionProjects({projectList}) {
  console.log("주목할만한 ");
  console.log(projectList);
  return (
<div className={styles.fundingList}>
    <span className={styles.listTitle}>주목할만한 프로젝트</span>
    <div className={styles.itemRapper}>
        <div className={styles.itemInrap}>
          {projectList && projectList.map( project => 

            <div className={styles.item} key={project.projectNo}>
              <ProjectMini project={project}/>
            </div>
            )}
        </div>
    </div>
</div>
  );
}