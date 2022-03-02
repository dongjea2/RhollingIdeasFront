import styled from "styled-components";

export default function OrderProject({project}){

    return(
		<Box>
			<Img
		  		src={require(`../../../${project && project.projectImage}`)}
				alt={project.longTitle}/> 
				<Info>
					{project && project.category.categoryName}| 
					{project && project.maker.userName}
					<h1>{project.title}</h1>
					<Price>{Number(project && project.projectChange.sumPrice).toLocaleString("ko-KR")}원 모금 됨</Price>
					프로젝트 {project && project.achiveRate}%달성
					<Price>{project.remainingDays>0 ?  project.remainingDays+"일 남음": "프로젝트 종료"}</Price>
				</Info>
		</Box>
    );
}

const Box = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    max-width: 100%;
    width: 100%;
    margin-bottom: 20px;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const Price = styled.div`
	font-size: 20px;
	margin-bottom: 10px;
`

const Img= styled.img`
   width: 240px;
`