import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles.css";

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/?category=${slug}`);
        const data = response.data;
        const currentCategory = data.find((product) => product.category.slug === slug);
        setCategory(currentCategory.category);
        setProducts(data.filter((product) => product.category.slug === slug));
      } catch (error) {
        console.error('Error fetching category and products: ', error);
      }
    };
    fetchCategoryAndProducts();
  }, [slug]);

  if (!category || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="category-name">{category.name}</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="product-name">{product.name}</h5>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-stock">Stock: {product.stock} remaining</p>
              <Link to={`/products/${product.slug}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;