import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="relative max-w-sm border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12 xl:p-7 lg:col-span-3 md:col-span-6">
      <div className="w-full relative h-auto p-1 borderr border-gray-200 rounded-md max-w-xs md:max-w-sm">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-md max-w-full h-auto"
        />
        <HeartIcon product={product} />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link to={`/product/${product._id}`} className="group relative">
          <div className="after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:absolute after:origin-bottom-left after:transform after:ease-in-out after:duration-500 cursor-pointer after:w-full group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:bg-gray-900 text-gray-700 group-hover:text-gray-900">
            <span className="text-sm font-semibold truncate capitalize">
              {product.name}
            </span>
          </div>
        </Link>
        <Badge color="pink" size="sm">
          {product?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Badge>
      </div>
    </div>
  );
};

export default Product;
