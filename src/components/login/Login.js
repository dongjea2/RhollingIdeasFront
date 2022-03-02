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
        console.log(res);
        if (res.status === 1) {
          console.log("로그인 성공");
          console.log(res);
          window.sessionStorage.setItem("loginedId", res.loginedId);
          window.sessionStorage.setItem("userNo", res.userNo);
          window.sessionStorage.setItem("userUrl", res.userUrl);
          window.sessionStorage.setItem("userName", res.userName);
          window.location.replace("/");
        } else if (res.status === 2) {
          alert(res.msg);
        } else {
          alert(res.msg);
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
          <br />
          <form className="email_login">
            <input
              type="text"
              ref={idRef}
              placeholder="이메일(ID) 입력"
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
          <br />
          <div className="login_text">
            아직 Rholling Ideas 계정이 없으신가요?
            <Link to={"/signup"} className="login-signup">
              가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
