import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { Card, Badge, Button } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";

const ProductCard = ({ p, index }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div
      className="relative max-w-sm border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12 xl:p-7 lg:col-span-3 md:col-span-6 space-y-3"
      key={p._id}
    >
      <div className="w-full relative h-[15rem] hh-auto p-1 rounded-md max-w-xs md:max-w-sm">
        <Link to={`/product/${p._id}`}>
          <Badge className="absolute top-3 left-3" color="gray">
            {p?.brand}
          </Badge>
          <img
            className="rounded-md max-w-full h-auto object-contain object-center"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h5 className="mb-2 text-base font-medium capitalize text-gray-900">
          {p?.name?.substring(0, 30)}...
        </h5>

        <Badge color="pink" size="sm">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Badge>
      </div>

      <p className="font-normal text-gray-500 text-xs">
        {p?.description?.substring(0, 60)} ...
      </p>

      <div className="flex justify-between items-center">
        <Link to={`/product/${p._id}`}>
          <Button color="purple" className="w-fit" size="sm">
            Read More
            <HiArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        {p?.countInStock > 0 ? (
          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
