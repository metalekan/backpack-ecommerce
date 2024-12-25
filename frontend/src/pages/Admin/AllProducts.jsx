import { Link } from "react-router-dom";
import moment from "moment";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { Badge, Card, Dropdown } from "flowbite-react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id, name) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await deleteProduct(id);
      console.log(data);
      refetch();
    } catch (error) {
      toast.Error(`Failed! Try again.`);
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [products]);

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="lg:w-full min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="flex justify-between items-center lg:mx-5 mb-10">
            <div className="text-xl tracking-tight text-gray-900 font-bold">
              All Products ({products.length})
            </div>
            <AdminMenu />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {products.map((product) => (
              <div
                className="relative max-w-md w-full border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 col-span-12  xl:p-7 lg:col-span-3 md:col-span-6"
                key={product._id}
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="lg:w-40 lg:h-40 w-20 h-20 object-contain"
                  />
                  <div className="p-4 flex flex-col justify-around w-full">
                    <div className="flex justify-between items-center">
                      <h5 className="text-md lg:text-xl font-semibold capitalize tracking-tight text-gray-900">
                        {product?.name?.substring(0, 30)}
                      </h5>
                      <p className="text-gray-400 text-xs ml-3 hidden">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-700 text-xs lg:text-sm my-4">
                      {product?.description?.substring(0, 50)}...
                    </p>

                    <div className="flex justify-between items-center w-full">
                      <Dropdown label="Options" color="purple" size="sm">
                        <Link to={`/admin/product/update/${product._id}`}>
                          <Dropdown.Item>Edit</Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          onClick={() =>
                            handleDelete(product?._id, product?.name)
                          }
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                      <Badge color="pink">$ {product?.price}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
