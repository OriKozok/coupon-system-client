import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import { authStore } from "../../../../Redux/AuthState";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponDetails.css";

//This component receives a coupon and displays its details
function CouponDetails(): JSX.Element {
    const [coupon, setCoupon] = useState<CouponModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;
    var user = authStore.getState().user;

    useEffect(()=>{companyService.getOneCoupon(id)
        .then(c=> setCoupon(c))
            .catch(err=>notificationService.error(err));
    }, []);
    
    function deleteCoupon(){
        companyService.deleteCoupon(id)
        .then(message=> {
            notificationService.success(message);
            navigate("/company/coupons");
        })
        .catch(err=>notificationService.error(err));
    }

    function updateCoupon(){
        navigate("/company/coupons/update/"+id)
    }

    function back(){
        navigate("/company/coupons")
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
  
    return (
        <div className="CouponDetailsAll box details">
            {user && user.type.toString() == "COMPANY" && coupon &&
            (<>
            <h2>Image: </h2>
            <img src={URL.createObjectURL(convertDataUrlToBlob(coupon?.image))}/><br/>
            <h2>{coupon?.title}</h2>
            <div><span className="freeText">{coupon?.description}</span><br /><br />
            Start Date: <span>{coupon?.startDate.toString().slice(0, 10)}</span><br />
            End Date: <span>{coupon?.endDate.toString().slice(0, 10)}</span><br />
            Category: <span className="freeText">{coupon?.category.toString().toLocaleLowerCase()}</span><br /><br />
            Only <span>{coupon?.amount} left</span></div>
            <h4>{coupon?.price}$</h4><br />
            <span>
            <button onClick={updateCoupon}>Update Coupon</button>
            <span> </span>
            <button onClick={deleteCoupon}>Delete Coupon</button>
            <span> </span>
            <button onClick={back}>Back</button></span><br /></>)}
            {user && !coupon && user.type.toString() == "COMPANY" && <div>No such coupon!</div>}
            {!user && <div>You are unauthorized for this action!</div>}
            {user && user.type.toString() != "COMPANY" && <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CouponDetails;
