import { useState } from "react";

function ChangeWithdrawal({ status }) {
  const userNo = window.sessionStorage.getItem("userNo");

  function handleWithdrawal() {
    fetch("/profile/withdrawal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userNo: userNo,
      }),
    });
    fetch("/logout");
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("userNo");
    window.sessionStorage.removeItem("userUrl");
    window.sessionStorage.removeItem("userName");
    window.location.replace("/");
  }

  if (status === "탈퇴") {
    return <div></div>;
  } else {
    return (
      <div>
        <div>정말로 탈퇴하시겠습니까?</div>
        <div>삭제된 계정은 복구할 수 없습니다</div>
        <button onClick={handleWithdrawal} className="withdrawal">
          탈퇴
        </button>
      </div>
    );
  }
}

export default function Withdrawal() {
  const [updateBtn, setUpdateBtn] = useState("탈퇴");

  function handleUpdateBtn(e) {
    e.preventDefault();
    if (updateBtn === "탈퇴") {
      setUpdateBtn("취소");
    } else {
      setUpdateBtn("탈퇴");
    }
  }

  return (
    <div>
      <p className="settings_subtitle">회원탈퇴</p>
      <ChangeWithdrawal status={updateBtn} />
      <button className="update-button" onClick={handleUpdateBtn}>
        {updateBtn}
      </button>
      <hr />
    </div>
  );
}
