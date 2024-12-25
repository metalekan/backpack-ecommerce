import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="max-w-screen-xl mx-auto lg:p-8 p-4 min-h-screen">
      <ProgressSteps step1 step2 />
      <div className="flex flex-col justify-center items-center h-full bg-white lg:p-8 p-4 max-w-xl rounded-md mx-auto mt-6">
        <h1 className="lg:text-2xl text-lg text-gray-900 font-semibold mb-4 text-center">
          Shipping
        </h1>
        <form onSubmit={submitHandler} className="max-w-xl w-full space-y-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your Address" />
            </div>
            <TextInput
              id="address"
              type="text"
              color="purple"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>{" "}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="city" value="Your City" />
            </div>
            <TextInput
              id="email"
              type="text"
              color="purple"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>{" "}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your Postal code" />
            </div>
            <TextInput
              id="postal_code"
              type="text"
              color="purple"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="country" value="Your country" />
            </div>
            <TextInput
              id="country"
              type="text"
              color="purple"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="method" value="Payment Method" />
            </div>
            <Radio
              id="united-state"
              name="countries"
              value={paymentMethod}
              checked={paymentMethod || "PayPal"}
              className="checked:bg-purple-800 focus:outline-none focus:ring-0"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Label htmlFor="payment-method">PayPal or Card</Label>
          </div>
          <Button pill color="purple" className="w-full mt-4" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
