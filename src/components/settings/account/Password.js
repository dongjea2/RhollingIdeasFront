import { useState, useRef } from "react";

function ChangePassword({ status }) {
  const [isEqual, setIsEqual] = useState("");
  const originalPwdRef = useRef();
  const updatePwdRef = useRef();
  const updatePwdRef2 = useRef();
  const userNo = window.sessionStorage.getItem("userNo");

  function handleSubmit(e) {
    e.preventDefault();
    const originalValue = originalPwdRef.current.value;
    const inputValue = updatePwdRef.current.value;

    console.log(originalValue);
    console.log(inputValue);

    if (updatePwdRef.current.value !== updatePwdRef2.current.value) {
      setIsEqual("변경할 비밀번호가 일치하지 않습니다");
    } else {
      setIsEqual("");
      //빈문자열 update 방지
      if (inputValue.trim() !== "") {
        fetch("/profile/account", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userPwd: originalValue,
            updatePwd: inputValue,
            userNo: userNo,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.status === 0) {
              alert("기존 비밀번호 불일치");
            } else if (res.status === 1) {
              window.location.replace("/profile/accountset");
            }
          });
      } else {
        alert("필수정보입니다 \n빈 값을 저장할 수 없습니다");
      }
    }
  }

  if (status === "변경") {
    return <div></div>;
  } else {
    return (
      <form>
        <input
          type="password"
          ref={originalPwdRef}
          placeholder="기존 비밀번호"
        />
        <input
          type="password"
          ref={updatePwdRef}
          placeholder="변경할 비밀번호"
        />
        <input
          type="password"
          ref={updatePwdRef2}
          placeholder="변경할 비밀번호 확인"
        />
        <div style={{ color: "red" }}>{isEqual}</div>
        <button onClick={handleSubmit}>저장</button>
      </form>
    );
  }
}

export default function Password() {
  const [updateBtn, setUpdateBtn] = useState("변경");

  function handleUpdateBtn(e) {
    e.preventDefault();
    if (updateBtn === "변경") {
      setUpdateBtn("취소");
    } else {
      setUpdateBtn("변경");
    }
  }

  return (
    <div>
      <p className="settings_subtitle">비밀번호</p>
      <ChangePassword status={updateBtn} />
      <button className="update-button" onClick={handleUpdateBtn}>
        {updateBtn}
      </button>
      <hr />
    </div>
  );
}
