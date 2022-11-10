import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import CustomerModel from "../../../../Models/CustomerModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./UpdateCustomer.css";

//This component receives a list of companies and displays them
function UpdateCustomer(): JSX.Element {
    
    const {register, handleSubmit, formState, setValue} = useForm<CustomerModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;
    var user = authStore.getState().user;

    useEffect(()=>{
            adminService.getOneCustomer(id)
                .then((cust)=>{
                    setValue("firstName", cust.firstName);
                    setValue("lastName", cust.lastName);
                    setValue("email", cust.email);
                    setValue("password", cust.password);
                })
                .catch(err=>notificationService.error(err))
    }, [])

    function updateCustomer(customer:CustomerModel){
        customer.id = id;
        adminService.updateCustomer(customer)
        .then(()=> {
            notificationService.success("Customer updated");
            navigate("/admin/customers")})
        .catch(err=>notificationService.error(err));
    }

    function back(){
        navigate("/admin/customer/"+id)
    }
    
    return (
        <div className="UpdateCustomer forms">
			{user && user.type.toString() == "ADMINISTRATOR" ? 
            (<><form onSubmit={handleSubmit(updateCustomer)}>
                    <label>First name: </label>
                    <input type="text" id="firstName" {...register("firstName", {
                        required: { value: true, message: "You must enter a first name!" }
                    })} /><br />
                    <div className="error">{formState.errors?.firstName?.message}</div>
                    <label>Last name: </label>
                    <input type="text" id="lastName" {...register("lastName", {
                        required: { value: true, message: "You must enter a last name!" }
                    })} /><br />
                    <div className="error">{formState.errors?.lastName?.message}</div>
                    <label>Email: </label>
                    <input {...register("email", {
                        required: { value: true, message: "email required!" },
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })} /><br />
                    <div className="error">{formState.errors?.email?.message}</div>
                    <label>Password: </label>
                    <input type="password" id="password" {...register("password", {
                        required: { value: true, message: "You must enter a password!" }
                    })} /><br />
                    <div className="error">{formState.errors?.password?.message}</div>
                    <button>Update</button>
                </form><button onClick={back}>Back</button></>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default UpdateCustomer;
