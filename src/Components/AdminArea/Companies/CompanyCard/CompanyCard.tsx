import { Link } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import { authStore } from "../../../../Redux/AuthState";
import "./CompanyCard.css";

//This component receives a company model as props and display it as a card
interface CompanyProps{
    company: CompanyModel;
}

function CompanyCard(props: CompanyProps): JSX.Element {

    return (
        <Link to={"/admin/company/"+props.company.id}>
        <div className="CompanyCard box">
			<h2 className="freeText">{props.company.name}</h2>
            <h4>Email: {props.company.email}</h4>
            <h4>Password: {props.company.password}</h4>
        </div>
        </Link>
    );
}

export default CompanyCard;
