import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { Button } from "flowbite-react";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen lg:p-8 p-4">
      <ProgressSteps step1 step2 step3 />
      <div className="">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse p-2">
              <thead className="font-semibold text-sm lg:text-base text-purple-900">
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody className="text-xs lg:text-sm">
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      $ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="relative max-w-full border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12  xl:p-7 lg:col-span-3 md:col-span-6">
            <div>
              <h2 className="text-base lg:text-xl font-semibold mb-2 text-purple-800">
                Pricing
              </h2>
              <ul className="text-sm lg:text-base">
                <li>
                  <span className="font-semibold mb-4">Items:</span> $
                  {cart.itemsPrice}
                </li>
                <li>
                  <span className="font-semibold mb-4">Shipping:</span> $
                  {cart.shippingPrice}
                </li>
                <li>
                  <span className="font-semibold mb-4">Tax:</span> $
                  {cart.taxPrice}
                </li>
                <li>
                  <span className="font-semibold mb-4">Total:</span> $
                  {cart.totalPrice}
                </li>
              </ul>
            </div>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-base lg:text-xl font-semibold text-purple-800">
                Shipping
              </h2>
              <p className="text-sm lg:text-base">
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-base lg:text-xl font-semibold text-purple-800">
                Payment Method
              </h2>
              <p className="text-sm lg:text-base">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <Button
            type="button"
            color="purple"
            pill
            className="w-fit mt-4"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>

          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
