class Config{

}

class DevelopmentConfig extends Config{
    public authUrl: string = "http://localhost:8080/auth/";
    public adminUrl: string = "http://localhost:8080/admin/";
    public companyUrl: string = "http://localhost:8080/company/";
    public customerUrl: string = "http://localhost:8080/customer/";
}


class ProductionConfig extends Config{
    public authUrl: string = "http://localhost:8080/auth/";
    public adminUrl: string = "http://localhost:8080/admin/";
    public companyUrl: string = "http://localhost:8080/company/";
    public customerUrl: string = "http://localhost:8080/customer/";
}

const appConfig = process.env.NODE_ENV === "development"? 
    new DevelopmentConfig() : new ProductionConfig();

export default appConfig;