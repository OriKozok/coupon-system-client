import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserCred from "../../../Models/UserCred";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

//This component has a form to login
function Login(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<UserCred>();
    const navigate= useNavigate();

    function send(cred:UserCred){
        authService.login(cred)
            .then(()=>{
                if(authStore.getState().user.type.toString() == "ADMINISTRATOR"){
                    navigate("/admin");
                }
                if(authStore.getState().user.type.toString() == "COMPANY"){
                    navigate("/company/coupons");
                }
                if(authStore.getState().user.type.toString() == "CUSTOMER"){
                    navigate("/customer/coupons/all");
                }
            })
            .catch(err=>notificationService.error(err))
    }
    
    return (
        <div className="Login box forms">
			<form onSubmit={handleSubmit(send)}>
                <input placeholder="Email" {...register("email", {
                   required: { value: true, message: "Email required!" } ,
                   pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} /><br/>
                <div className="error">{formState.errors?.email?.message}</div>
                <input type="password" placeholder="Password" {...register("password", {
                    required: { value: true, message: "Password required!"}
                })}/><br/>
                <div className="error">{formState.errors?.password?.message}</div>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
