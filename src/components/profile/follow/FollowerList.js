import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import '../interest/InterestProejctList.css';

export default function FollowerList(){
    const [list, setList] = useState([]);
    const [cnt, setCnt] = useState(0);
    let userNo = window.sessionStorage.getItem("userNo");

    useEffect(() => {
        axios.get("/followers")
        .then(res => setList(res.data))
        .catch(err => console.log(err));
    }, [cnt]);

    const followClick = (follow) => {
        axios.post('/editfollow',
            {
                userNo: {userNo:userNo},
                follow: {userNo:follow}
            }
        ).then(function (response) {
            setCnt(cnt + 1);
        })
        .catch(function (error) {
            alert("로그인이 필요한 서비스입니다.");
            window.location.replace("/login");
        });
    }

    return(
        <section>
            <div className="interest-header">
                <div className="interest-h1"><h1>팔로우</h1></div>
                <div className="interest-select">
                    <span>
                        <Link to="/following" className="not-selected-a">팔로잉 {list.followingCnt}</Link>
                    </span>
                    <span className="selected-span">
                        <Link to="/following/followers" className="selected-a" style={{color: "black"}} >팔로워 {list.followers && list.followers.length}</Link>
                    </span>
                </div>
            </div>
            <div className="follow-content">
                <br/><br/>
                {
                    list.followers && list.followers.length === 0 ? 
                    <div className="no-content">
                        <img src={require('../../../images/profile/default.png')} alt="no_folloing"/>
                        <div>팔로워가 없습니다.</div>
                    </div> :
                    <div className="follow-list-wrapper">
                    <div className="follow-list">
                        {list.followers && list.followers.map((user) => 
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
                                    {
                                        user.followCheck === true ?
                                        <button className="following-button" onClick={(e)=>followClick(user.userNo, e)}>
                                            <img src={require("../../../images/profile/check1.png")} alt="followButtonCheckImg" />
                                            <span>팔로잉</span>
                                        </button> :
                                        <button className="follow-button" onClick={(e)=>followClick(user.userNo, e)}>
                                            <span>+ 팔로우</span>
                                        </button>
                                    }
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