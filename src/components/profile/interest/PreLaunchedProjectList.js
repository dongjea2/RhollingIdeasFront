import { Link, useLocation } from "react-router-dom";
import styles from '../Profile.module.css';

export default function PreLaunchedProjectList(){
    const location = useLocation();
    const pres = location.state.pres;
    const intersLength = location.state.intersLength;
    return(
        <section>
            <div className={styles.interestHeader}>
                <div className={styles.interestH1}><h1>관심 프로젝트</h1></div>
                <div className={styles.interestSelect}>
                    <span>
                        <Link to="/interestlist" replace={true} className={styles.notSelectedA}>좋아한 {intersLength}</Link>
                    </span>
                    <span className={styles.selectedSpan}>
                        <Link to="/prelaunchedlist" state={{pres: pres, intersLength: intersLength}} replace={true} className={styles.selectedA} style={{color: "black"}}>알림신청 {pres.length}</Link>
                    </span>
                </div>
            </div>
            <div className={styles.selectContent}>
                <br/><br/>
                {
                    pres.length === 0 ?
                <div className={styles.noContent}>
                    <img src={require('../../../images/profile/empty alarm.png')} alt="no_like_project" />
                    <div>알림신청한 프로젝트가 없습니다.</div>
                </div> :
                
                <div className={styles.itemContent}>
                {pres.map((pre) => (
                    <div className={styles.item} key={pre.likeProject.projectNo}>
                        <Link to={'/projectdetail/'+Number(pre.likeProject.projectNo)}>
                            <img className={styles.itemImage} src={require(`../../../${pre.likeProject.projectImage}`)} alt={pre.likeProject.projectNo}/>
                        </Link>

                        <div className={styles.info}>

                            <div className={styles.catelink}>
                                <span className={styles.category}> {pre.likeProject.category.categoryName} | {pre.likeProject.maker.userName} </span>
                            </div>

                            <Link to={'/projectdetail/'+Number(pre.likeProject.projectNo)}>
                            <span className={styles.title}>{pre.likeProject.longTitle}</span> 
                            </Link>
                            <span className={styles.brief}>{pre.likeProject.projectBrief}</span>
                        </div>
                        <div className={styles.alarmButtonWrap}>
                            <button className={styles.alarmButton}>알림신청 중</button>
                        </div>
                    </div>
                ))}
                </div>
                }
            </div>
        </section>
    )
}