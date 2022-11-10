import CustomerModel from "../Models/CustomerModel";
import axios from "axios";
import appConfig from "../Utils/Config";
import CompanyModel from "../Models/CompanyModel";


class AdminService{

    public async getOneCustomer(id:number){
        const response = axios.get<CustomerModel>(appConfig.adminUrl+"customer/"+id);
        return (await response).data;
    } 

    public async getOneCompany(id:number){
        const response = axios.get<CompanyModel>(appConfig.adminUrl+"company/"+id);
        return (await response).data;
    } 

    public async getAllCompanies(){
        const response = axios.get<CompanyModel[]>(appConfig.adminUrl+"company");
        return (await response).data;
    }

    public async getAllCustomers(){
        const response = axios.get<CustomerModel[]>(appConfig.adminUrl+"customer");
        return (await response).data;
    }

    public async addCustomer(customer:CustomerModel){
        const response = axios.post<CustomerModel>(appConfig.adminUrl+"customer", customer);
        return (await response).data;
    }

    public async addCompany(company:CompanyModel){
        const response = axios.post<CompanyModel>(appConfig.adminUrl+"company", company);
        return (await response).data;
    }

    public async updateCompany(company:CompanyModel){
        const response = axios.put<CompanyModel>(appConfig.adminUrl+"company", company);
        return (await response).data;
    }

    public async updateCustomer(customer:CustomerModel){
        const response = axios.put<CustomerModel>(appConfig.adminUrl+"customer", customer);
        return (await response).data;
    }

    public async deleteCustomer(id:number){
        const response = axios.delete<string>(appConfig.adminUrl+"customer/"+id);
        return (await response).data;
    }

    public async deleteCompany(id:number){
        const response = axios.delete<string>(appConfig.adminUrl+"company/"+id);
        return (await response).data;
    }
}

const adminService = new AdminService();
export default adminService;