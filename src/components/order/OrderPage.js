import styles from './OrderPage.module.css';
import item from '../../api/mock/orderMock.json'
import Reward from './reward/Reward';
import OrderProject from './orderProject/OrderProject';
import UserInfo from './userInfo/UserInfo';
import Loading from '../Loading';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderModal from './orderModal/OrderModal';
import styled from 'styled-components';


export default function OrderPage(){

    return(
        <>
        <div className="orderRap">
            <OrderProject project={item.project}/>
            <div className={styles.itemLeftRight}>
                <div className={styles.Left}>
                    <Reward item={item}/>
                    <UserInfo userInfo={item.userInfo}/>
                </div>
                <div className={styles.Right}>
                    <OrderButton />
                </div>
            </div>
        </div>
        </>
    );
}



function OrderButton(){
    const [lodingFinish , setLodingFinish] = useState(true)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [orderModalOn ,setorderModalOn] =useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [finishModdalVisible, setFinishModdalVisible] = useState(false)
    const [buyStart, setBuyStart] = useState(false)
    const navigate = useNavigate();

    const closeModal = () => {
         setModalVisible(false) 
         setLodingFinish(true);
        setButtonDisable(false);
        }

    const buy = () =>{
        setBuyStart(true);
        setModalVisible(false);
        setTimeout(() => {
            setFinishModdalVisible(true);
            }, 1000);
    }
        //setTimeout(() => { navigate('/orderlist')}, 1000);

    function handleClick(e) {

        e.preventDefault();
        setLodingFinish(false);
        setButtonDisable(true);
        setorderModalOn(true);
        setTimeout(() => { setModalVisible(true) }, 500);
        


    }


    return(
        <>
				<div className={styles.itemRight}>
				<form>
                <button className={styles.paymentButton} disabled={buttonDisable} onClick={handleClick}> 
                    {lodingFinish ?  '후원하기!': <Loading/>}
                </button>
				</form>
				</div>
                

      {
        modalVisible && <OrderModal
          visible={modalVisible}
          closable={true}
          maskClosable={false}
          onClose={closeModal}>
              후원 할까요? 
            <ModalPrice> 최종 금액 :{item.rewardPrice}원 </ModalPrice>
              <ButtomWrapper>
                <CancleButton onClick={closeModal}>취소</CancleButton>
                <BuyButton onClick={buy} disabled={buyStart}> {buyStart ?  <Loading/> : '네'}</BuyButton>
              </ButtomWrapper>
          </OrderModal>
      }

    {
        finishModdalVisible && <OrderModal
        visible={finishModdalVisible}
        closable={false}
        maskClosable={false}
        >
            감사합니다 :)
            <ButtomWrapper>
            <Link to='/'><CancleButton>홈으로</CancleButton> </Link>
            <Link to='/orderlist'><BuyButton>후원 현황</BuyButton> </Link>
            </ButtomWrapper>
        </OrderModal>
      }
        </>
    );
}

//styled css

const ButtomWrapper= styled.div`
    display: flex;
    margin-top: 20px;

`

const BuyButton= styled.button`
    font-size: 28px;
    margin-top: 30px;
    min-width: 100px;
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
    font-size: 28px;
    margin-top: 30px;
    min-width: 100px;
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

const ModalPrice= styled.div`
    font-size: 18px;
    margin-bottom: 10px;
    color:gray;
`