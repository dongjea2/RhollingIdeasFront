import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import '../interest/InterestProejctList.css';

export default function FollowerList(){
    const [following, setfollowing] = useState([]);
    const [followers, setfollower] = useState([]);
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        axios.get("/following")
        .then(res => setfollowing(res.data))
        .catch(err => console.log(err));
        axios.get("/followers")
        .then(res => setfollower(res.data))
        .catch(err => console.log(err));
    }, [cnt]);

    const followClick = (follow) => {
        console.log(follow);
        axios.post('/editfollow',
            {
                userNo: {userNo:1},
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
                    <span>
                        <Link to="/following" className="not-selected-a">팔로잉 {following.length}</Link>
                    </span>
                    <span className="selected-span">
                        <Link to="/following/followers" className="selected-a" style={{color: "black"}} >팔로워 {followers.length}</Link>
                    </span>
                </div>
            </div>
            <div className="follow-content">
                <br/><br/>
                {
                    followers.length === 0 ? 
                    <div className="no-content">
                        <img src={require('../../../images/profile/default.png')} alt="no_folloing"/>
                        <div>팔로워가 없습니다.</div>
                    </div> :
                    <div className="follow-list-wrapper">
                    <div className="follow-list">
                        {followers.map((user) => 
                            <div className="follow-item" key={user.userNo.userNo}>
                                <div className="follow-user-img">
                                    <img src={require(`../../../${user.userNo.userImage}`)} alt="user_img" />
                                </div>
                                <div className="follow-item-content">
                                    <div className="follow-item-descption">
                                        <div className="follow-user-name">
                                            <Link to="/">{user.userNo.userName}</Link>
                                        </div>
                                        <div className="follow-user-intro">
                                            {user.userNo.userIntroduction}
                                        </div>
                                    </div>
                                    <div className="follow-button-content">
                                        <button className="follow-button" onClick={(e)=>followClick(user.userNo.userNo, e)}>
                                            <span>+ 팔로우</span>
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