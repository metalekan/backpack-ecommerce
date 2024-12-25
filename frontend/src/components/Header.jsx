import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  // console.log(data);
  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-4">
      <div className="flex flex-wrap gap-4 justify-center borderr">
        {data?.map((product) => (
          <div key={product._id}>
            <SmallProduct product={product} />
          </div>
        ))}
      </div>
      <ProductCarousel />
    </div>
  );
};

export default Header;
