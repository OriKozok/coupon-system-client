import { useEffect, useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyData.css";

//This component receives a company and displays its details
function CompanyData(): JSX.Element {
    const [company, setCompany] = useState<CompanyModel>();
    var user = authStore.getState().user;

        useEffect(()=> {
            companyService.getCompanyDetails()
            .then(comp=>setCompany(comp))
            .catch(err=>notificationService.error(err))
        }, [])

    return (
        <div className="CompanyData box details">
            {user && user.type.toString() == "COMPANY" ?
			(<><h2>Name: {company?.name}</h2>
            <h4>Email: {company?.email}</h4>
            <h4>Password: {company?.password}</h4></>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CompanyData;
