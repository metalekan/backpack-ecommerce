import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="relative max-w-sm border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12  xl:p-7   lg:col-span-3 md:col-span-6">
      <div className="w-full relative h-auto p-1 rounded-md md:max-w-[16rem] max-w-xs mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-md max-w-full h-auto object-contain"
        />
        <HeartIcon product={product} />
      </div>

      <div className="mt-4 flex justify-between items-center fflex-wrap gap-3">
        <Link to={`/product/${product._id}`} className="group">
          <div className="flex justify-between items-center relative">
            <span className="text-sm font-medium capitalize truncate after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:absolute after:origin-bottom-left after:transform after:ease-in-out after:duration-500 cursor-pointer after:w-full group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:bg-gray-900 text-gray-700 group-hover:text-gray-900">
              {product.name.substring(0, 50)}
            </span>
          </div>
        </Link>
        <Badge color="pink" size="xs">
          {product?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Badge>
      </div>
    </div>
  );
};

export default SmallProduct;
