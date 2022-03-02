import { useState, useRef } from "react";

//조회된 주소 틀
function Address({ addr }) {
  const userNo = window.sessionStorage.getItem("userNo");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateBtn, setUpdateBtn] = useState("수정");

  const [inputs, setInputs] = useState({
    name: addr.name,
    zipcode: addr.zipcode,
    address: addr.address,
    addrDetail: addr.addressDetail,
    phone: addr.phone,
  });

  const { name, zipcode, address, addrDetail, phone } = inputs;

  function onChange(e) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

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
        receiverName: name,
        receiverZipcode: zipcode,
        receiverAddress: address,
        receiverAddressDetailed: addrDetail,
        receiverPhone: phone,
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

  function handleDefault(e) {
    e.preventDefault();
    fetch("/profile/addressdefault", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addressNo: addr.addressNo,
        user: {
          userNo: userNo,
        },
      }),
    });
    window.location.replace("/profile/addressset");
  }

  return (
    <div className="address">
      {isUpdate ? (
        <form>
          <input
            name="name"
            placeholder="이름"
            className="card-input"
            value={name}
            onChange={onChange}
          />
          <input
            name="zipcode"
            placeholder="우편번호"
            className="card-input"
            value={zipcode}
            onChange={onChange}
          />
          <input
            name="address"
            placeholder="주소"
            className="card-input"
            value={address}
            onChange={onChange}
          />
          <input
            name="addrDetail"
            placeholder="상세주소"
            className="card-input"
            value={addrDetail}
            onChange={onChange}
          />
          <input
            name="phone"
            placeholder="전화번호"
            className="card-input"
            value={phone}
            onChange={onChange}
          />
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
        <button className="card-button" onClick={handleDefault}>
          기본배송지 등록
        </button>
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
