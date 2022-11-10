import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CompanyModel from "../../../../Models/CompanyModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./CompaniesList.css";

//This component receives a list of companies and displays them
function CompaniesList(): JSX.Element {
    
    const [companies, setCompanies] = useState<CompanyModel[]>();
    const nav = useNavigate();
    var user = authStore.getState().user;

        useEffect(()=> {
            adminService.getAllCompanies()
            .then(comps=>setCompanies(comps))
            .catch(err=>notificationService.error(err));
        }, [])

    function goToAdd(){
        nav("/admin/add/company")
    }

    return (
        <div className="CompaniesList">
            {user && user.type.toString() == "ADMINISTRATOR" ? <>
             <button onClick={goToAdd} className="but">Add company</button><br />
			 {companies?.map(c=><CompanyCard company={c} key={c.id} />)}
             {companies?.length == 0 && <div>No companies</div>}
            </>
            :user && <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CompaniesList;
