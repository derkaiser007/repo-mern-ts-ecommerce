import { useState } from "react";
import ProductCard from "../components/product-card";

const Search = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const addToCartHandler = () => {}

    const products = [
        {
            _id: "erd564erdf6785tfg",
            photo: "https://www.apple.com/newsroom/images/product/mac/standard/Apple-MacBook-Pro-M2-Pro-and-M2-Max-hero-230117.jpg.landing-big_2x.jpg",
            name: "MacBook",
            price: 125000,
            stock: 45
        },
        {
            _id: "rtyf675tfgr787uhy",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5y4pO8WC0UeUdqfcf5SL-sN7mxZhuQNu9yy60q_ReXQ&s",
            name: "IPhone",
            price: 95000,
            stock: 60
        },
        {
            _id: "dret567yt54erfnj879jn",
            photo: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/imac-24-no-id-blue-selection-hero-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1701459101618",
            name: "IMac",
            price: 110000,
            stock: 10
        }
    ]

    const isPrevPage = page > 1;
    const isNextPage = page < 4;

    return (
        <div className="product-search-page">
          <aside>
            <h2>Filters</h2>
            <div>
              <h4>Sort</h4>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">None</option>
                <option value="asc">Price (Low to High)</option>
                <option value="dsc">Price (High to Low)</option>
              </select>
            </div>
    
            <div>
              <h4>Max Price: {maxPrice || ""}</h4>
              <input
                type="range"
                min={100}
                max={100000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
    
            <div>
              <h4>Category</h4>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">ALL</option>
                <option value="s1">Sample1</option>
                <option value="s2">Sample2</option>
                <option value="s3">Sample3</option>                
              </select>
            </div>
          </aside>
          <main>
            <h1>Products</h1>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
    
            
              <div className="search-product-list">
                {products.map((i) => (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    price={i.price}
                    stock={i.stock}
                    handler={addToCartHandler}
                    photo={i.photo}
                  />
                ))}
              </div>
           
    
            
              <article>
                <button
                  disabled={!isPrevPage}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Prev
                </button>
                <span>
                  {page} of {4}
                </span>
                <button  
                  disabled={!isNextPage}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </article>
            
          </main>
        </div>
      ); 
}

export default Search;