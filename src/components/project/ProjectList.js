import Project from "./Project";
import styles from './Project.module.css';

export default function ProjectList({ projectList}) {
  return (
    <div className={styles.itemRapper}>
      <div className={styles.itemInrap1}>
        {projectList && projectList.map(project => 
            <div className={styles.item} key={project.projectNo}>
            <Project project={project}/>
            </div>
        )}
      </div>
      </div>
  );
}