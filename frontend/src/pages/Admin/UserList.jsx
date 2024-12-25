import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import {
  Table,
  Modal,
  Button,
  Label,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  // console.log(isAdmin);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteModal = (username) => {
    setOpenModalDelete(true);
    setEditableUserName(username);
  };

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      setOpenModalDelete(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleEdit = (id, username, email, isAdmin) => {
    // console.log(username, email);
    setOpenModalEdit(true);
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
    setIsAdmin(isAdmin);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
        isAdmin: isAdmin,
      });
      setOpenModalEdit(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function onCloseModalEdit() {
    setOpenModalEdit(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col relative w-full shadow-md p-4">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-semibold mb-4 sticky top-0">Users</h1>
            <AdminMenu />
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>NAME</Table.HeadCell>
                <Table.HeadCell>EMAIL</Table.HeadCell>
                <Table.HeadCell>ADMIN</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Delete</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users?.map((user) => (
                  <Table.Row
                    key={user._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user._id}
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="success"
                        onClick={() =>
                          toggleEdit(
                            user._id,
                            user.username,
                            user.email,
                            user.isAdmin
                          )
                        }
                      >
                        <FaEdit className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      {!user.isAdmin && (
                        <Button
                          color="failure"
                          onClick={() => deleteModal(user.username)}
                        >
                          <FaTrash className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {/* Edit User Modal */}
          <Modal
            show={openModalEdit}
            size="md"
            onClose={onCloseModalEdit}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Edit User Info
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Your Username" />
                  </div>
                  <TextInput
                    id="text"
                    required
                    color="purple"
                    value={editableUserName}
                    onChange={(e) => setEditableUserName(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                  </div>
                  <TextInput
                    id="email"
                    required
                    color="purple"
                    value={editableUserEmail}
                    onChange={(e) => setEditableUserEmail(e.target.value)}
                  />
                </div>
                <div className="">
                  <ToggleSwitch
                    color="purple"
                    checked={isAdmin}
                    label="Admin"
                    className="focus:ring-0"
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                </div>
                <div className="w-full">
                  <Button
                    color="purple"
                    onClick={() => updateHandler(editableUserId)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* Delete Modal */}
          <Modal
            show={openModalDelete}
            size="md"
            popup
            onClose={() => setOpenModalDelete(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete {editableUserName}?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => deleteHandler(editableUserId)}
                    color="failure"
                  >
                    {"Yes, I'm sure"}
                  </Button>
                  <Button
                    onClick={() => setOpenModalDelete(false)}
                    color="gray"
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserList;
