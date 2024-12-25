import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import {
  useUploadProductImageMutation,
  useCreateProductMutation,
} from "../../redux/api/productApiSlice.js";
import { toast } from "react-toastify";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  FileInput,
} from "flowbite-react";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, SetImageUrl] = useState(null);

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct, { isLoading: isSuccess }] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("stock", stock);

      const { data } = await createProduct(productData);
      if (data.error) {
        toast.error("Product create failed. Try again!");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product create failed. Try again!");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      // console.log(res);
      toast.success(res.message);
      setImage(res.image);
      SetImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="w-screen lg:w-full min-h-screen flex justify-center lg:p-8">
      <div className="flex flex-col md:flex-row bbg-white rounded-lg shadow-md p-4 lg:p-8 max-w-3xl mx-auto w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Create Product</h1>
            <AdminMenu />
          </div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
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
          <form onSubmit={handleSubmitProduct} className="flex flex-col gap-4">
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
                  className="capitalize"
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

export default ProductList;
