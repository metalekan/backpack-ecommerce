import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return (
    <div className="w-full overflow-hidden">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          className="mySwiper"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <SwiperSlide key={_id}>
                <div className="relative max-w-sm lg:max-w-full border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12  xl:p-7 lg:col-span-3 md:col-span-6">
                  <div className="w-full relative h-auto p-1 rounded-md sm:max-w-xs md:max-w-sm mx-auto">
                    <img
                      src={image}
                      alt={name}
                      className="rounded-md max-w-full h-auto"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 items-start">
                      <Link to={`/product/${_id}`} className="group">
                        <div className="flex justify-between items-center relative">
                          <span className="text-sm font-medium capitalize truncate after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:absolute after:origin-bottom-left after:transform after:ease-in-out after:duration-500 cursor-pointer after:w-full group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:bg-gray-900 text-gray-700 group-hover:text-gray-900">
                            {name.substring(0, 50)}
                          </span>
                        </div>
                      </Link>
                      <Badge color="pink" className="w-fit" size="sm">
                        {price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Badge>
                      <p className="text-xs md:text-sm text-gray-900 text-start">
                        {description.substring(0, 270)} ...
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <div className="space-y-4">
                        <h1 className="flex items-center truncate text-xs md:text-sm text-gray-900">
                          <FaStore className="mr-2 text-gray-600" /> Brand:{" "}
                          {brand}
                        </h1>
                        <h1 className="flex items-center truncate text-xs md:text-sm text-gray-900">
                          <FaClock className="mr-2 text-gray-600" /> Added:{" "}
                          {moment(createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center truncate text-xs md:text-sm text-gray-900">
                          <FaStar className="mr-2 text-gray-600" /> Reviews:
                          {numReviews}
                        </h1>
                      </div>

                      <div className="space-y-4">
                        <h1 className="flex items-center truncate text-xs md:text-sm text-gray-900">
                          <FaStar className="mr-2 text-gray-600" /> Ratings:{" "}
                          {Math.round(rating)}
                        </h1>
                        <h1 className="flex items-center truncate text-xs md:text-sm text-gray-900">
                          <FaShoppingCart className="mr-2 text-gray-600" />{" "}
                          Quantity: {quantity}
                        </h1>
                        <h1 className="flex items-center truncate text-xs md:text-sm text-gray-900">
                          <FaBox className="mr-2 text-gray-600" /> In Stock:{" "}
                          {countInStock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ProductCarousel;
