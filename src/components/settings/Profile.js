import { useState, useRef } from "react";

// Profile 컴포넌트 내부에 선택적으로 들어갈 태그
function InnerTag({ status, data, name }) {
  const inputRef = useRef(data);

  console.log(data);

  //Json데이터 key 세팅
  const userNo = 1;
  let keyOfInputValue = "";
  switch (name) {
    case "프로필 사진":
      keyOfInputValue = "userImage";
      break;
    case "이름":
      keyOfInputValue = "userName";
      break;
    case "소개":
      keyOfInputValue = "userIntroduction";
      break;
    case "이메일":
      keyOfInputValue = "userId";
      break;
    case "연락처":
      keyOfInputValue = "userPhone";
      break;
    case "비밀번호":
      keyOfInputValue = "userPwd";
      break;
  }

  //Update 요청 핸들러
  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    console.log(inputValue);
    fetch("/profile/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [keyOfInputValue]: inputValue,
        userNo: userNo,
      }),
    });
    window.location.replace("/profile/accountset");
  }

  //Prpfile컴포넌트에 들어갈 html 선택
  if (status === "변경") {
    if (name === "프로필 사진") {
      return <img src={require(`../../${data}`)} alt={data} />;
    }
    return <div>{data}</div>;
  } else if (name === "프로필 사진") {
    return (
      <form>
        <input type="text" ref={inputRef} />
        <button onClick={handleSubmit}>저장</button>
      </form>
    );
  } else {
    return (
      <form>
        <input type="text" ref={inputRef} />
        <button onClick={handleSubmit}>저장</button>
      </form>
    );
  }
}

// AccountSet에서 반복적으로 사용되는 컴포넌트
export default function Profile({ name, data }) {
  const [updateBtn, setUpdateBtn] = useState("변경");

  // 변경/취소 버튼을 눌렀을 때 동작
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
      <p className="settings_subtitle">{name}</p>
      <InnerTag status={updateBtn} data={data} name={name} />
      <button className="update-button" onClick={handleUpdateBtn}>
        {updateBtn}
      </button>
      <hr />
    </div>
  );
}
