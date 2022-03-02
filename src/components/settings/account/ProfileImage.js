import { useState, useRef } from "react";

function ChangeProfileImage({ status, data }) {
  const inputRef = useRef(data);
  const userNo = window.sessionStorage.getItem("userNo");

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    //빈문자열 update 방지

    //파일올리기... 다 수정 필요
    fetch("/profile/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userImage: inputValue,
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
    return (
      <div>
        <img
          src={require(`../../../${data}`)}
          alt={data}
          className="profile-image-container"
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>파일 올리기 미구현</h1>
        <div>어렵네요ㅜㅜ</div>
      </div>
    );
  }
}

export default function ProfileImage({ data }) {
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
      <p className="settings_subtitle">프로필 사진</p>
      <ChangeProfileImage status={updateBtn} data={data} />
      <button className="update-button" onClick={handleUpdateBtn}>
        {updateBtn}
      </button>
      <hr />
    </div>
  );
}
