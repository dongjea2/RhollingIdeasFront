import AttentionProjects from './mainpageComponet/attention/AttentionProjects';
import PopularProjects from './mainpageComponet/popular/PopularProjects';
import NewProjects from './mainpageComponet/newrelease/NewProjects';
import EndcomeProjects from './mainpageComponet/endcome/EndcomeProjects';
import Advertise from './mainpageComponet/advertise/Advertise';
import MiddleAdvertise from './mainpageComponet/advertise/MiddleAdvertise';



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

