import AttentionProjects from './AttentionProjects';
import PopularProjects from './PopularProjects';
import NewProjects from './NewProjects';
import EndcomeProjects from './EndcomeProjects';
import Advertise from './Advertise';
import MiddleAdvertise from './MiddleAdvertise';


export default function MainPage(){

    return(
        <>
        <Advertise/>
        <AttentionProjects/>
        <MiddleAdvertise/>
        <PopularProjects />
        <EndcomeProjects />
        <NewProjects />
        </>
        
    );
}

