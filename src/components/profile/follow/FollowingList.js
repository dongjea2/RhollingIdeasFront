import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../interest/InterestProejctList.css';
import './Follow.css';

export default function FollowingList(){
    const [list, setList] = useState([]);
    const [cnt, setCnt] = useState(0);
    let userNo = window.sessionStorage.getItem("userNo");

    useEffect(() => {
        axios.get("/following")
        .then(res => setList(res.data))
        .catch(err => console.log(err));
    }, [cnt]);
    console.log(list);

    const followClick = (follow) => {
        console.log(follow);
        axios.post('/editfollow',
            {
                userNo: {userNo:userNo},
                follow: {userNo:follow}
            }
        ).then(function (response) {
            console.log(response);
            setCnt(cnt + 1);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <section>
            <div className="interest-header">
                <div className="interest-h1"><h1>팔로우</h1></div>
                <div className="interest-select">
                    <span className="selected-span">
                        <Link to="/following" className="selected-a" style={{color: "black"}}>팔로잉 {list.following && list.following.length}</Link>
                    </span>
                    <span>
                        <Link to="/following/followers" className="not-selected-a" >팔로워 {list.followerCnt}</Link>
                    </span>
                </div>
            </div>
            <div className="follow-content">
                <br/><br/>
                {
                    list.following && list.following.length === 0 ? 
                    <div className="no-content">
                        <img src={require('../../../images/profile/default.png')} alt="no_following"/>
                        <div>팔로우한 사용자가 없습니다.</div>
                    </div> :
                    <div className="follow-list-wrapper">
                        <div className="follow-list">
                            {list.following && list.following.map((user) => 
                                <div className="follow-item" key={user.userNo}>
                                    <div className="follow-user-img">
                                        <img src={require(`../../../${user.userImage}`)} alt="user_img" />
                                    </div>
                                    <div className="follow-item-content">
                                        <div className="follow-item-descption">
                                            <div className="follow-user-name">
                                                <Link to={"/profile/" + user.userUrl}>{user.userName}</Link>
                                            </div>
                                            <div className="follow-user-intro">
                                                {user.userIntroduction}
                                            </div>
                                            <div className="follow-status">
                                                팔로워 {user.followerCnt} · 올린 프로젝트 {user.createdCnt}
                                            </div>
                                        </div>
                                        <div className="follow-button-content">
                                            <button className="following-button" onClick={(e)=>followClick(user.userNo, e)}>
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