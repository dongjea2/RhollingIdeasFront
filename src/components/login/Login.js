import  rholling  from '../../images/mainpage/rholling.PNG';
import { Link } from 'react-router-dom';
import './Login.css';
import { useRef } from 'react';

export default function Login() {

    let userId = 'id1';
    const fakeSubmit = (e)=>{
        e.preventDefault();
        window.localStorage.setItem('userId', userId);
    }

    function fakeLogout() {
        window.localStorage.removeItem('userId');
    }

    let loginedId = window.localStorage.getItem('userId');
    console.log(loginedId);


    const idRef = useRef(null);
    const pwdRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        let id = idRef.current.value;
        let pwd = pwdRef.current.value;
        console.log(id + " " + pwd);

        fetch('/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                userId : id,
                userPwd : pwd
            })
        })
        .then(data => data.json())
    }

    return (
    <div className='login-page'>
        {/* 상단 로고(클릭시 메인페이지 이동) */}
        <div className="logo">
        <Link to="/">
            <img src={rholling}/>
        </Link>
        </div>
        <button onClick={fakeSubmit}>가짜 로그인 버튼</button>
        <button onClick={fakeLogout}>가짜 로그아웃 버튼</button>
        {/* 로그인 */}
        <div className="login_box">
            <div className="login_box2">
                <h3>로그인</h3>
                <div className="sns_login">
                        <button>페이스북 아이디로 로그인</button>
                        <button>네이버 아이디로 로그인</button>
                        <button>카카오톡 아이디로 로그인</button>

                </div>
                <hr/>
                <form className= "email_login">
                    <input type="text" ref={idRef} placeholder="이메일 주소 입력" required/>
                    <input type="password" ref={pwdRef} placeholder="비밀번호 입력" required/>
                    <button onClick={handleSubmit}>로그인</button>
                </form>
                <div className="login_text">
                    아직 Rholling ideas 계정이 없으신가요?  
                    <Link to={'/signup'}>가입하기</Link>
                </div>
                <hr/>
                <div className="login_text">
                    <Link to={''}>혹시 비밀번호를 잊으셨나요?</Link>
                </div>
            </div>
        </div>
    </div>
    )
}