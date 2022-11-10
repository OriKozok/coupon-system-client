import "./Home.css";

//First page of the website
function Home(): JSX.Element {
    return (
        <div className="Home">
			<h2>Welcome to Coupon Zone!</h2>
            <div>Our website is the best website out there for coupons!</div><br />
            <div>As an admin, you can browse companies and customers, add new ones and edit existing ones!</div><br />
            <div>As a company, you can see your details, browse your coupons, add new ones, edit and delete existing ones!</div><br />
            <div>Finally, as a customer, you can see your details, browse through coupons, purchase them and delete purchase of coupons you don't want anymore!</div><br />
            <br /><div>The admin's email is admin@admin.com and his password is admin</div><br />
            <div>We hope that you'll appreciate our website, and have fun!</div>
        </div>
    );
}

export default Home;
