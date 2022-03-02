import { useEffect, useState } from "react";

function ChangeUserName({ status, data }) {
  const userNo = window.sessionStorage.getItem("userNo");
  const [input, setInput] = useState("");

  function onChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    //빈문자열 update 방지
    if (input.trim() !== "") {
      fetch("/profile/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: input,
          userNo: userNo,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 0) {
            alert("이미 존재하는 아이디입니다"); //아이디만 해당
          }
        });
      window.location.replace("/profile/accountset");
    } else {
      alert("필수정보입니다 \n빈 값을 저장할 수 없습니다"); //소개제외
    }
  }

  if (status === "변경") {
    //이미지는 별도
    return <div>{data}</div>;
  } else {
    return (
      <form>
        <input type="text" value={input} onChange={onChange} />
        <button onClick={handleSubmit}>저장</button>
      </form>
    );
  }
}

export default function UserName({ data }) {
  //수정필요
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
      <p className="settings_subtitle">이름</p>
      <ChangeUserName status={updateBtn} data={data} />
      <button className="update-button" onClick={handleUpdateBtn}>
        {updateBtn}
      </button>
      <hr />
    </div>
  );
}
