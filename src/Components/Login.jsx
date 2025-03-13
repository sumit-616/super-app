import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import loginImage from '../images/login.png';
import {toast} from 'react-hot-toast';
import '../index.css';
import './Login.css';

const green = {
  color: '#72DB73',
};

const Login = () => {
  const navigate = useNavigate ();
  const [formData, setFormData] = useState ({
    name: '',
    userName: '',
    email: '',
    mobileNumber: '',
    terms: false,
  });
  const [error, setError] = useState ({
    name: false,
    userName: false,
    email: false,
    mobileNumber: false,
    terms: false,
  });

  function handleSubmit (event) {
    event.preventDefault ();
    setError ({
      name: false,
      userName: false,
      email: false,
      mobileNumber: false,
      terms: false,
    });
    let newErrors = {};
    if (formData.name.trim ().length == 0) {
      newErrors.name = true;
    }
    if (formData.userName.trim ().length == 0) {
      newErrors.userName = true;
    }
    if (formData.email.trim ().length == 0) {
      newErrors.email = true;
    }
    if (formData.mobileNumber.trim ().length == 0) {
      newErrors.mobileNumber = true;
    }
    if (!formData.terms) {
      newErrors.terms = true;
    }
    if (Object.keys (newErrors).length > 0) {
      setError (prevErrors => ({...prevErrors, ...newErrors}));
      return;
    }
    console.log (formData);
    localStorage.setItem ('user', JSON.stringify (formData));
    toast.success ('User created successfully');
    navigate ('/genre', {state: {userData:formData}});
  }
  
  function handleChange (event) {
    const {name, value, type, checked} = event.target;
    setFormData ((prevData) => ({...prevData, [name]: type==="checkbox" ? checked : value}));
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-black text-white">
      <div className="relative w-1/2 h-screen overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={loginImage}
          alt="Login Image"
        />
        <h1 className="absolute bottom-[11vh] left-[3vw] text-5xl font-black leading-14">
          Discover new things on <br /> Superapp
        </h1>
      </div>
      <div className="flex flex-col w-1/2 h-screen py-auto px-[11vw]">
        <div className="flex flex-col justify-center items-center gap-2 py-5">
          <h1
            style={{...green, fontFamily: 'Single Day', color: '#72DB73'}}
            className="text-5xl"
          >
            Super app
          </h1>
          <p className="text-2xl font-bold">Create your new account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1vh]">
          <input
            onChange={handleChange}
            className="border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
          />
          <p className="text-[#ff0000] text-center">
            {error.name ? `Name is required` : ''}
          </p>
          <input
            onChange={handleChange}
            className="border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]"
            type="text"
            name="userName"
            placeholder="UserName"
            value={formData.userName}
          />
          <p className="text-[#ff0000] text-center">
            {error.userName ? `UserName is required` : ''}
          </p>
          <input
            onChange={handleChange}
            className="border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
          />
          <p className="text-[#ff0000] text-center">
            {error.email ? `Email is required` : ''}
          </p>
          <input
            onChange={handleChange}
            className="border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]"
            type="number"
            name="mobileNumber"
            placeholder="Mobile"
            value={formData.mobileNumber}
          />
          <p className="text-[#ff0000] text-center">
            {error.mobileNumber ? `Mobile Number is required` : ''}
          </p>
          <div className="flex gap-3 my-2">
            <input
              onChange={handleChange}
              className="cursor-pointer"
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms}
            />
            <label className="text-[0.92rem] cursor-pointer" htmlFor="terms">
              I agree to the
              {' '}
              <span style={green}>Terms of Service</span>
              {' '}
              and
              {' '}
              <span style={green}>Privacy Policy</span>
            </label>
          </div>
          <p className="text-[#ff0000] text-center">
            {error.terms ? `Please Accept Terms and Conditions` : ''}
          </p>
          <button
            className="bg-[#72DB73] rounded-[28px] py-2 text-[22px] font-bold my-0.5 font-[Roboto] cursor-pointer"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
        <div className="flex flex-col text-[#7c7c7c] gap-1.5 my-2">
          <p>
            By clicking on Sign up. You agree to Superapp
            {' '}
            <span style={green}>Terms and Conditions of Use</span>
          </p>
          <p>
            To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp
            {' '}
            <span style={green}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
