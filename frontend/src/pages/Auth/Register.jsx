import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Button, Label, Spinner, TextInput } from "flowbite-react";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="lg:flex lg:h-[96svh]">
      <div className="lg:basis-1/2 p-4 lg:p-8 max-w-2xl mx-auto grid place-content-center">
        <div className="max-w-lg w-96">
          <h1 className="text-lg lg:text-2xl font-bold mb-4 text-purple-900">
            Create your Personal Account
          </h1>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
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
                onChange={(e) => setName(e.target.value)}
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
            <Button disabled={isLoading} color="purple" type="submit">
              {isLoading ? <Spinner color="purple" size="sm" /> : null}
              <span className="pl-3">
                {isLoading ? "Registering..." : "Register"}{" "}
              </span>
            </Button>
          </form>

          <div className="mt-4">
            <p className="text-black text-sm">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-purple-900 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="lg:block hidden basis-1/2">
        <img
          src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
