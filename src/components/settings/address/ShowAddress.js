//조회된 주소 틀
function Address({ addr }) {
  //AddressList의 prop - addr, List의 일부분
  return (
    <div className="address">
      <div>이름: {addr.name}</div>
      <div>우편번호: {addr.zipcode}</div>
      <div>주소: {addr.address}</div>
      <div>상세주소: {addr.addressDetail}</div>
      <div>전화번호: {addr.phone}</div>
    </div>
  );
}

//--------------------------------------------------------------------------------------

//배열로 받아온 주소 반복 렌더링
export function AddressList({ addrs }) {
  //AddressSet의 prop - addrs, useEffect 조회에 사용
  return (
    <ul>
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
