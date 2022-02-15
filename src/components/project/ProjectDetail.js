import {useParams} from "react-router-dom";

export default function ProjectDetail() {

    const { prodNo } = useParams();
    console.log({prodNo});

  return (
      <>
        <h1>프로젝트 {prodNo}의 상세 페이지</h1>
      </>

  );
}