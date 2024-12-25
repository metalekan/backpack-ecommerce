import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();

  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="flex md:flex-row">
        <div className="border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 max-w-60 min-w-64 h-fit sticky top-10">
          <h2 className="text-center py-2 bg-purple-800 text-white rounded-full mb-2 text-sm">
            Filter by Categories
          </h2>

          <div className="p-5">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    color="purple"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    id="red-checkbox"
                  />
                  <Label htmlFor="red-checkbox" className="capitalize">
                    {c.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-purple-800 text-white text-sm rounded-full mb-2">
            Filter by Brands
          </h2>

          <div className="p-5">
            {uniqueBrands?.map((brand, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Radio
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  id={brand}
                  className="checked:bg-purple-800 focus:ring-0"
                />
                <Label htmlFor="pink-radio">{brand}</Label>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-purple-800 text-white text-sm rounded-full mb-2">
            Filter by Price
          </h2>

          <div className="space-y-3">
            <TextInput
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              color="purple"
            />
            <Button
              color="purple"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="p-3 overflow-y-auto">
          <h2 className="h4 text-center mb-2">
            Products ({products?.length}){" "}
          </h2>
          {products.length === 0 ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap gap-4 min-w-full">
              {products?.map((p) => (
                <ProductCard p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
