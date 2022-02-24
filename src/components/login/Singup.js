import  rholling  from '../../images/mainpage/rholling.PNG';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useRef, useState } from 'react';

export default function Signup() {

    const [emailCheck, setEmailCheck] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');

    const nameRef = useRef(null);
    const idRef = useRef(null);
    const id2Ref = useRef(null);
    const pwdRef = useRef(null);
    const pwd2Ref = useRef(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let name = nameRef.current.value;
        let id = idRef.current.value;
        let id2 = id2Ref.current.value;
        let pwd = pwdRef.current.value;
        let pwd2 = pwd2Ref.current.value;

        console.log(name + " " + id + " " + pwd);

        if(id !== id2) {
            setEmailCheck('이메일 주소가 일치하지 않습니다');
        } else {
            setEmailCheck('');
        }
        if(pwd !== pwd2) {
            setPwdCheck('비밀번호가 일치하지 않습니다');
        } else {
            setPwdCheck('');
        }

        if(id === id2 && pwd === pwd2){
            fetch('/signup', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    userName : name,
                    userId : id,
                    userPwd : pwd
                })
            })
        }
    }

    return(
        <div className='signup-page'>
            {/* 상단 로고(클릭시 메인페이지 이동) */}
            <div className="logo">
            <a href="/">
                <img src={rholling}/>
            </a>
            </div>

            {/* 회원가입 inputbox */}
            <div className="signup_box">
                <form className="signup_box2">
                    <h3>가입하기</h3>
                    이름<br/>
                    <input type="text" ref={nameRef} placeholder="사용하실 이름을 입력해주세요" required />
                    이메일 주소<br/>
                    <input type="text" ref={idRef} placeholder="이메일 주소를 입력해주세요" required />
                    <input type="text" ref={id2Ref} placeholder="이메일 주소를 확인합니다" required />
                    <div className='signup-check'>{ emailCheck }</div>
                    비밀번호<br/>
                    <input type="password" ref={pwdRef} placeholder="비밀번호를 입력해주세요" required />
                    <input type="password" ref={pwd2Ref} placeholder="비밀번호를 확인합니다" required />
                    <div className='signup-check'>{ pwdCheck }</div>
                    <button id="signup_button" onClick={handleSubmit}>가입하기</button>
                </form>
                <hr/>

                {/* 로그인 페이지로 이동 */}
                <div>
                    이미 Rholling Ideas 계정이 있으신가요?<br/>
                    <Link to="/login">기존 계정으로 로그인하기</Link>
                </div>
            </div>
        </div>
    );
}