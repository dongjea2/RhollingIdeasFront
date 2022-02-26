import styles from './NewProjects.module.css';
import ProjectMini from '../../../project/ProjectMini';
import items from '../../../../api/mock/projectMock.json';


export default function AttentionProjects({projectList}) {
  return (
<div className={styles.fundingList}>
    <span className={styles.listTitle}>신규 프로젝트</span>
    <div className={styles.itemRapper}>
        <div className={styles.itemInrap}>

          {projectList && projectList.map((project) => (
          <div className={styles.item} key={project.projectNo}>
              <ProjectMini project={project}/>
          </div>
          ))}

        </div>
    </div>
</div>
  );
}