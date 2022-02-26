import AttentionProjects from './mainpageComponet/attention/AttentionProjects';
import PopularProjects from './mainpageComponet/popular/PopularProjects';
import NewProjects from './mainpageComponet/newrelease/NewProjects';
import EndcomeProjects from './mainpageComponet/endcome/EndcomeProjects';
import Advertise from './mainpageComponet/advertise/Advertise';
import MiddleAdvertise from './mainpageComponet/advertise/MiddleAdvertise';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function MainPage(){
    const [list, setList ] = useState([]);

    useEffect(() => {
            axios.get('/mainpage')
            .then(res => setList(res.data))
            .catch(err => console.log(err));
    },[]);

    console.log(list);



    return(
        <>
        <Advertise/>
        <AttentionProjects projectList={list && list.attention}/>
        <MiddleAdvertise/>
        <PopularProjects  projectList={list && list.attention}/>
         <EndcomeProjects projectList={list && list.attention}/>
        <NewProjects projectList={list && list.attention}/>  
        </>
        
    );
}

