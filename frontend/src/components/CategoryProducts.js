import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const CategoryProducts = ({ category, products }) => {
  const categoryProducts = products.filter(
    (product) => product.category.id === category.id
  );

  return (
    <div className="category-products">
      <h3 className="category-name">{category.name}</h3>
      <div className="product-container">
        {categoryProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="product-name">{product.name}</h5>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
              <Link
                to={`/products/${product.slug}`}
                className="btn btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;