import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import moment from "moment";
import { Button } from "flowbite-react";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto lg:p-8 p-4">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-gray-900">
                <thead className="border-b-2 text-sm lg:text-base font-semibold text-purple-900">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2 text-start">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody className="text-xs lg:text-sm">
                  {order.orderItems.map((item, index) => (
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

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-lg lg:text-xl font-semibold mb-2">Shipping</h2>
          <p className="mb-4 text-sm lg:text-base mt-4">
            <strong className="text-purple-800">Order:</strong> {order._id}
          </p>

          <p className="mb-4 text-sm lg:text-base">
            <strong className="text-purple-800">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4 text-sm lg:text-base">
            <strong className="text-purple-800">Email:</strong>{" "}
            {order.user.email}
          </p>

          <p className="mb-4 text-sm lg:text-base">
            <strong className="text-purple-800">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4 text-sm lg:text-base">
            <strong className="text-purple-800">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">
              Paid on {moment(order.paidAt).format("MMMM Do YYYY, h:mm:ss a")}
            </Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>

        <h2 className="text-lg lg:text-xl font-bold mb-2 mt-[3rem]">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2 text-sm lg:text-base">
          <span>Items</span>
          <span>$ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm lg:text-base">
          <span>Shipping</span>
          <span>$ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm lg:text-base">
          <span>Tax</span>
          <span>$ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm lg:text-base">
          <span>Total</span>
          <span>$ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <Button
              className="min-w-full"
              type="button"
              color="purple"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
