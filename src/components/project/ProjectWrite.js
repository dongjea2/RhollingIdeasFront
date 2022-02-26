import axios from "axios";
import React,{Component, useEffect, useRef, useState} from "react";
import SimpleModal from "../modal/SimpleModal";

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


    function onSubmit(e){
        e.preventDefault();
        
   
    let data = {
            userNo : usernoRef.current.value,
            category: categoryRef.current.value,
            longtitle: longtitleRef.current.value,
            projectbrief: projectbriefRef.current.value,
            editorpick: editorpickRef.current.value,            
            projectimage: projectimageRef.current.value,
            targetprice: targetpriceRef.current.value,
            startdate: startdateRef.current.value,
            enddate: enddateRef.current.value,
            shorttitle: shorttitleRef.current.value,            
            projectcontent: projectcontentRef.current.value,
            projecturl: projecturlRef.current.value}
    }

    // let rewarddata = { 
    //      rewardPrice: rewardPriceRef.current.value,
    //      rewardName: rewardNameRef.current.value,
    //      deliverDate: deliverDateRef.current.value,
    //      rewardNum: rewardNumRef.current.value,
    //      itemName: itemNameRef.current.value,
    //      deliverSelect: deliverSelectRef.current.value
    // }

    const [showModal, setShowModal] = useState(false);
    const openMadal = ()=>{
        setShowModal((prev)=>!prev);
    };


    const [modalVisible, setModalVisible] = useState(false);
    
    const closeModal = () => {
        setModalVisible(false) 
    };

    const [info, setInfo] = useState([]);
    const [plag,setPlag] = useState('');
        
      useEffect(() => {
        axios.get("/category")
        .then(res => setInfo(res.data))
        //여기서 모달창에 입력한 reward뿌려야함
        .catch(err => console.log(err));
       }, [plag]);

       const [text, setText] = useState('');

       const onChange = (e) =>{
           setText(e.target.value);
       };



       
       const handleSubmit = async (e) => {
        e.preventDefault();
        
        let data = {
            //reward, category, project 다 보내야함
        }

        axios.post("/write",  JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        }).then((res) => {
          console.log(res);
          setPlag(plag + 1);
        }).catch(err => console.log(err));
      }

    return(
        <form onSubmit={onSubmit}>
            <select ref={categoryRef}>
                {info.map((category)=>
                <option key={category.categoryNo}>
                    {category.categoryName}  
                </option>
                )}
            </select>
            <div className="input">
            <div style={{display:'none'}}>projectNo</div>
            <div style={{display:'none'}}>userNo</div>
            
            <input type="text" ref={longtitleRef} placeholder="longtitle"/>
            <input type="text" ref={projectbriefRef} placeholder="projectbrief"/>
            <div>editorpick</div>
            <div>projectimage</div>
            <input type="number" ref={targetpriceRef} placeholder="targetprice"/>
            <input type="text" ref={shorttitleRef} placeholder="shorttitle" />
            <input type="text" ref={projectcontentRef} placeholder="projectcontent"/>
            <input type="text" ref={projecturlRef} placeholder="projecturl"/>
            

            <div>선물 추가부분
                <button onClick={openMadal}></button>

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
                </SimpleModal>
                }
            </div>
            <button onClick={handleSubmit}>프로젝트 작성</button>
            </div>
        </form>      
        
    );
}
