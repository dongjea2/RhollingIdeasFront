import styles from './AttentionProjects.module.css';
import ProjectMini from '../project/ProjectMini';


export default function ProjectMiniList({items}) {
  return (
    <div className={styles.fundingList}>
      <span className={styles.listTitle}>주목할만한 프로젝트</span>
    <div className={styles.itemRapper}>
    <div className={styles.itemInrap}>

      {items.map((item) => (
      <div className={styles.item} key={item.id}>
          <ProjectMini item={item} />
      </div>
      ))}
      </div>
      </div>
      </div>
  );
}