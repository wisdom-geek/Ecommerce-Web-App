import React from "react";
import { Link } from "react-router-dom";
import '../styles.css'

const TopSellingProducts = ({ products }) => {
  const topSellingProducts = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);
  
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const cardStyle = {
    width: '200px', 
    height: '300px', 
    marginBottom: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const nameStyle = {
    fontSize: '18px',
    marginBottom: '5px',
  };

  const priceStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <>
      <h3>Top Selling Products</h3>
      <div className="row">
        {topSellingProducts.map((product) => (
          <div key={product.id} className="col-md-3" style={cardStyle}>
            <Link to={`/products/${product.slug}`} style={linkStyle}>
              
              <img src={product.image} alt={product.name} />
              <div>
                <h4 style={nameStyle}>{product.name}</h4>
                <h4 style={priceStyle}>$ {product.price}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopSellingProducts;