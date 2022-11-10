import { useEffect, useState } from "react";
import CustomerModel from "../../../Models/CustomerModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerData.css";

//This component receives a customer and displays his details
function CustomerData(): JSX.Element {
    
    const [customer, setCustomer] = useState<CustomerModel>();
    var user = authStore.getState().user;

        useEffect(()=> {
            customerService.getCustomerDetails()
            .then(cust=>setCustomer(cust))
            .catch(err=>notificationService.error(err))
        }, [])


    return (
        <div className="CustomerData box details">
            {user && user.type.toString() == "CUSTOMER" ?
			<><h4>Name: {customer?.firstName} {customer?.lastName}</h4>
            <p>Email: {customer?.email}</p>
            <p>Password: {customer?.password}</p></>
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default CustomerData;
