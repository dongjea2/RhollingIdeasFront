import { useState } from "react";
import { Link } from "react-router-dom";
import '../interest/InterestProejctList.css';

export default function FollowerList(){
    const [lists] = useState([]);

    return(
        <section>
            <div className="interest-header">
                <div className="interest-h1"><h1>팔로우</h1></div>
                <div className="interest-select">
                    <span>
                        <Link to="/following" className="not-selected-a">팔로잉 000</Link>
                    </span>
                    <span className="selected-span">
                        <Link to="/following/followers" className="selected-a" style={{color: "black"}}>팔로워 000</Link>
                    </span>
                </div>
            </div>
            <div className="select-content">
                <br/><br/>
                {
                    lists.length === 0 ? 
                    <div class="no-content">
                        <img src={require('../../../images/profile/default.png')} alt="no_folloing"/>
                        <div>팔로워가 없습니다.</div>
                    </div> :
                    <div></div>
                }
            </div>
        </section>
    )
}