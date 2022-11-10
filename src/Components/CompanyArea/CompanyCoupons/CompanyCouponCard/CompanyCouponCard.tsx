import { Link } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import "./CompanyCouponCard.css";


//This component receives a coupon model as props and displays it as a card
interface CouponProps{
    coupon: CouponModel;
}

function convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function CompanyCouponCard(props:CouponProps): JSX.Element {
    return (
        <Link to={"/company/coupons/"+props.coupon.id}>
            <div className="CompanyCouponCard box">
            <div className="CouponCard">
            <img src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))}/><br/>
			<h2>{props.coupon.title}</h2>
            <h4>{props.coupon.price}$</h4>
            </div>
            </div>
        </Link>
    );
}

export default CompanyCouponCard;
