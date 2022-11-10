import { Link } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import "./CustomerCard.css";


//This component recieves a customer model as props and displays him as a card

interface CustomerProps{
    customer:CustomerModel
}

function CustomerCard(props:CustomerProps): JSX.Element {

    
    return (
        <Link to={"/admin/customer/"+props.customer.id}>
        <div className="CustomerCard box">
                <h2 className="freeText">{props.customer.firstName} {props.customer.lastName}</h2>
                <h4>Email: {props.customer.email}</h4>
                <h4>Password: {props.customer.password}</h4>
        </div>
        </Link>
    );
}

export default CustomerCard;
