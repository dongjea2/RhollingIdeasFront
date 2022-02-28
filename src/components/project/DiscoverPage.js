import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './DiscoverPage.module.css';
import ProjectList from './ProjectList';

export default function DiscoverPage(){
    const [list, setList ] = useState([]);

    useEffect(() => {
            axios.get('/discover')
            .then(res => setList(res.data))
            .catch(err => console.log(err));
    },[]);
    return(

        <div className={styles.fundingList}>
            <span className={styles.listTitle}>전체</span>
            <div className={styles.listInfo}>
                <button className={styles.status}></button>
                <button className={styles.achiev}></button>
                <button className={styles.recommend}></button>
            </div>
            <div className={styles.listLength}>
                <div><span className={styles.fundcount}>{list.length}</span> 개의 프로젝트가 있습니다.</div>
                <button className={styles.orderBy}></button>
            </div>
            <ProjectList projectList={list}/>
        </div>
    );
}