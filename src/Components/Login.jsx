import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/login.png";
import { toast } from "react-hot-toast";
import "../index.css";
import "./Login.css";

const green = { color: "#72DB73" };

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    mobileNumber: "",
    terms: false,
  });

  const [error, setError] = useState({
    name: false,
    userName: false,
    email: false,
    mobileNumber: false,
    terms: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setError({ name: false, userName: false, email: false, mobileNumber: false, terms: false });

    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.userName.trim()) newErrors.userName = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = true;
    if (!formData.terms) newErrors.terms = true;

    if (Object.keys(newErrors).length > 0) {
      setError((prevErrors) => ({ ...prevErrors, ...newErrors }));
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));
    toast.success("User created successfully");
    navigate("/genre", { state: { userData: formData } });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen bg-black text-white lg:overflow-y-hidden overflow-scroll overflow-x-hidden">
      {/* Image section (Now visible on mobile) */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative">
        <img className="w-full h-full object-cover" src={loginImage} alt="Login Image" />
        <h1 className="absolute bottom-[5vh] left-[3vw] text-3xl md:text-4xl xl:text-5xl font-black leading-tight">
          Discover new things on <br /> Superapp
        </h1>
      </div>

      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 max-h-screen p-6 md:p-12 lg:px-[10vw] justify-start lg:overflow-auto">

        <div className="text-center space-y-2">
          <h1 style={{ ...green, fontFamily: "Single Day" }} className="text-4xl md:text-5xl">
            Super app
          </h1>
          <p className="text-lg md:text-2xl font-bold">Create your new account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            onChange={handleChange}
            className="border border-[#72DB73] rounded-md focus:outline-none py-2 px-4 bg-[#292929] text-white"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
          />
          {error.name && <p className="text-red-500 text-center">Name is required</p>}

          <input
            onChange={handleChange}
            className="border border-[#72DB73] rounded-md focus:outline-none py-2 px-4 bg-[#292929] text-white"
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
          />
          {error.userName && <p className="text-red-500 text-center">Username is required</p>}

          <input
            onChange={handleChange}
            className="border border-[#72DB73] rounded-md focus:outline-none py-2 px-4 bg-[#292929] text-white"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
          />
          {error.email && <p className="text-red-500 text-center">Email is required</p>}

          <input
            onChange={handleChange}
            className="border border-[#72DB73] rounded-md focus:outline-none py-2 px-4 bg-[#292929] text-white"
            type="number"
            name="mobileNumber"
            placeholder="Mobile"
            value={formData.mobileNumber}
          />
          {error.mobileNumber && <p className="text-red-500 text-center">Mobile Number is required</p>}

          <div className="flex items-center gap-2 my-2">
            <input
              onChange={handleChange}
              className="cursor-pointer"
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms}
            />
            <label className="text-sm cursor-pointer" htmlFor="terms">
              I agree to the <span style={green}>Terms of Service</span> and <span style={green}>Privacy Policy</span>
            </label>
          </div>
          {error.terms && <p className="text-red-500 text-center">Please Accept Terms and Conditions</p>}

          <button className="bg-[#72DB73] rounded-full py-2 text-lg font-bold cursor-pointer" type="submit">
            SIGN UP
          </button>
        </form>

        {/* Terms & Conditions */}
        <div className="text-gray-400 text-sm text-center mt-3 text-start flex flex-col gap-3">
          <p>
            By clicking on Sign up, you agree to Superapp's{" "}
            <span style={green}>Terms and Conditions of Use</span>
          </p>
          <p>
            Learn more about how Superapp collects, uses, and protects your personal data in our{" "}
            <span style={green}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
