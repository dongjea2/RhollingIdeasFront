import React,{Component, useEffect, useRef, useState} from "react";
import Modal from "../common/Modal";

export default function ProjectWrite(){
    const [category, setCategory]= useState([]);

    useEffect(()=>{
        fetch("")
        .then(res=>{
            return res.json();
        })
        .then(date =>{
            setCategory(category);
        });
    }, []);

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
        
    fetch(``, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
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
            projecturl: projecturlRef.current.value        
        }),
    }).then(res=>{
        if(res.ok){
            alert("생성 완료")
        }
    })
    }

    const [showModal, setShowModal] = useState(false);
    const openMadal = ()=>{
        setShowModal((prev)=>!prev);
    };

    return(
        <form onSubmit={onSubmit}>
            <select>
                <option>
                    {category.category}  
                </option>
            </select>
            <div className="input">
            <div>projectNo</div>
            <div>userNo</div>
            
            <input type="text" placeholder="longtitle"/>
            <input type="text" placeholder="projectbrief"/>
            <div>editorpick</div>
            <div>projectimage</div>
            <input type="number" placeholder="targetprice"/>
            <input type="text" placeholder="shorttitle" />
            <input type="text" placeholder="projectcontent"/>
            <div>projecturl</div>

            <div>선물 추가부분
                <button onClick={openMadal}></button>
            </div>
            
            </div>
        </form>
    );
}