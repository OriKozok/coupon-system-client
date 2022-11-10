import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerModel from "../../../../Models/CustomerModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";

//This component receives a customer and displays his details
function CustomerDetails(): JSX.Element {
    
    const [customer, setCustomer] = useState<CustomerModel>();
    const nav = useNavigate();
    const params = useParams();
    const id = +params.id!;
    var user = authStore.getState().user;

        useEffect(()=> {
            adminService.getOneCustomer(id)
            .then(cust=>setCustomer(cust))
            .catch(err=>notificationService.error(err));
        }, [])

    function goToUpdate(){
        nav("/admin/update/customer/"+id);
    }

    function deleteCustomer(){
        adminService.deleteCustomer(id)
        .then(message=>{
            notificationService.success(message);
            nav("/admin/customers")
        })
        .catch(err=> notificationService.error(err))
    }

    function back(){
        nav("/admin/customers");
    }

    return (
        <div className="CustomerDetails box details">
			{user && user.type.toString() == "ADMINISTRATOR" && customer &&
            (<><h2>Name: {customer?.firstName} {customer?.lastName}</h2>
            <h4>Password: {customer?.email}</h4>
            <h4>Password: {customer?.password}</h4>
            <button onClick={goToUpdate}>Update Customer</button>
            <span> </span>
            <button onClick={deleteCustomer}>Delete Customer</button></>)}
            <span> </span>
            <button onClick={back}>Back</button>
            {user && !customer && user.type.toString() == "ADMINISTRATOR" && <div>No such customer!</div>}
            {user && user.type.toString() != "ADMINISTRATOR" && <div>You are unauthorized for this action!</div>}
            {!user && <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CustomerDetails;
