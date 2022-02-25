import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../Profile.module.css';

export default function InterestProjectList(){
    const [inters, setInterests] = useState([]);
    const [pres, setPres] = useState([]);
    useEffect(() => {
        axios.get("/interestlist")
        .then(res => setInterests(res.data))
        .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        axios.get("/prelaunchedlist")
        .then(res => setPres(res.data))
        .catch(err => console.log(err));
    }, []);
    console.log(inters);
    return(
        <section>
            <div className={styles.interestHeader}>
                <div className={styles.interestH1}><h1>관심 프로젝트</h1></div>
                <div className={styles.interestSelect}>
                    <span className={styles.selectedSpan}>
                        <Link to="/interestlist" replace={true} className={styles.selectedA} style={{color: "black"}}>좋아한 {inters.length}</Link>
                    </span>
                    <span>
                        <Link to="/prelaunchedlist" className={styles.notSelectedA} state={{pres: pres, intersLength: inters.length}} >알림신청 {pres.length}</Link>
                    </span>
                </div>
            </div>
            <div className={styles.selectContent}>
                <br/><br/>
                {
                    inters.length === 0 ?
                <div className={styles.noContent}>
                    <img src={require('../../../images/profile/empty heart.png')} alt="no_like_project" />
                    <div>좋아한 프로젝트가 없습니다.</div>
                </div> :
                
                <div className={styles.itemContent}>
                {inters.map((inter) => (
                    <div className={styles.item} key={inter.likeProject.projectNo}>
                        <Link to={'/projectdetail/'+Number(inter.likeProject.projectNo)}>
                        <img className={styles.itemImage} src={require(`../../../${inter.likeProject.projectImage}`)} alt={inter.likeProject.projectNo}/>
                        </Link>

                        {/*<button className={styles.like}></button>*/}
                        <button className={styles.notLike}></button>

                        <div className={styles.info} style={{marginTop:'-25px'}}>

                            <div className={styles.catelink}>
                                <span className={styles.category}> {inter.likeProject.category.categoryName} | {inter.likeProject.maker.userName} </span>
                            </div>

                            <Link to={'/projectdetail/'+Number(inter.likeProject.projectNo)}>
                            <span className={styles.title}>{inter.likeProject.longTitle}</span> 
                            </Link>
                            <span className={styles.brief}>{inter.likeProject.projectBrief}</span>
                            <div className={styles.priceAndPercent}>
                                <span className={styles.percent}>{inter.likeProject.achiveRate}%</span>
                                <span className={styles.sumPrice}>{inter.likeProject.projectChange.sumPrice.toLocaleString('ko-KR')}원</span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                }
            </div>
        </section>
    )
}