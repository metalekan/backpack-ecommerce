import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";

import { toast } from "react-toastify";
import { Button, HR, Label, TextInput, Modal } from "flowbite-react";
import Loader from "../../components/Loader.jsx";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories, refetch, isLoading } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [createCategory, { isLoading: isUpdating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isChecking }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.updatedCategory.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setOpenModalEdit(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setOpenModalEdit(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };
  function onCloseModalEdit() {
    setOpenModalEdit(false);
  }

  return (
    <div className="flex flex-col md:flex-row lg:p-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 bg-white rounded-md shadow-md max-w-screen-md mx-auto min-h-screenn">
          <div className="flex items-center justify-between">
            <div className="text-2xl mb-4">Manage Categories</div>
            <AdminMenu />
          </div>
          <form onSubmit={handleCreateCategory} className="">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Write category" />
            </div>
            <TextInput
              value={name}
              id="category"
              placeholder="Enter here..."
              required
              color="purple"
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              disabled={isUpdating}
              className="mt-3"
              type="submit"
              color="purple"
            >
              Submit
            </Button>
          </form>
          <HR />
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <div key={category._id}>
                <Button
                  color="purple"
                  pill
                  outline
                  onClick={() => {
                    {
                      setOpenModalEdit(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }
                  }}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </div>

          <Modal
            show={openModalEdit}
            size="md"
            onClose={onCloseModalEdit}
            popup
            defaultValue="center"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Edit category
                </h3>
                <div>
                  <TextInput
                    id="text"
                    required
                    color="purple"
                    value={updatingName}
                    onChange={(e) => setUpdatingName(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center gap-3">
                  <Button
                    disabled={isChecking}
                    onClick={handleUpdateCategory}
                    color="purple"
                  >
                    Update
                  </Button>
                  <Button onClick={handleDeleteCategory} color="failure">
                    Delete
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
