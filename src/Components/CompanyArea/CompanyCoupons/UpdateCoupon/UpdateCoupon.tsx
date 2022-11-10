import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import "./UpdateCoupon.css";
import companyService from "../../../../Services/CompanyService";
import { authStore } from "../../../../Redux/AuthState";
import notificationService from "../../../../Services/NotificationService";
import CompanyModel from "../../../../Models/CompanyModel";

//This component has a form to update the coupon
function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<CouponModel>();
    const [company, setCompany] = useState<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;
    var user = authStore.getState().user;
    
        useEffect(()=>{
            companyService.getOneCoupon(id)
                .then((c)=>{
                    setValue("image", c.image);
                    setValue("title", c.title);
                    setValue("description", c.description);
                    setValue("amount", c.amount);
                    setValue("category", c.category);
                    setValue("price", c.price);
                    setValue("startDate", c.startDate);
                    setValue("endDate", c.endDate);
                })
                .catch(err=>notificationService.error(err))
        }, [])

    function updateCoupon(coupon:CouponModel){
        //Linking the coupon's company with the company who is logged in
        const company2 = new CompanyModel(user?.id);
        coupon.company = company2;
        coupon.id = id;
        companyService.updateCoupon(coupon)
            .then(()=> {
                notificationService.success("Coupon updated");
                navigate("/company/coupons")})
            .catch(err=>notificationService.error(err))
    }

    function back(){
        navigate("/company/coupons/"+id);
    }

    return (
        <div className="UpdateCoupon box forms">
            {user && user.type.toString() == "COMPANY" ?
			(<><form onSubmit={handleSubmit(updateCoupon)}>
                    <label>Image: </label>
                    <input type="text" id="image" {...register("image", {
                        required: { value: true, message: "You must enter an image!" }
                    })} /><br />
                    <div className="error">{formState.errors?.image?.message}</div>

                    <label>Title: </label>
                    <input type="text" id="title" {...register("title", {
                        required: { value: true, message: "Title required!" }
                    })} /><br />
                     <div className="error">{formState.errors?.title?.message}</div>

                    <label>Description: </label>
                    <input type="text" id="description" {...register("description", {
                        required: { value: true, message: "Description required!"}
                    })} /><br />
                    <div className="error">{formState.errors?.description?.message}</div>

                    <label>Start Date: </label>
                    <input type="date" id="start" name="startDate" min={new Date().toString()} max="2030-01-01" {...register("startDate", {
                        required: { value: true, message: "You must enter a start date!" }
                    })} /><br />
                    <div className="error">{formState.errors?.startDate?.message}</div>

                    <label>End Date: </label>
                    <input type="date" id="end" name="endDate" min={new Date().toString()} max="2030-01-01" {...register("endDate", {
                        required: { value: true, message: "You must enter an end date!" }
                    })} /><br />
                    <div className="error">{formState.errors?.endDate?.message}</div>

                    <label>Category: </label>
                    <select placeholder="Category" {...register("category", {
                        required: { value: true, message: "Category required!" }
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
                        <option value="ART">Art</option>
                    </select>
                    <div className="error">{formState.errors?.category?.message}</div>

                    <label>Amount: </label>
                    <input type="number" id="amount" min="1" {...register("amount", {
                        required: { value: true, message: "You must enter an amount!" }
                    })} /><br />
                    <div className="error">{formState.errors?.amount?.message}</div>

                    <label>Price: </label>
                    <input type="number" id="price" min="1" {...register("price", {
                        required: { value: true, message: "You must enter a price!" }
                    })} /><br />
                    <div className="error">{formState.errors?.price?.message}</div>
                    <button>Update</button>
                </form><button onClick={back}>Back</button></>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default UpdateCoupon;