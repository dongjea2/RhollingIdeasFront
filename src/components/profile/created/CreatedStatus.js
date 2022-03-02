import styles from './CreatedStatus.module.css';
import contents from './createdcontent.json';
import { Link } from 'react-router-dom';
export default function CreatedStatus({ list }) {
    //프로젝트 상태 출력 위한
    const status = contents.filter(function (content){
        return content.status === list[0].projectStatus;
    });

    return(
        <>
        <div className={styles.created}>
            <div className={styles.createdCont}>
                <span className={styles.createdResult}>{status[0].statusPrint}</span>
                ({list.length})
            </div>
            {list.map(project =>
            <div className={styles.eachProjectWrapper} key={project.projectNo}>
                <div className={styles.projectImg}>
                    <Link to={'/projectdetail/' + Number(project.projectNo)} >
                        <img src={require(`../../../${project.projectImage}`)} alt="project image" />
                    </Link>
                </div>
                <div className={styles.projectContent}>
                    <div>
                        <div className={styles.status}>
                            {status[0].statusPrint}
                            {project.rejectReason !== null && 
                                <> : {project.rejectReason}</>
                            }
                        </div>
                        <div className={styles.longTitle}>
                            <Link to={'/projectdetail/' + Number(project.projectNo)} >
                                {project.longTitle}
                            </Link>
                        </div>
                        <div className={styles.projectBrief}>
                            {project.projectBrief}
                        </div>
                    </div>
                {
                    project.projectStatus === "임시저장" &&
                    <div className={styles.deleteButtonCont}>
                        <button>
                            <span>삭제</span>
                        </button>
                    </div>
                }
                </div>
            </div>
            )}
        </div>
        </>
    )
}