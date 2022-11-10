import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import { authStore } from "../../../../Redux/AuthState";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCoupon.css";

//This component has a form to add a coupon
function AddCoupon(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<CouponModel>();
    const navigate = useNavigate();
    var user = authStore.getState().user;


    function submit(coupon:CouponModel){
        //get the company details from the AuthState
        companyService.addCoupon(coupon)
        .then(()=> {
            notificationService.success("Coupon added");
            navigate("/company/coupons")})
        .catch(err=>notificationService.error(err));
    }

    function back(){
        navigate("/company/coupons");
    }

    return (
        <div className="AddCoupon box forms">
			{user && user.type.toString() == "COMPANY" ? (<><form onSubmit={handleSubmit(submit)}>
                <label>Image: </label>
                <input type="file" id="image" {...register("image", {
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
                    required: { value: true, message: "Description required!" }
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
                <button>Add</button>
            </form><button onClick={back}>Back</button></>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default AddCoupon;
