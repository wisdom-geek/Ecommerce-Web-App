import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
// import { Navigate } from 'react-router-dom';
const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() =>{
    const fetchSearchResults = async () =>{
      try{
        const response = await fetch(`http://127.0.0.1:8000/api/products/?q=${searchQuery}`)
        if (!response.ok){
          throw new Error('Failed to fetch search results')
        }
        const data = await response.json();
        setSearchResults(data);
      }catch (error){
        console.error('Error fetching search results: ', error);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);
  return (
    <div>
      <h1>Search results for "{searchQuery}"</h1>
      <div className='row'>
        {searchResults.map((product) =>(
          <div key={product.id} className='col-md-3'>
            <ProductCard product={product} />            
          </div>
        ))}
      </div>
    </div>
  )
};

export default SearchResultPage;