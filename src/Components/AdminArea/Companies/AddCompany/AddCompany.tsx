import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CompanyModel from "../../../../Models/CompanyModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCompany.css";

//This component has a form to add a company
function AddCompany(): JSX.Element {
    
    const {register, handleSubmit, formState} = useForm<CompanyModel>();
    const navigate = useNavigate();
    var user = authStore.getState().user;
    
    function addCompany(company:CompanyModel){
        adminService.addCompany(company)
            .then(()=>{
                notificationService.success("Comapny added");
                navigate("/admin/companies");
            })
            .catch(err=>notificationService.error(err));
    }

    return (
        <div className="AddCompany box forms">
			{user && user.type.toString() == "ADMINISTRATOR" ? (<form onSubmit={handleSubmit(addCompany)}>
                <label>Name: </label>
                <input type="text" id="name" {...register("name", {
                    required: {value: true, message: "You must enter a name!"}})}/><br />
                <div className="error">{formState.errors?.name?.message}</div>
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
                <button>Add Company</button> 
            </form>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default AddCompany;
