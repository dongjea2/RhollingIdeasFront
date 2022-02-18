import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings} from  'react-loader-spinner';


export default function Loading() {
    return (
     <Rings
    height="100"
    width="100"
    color='grey'
    ariaLabel='loading'
  />
    );

}