import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectList from './ProjectList';
import qs from "query-string"
//imgaes
import Rank from '../../images/mainpage/ranking.PNG'
import Status from '../../images/mainpage/stats.PNG'
import Rate from '../../images/mainpage/rate.PNG'
import EditorPick from '../../images/mainpage/choice.PNG'
import EditorPicked from '../../images/mainpage/editorPicked.png'

export default function DiscoverPage(){
    const [list, setList ] = useState([]);
    const [cnt, setCnt] = useState(0);
    const [RDS, setRDS] = useState({
        "limit": 100,
        "category":qs.parse(window.location.search).category,
        "editorPick":Number(qs.parse(window.location.search).editorPick),
        "ongoing":qs.parse(window.location.search).onGoing,
        "achiveRate":qs.parse(window.location.search).achiveRate,
        "sort":qs.parse(window.location.search).sort,
        //"keyword":qs.parse(window.location.search).sort
    });


    useEffect(() => {
         console.log();
         console.log(RDS);
        let heder= { headers: {"Content-Type": `application/json`} }
        axios.post('/discover',JSON.stringify(RDS), heder)
             .then(res => setList(res.data))
             .catch(err => alert("서버에러"));
    },[cnt ]);

    const [editor, SetEditor] = useState(EditorPick);
    const handleAddLike= () => {
        if(RDS.editorPick > 0 ){
            RDS.editorPick=0;
            SetEditor(EditorPick)
        }else{
            RDS.editorPick=1;
            SetEditor(EditorPicked)
        }
        setCnt(cnt+1);
    }


    return(

        <FundingListForm>
            <Title>전체</Title>
            <ListButton>
                <StatusBtn/>
                <AchiveBtn/>
                <EditorPickBtn picked={editor} onClick={handleAddLike} />
            </ListButton>
            <LengthInfo>
                <div><FundedCount> {list.length} </FundedCount> 개의 프로젝트가 있습니다.</div>
                <OrderBtn/>
            </LengthInfo>
            <ProjectList projectList={list}/>
        </FundingListForm>
    );
}


//==========================
//styled
const Title= styled.span`
    width: 93%;
    font-size: 20px;
    line-height: 29px;
    letter-spacing: -0.025em;
    margin: 0px 0px 10px;
    font-weight: bold;
    display: -webkit-box;
    overflow: hidden;
    max-height: 58px;
    word-break: keep-all;
    overflow-wrap: break-word;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left: 14px;
`
const FundingListForm = styled.div`
    margin: 0 auto;
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
   	widows: 1100px;
`
const ListButton = styled.div`
    display: flex;
    margin: 0;
    padding-left: 14px;
`

const LengthInfo= styled.div`
    font-size: 15px;
    line-height: 24px;
    margin: 0px,0px,0px,0px;
    color: rgb(61, 61, 61);
    letter-spacing: -0.08px;
    margin-top: 20px;
    margin-left: 0px;
    margin-right: 0px;
    display: flex;
    justify-content: space-between;
    max-width: 1100px;
`
const FundedCount = styled.span`
    color: rgb(255, 87, 87);
    font-size: 15px;
    padding-right: 0px;
    padding-left: 14px;
`

//buttons
const OrderBtn= styled.button`
    background: url(${Rank}) no-repeat;
    border: none;
    width: 77.34px;
    height: 34px;
`
const StatusBtn= styled.button`
    background: url(${Status}) no-repeat;
    border: none;
    width: 77.34px;
    height: 34px;
`
const AchiveBtn= styled.button`
    background: url(${Rate}) no-repeat;
    border: none;
    width: 77.34px;
    height: 34px;
`
const EditorPickBtn= styled.button`
    background: url(${props=> props.picked}) no-repeat;
    border: none;
    width: 120px;
    height: 34px;
    margin-left:10px
`
