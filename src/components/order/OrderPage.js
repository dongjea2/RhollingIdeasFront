import styled from 'styled-components';
import Reward from './reward/Reward';
import OrderProject from './orderProject/OrderProject';
import UserInfo from './userInfo/UserInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserAddress from './userInfo/UserAddress';
import UserCard from './userInfo/UserCard';
import SimpleModal from '../modal/SimpleModal'
import { Link } from 'react-router-dom';
import Loading from '../Loading';

import {  getAddress } from "../settings/address/ShowAddress";
import { getCards } from "../settings/payment/ShowPayment";

export default function OrderPage(){
    const [cards, setCards] = useState([]);
    const [addrs, setAddrs] = useState([]);
    const [item ,setItem] =useState('');
    const { rewardNo } = useParams();

    useEffect(() => {
            //1.
            axios.get('/reward/'+rewardNo)
            .then(res => setItem(res.data))
            .catch(err => console.log(err));
            //2.
            const addrs = getAddress({ userNo: window.sessionStorage.getItem("userNo") });
            addrs.then((res) => { setAddrs(res)});
            //3.
            const cards = getCards({ userNo: window.sessionStorage.getItem("userNo") });
            cards.then((res) => { setCards(res)});
    },[]);

    return(
    <div className="orderRap">
        <OrderProject project={item && item.project} />
        <Both>
            <Left>
                <Reward item={item}/>
                <UserInfo project={item && item.project}/>
                <UserAddress/>
                <UserCard/>
            </Left>
            <Right>
                <OrderButton reward={item} card={cards[0]} address={addrs[0]}/>
            </Right>
        </Both>
    </div>
    );
}



//===================================
//functions


//1.  [OrderButton]
function OrderButton({reward, card, address}){
    const [lodingFinish , setLodingFinish] = useState(true)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [orderModalOn ,setorderModalOn] =useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [finishModdalVisible, setFinishModdalVisible] = useState(false)
    const [buyStart, setBuyStart] = useState(false)
    console.log(card);
    console.log(address);

    //결제 요청[Post]
    const orderRequset = () => {
        setBuyStart(true);
        setModalVisible(false);

        let heder= { headers: {"Content-Type": `application/json`} }
        let data= {  
            "extraPrice" : reward.rewardPrice,
            "totalPrice" : reward.rewardPrice,
            "project" : { "projectNo" : reward.project.projectNo},
            "reward" : { "rewardNo" : reward.rewardNo},
            "orderUser" : { "userNo" : window.sessionStorage.getItem("userNo")},
            "address" : address,
            "card" : card
        }

        //a.
        axios.post('/order',JSON.stringify(data), heder)
        .then(res=> setTimeout(() => { setFinishModdalVisible(true); }, 1000))
        .catch(err => alert("결제 실패!"));
    }

    const closeModal = () => {
        setModalVisible(false) 
        setLodingFinish(true);
        setButtonDisable(false); }

    const supportBtnCliked= () => {
        setLodingFinish(false);
        setButtonDisable(true);
        setorderModalOn(true);
        setTimeout(() => { setModalVisible(true) }, 500);
    }

    return(
        <>
                    <SupportButton
                            disabled={buttonDisable} 
                            onClick={supportBtnCliked}> 
                        {lodingFinish ?  '후원하기!': <Loading/>}
                    </SupportButton>




        {/*[///////////Modal/////////////]*/}
        {/*1.결제 모달*/}
        {
            modalVisible && 
            <SimpleModal visible={modalVisible} closable={true} maskClosable={false} onClose={closeModal}>
                후원 할까요? 
                <ModalPrice> 최종 금액 :{reward.rewardPrice}원 </ModalPrice>
                <ButtomWrapper>
                    <CancleButton onClick={closeModal}>취소</CancleButton>
                    
                    <BuyButton onClick={orderRequset} disabled={buyStart}> {buyStart ?  <Loading/> : '네'}</BuyButton>

                </ButtomWrapper>
            </SimpleModal>
        }

        {/*2.결과 모달*/}
        {
            finishModdalVisible && 
            <SimpleModal visible={finishModdalVisible} closable={false} maskClosable={false} >
                후원 완료!
                <ButtomWrapper>
                <Link to='/'><CancleButton>홈으로</CancleButton> </Link>
                <Link to='/orderlist'><BuyButton>후원 현황</BuyButton> </Link>
                </ButtomWrapper>
            </SimpleModal>
        }
        </>
    );


}

//===============================
//styled css

//1.OrderPage

const Left = styled.div`
    width: 500px;
    padding-right: 300px;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`

const Both = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
    border-top: 1px solid grey;
`


//2.OrderButton

const ButtomWrapper= styled.div`
    display: flex;
    margin-top: 20px;

`

const BuyButton= styled.button`
    font-size: 23px;
    margin-top: 30px;
    min-width: 120px;
    width: auto;
    height: 50px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 4px;
    margin: 0px;
    border: 0px;
    margin-left:20px;
    outline: none;
    font-weight: normal;
    box-sizing: border-box;
    background-color: rgb(255, 87, 87);
    color: rgb(255, 255, 255);

  &:hover {
    background-color: rgb(245, 77, 67);
    color: black;
`

const CancleButton= styled.button`
    font-size: 23px;
    margin-top: 30px;
    min-width: 120px;
    width: auto;
    height: 50px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 4px;
    margin: 0px;
    border: 0px;
    margin-left:20px;
    outline: none;
    font-weight: normal;
    box-sizing: border-box;
    background-color: gray;
    color: rgb(255, 255, 255);
      &:hover {
    color: black;

`

const  SupportButton= styled.button`
    font-size: 30px;
    margin-top: 30px;
    width: 300px;
    height: 130px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 4px;
    margin-top: 10px;
    transition-duration: 0.15s;
    border: 0px;
    outline: none;
    font-weight: normal;
    box-sizing: border-box;
    background-color: rgb(255, 87, 87);
    color: rgb(255, 255, 255);
    &:hover {
    background-color: gray;
    }

`

const ModalPrice= styled.div`
    font-size: 18px;
    margin-bottom: 10px;
    color:gray;
`
