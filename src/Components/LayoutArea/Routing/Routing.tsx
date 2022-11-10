import { Route, Routes } from "react-router-dom";
import AdminArea from "../../AdminArea/AdminArea";
import AddCompany from "../../AdminArea/Companies/AddCompany/AddCompany";
import CompanyDetails from "../../AdminArea/Companies/CompanyDetails/CompanyDetails";
import CompaniesList from "../../AdminArea/Companies/CompanyList/CompaniesList";
import UpdateCompany from "../../AdminArea/Companies/UpdateCompany/UpdateCompany";
import AddCustomer from "../../AdminArea/Customers/AddCustomer/AddCustomer";
import CustomerDetails from "../../AdminArea/Customers/CustomerDetails/CustomerDetails";
import CustomerList from "../../AdminArea/Customers/CustomerList/CustomersList";
import UpdateCustomer from "../../AdminArea/Customers/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../../CompanyArea/CompanyCoupons/AddCoupon/AddCoupon";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import CouponDetails from "../../CompanyArea/CompanyCoupons/CouponDetails/CouponDetails";
import UpdateCoupon from "../../CompanyArea/CompanyCoupons/UpdateCoupon/UpdateCoupon";
import CompanyData from "../../CompanyArea/CompanyData/CompanyData";
import AllCoupons from "../../CustomerArea/AllCoupons/AllCoupons";
import CouponDetailsAll from "../../CustomerArea/AllCoupons/CouponDetailsAll/CouponDetailsAll";
import CustomerData from "../../CustomerArea/CustomerData/CustomerData";
import CouponDetailsMy from "../../CustomerArea/MyCoupons/CouponDetailsMy/CouponDetailsMy";
import MyCoupons from "../../CustomerArea/MyCoupons/MyCoupons";
import Coupons from "../../HomeArea/Coupons/Coupons";
import Home from "../../HomeArea/Home/Home";
import Login from "../../HomeArea/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/coupons" element={<Coupons />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminArea/>}/>
                <Route path="/admin/companies" element={<CompaniesList/>}/>
                <Route path="/admin/add/company" element={<AddCompany/>}/>
                <Route path="/admin/update/company/:id" element={<UpdateCompany/>}/>
                <Route path="/admin/company/:id" element={<CompanyDetails/>}/>
                <Route path="/admin/customers" element={<CustomerList/>}/>
                <Route path="/admin/add/customer" element={<AddCustomer/>}/>
                <Route path="/admin/update/customer/:id" element={<UpdateCustomer/>}/>
                <Route path="/admin/customer/:id" element={<CustomerDetails/>}/>
                <Route path="/customer/details" element={<CustomerData/>}/>
                <Route path="/customer/coupons/all" element={<AllCoupons/>}/>
                <Route path="/customer/coupons/all/:id" element={<CouponDetailsAll/>}/>
                <Route path="/customer/coupons/my" element={<MyCoupons/>}/>
                <Route path="/customer/coupons/my/:id" element={<CouponDetailsMy/>}/>
                <Route path="/company/details" element={<CompanyData/>}/>
                <Route path="/company/coupons" element={<CompanyCoupons/>}/>
                <Route path="/company/coupons/:id" element={<CouponDetails/>}/>
                <Route path="/company/coupons/update/:id" element={<UpdateCoupon/>}/>
                <Route path="/company/coupons/add" element={<AddCoupon/>}/>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
