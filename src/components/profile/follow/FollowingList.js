import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../interest/InterestProejctList.css';
import './Follow.css';

export default function FollowingList(){
    const [lists] = useState([]);

    // 가상데이터
    const [infos, setInfo] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
    }, []);

    return(
        <section>
            <div className="interest-header">
                <div className="interest-h1"><h1>팔로우</h1></div>
                <div className="interest-select">
                    <span className="selected-span">
                        <Link to="/following" className="selected-a" style={{color: "black"}}>팔로잉 000</Link>
                    </span>
                    <span>
                        <Link to="/following/followers" className="not-selected-a">팔로워 000</Link>
                    </span>
                </div>
            </div>
            <div className="follow-content">
                <br/><br/>
                {
                    infos.length === 0 ? 
                    <div class="no-content">
                        <img src={require('../../../images/profile/default.png')} alt="no_following"/>
                        <div>팔로우한 사용자가 없습니다.</div>
                    </div> :
                    <div className="follow-list-wrapper">
                        <div className="follow-list">
                            {infos.map((info) => 
                                <div className="follow-item">
                                    <div className="follow-user-img">
                                        <img src={require("../../../files/user_image/default.png")} alt="user_img" />
                                    </div>
                                    <div className="follow-item-content">
                                        <div className="follow-item-descption">
                                            <div className="follow-user-name">
                                                <Link to="/">유저이름</Link>
                                            </div>
                                            <div className="follow-user-intro">
                                                유저소개글
                                            </div>
                                            <div className="follow-user-info">
                                                팔로워 000 · 올린 프로젝트 000
                                            </div>
                                        </div>
                                        <div className="follow-button-content">
                                            <button className="follow-button">
                                                <img src={require("../../../images/profile/check1.png")} alt="followButtonCheckImg" />
                                                <span>팔로잉</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}