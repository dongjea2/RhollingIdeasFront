import { useParams } from "react-router-dom"

export default function OrderDetail(){
    const { paymentNo } = useParams();
    return (
        <>paymentNo: {paymentNo}</>
    )
}