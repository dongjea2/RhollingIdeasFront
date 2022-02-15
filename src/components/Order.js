import {useParams} from "react-router-dom";

export default function Order() {

    const { prodNo , rewardNo} = useParams();
    console.log({prodNo});
    console.log({rewardNo});

  return (
    <>
    
      <h1>결제 페이지 </h1>
      <h2>프로젝트 번호{prodNo}</h2>
      <h2>상품 번호{rewardNo}</h2>
    </>
  );
}