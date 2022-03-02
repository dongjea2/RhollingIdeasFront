import { useState, useRef } from "react";

//조회된 주소 틀
function Address({ addr }) {
  const userNo = window.sessionStorage.getItem("userNo");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateBtn, setUpdateBtn] = useState("수정");

  const nameRef = useRef();
  const addrNoRef = useRef();
  const addrRef = useRef();
  const addrDetailRef = useRef();
  const phoneRef = useRef();

  function clickUpdate(e) {
    e.preventDefault();
    if (isUpdate === false) {
      setIsUpdate(true);
      setUpdateBtn("닫기");
    } else {
      setIsUpdate(false);
      setUpdateBtn("수정");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/profile/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userNo: userNo,
        },
        addressNo: addr.addressNo,
        receiverName: nameRef.current.value,
        receiverZipcode: addrNoRef.current.value,
        receiverAddress: addrRef.current.value,
        receiverAddressDetailed: addrDetailRef.current.value,
        receiverPhone: phoneRef.current.value,
        defaultAddress: addr.isDefault,
      }),
    });
    window.location.replace("/profile/addressset");
  }

  function handleDelete(e) {
    e.preventDefault();
    fetch("/profile/address", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addressNo: addr.addressNo,
      }),
    });
    window.location.replace("/profile/addressset");
  }

  return (
    <div className="address">
      {isUpdate ? (
        <form>
          <input placeholder="이름" ref={nameRef} className="card-input" />
          <input
            placeholder="우편번호"
            ref={addrNoRef}
            className="card-input"
          />
          <input placeholder="주소" ref={addrRef} className="card-input" />
          <input
            placeholder="상세주소"
            ref={addrDetailRef}
            className="card-input"
          />
          <input placeholder="전화번호" ref={phoneRef} className="card-input" />
          <button onClick={handleSubmit} className="add-btn">
            수정
          </button>
        </form>
      ) : (
        <>
          <div>이름: {addr.name}</div>
          <div>우편번호: {addr.zipcode}</div>
          <div>주소: {addr.address}</div>
          <div>상세주소: {addr.addressDetail}</div>
          <div>전화번호: {addr.phone}</div>
          {addr.isDefault === "1" && (
            <div className="default-data">기본배송지</div>
          )}
        </>
      )}
      <div className="card-buttons-container">
        <button className="card-button">기본결제수단 등록</button>
        <button className="card-button" onClick={clickUpdate}>
          {updateBtn}
        </button>
        <button className="card-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

//--------------------------------------------------------------------------------------

//배열로 받아온 주소 반복 렌더링
export function AddressList({ addrs }) {
  //AddressSet의 prop - addrs, useEffect 조회에 사용
  return (
    <ul className="cardList">
      {addrs.map((addr) => (
        <li key={addr.addressNo}>
          <Address addr={addr} />
        </li>
      ))}
    </ul>
  );
}

//--------------------------------------------------------------------------------------

//주소 조회
export async function getAddress(requestBody) {
  //requestBody로 userNo 전송
  const resAddress = await fetch("/profile/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const resBody = await resAddress.json();
  return resBody;
}
