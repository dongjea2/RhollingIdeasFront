import styles from './OrderPage.module.css';
import Reward from './reward/Reward';
import OrderProject from './orderProject/OrderProject';
import UserInfo from './userInfo/UserInfo';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OrderModal from './orderModal/OrderModal';
import styled from 'styled-components';
import axios from 'axios';


export default function OrderPage(){
    const [item ,setItem] =useState('');
    const { rewardNo } = useParams();



    useEffect(() => {
            axios.get('/reward/'+rewardNo)
            .then(res => setItem(res.data))
            .catch(err => console.log(err));
    },[]);



    const project = {
        projectNo:1,
        projectName:"2"
    }
    console.log(item.project);
    console.log(project);



    return(
        <>
        { item && item.project.maker.userName}
        <div className="orderRap">
            <OrderProject project={item && item.project} />
            <div className={styles.itemLeftRight}>
                <div className={styles.Left}>
                    <Reward item={item}/>
                    <UserInfo project={item && item.project}/>
                </div>
                <div className={styles.Right}>
                    <OrderButton item={item}/>
                </div>
            </div>
        </div>
        </>
    );
}



function OrderButton({item}){
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

        console.log(item.project.projectNo)
        //request for buying
        fetch('/order', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                extraPrice : item.rewardPrice,
            	totalPrice : item.rewardPrice,
                project : { projectNo : item.project.projectNo},
                reward : { rewardNo : item.rewardNo},

                //유저 번호 직접 읽어올것
                orderUser : { userNo : 1  },
                //주소랑 카드 (1이면 안됨 ) 수정
                address : { addressNo : 1},
                card : { cardNo : 1}
            })
        })
        .then(data => data.JSON())
        
        //setTimeout(() => { setFinishModdalVisible(true); }, 1000);
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
            후원 완료!
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