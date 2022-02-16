import AttentionProjects from './AttentionProjects';
import items from '../../api/mock/projectMock.json';
import Advertise from './Advertise';

export default function MainPage(){

    return(
        <>
        <Advertise/>
        <AttentionProjects items={items}/>
        </>
        
    );

}