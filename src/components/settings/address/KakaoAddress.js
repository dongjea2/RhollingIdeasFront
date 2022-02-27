import DaumPostcode from "react-daum-postcode";
import { createPortal } from "react-dom";
import { useState } from "react";

//카카오주소api 띄우는 창
function PopupDom({ children }) {
  const childrenElement = document.getElementById("popup-dom");
  return createPortal(children, childrenElement);
}

//--------------------------------------------------------------------------------------

//카카오주소api로 검색
function PopupPostSearch() {
  function handlePostSearch(data) {
    let address = data.address; //주소검색 내부에서 '주소'
    let addressDetailed = ""; //주소검색 내부에서 '상세주소'

    if (data.addressType === "R") {
      //R은 도로명주소타입
      // if (data.bname !== "") {
      //   addressDetailed += data.bname;
      // }
      if (data.buildingName !== "") {
        addressDetailed += " " + data.buildingName; //빌딩명이 있으면 상세주소에 추가
      }
      address += addressDetailed; //주소에 상세주소 추가
    }
    console.log(data);
    console.log(address); //주소
    console.log(data.zonecode); //우편번호
    //props.onClose();
  }

  return <DaumPostcode onComplete={handlePostSearch} />;
}

//--------------------------------------------------------------------------------------

//우편번호 검색 Click시 보여줄 화면
export default function AddressPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState();

  function openPostSearch() {
    setIsPopupOpen(true);
  }

  function closePostSearch() {
    setIsPopupOpen(false);
  }

  return (
    <div>
      <button onClick={openPostSearch}>우편번호 검색</button>
      <div id="popup-dom">
        {isPopupOpen && (
          <PopupDom>
            <PopupPostSearch onClose={closePostSearch} />
          </PopupDom>
        )}
      </div>
    </div>
  );
}
