import Category from "./Category";
import CompanyModel from "./CompanyModel";

class CouponModel {
    public id?: number;
    public category: Category;
    public title: string;
    public description: string;
    public image: string | FileList;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public company: CompanyModel;

    constructor(id:number, category: Category, title: string, description: string, image:string | FileList, startDate: Date, endDate: Date, amount: number, price: number, company: CompanyModel){
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.company = company;
    }
}

export default CouponModel;