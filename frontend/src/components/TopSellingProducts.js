import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const TopSellingProducts = ({ products }) => {
  const topSellingProducts = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  return (
    <>
      <h3 className="product-heading">Top Selling Products</h3>
      <div className="product-container-wrapper"> 
        <div className="product-container">
          {topSellingProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.slug}`} className="product-link">
                <img src={product.image} alt={product.name} className="card-img-top"/>                             
                <div className="card-body">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                  <h4 className="product-price">$ {product.price}</h4>
                  <Link to={`/products/${product.slug}`} className="btn btn-primary">View Details</Link>
                </div>               
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopSellingProducts;