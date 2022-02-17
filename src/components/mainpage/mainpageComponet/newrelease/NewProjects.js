import styles from './NewProjects.module.css';
import ProjectMini from '../../../project/ProjectMini';
import items from '../../../../api/mock/projectMock.json';


export default function AttentionProjects() {
  return (
<div className={styles.fundingList}>
    <span className={styles.listTitle}>신규 프로젝트</span>
    <div className={styles.itemRapper}>
        <div className={styles.itemInrap}>

            {items.map((item) => (
            <div className={styles.item} key={item.id}>
                <ProjectMini item={item}/>
            </div>
            ))}
        </div>
    </div>
</div>
  );
}