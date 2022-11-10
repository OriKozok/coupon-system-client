import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomerModel from "../../../../Models/CustomerModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./CustomerList.css";

//This component receives a list of customers and displays them
function CustomerList(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerModel[]>();
    const nav = useNavigate();
    var user = authStore.getState().user;

    useEffect(()=> {
        adminService.getAllCustomers()
        .then(cust=>setCustomers(cust))
        .catch(err=>notificationService.error(err));
    }, [])

    function goToAdd(){
        nav("/admin/add/customer")
    }

    return (
        <div className="CustomersList">
            {user && user.type.toString() == "ADMINISTRATOR" ? <>
            <button className="but" onClick={goToAdd}>Add customer</button><br />
           {customers?.map(c=><CustomerCard customer={c} key={c.id} />)} 
           {customers?.length == 0 && <div>No customers</div>}
            </> 
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CustomerList;
