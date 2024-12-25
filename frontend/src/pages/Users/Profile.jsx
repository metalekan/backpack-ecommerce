import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-screen lg:w-full min-h-screen lg:flex items-center justify-center">
      <div className="p-4 lg:p-8 bg-white rounded-md">
        <h2 className="text-2xl font-semibold mb-4 min-w-96">Update Profile</h2>
        <form onSubmit={submitHandler} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              color="purple"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email Address" />
            </div>
            <TextInput
              id="email"
              type="email"
              color="purple"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              color="purple"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Confirm Password" />
            </div>
            <TextInput
              id="confirmPassword"
              color="purple"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <Button color="purple" type="submit">
              {loadingUpdateProfile ? (
                <Spinner color="purple" size="sm" />
              ) : null}
              <span className="pl-3">
                {loadingUpdateProfile ? "Updating..." : "Update"}{" "}
              </span>
            </Button>
            <Button color="purple">
              <Link to="/user-orders">My Orders</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
