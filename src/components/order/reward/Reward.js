import styled from "styled-components";


export default function Reward({item}){

    const { rewardNo, rewardPrice, rewardName, deliverDate, rewardNum,
        itemName, deliverSelect, project, makerInfo} = item;

    

    return(
        <>
        <Title> <h3>선물정보</h3> </Title>
        <Box>
            <Item>선물구성 : {rewardName} {itemName} </Item>
            <Item>선물금액 : {Number(rewardPrice).toLocaleString("ko-KR")}원</Item>
            <Item>예상 전달일 : {deliverDate}</Item>
        </Box>
        </>
    );
}


const Title = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`
const Box= styled.div`
    border: 1px solid darkgrey;
    border-radius: 4px;
    width: 730px;
    margin-top: 5px;

`
const Item= styled.div`
    margin-left: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
`