import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  FileInput,
} from "flowbite-react";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const { id } = useParams();

  const { data: productData } = useGetProductByIdQuery(id);

  // console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  // console.log(stock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct, { isLoading: isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      // console.log(res);
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: id, formData });
      console.log(data);

      if (data?.error) {
        toast.error(`Please  again! ${data?.error.data}`);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error(`Please try again! ${err?.error.data}`);
    }
  };

  return (
    <div className="w-screen lg:w-full mmin-h-screen flex justify-center lg:p-8">
      <div className="max-w-3xl w-full border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Edit Product</h1>
            <AdminMenu />
          </div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto h-32 w-32 object-contain"
              />
            </div>
          )}
          <div className="mb-4" id="fileUpload">
            <div className="mb-2 block">
              <Label
                htmlFor="file"
                value={image ? image.name : "Upload Image"}
              />
            </div>
            <FileInput
              name="image"
              onChange={uploadFileHandler}
              color="purple"
              id="file"
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                color="purple"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput
                  color="purple"
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Quantity" />
                </div>
                <TextInput
                  color="purple"
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="brand" value="Brand" />
              </div>
              <TextInput
                color="purple"
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                color="purple"
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="stock" value="Count in stock" />
                </div>
                <TextInput
                  color="purple"
                  id="stock"
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="category" value="Category" />
                </div>
                <Select
                  color="purple"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                      className="capitalize"
                    >
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <Button disabled={isSuccess} color="purple" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
