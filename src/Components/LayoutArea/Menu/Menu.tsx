import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenModel } from "../../../Models/TokenModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<TokenModel>();
    var type : string;
    const nav = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user);
        
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
    }, [])

    function hello(){
        var type = user?.type.toString();
        if(type != null){
            if(type == "ADMINISTRATOR")
                return "admin";
            if(type == "COMPANY")
                return user.name;
            else
            return user.firstName;    
        }
    }

    function logOut(){
        authService.logOut()
        .then(()=> {notificationService.success("logged out");
        nav("/home");})
        .catch(err=>notificationService.error(err));
    }
    

    return (
        <div className="Menu">
            {!user && <NavLink to="/coupons">Coupons</NavLink> }
            {user?.type.toString() == "ADMINISTRATOR" && <>
            <NavLink to="/admin/customers">Customers</NavLink>
            <NavLink to="/admin/companies">Companies</NavLink>
            </>}
            {user?.type.toString() == "CUSTOMER" && <>
            <NavLink to="/customer/coupons/all">All Coupons</NavLink>
            <NavLink to="/customer/coupons/my">My Coupons</NavLink>
            <NavLink to="/customer/details">My Details</NavLink>
            </>}
            {user?.type.toString() == "COMPANY" && <>
            <NavLink to="/company/coupons">Our Coupons</NavLink>
            <NavLink to="/company/details">Our Details</NavLink>
            </>}
            {!user && <NavLink to="/login">Log in</NavLink>}
            {user && <span>Hello, <span>{hello()}</span> <button onClick={logOut}>Log Out</button></span>}
        </div>
    );
}

export default Menu;
