import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import "./Coupons.css";

//This component receives a list of coupons and displays them
function Coupons(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    
    useEffect(() => {
        authService.getAllCoupons()
            .then((coupons)=>setCoupons(coupons))
            .catch(err=>notificationService.error(err));
    }, []);

    return (
        <div className="Coupons">
			{coupons.map(c=><CouponCard coupon={c} key={c.id} />)}
        </div>
    );
}

export default Coupons;
