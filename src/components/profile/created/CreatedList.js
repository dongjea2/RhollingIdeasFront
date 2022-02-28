import axios from "axios";
import { useEffect, useState } from "react"
import styles from '../Profile.module.css';
import CreatedStatus from "./CreatedStatus";

export default function CreatedList(){
    const [created, setCreated] = useState([]);

    useEffect(() => {
        axios.get("/created")
        .then(res => setCreated(res.data))
        .catch(err => console.log(err));
    }, []);

    //작성중 리스트
    const writeList = created.filter(function (project){
        return project.projectStatus === "임시저장";
    });
    //심사중 리스트
    const examinationList = created.filter(function (project){
        return project.projectStatus === "심사중";
    });
    //승인 리스트
    const approveList = created.filter(function (project){
        return project.projectStatus === "승인";
    });
    //반려 리스트
    const rejectList = created.filter(function (project){
        return project.projectStatus === "반려";
    });
    //중지 리스트
    const stopList = created.filter(function (project){
        return project.projectStatus === "중지";
    });

    console.log(created);
    return(
        <section>
            <div className={styles.Header}>
                <div className={styles.HeaderH1}><h1>내가 만든 프로젝트</h1></div>
            </div>
            {/* <div className={styles.statusButton}>
                <div>전체</div>
                <div>작성 중</div>
                <div>심사 중</div>
                <div>승인됨</div>
                <div>반려됨</div>
                <div>중지됨</div>
            </div> */}
            {
                created.length === 0 ?
            <div className={styles.noContent}>
                <img src={require('../../../images/profile/empty created.png')} alt="empty created" />
                <div>프로젝트가 없습니다.</div>
            </div> :
            <div className={styles.Content}>
                {writeList.length !== 0 && <CreatedStatus list={writeList} />}
                {examinationList.length !== 0 && <CreatedStatus list={examinationList} />}
                {approveList.length !== 0 && <CreatedStatus list={approveList} />}
                {rejectList.length !== 0 && <CreatedStatus list={rejectList} />}
                {stopList.length !== 0 && <CreatedStatus list={stopList} />}
            </div>
            }
        </section>
    )
}