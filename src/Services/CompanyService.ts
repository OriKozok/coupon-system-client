import axios from "axios";
import Category from "../Models/Category";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class CompanyService{

    public async getCompanyCoupons(){
        const response = axios.get<CouponModel[]>(appConfig.companyUrl+"coupons");
        return (await response).data;
    } 

    public async getCompanyCouponsByCategory(category:Category){
        const response = axios.get<CouponModel[]>(appConfig.companyUrl+"coupons/category/"+category);
        return (await response).data;
    } 

    public async getCompanyCouponsByMaxPrice(price:number){
        const response = axios.get<CouponModel[]>(appConfig.companyUrl+"coupons/price/"+price);
        return (await response).data;
    } 

    public async getCompanyDetails(){
        const response = axios.get<CompanyModel>(appConfig.companyUrl);
        return (await response).data;
    }

    public async getOneCoupon(id:number){
        const response = axios.get<CouponModel>(appConfig.companyUrl+"coupons/"+id);
        return (await response).data;
    }

    public async addCoupon(coupon:CouponModel){
        let reader = new FileReader();
        var image = coupon.image as FileList;
        reader.readAsDataURL(image[0]);
        reader.onload = async function () {
            coupon.image = reader.result as string;
            const response = axios.post<CouponModel>(appConfig.companyUrl, coupon);
            return (await response).data;
    };
    reader.onerror = function (error) {
    console.log('Error: ', error);
    };
    } 

    public async updateCoupon(coupon:CouponModel){
        const response = axios.put<CouponModel>(appConfig.companyUrl, coupon);
        return (await response).data;
    } 

    public async deleteCoupon(id:number){
        const response = axios.delete<string>(appConfig.companyUrl+id);
        return (await response).data;
    } 
}

const companyService = new CompanyService();
export default companyService;