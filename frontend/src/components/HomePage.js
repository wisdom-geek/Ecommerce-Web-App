import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoriesActions";
import { fetchProducts } from "../redux/actions/productsActions";
import CategoryList from './CategoryList';
import FlashSaleProducts from './FlashSaleProducts';
import TopSellingProducts from './TopSellingProducts';
import CategoryProducts from './CategoryProducts';

const HomePage = () =>{
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products);

    useEffect (() =>{
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch]);

    const flashSaleProducts = products.filter(product => product.is_flash_sale).slice(0, 5);

    return(
        <>
            {/* First row for listing categories and flash sales */}
            <div className="row">
                <div className="col-md-3">
                    <CategoryList categories={categories} />                                
                </div>
                <div className="col-md-9">
                    <FlashSaleProducts products={flashSaleProducts} />                                
                </div>
            </div>
            {/* Second row for listing top selling products*/}
            <div className="row">
                <TopSellingProducts products={products} />
            </div>
            {/* Third, fourth, and fifth rows for products */}
            {categories.map((category) => (
                <div key={category.id} className="row">
                    <CategoryProducts category={category} products={products} />
                </div>
            ))}
        </>
    );    
};

export default HomePage;