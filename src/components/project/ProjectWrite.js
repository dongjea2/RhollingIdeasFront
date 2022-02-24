import axios from "axios";
import React,{Component, useEffect, useRef, useState} from "react";
import OrderModal from "../order/orderModal/OrderModal";

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

    const [showModal, setShowModal] = useState(false);
    const openMadal = ()=>{
        setShowModal((prev)=>!prev);
    };


    const [modalVisible, setModalVisible] = useState(true);
    
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
            <div>projectNo</div>
            <div>userNo</div>
            
            <input type="text" ref={longtitleRef} placeholder="longtitle"/>
            <input type="text" ref={projectbriefRef} placeholder="projectbrief"/>
            <div>editorpick</div>
            <div>projectimage</div>
            <input type="number" ref={targetpriceRef} placeholder="targetprice"/>
            <input type="text" ref={shorttitleRef} placeholder="shorttitle" />
            <input type="text" ref={projectcontentRef} placeholder="projectcontent"/>
            <div>projecturl</div>

            <div>선물 추가부분
                <button onClick={openMadal}></button>

                {
                modalVisible && <OrderModal
                visible={modalVisible}
                closable={true}
                maskClosable={false}
                onClose={closeModal}>
                    <input type="text" placeholder="선물이름"/>
                    <input type="text" placeholder="선물금액"/>
                    <input type="text" placeholder="선물한정수량"/>
                    <input type="text" placeholder="아이템 이름"/>
                    <input type="number" placeholder="예상전달일"/>
                    <button>확인</button>
                </OrderModal>
                }
            </div>
            
            </div>
        </form>      
        
    );
}
