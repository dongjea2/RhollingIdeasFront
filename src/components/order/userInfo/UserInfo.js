import styled from "styled-components";

export default function UserInfo({project}){
    return(
        <>
        <Title>
            <h3>후원자 정보</h3>
        </Title>
        <Box>
            <Item> 연락처 : {project&& project.maker.userPhone} </Item>
            <Item> 이메일 : {project&& project.maker.userId} </Item>
        </Box>
</>
    );
}



//=====================================
//Styled Componets
const Title = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`

const Box= styled.div`
    border: 1px solid darkgrey;
    border-radius: 4px;
    width: 730px;
    margin-top: 5px;
}
`
const Item= styled.div`
    margin-left: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
`