import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CompanyModel from "../../../../Models/CompanyModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyDetails.css";


//This component displays the company's details
function CompanyDetails(): JSX.Element {
    
    const [company, setCompany] = useState<CompanyModel>();
    const nav = useNavigate();
    const params = useParams();
    const id = +params.id!;
    var user = authStore.getState().user;
    
        useEffect(()=> {
            adminService.getOneCompany(id)
            .then(comp=>setCompany(comp))
            .catch(err=>notificationService.error(err));
        }, [])


    function goToUpdate(){
        nav("/admin/update/company/"+id);
    }

    function deleteCompany(){
        adminService.deleteCompany(id)
        .then(message=>{
            notificationService.success(message);
            nav("/admin/companies")
        })
        .catch(err=>notificationService.error(err))
    }

    function back(){
        nav("/admin/companies");
    }

    return (
        <div className="CompanyDetails box details">
			{user && user.type.toString() == "ADMINISTRATOR" && company && 
            (<><h2>Name: {company?.name}</h2>
            <h4>Email: {company?.email}</h4>
            <h4>Password: {company?.password}</h4>
            <button onClick={goToUpdate}>Update Company</button>
            <span> </span>
            <button onClick={deleteCompany}>Delete Company</button></>)}
            <span> </span>
            <button onClick={back}>Back</button>
            {user && !company && user.type.toString() == "ADMINISTRATOR" && <div>No such company!</div>}
            {user && user.type.toString() != "ADMINISTRATOR" && <div>You are unauthorized for this action!</div>}
            {!user && <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CompanyDetails;
