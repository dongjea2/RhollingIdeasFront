import axios from "axios";
import { data } from "browserslist";
import React,{Component, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import SimpleModal from "../modal/SimpleModal";
import './ProjectWrite.css';


export default function ProjectWrite(){
    const [category, setCategory]= useState([]);


    const usernoRef = useRef(null);
    const categoryRef = useRef(null);
    const longtitleRef = useRef(null);
    const projectbriefRef = useRef(null);
    const editorpickRef = useRef(null);
    const projectimageRef = useRef(null);
    const targetpriceRef = useRef(null);
    const startdateRef = useRef(null);
    const enddateRef = useRef(null);
    const shorttitleRef = useRef(null);
    const projectcontentRef = useRef(null);
    const projecturlRef = useRef(null);

    const rewardPriceRef = useRef(null);
	const rewardNameRef = useRef(null);
	const deliverDateRef = useRef(null);
	const rewardNumRef = useRef(null);
	const itemNameRef = useRef(null);
	const deliverSelectRef = useRef(null);


    const [reward, setReward] = useState({
        rewardPrice: '',
        rewardName: '',
        deliverDate: '',
        rewardNum: '',
        itemName: '',
    });

    
    
    const onChangeReward = (e) =>{
        setModalVisible(false);
        e.preventDefault();

        setReward({
            rewardPrice: rewardPriceRef.current.value,
            rewardName: rewardNameRef.current.value,
            deliverDate: deliverDateRef.current.value,
            rewardNum: rewardNumRef.current.value,
            itemName: itemNameRef.current.value
        });
        }
        
    

    //모달 visible
    const [modalVisible, setModalVisible] = useState(false);    

    const openModal = (e)=>{
        e.preventDefault();
        setModalVisible(true);
    };

    const closeModal = (e)=>{
        e.preventDefault();
        setModalVisible(false);
    };


    const [info, setInfo] = useState([]);
    const [plag,setPlag] = useState('');
        
      useEffect(() => {
        axios.get("/category")
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
       }, [plag]);

       const [text, setText] = useState('');

       const onChange = (e) =>{
           setText(e.target.value);
       };


       console.log(text);

       
       const onSubmit = async (e) => {
        e.preventDefault();
           let category = text;
           let longtitle = longtitleRef.current.value;
           let projectbrief = projectbriefRef.current.value;
           let editorpick = '0';
           let projectimage = '1';
           let targetprice = targetpriceRef.current.value;
           let startdate = startdateRef.current.value;
           let enddate = enddateRef.current.value;
           let shorttitle = shorttitleRef.current.value;
           let projectcontent = projectcontentRef.current.value;
           let projecturl = projecturlRef.current.value;

            //reward, category, project 다 보내야함
        let postdata = {
                maker : {userNo: 1},
                category: {categoryNo: category},
                longTitle: longtitle,
                projectBrief: projectbrief,
                projectImage: 'files/project_image/8.png',
                targetPrice: targetprice,
                shortTitle: shorttitle,            
                projectContent: projectcontent,
                startDate: startdate,
                endDate: enddate,
                projectUrl: projecturl,
                reward: {rewardName: reward.rewardName},
                reward: {rewardPrice: reward.rewardPrice},
                reward: {deliverDate: reward.deliverDate},
                reward: {rewardNum: reward.rewardNum},
                reward: {itemName: reward.itemName},
        }

     

        axios.post("/projectwrite", postdata , {
          headers: {
            "Content-Type": `application/json`,
          },
        }).then((res) => {
          console.log(res);
          setPlag(plag + 1);
        }).catch(err => console.log(err));

        

        console.log(postdata);
        
      }


    return(
        <form onSubmit={(e) => onSubmit(e)}>
            <H3Con>프로젝트 올리기</H3Con>
            <select className="categoryref" ref={categoryRef} onClick={onChange}>
                {info.map((category)=>
                <option key={category.categoryNo} value={category.categoryNo}>
                    {category.categoryName}  
                </option>
                )}
                </select>
            
            <div className="input">
            <div style={{display:'none'}}>projectNo</div>
            <div style={{display:'none'}}>userNo</div>
            {/* <input type="text"> {text}</input> */}
            <div>{text}</div>
            <BoxContent type="text" ref={longtitleRef} placeholder="프로젝트 제목을 입력해주세요"/>
            <BoxContent type="text" ref={shorttitleRef} placeholder="짧은 제목을 입력해주세요" />
            <BoxContent type="text" ref={projectbriefRef} placeholder="프로젝트 요약 부분을 입력해주세요"/>
            <BoxContent type="number" ref={targetpriceRef} placeholder="목표금액을 입력해주세요"/>
            <BoxContent type="text" ref={projectcontentRef} placeholder="프로젝트 상세 내용을 입력해주세요"/>
            <BoxContent type="text" ref={projecturlRef} placeholder="프로젝트 페이지 주소를 입력해주세요"/>
            <BoxContent type="date" ref={startdateRef}/>
            <BoxContent type="date" ref={enddateRef}/>


            <div>
                <ModalBtn onClick={openModal}>
                    선물 추가부분
                </ModalBtn>                    

                {
                modalVisible && <SimpleModal
                visible={modalVisible}
                closable={true}
                maskClosable={false}
                onClose={closeModal}>
                    <BoxContent type="text" ref={rewardNameRef} placeholder="선물이름"/>
                    <BoxContent type="text" ref={rewardPriceRef} placeholder="선물금액"/>
                    <BoxContent type="text" ref={rewardNumRef} placeholder="선물한정수량"/>
                    <BoxContent type="text" ref={itemNameRef} placeholder="아이템 이름"/>
                    <BoxContent type="number" ref={deliverDateRef} placeholder="예상전달일"/>
                    <ModalBt onClick={onChangeReward}>확인</ModalBt>
                <ModalBtn onClick={closeModal}>취소</ModalBtn>
                </SimpleModal>
                }
            </div>
            <button type="submit">프로젝트 작성</button>
            </div>
        </form >      
        
    );
}
const ModalBt = styled.button`
    font-size: 23px;
    margin-top: 30px;
    min-width: 50px;
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
    background-color: rgb(245, 77, 67);
    color: black;

`


const ModalBtn = styled.button`
    font-size: 23px;
    margin-top: 30px;
    min-width: 50px;
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
const BoxContent = styled.input`
    border: 1px solid darkgrey;
    border-radius: 4px;
    max-width: 530px;
    margin-top: 5px;
    margin-bottom: 15px;
`

const H3Con = styled.h3`
text-align: center;
`