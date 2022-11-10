import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CustomerModel from "../../../../Models/CustomerModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCustomer.css";

//This component has a form to add a customer
function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CustomerModel>();
    const navigate = useNavigate();
    var user = authStore.getState().user;
    
    function addCustomer(customer:CustomerModel){
        adminService.addCustomer(customer)
            .then(()=>{
                notificationService.success("Customer added");
                navigate("/admin/customers");
            })
            .catch(err=>notificationService.error(err));
    }

    return (
        <div className="AddCustomer box forms">
			{user && user.type.toString() == "ADMINISTRATOR" ? 
            <form onSubmit={handleSubmit(addCustomer)}>
                <label>First name: </label>
                <input type="text" id="firstName" {...register("firstName", {
                    required: {value: true, message: "You must enter a first name!"}})}/><br />
                <div className="error">{formState.errors?.firstName?.message}</div>    
                <label>Last name: </label>
                <input type="text" id="larstName" {...register("lastName", {
                    required: {value: true, message: "You must enter a last name!"}})}/><br />
                <div className="error">{formState.errors?.lastName?.message}</div>    
                <label>Email: </label>
                <input {...register("email", {
                   required: { value: true, message: "You must enter an email!" } ,
                   pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} /><br/>
                <div className="error">{formState.errors?.email?.message}</div>
                <label>Password: </label>
                <input type="password" id="password" {...register("password", {
                    required: {value: true, message: "You must enter a password!"}
                    })}/><br />
                <div className="error">{formState.errors?.password?.message}</div>    
                <button>Add Customer</button>
            </form>
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default AddCustomer;
