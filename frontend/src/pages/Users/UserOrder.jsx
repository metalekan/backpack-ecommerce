import React from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { Badge, Button } from "flowbite-react";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full overflow-x-auto">
          <thead>
            <tr className="font-semibold text-sm lg:text-base text-gray-900">
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2"></td>
            </tr>
          </thead>

          <tbody className="overflow-x-auto">
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-16 h-16 object-contain mb-5"
                />

                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">$ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <Badge className="w-fit" color="success" size="sm">
                      Completed
                    </Badge>
                  ) : (
                    <Badge color="pink" size="sm">
                      Pending
                    </Badge>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <Badge className="w-fit" color="success" size="sm">
                      Completed
                    </Badge>
                  ) : (
                    <Badge className="w-fit" color="pink" size="sm">
                      Pending
                    </Badge>
                  )}
                </td>

                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <Button color="purple">View Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOrder;
