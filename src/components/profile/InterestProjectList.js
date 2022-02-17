import { Link } from "react-router-dom";
import styles from '../mainpage/mainpageComponet/attention/AttentionProjects.module.css';
import './InterestProejctList.css'
import items from '../../api/mock/projectMock.json';
import ProjectMini from "../project/ProjectMini";

export default function InterestProjectList(){
    return(
        <section>
            <div className="interest-header">
                <div className="interest-h1"><h1>관심 프로젝트</h1></div>
                <div className="interest-select">
                    <span className="selected-span">
                        <Link to="/interestlist"  replace={true} class="selected-a" style={{color: "black"}}>좋아한 000</Link>
                    </span>
                    <span>
                        <Link to="/prelaunchedlist"  replace={true}>알림신청 000</Link>
                    </span>
                </div>
            </div>
            <div className="select-content">
                <br/><br/>
                {
                    items.length === 0 ?
                <div class="no-content">
                    <img src={require('../../images/profile/empty heart.png')} alt="no_like_project" />
                    <div>좋아한 프로젝트가 없습니다.</div>
                </div> :
                
                <div className={styles.itemInrap}>
                {items.map((item) => (
                    <div className={styles.item} key={item.id}>
                        
                        <ProjectMini item={item}/>
                    </div>
                ))}
                </div>
                }
            </div>
        </section>
    )
}