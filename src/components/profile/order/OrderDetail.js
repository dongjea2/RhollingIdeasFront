import axios from "axios";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import contents from "./orderdetailcontent.json";
import './OrderDetail.css';
import { Link } from "react-router-dom";

export default function OrderDetail(){
    const { paymentNo } = useParams();

    const [infos, setInfo] = useState([]);
    // 가상데이터
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
    }, []);

    const order_data = infos.filter((order) => {
        return order.id === paymentNo;
    });

    // function orderListView(e){
    //     // <Redirect to='/orderlist' />
    //     // return <Link to="/orderlist" replace={true} />
    //     // window.location.replace("/orderlist");
    //     window.location.href = "/orderlist";
    // };

    return (
        <section>
        <div className="project-container">
            <div className="project-img">
                <a href={"/projectdetail/" + paymentNo}>
                    <img src={require('../../../images/mainpage/1.jpeg')} alt="projectImg" />
                </a>
            </div>
            <div className="project-text">
                <div className="cate-maker">카테고리이름 | 메이커이름</div>
                <div className="longtitle">
                    <a href={"/projectdetail/" + paymentNo}>
                        긴제목
                    </a>
                </div>
                <div>
                    <span className="sumprice">000원</span>
                    <span className="rate">달성률%</span>
                    <span className="payresult">· 결제결과</span>
                </div>
                <Link to={"/"} className="message">
                    창작자에게 문의
                </Link>
            </div>
        </div>
        <div className="orderinfo-container">
        {contents.map(content =>
        <div key={content.id}>
            <div className="orderinfo-title"><p>{content.info}</p></div>
            <div className="orderinfo">
                <table>
                    <thead>
                    <tr>
                        <th>{content.info}</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>{content.info_d1}</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>{content.info_d2}</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>{content.info_d3}</th>
                        <td></td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        )}
            <Link to="/orderlist" replace={true}><button type="button" className="orderlistpage">후원목록 보기</button></Link>
        </div>
        </section>
    )
}