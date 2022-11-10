import { authStore } from "../../Redux/AuthState";
import "./AdminArea.css";
import AddCompany from "./Companies/AddCompany/AddCompany";
import AddCustomer from "./Customers/AddCustomer/AddCustomer";

//First page of admin
function AdminArea(): JSX.Element {

    var user = authStore.getState().user;

    return (
        <div className="AdminArea">
            {user != null && user.type.toString() == "ADMINISTRATOR" ?
            (<><div>Add a Company:</div>
            <AddCompany /><br />
            <div>Add a Customer:</div>
            <AddCustomer /></>)
            : <div>You are unauthorized for this action!</div>}
        </div>
    );
}

export default AdminArea;
