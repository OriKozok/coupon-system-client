import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import CompanyModel from "../../../../Models/CompanyModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./UpdateCompany.css";

//This component has a form to update a company
function UpdateCompany(): JSX.Element {
    
    const {register, handleSubmit, formState, setValue} = useForm<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;
    var user = authStore.getState().user;
    

    useEffect(()=>{
            adminService.getOneCompany(id)
                .then((comp)=>{
                    setValue("name", comp.name);
                    setValue("email", comp.email);
                    setValue("password", comp.password);
                })
                .catch(err=>notificationService.error(err))
        }, [])

    
    function updateCompany(company:CompanyModel){
        company.id = id;
        adminService.updateCompany(company)
        .then(()=> {
            notificationService.success("Company updated");
            navigate("/admin/companies")})
        .catch(err=>notificationService.error(err));
    }

    function back(){
        navigate("/admin/company/"+id);
    }

    return (
        <div className="UpdateCompanies box forms">
			{user && user.type.toString() == "ADMINISTRATOR" ? (<><form onSubmit={handleSubmit(updateCompany)}>
                <label>Name: </label>
                <input type="text" id="name" {...register("name", {
                    required: { value: true, message: "You must enter a name!" }
                })} /><br />
                <div className="error">{formState.errors?.name?.message}</div>
                <label>Email: </label>
                <input {...register("email", {
                    required: { value: true, message: "You must enter an email!" },
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} /><br />
                <div className="error">{formState.errors?.email?.message}</div>
                <label>Password: </label>
                <input type="password" id="password" {...register("password", {
                    required: { value: true, message: "You must enter a password!" }
                })} /><br />
                <div className="error">{formState.errors?.password?.message}</div><br />
                <button>Update</button>
            </form>
            <button onClick={back}>Back</button></>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default UpdateCompany;
