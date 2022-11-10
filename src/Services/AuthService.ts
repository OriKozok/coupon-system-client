import axios from "axios";
import CouponModel from "../Models/CouponModel";
import UserCred from "../Models/UserCred";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService{
    public async getAllCoupons(){
        const response = await axios.get<CouponModel[]>(appConfig.authUrl+"all");
        return response.data;
    }

    public async login(cred:UserCred){
        const response = await axios.post<string>(appConfig.authUrl+"login?email=" + cred.email + "&password=" + cred.password);
        const token = (await response).data;
        authStore.dispatch(loginAction(token));
    }

    public async logOut(){
        const response = await axios.post<string>(appConfig.authUrl+"out");
        authStore.dispatch(logoutAction());
        return response.data;
    }
}

const authService = new AuthService();
export default authService;