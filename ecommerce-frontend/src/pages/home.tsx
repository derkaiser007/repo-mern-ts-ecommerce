import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
    return (
        <div className="home">
          <section></section>
    
          <h1>
            Latest Products
            <Link to="/search" className="findmore">
              More
            </Link>
          </h1>
    
          <main>
            <ProductCard 
                productId="dftes64" 
                price={125000} 
                name="MacBook" 
                stock={25} 
                photo="https://www.apple.com/newsroom/images/product/mac/standard/Apple-MacBook-Pro-M2-Pro-and-M2-Max-hero-230117.jpg.landing-big_2x.jpg"
                handler={() => {}} 
            />
          </main>
        </div>
      );
}

export default Home; 