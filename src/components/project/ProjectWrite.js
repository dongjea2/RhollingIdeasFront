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


    const [showModal, setShowModal] = useState(false);

    //모달 visible
    const [modalVisible, setModalVisible] = useState(false);    

    const openMadal = ()=>{
        setModalVisible(true);
    };

    const closeMadal = ()=>{
        setModalVisible(false);
    };



    
    const closeModal = () => {
        setModalVisible(false) 
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

           let rewardPrice = rewardPriceRef.current.value;
           let rewardName = rewardNameRef.current.value;
           let deliverDate = deliverDateRef.current.value;
           let rewardNum = rewardNumRef.current.value;
           let itemName = itemNameRef.current.value;

            //reward, category, project 다 보내야함
        let postdata = {
                maker : {userNo: 1},
                category: {categoryNo: category},
                longTitle: longtitle,
                projectBrief: projectbrief,
                // projectImage: projectimage,
                targetPrice: targetprice,
                shortTitle: shorttitle,            
                projectContent: projectcontent,
                startDate: startdate,
                endDate: enddate,
                projectUrl: projecturl,
                reward: {rewardName: rewardName},
                reward: {rewardPrice: rewardPrice},
                reward: {deliverDate: deliverDate},
                reward: {rewardNum: rewardNum},
                reward: {itemName: itemName},
        }

        let formData = new FormData();
        let files = e.target.img.files;
        formData.append("file", files[0]);

        formData.append("data", JSON.stringify(postdata));

        axios.post("/projectwrite", formData , {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
          data: formData
        }).then((res) => {
          console.log(res);
          setPlag(plag + 1);
        }).catch(err => console.log(err));

        

        console.log(postdata);
        
      }


    return(
        <form onSubmit={(e) => onSubmit(e)}>
            <select className="categoryref" ref={categoryRef} onClick={onChange}>
                {/* 카테고리 name으로 선택하는데 프로젝트 작성시 카테고리no로 저장함 */}
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
            <label>프로젝트 제목을 설정하는 부분입니다</label>
            <input type="text" ref={longtitleRef} placeholder="longtitle"/>
            <label>프로젝트 어쩌구를 설정하는 부분입니다</label>
            <input type="text" ref={projectbriefRef} placeholder="projectbrief"/>
            <input type="file" accept="image/*" name="img"/>
            <div>projectimage</div>
            <input type="number" ref={targetpriceRef} placeholder="targetprice"/>
            <input type="text" ref={shorttitleRef} placeholder="shorttitle" />
            <input type="text" ref={projectcontentRef} placeholder="projectcontent"/>
            <input type="text" ref={projecturlRef} placeholder="projecturl"/>
            <input type="date" ref={startdateRef}/>
            <input type="date" ref={enddateRef}/>


            <div>
                <ModalBtn onClick={openMadal}>
                    선물 추가부분
                </ModalBtn>                    

                {
                modalVisible && <SimpleModal
                visible={modalVisible}
                closable={true}
                maskClosable={false}
                onClose={closeModal}>
                    <input type="text" ref={rewardNameRef} placeholder="선물이름"/>
                    <input type="text" ref={rewardPriceRef} placeholder="선물금액"/>
                    <input type="text" ref={rewardNumRef} placeholder="선물한정수량"/>
                    <input type="text" ref={itemNameRef} placeholder="아이템 이름"/>
                    <input type="number" ref={deliverSelectRef} placeholder="예상전달일"/>
                    <button >확인</button>
                <ModalBtn onClick={closeMadal}>취소</ModalBtn>
                </SimpleModal>
                }
            </div>
            <button type="submit">프로젝트 작성</button>
            </div>
        </form >      
        
    );
}


const ModalBtn = styled.button`
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