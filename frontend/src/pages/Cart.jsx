import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { Button, Select } from "flowbite-react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="text-center">
          Your cart is empty <Link to="/shop">Go To Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-semibold mb-10 leading-tight">
            Shopping Cart
          </h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div class="relative flex flex-col items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lgg ">
                <div class="block overflow-hidden md:w-52 h-48">
                  <img
                    src={item?.image}
                    alt="Card image"
                    class="h-full rounded-2xl object-cover"
                  />
                </div>
                <div class="p-4 flex justify-between w-full">
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500"
                    >
                      {item.name.substring(0, 50)}
                    </Link>
                    <div className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5">
                      {item.brand}
                    </div>
                    <div className=" text-gray-900 font-bold">
                      {item?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 lg:mt-0">
                    <Select
                      color="purple"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>

                    <Button
                      color="failure"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 mt-5 text-gray-900">
            {/* <div
              key={item._id}
              className="relative max-w-xs border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12  xl:p-7 lg:col-span-3 md:col-span-6"
            >
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="w-[5rem] h-[5rem] lg:w-[8rem] lg:h-[8rem]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded"
                  />
                </div>

                <div className="space-y-2">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-gray-900 font-medium capitalize"
                  >
                    {item.name.substring(0, 50)}
                  </Link>

                  <div className="text-gray-900">{item.brand}</div>
                  <div className=" text-gray-900 font-bold">
                    {item?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 lg:mt-0">
                <Select
                  color="purple"
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Select>

                <Button
                  color="failure"
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
            <h2 className="lg:text-xl text-lg font-semibold lg:font-bold mb-2">
              Total Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </h2>

            <div className="lg:text-xl text-lg font-semibold lg:font-bold">
              ${" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>

            <Button
              color="purple"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
