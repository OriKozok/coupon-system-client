import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ByModel from "../../../Models/ByModel";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCardMy from "./CouponCardMy/CouponCardMy";
import "./MyCoupons.css";

//This component receives a list of coupons and displays them with options to filter by category or price
function MyCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const {register, handleSubmit} = useForm<ByModel>();
    var user = authStore.getState().user;
    
    useEffect(()=>{
        customerService.getCustomerCoupons()
        .then(list => setCoupons(list))
        .catch(err=>notificationService.error(err));
    }, [])

    function searchByPrice(priceObj : ByModel){
        if(priceObj.price <= 0){
            notificationService.error("Price required");
        }
        else{
            customerService.getCustomerCouponsByMaxPrice(priceObj.price)
            .then(list => setCoupons(list))
            .catch(err=>notificationService.error(err));
        }
    }

    function searchByCategory(categoryObj : ByModel){
        customerService.getCustomerCouponsByCategory(categoryObj.category)
        .then(list => setCoupons(list))
        .catch(err=>notificationService.error(err));
    }

    return (
        <div className="MyCoupons">
            {user && user.type.toString() == "CUSTOMER" ?
            <>
            <div className="searchCoupons">
            <form name="byCategory" onSubmit={handleSubmit(searchByCategory)}>
                <label>Search by category: </label>
                <select name="category" id="category" {...register("category", {
                    required: { value: true, message: "Category required!"}
                })}>
                <option value="FOOD">Food</option>
                <option value="ELECTRICITY">Electricity</option>
                <option value="RESTAURANT">Restaurant</option>
                <option value="VACATION">Vacation</option>
                <option value="FURNITURE">Furniture</option>
                <option value="TOY">Toy</option>
                <option value="CLOTHING">Clothing</option>
                <option value="GADGET">Gadget</option>
                <option value="ATTRACTION">Attraction</option>
                <option value="BOOK">Book</option>
                <option value="HEALTH">Health</option>
                <option value="MOTOR">Motor</option>
                <option value="ART">Art</option></select><span> </span>
                <button>Search</button><br />
            </form>
            <form name="byPrice" onSubmit={handleSubmit(searchByPrice)}>
                <label>Search by Price: </label>
                <input type="number" id="price"{...register("price")}/>
                <span> </span>
                <button>Search</button>
            </form>
            </div>
            {coupons?.map(c=><CouponCardMy coupon={c} key={c.id} />)}
            {coupons?.length == 0 && <div>No coupons</div>}
            </> 
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default MyCoupons;
