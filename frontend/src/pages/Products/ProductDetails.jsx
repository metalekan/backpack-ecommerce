import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="relative grid lg:grid-cols-2 p-4">
            <div>
              <img src={product.image} alt={product.name} className="" />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between p-3 lg:p-4">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 capitalize">
                {product.name}
              </h2>
              <p className="my-4 text-gray-600 text-sm">
                {product.description}
              </p>

              <p className="text-2xl lg:text-5xl my-4 font-bold text-gray-900">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>

              <div className="flex items-center justify-between text-gray-700 md:p-2 text-sm">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="mr-2" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" /> Reviews: {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2" /> In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between items-center flex-wrap mb-5">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
                {product.countInStock > 0 && (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="stock"
                        className="text-xs"
                        value="In Stock"
                      />
                    </div>
                    <Select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      required
                      color="indigo"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
              </div>

              <Button
                color="purple"
                className="w-fit"
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                size="sm"
              >
                <HiShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="mt-[2rem] lg:mt-[3rem] flex flex-wrap items-start justify-between w-full">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
