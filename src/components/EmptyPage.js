import { Link } from "react-router-dom";

export default function EmptyPage() {
    
    return(
        <>
            <h2>존재하지 않는 페이지 입니다.</h2>
            <Link to ="/">돌아가기</Link>
        </>
    );
}