import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./AllCoupons.css";
import CouponCardAll from "./CouponCardAll/CouponCardAll";

//This component receives a list of coupons and displays them
function AllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    var user = authStore.getState().user;

    useEffect(() => {
        customerService.getAllCoupons()
            .then((coupons)=>setCoupons(coupons))
            .catch(err=>notificationService.error(err));
    }, []);

    return (
        <div className="AllCoupons">
            {user && user.type.toString() == "CUSTOMER" ?
            <>
            {coupons?.map(c=><CouponCardAll coupon={c} key={c.id} />)}
            {coupons?.length == 0 && <div>No coupons</div>}</>
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default AllCoupons;
