import { useState, useEffect } from "react";
import {  getAddress } from "../../settings/address/ShowAddress";
import styled from "styled-components";


export default function UserAddress() {
  const [addrs, setAddrs] = useState([]);

  useEffect(() => {
    const addrs = getAddress({ userNo: window.sessionStorage.getItem("userNo") });
    addrs.then((res) => { setAddrs(res)});
  }, []);

  return (
    <>
          <h3>등록된 배송지</h3>
          <Box>
            <OrderAddressList addrs={addrs} />
          </Box>
    </>
  );
}

//============================================
//funcions

function OrderAddressList({ addrs }) {
  //AddressSet의 prop - addrs, useEffect 조회에 사용
  return (
    <ul>
      {addrs.map((addr) => (
        <li key={addr.addressNo}>
          <OrderAddress addr={addr} />
        </li>
      ))}
    </ul>
  );
}

function OrderAddress({ addr }) {
  return (
    <Address>
      {addr.isDefault ==="1" ?<Default>선택</Default>:""  }
      <div>이름: {addr.name}</div>
      <div>우편번호: {addr.zipcode}</div>
      <div>주소: {addr.address}</div>
      <div>상세주소: {addr.addressDetail}</div>
      <div>전화번호: {addr.phone}</div>
    </Address>
  );
}


//=====================================
//Styled Componets
const Box = styled.div`
    width: 730px;
    max-width: 1100px;
`

const Default = styled.div`
  position: absolute;
  background-color: rgb(255, 87, 87);
  width: 50px;
  height: 30px;
  margin-left: 678px;
  margin-bottom: 100px;
  color: aliceblue;
  text-align: center;
  font-size: 16px;
`
const Address = styled.div`
    border: 1px solid darkgrey;
    border-radius: 4px;
    margin-top: 10px;
`