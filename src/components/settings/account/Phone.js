import { useState, useRef } from "react";

function ChangePhone({ status, data }) {
  //여기 수정
  const inputRef = useRef(data);
  const userNo = window.sessionStorage.getItem("userNo");

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    //빈문자열 update 방지

    fetch("/profile/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhone: inputValue,
        userNo: userNo,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    window.location.replace("/profile/accountset");
  }

  if (status === "변경") {
    return <div>{data}</div>;
  } else {
    return (
      <form>
        <input type="text" ref={inputRef} />
        <button onClick={handleSubmit}>저장</button>
      </form>
    );
  }
}

export default function Phone({ data }) {
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
      <p className="settings_subtitle">연락처</p>
      <ChangePhone status={updateBtn} data={data} />
      <button className="update-button" onClick={handleUpdateBtn}>
        {updateBtn}
      </button>
      <hr />
    </div>
  );
}
