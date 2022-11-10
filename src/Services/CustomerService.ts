import axios from "axios";
import Category from "../Models/Category";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import appConfig from "../Utils/Config";

class CustomerService{

    public async getCustomerCoupons(){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl+"coupons");
        return (await response).data;
    } 

    public async getCustomerCouponsByCategory(category:Category){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl+"coupons/category/"+category);
        return (await response).data;
    } 

    public async getCustomerCouponsByMaxPrice(price:number){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl+"coupons/price/"+price);
        return (await response).data;
    } 

    public async getAllCoupons(){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl+"coupons/all");
        return (await response).data;
    }

    public async getOneCoupon(id:number){
        const response = axios.get<CouponModel>(appConfig.customerUrl+"coupons/"+id);
        return (await response).data;
    }

    public async getCustomerDetails(){
        const response = axios.get<CustomerModel>(appConfig.customerUrl);
        return (await response).data;
    }

    public async purchaseCoupon(coupon:CouponModel){
        const response = axios.post<string>(appConfig.customerUrl, coupon);
        return (await response).data;
    }

    public async deleteCouponPurchase(id:number){
        const response = axios.delete<string>(appConfig.customerUrl+id);
        return (await response).data;
    }
}

const customerService = new CustomerService();
export default customerService;