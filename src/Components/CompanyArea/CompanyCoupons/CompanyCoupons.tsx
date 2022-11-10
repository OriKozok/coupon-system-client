import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import "./CompanyCoupons.css";
import CompanyCouponCard from "./CompanyCouponCard/CompanyCouponCard";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import ByModel from "../../../Models/ByModel";

//This component receives a list of coupons and displays them with options to filter by category or price
function CompanyCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<ByModel>();
    var user = authStore.getState().user;

    useEffect(() => {
        companyService.getCompanyCoupons()
            .then((coupons)=>setCoupons(coupons))
            .catch(err=>notificationService.error(err));
    }, []);

    function searchByPrice(priceObj : ByModel){
        if(priceObj.price <= 0){
            notificationService.error("Price required");
        }
        else{
            companyService.getCompanyCouponsByMaxPrice(priceObj.price)
            .then(list => setCoupons(list))
            .catch(err=>notificationService.error(err));
        }
    }

    function searchByCategory(categoryObj : ByModel){
        companyService.getCompanyCouponsByCategory(categoryObj.category)
        .then(list => setCoupons(list))
        .catch(err=>notificationService.error(err));
    }

    function add(){
        navigate("/company/coupons/add");
    }

    return (
        <div className="CompanyCoupons">
            {user && user.type.toString() == "COMPANY" ?
            <>
            <button onClick={add} className="but">Add Coupon</button><br />
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
                <option value="ART">Art</option></select>
                <span> </span>
                <button>Search</button><br />
            </form>
            <form name="byPrice" onSubmit={handleSubmit(searchByPrice)}>
                <label>Search by Price:</label>
                <input type="number" id="price"{...register("price")}/>
                <span> </span>
                <button>Search</button>
            </form>
            </div>
            {coupons?.map(c=><CompanyCouponCard coupon={c} key={c.id} />)}
            {coupons?.length == 0 && <div>No coupons</div>}
            </> 
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CompanyCoupons;
