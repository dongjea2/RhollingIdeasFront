import { Link } from "react-router-dom";

export default function HeaderUpper() {
    const status = false; //로그인된 상태?
    console.log({status});
    let userId = window.localStorage.getItem('userId');
    return(
        <div className="header-upper">
            <Link to={'/'} id="logo">
                <img src={require('../../images/mainpage/rholling.PNG')} height="60px" alt="logo" />
            </Link>
            <nav className="user-menu">
                <ul>
                    <li><Link to="/projectwrite"><span className="user-li">프로젝트 올리기</span></Link></li>
                    {
                        userId === "" ?
                    <li className="login-container">
                        <Link to="login">
                            <span className="user-li login">
                                <img src={require('../../images/mainpage/user_default.png')} alt="user_default" />
                                <span>로그인/회원가입</span>
                            </span>
                        </Link>
                    </li> :
                    <>
                    <li className="user-logo">
                        <Link to="/interestlist">
                            <span className="user-li">
                                <img src={require('../../images/mainpage/like.png')} alt="like" />
                            </span>
                        </Link>
                    </li>
                    <li className="user-logo">
                        <Link to="/jsp/profile/alarmresult.jsp">
                            <span className="user-li">
                                <img src={require('../../images/mainpage/alarm.PNG')} alt="alarm" />
                            </span>
                        </Link>
                    </li>
                    <li className="login-dropdown">
                        <span className="user-li login">
                            <img src={require('../../images/mainpage/user_default.png')} alt="user_img"/>
                            <span>{userId}</span>
                        </span>
                        <div className="dropdown-content" id="myDropdown">
                            <Link to="/profile">프로필</Link>
                            <hr />
                            <Link to="/orderlist">후원현황</Link>
                            <Link to="/interestlist">관심 프로젝트</Link>
                            <Link to="/follow">팔로우</Link>
                            <hr />
                            <Link to="/jsp/profile/alarmresult.jsp">알림</Link>
                            <Link to="/jsp/profile/messageresult.jsp">메시지</Link>
                            <hr />
                            <Link to="/jsp/profile/createdresult.jsp">내가 만든 프로젝트</Link>
                            <Link to='/profile/profileset'>설정</Link>
                            <hr />
                            <Link to="/logout">로그아웃</Link>
                        </div>
                    </li>
                    </>
                    }
                </ul>
            </nav>

            
        </div>
    )
}