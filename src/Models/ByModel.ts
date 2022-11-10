import Category from "./Category";

class ByModel{

    public price?: number;
    public category?: Category;

    constructor(price? : number, category? : Category){
        this.price = price;
        this.category = category;
    }
}

export default ByModel;