import styles from './DiscoverPage.module.css';
import ProjectList from './Project';
import items from '../../api/mock/projectMock.json';

export default function DiscoverPage(){
    return(

<div className={styles.fundingList}>
    <span className={styles.listTitle}>전체</span>
    <div className={styles.listInfo}>
        <button className={styles.status}></button>
        <button className={styles.achiev}></button>
        <button className={styles.recommend}></button>
    </div>
    <div className={styles.listLength}>
        <div>
            <span className={styles.fundcount}>{items.length}</span>
            개의 프로젝트가 있습니다.
        </div>
        <button className={styles.orderBy}></button>
    </div>
    <ProjectList items={items}/>
</div>
    );
}