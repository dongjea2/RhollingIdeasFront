import rholling from "../../images/mainpage/rholling.PNG";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useRef, useState } from "react";

export default function Signup() {
  const [pwdCheck, setPwdCheck] = useState("");

  const nameRef = useRef(null);
  const idRef = useRef(null);
  const pwdRef = useRef(null);
  const pwd2Ref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = nameRef.current.value;
    let id = idRef.current.value;
    let pwd = pwdRef.current.value;
    let pwd2 = pwd2Ref.current.value;

    if (pwd !== pwd2) {
      setPwdCheck("비밀번호가 일치하지 않습니다");
    } else {
      setPwdCheck("");
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          userId: id,
          userPwd: pwd,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 0) {
            alert("이미 존재하는 이메일(ID)입니다");
          } else {
            window.location.replace("/login");
          }
        });
    }
  };

  return (
    <div className="signup-page">
      {/* 상단 로고(클릭시 메인페이지 이동) */}
      <div className="logo">
        <a href="/">
          <img src={rholling} />
        </a>
      </div>

      {/* 회원가입 inputbox */}
      <div className="signup_box">
        <form className="signup_box2">
          <h3>가입하기</h3>
          이름
          <br />
          <input
            type="text"
            ref={nameRef}
            placeholder="사용하실 이름을 입력해주세요"
            required
          />
          이메일(ID)
          <br />
          <input
            type="email"
            ref={idRef}
            placeholder="이메일 주소를 입력해주세요"
            required
          />
          비밀번호
          <br />
          <input
            type="password"
            ref={pwdRef}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <input
            type="password"
            ref={pwd2Ref}
            placeholder="비밀번호를 확인합니다"
            required
          />
          <div className="signup-check">{pwdCheck}</div>
          <button id="signup_button" onClick={handleSubmit}>
            가입하기
          </button>
        </form>
        <hr />

        {/* 로그인 페이지로 이동 */}
        <div className="signup-footer">
          이미 Rholling Ideas 계정이 있으신가요?
          <br />
          <Link to="/login" className="signup-footer-login">
            기존 계정으로 로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
