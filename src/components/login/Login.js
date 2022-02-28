import rholling from "../../images/mainpage/rholling.PNG";
import { Link } from "react-router-dom";
import "./Login.css";
import { useRef } from "react";

export default function Login() {
  let loginedId = window.localStorage.getItem("userId");
  console.log(loginedId);

  const idRef = useRef(null);
  const pwdRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: idRef.current.value,
        userPwd: pwdRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 1) {
          console.log("로그인 성공");
          console.log(res);
          window.sessionStorage.setItem("loginedId", res.loginedId);
          window.sessionStorage.setItem("userNo", res.userNo);
          window.sessionStorage.setItem("userUrl", res.userUrl);
          window.sessionStorage.setItem("userName", res.userName);
          window.location.replace("/");
        } else {
          alert("로그인 실패");
        }
      });
  }

  return (
    <div className="login-page">
      {/* 상단 로고(클릭시 메인페이지 이동) */}
      <div className="logo">
        <a href="/">
          <img src={rholling} />
        </a>
      </div>
      {/* 로그인 */}
      <div className="login_box">
        <div className="login_box2">
          <h3>로그인</h3>
          <div className="sns_login">
            <button>페이스북 아이디로 로그인</button>
            <button>네이버 아이디로 로그인</button>
            <button>카카오톡 아이디로 로그인</button>
          </div>
          <hr />
          <form className="email_login">
            <input
              type="text"
              ref={idRef}
              placeholder="이메일 주소 입력"
              required
            />
            <input
              type="password"
              ref={pwdRef}
              placeholder="비밀번호 입력"
              required
            />
            <button onClick={handleSubmit}>로그인</button>
          </form>
          <div className="login_text">
            아직 Rholling ideas 계정이 없으신가요?
            <Link to={"/signup"}>가입하기</Link>
          </div>
          <hr />
          <div className="login_text">
            <Link to={""}>혹시 비밀번호를 잊으셨나요?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
