import AttentionProjects from './AttentionProjects';
import PopularProjects from './PopularProjects';
import items from '../../api/mock/projectMock.json';
import Advertise from './Advertise';
import MiddleAdvertise from './MiddleAdvertise';


export default function MainPage(){

    return(
        <>
        <Advertise/>
        <AttentionProjects items={items}/>
        <MiddleAdvertise/>
        <PopularProjects items={items}/>
        <PopularProjects items={items}/>
        </>
        
    );
}

