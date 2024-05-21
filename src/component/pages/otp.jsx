import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../utils/auth";

function Otp() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const codeInputs = useRef([]);
  // const back = useNavigate();
  const location = useLocation();
  const { otps, name, email, phone_no, type } = location.state;
  const navigate = useNavigate();
  const [otp, setotp] = useState(otps);
  const [loading, setLoading] = useState(false);

  async function resendotps() {
    const type = "login"
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/send-otp?phone_no=${phone_no}&type=${type}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      setotp(response.data.otp);
    } catch (error) {
      toast.error('This is an error!');
      console.error('Error:', error);
    }
  }
  const { storeToken } = useAuth()
  useEffect(() => {
    codeInputs.current[0].focus();
  }, []);
  const handleChange = (index, e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);
      if (value !== "" && index < 5) {
        codeInputs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && codes[index] === "") {
      codeInputs.current[index - 1].focus();
    }
  };
  const handleOtp = async () => {
    setLoading(true);
    const otp = codes.join("");
    try {
      if (type === 'verification') {
        const response = await axios.post(`${import.meta.env.VITE_API}/signup`, {
          otp, name, email, phone_no
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        if (response.status == 200) {
          let data = {
            token_data: response.data.token,
          }
          storeToken(data.token_data)
          setTimeout(navigate('/home', { state: data }), 3000)
          // toast.success("Welcome")
        }
        else {
          toast.error("Invalid OTP")
        }
      }
      if (type === "login") {
        const response = await axios.post(`${import.meta.env.VITE_API}/login`, {
          phone_no, otp
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        console.log(response)
        if (response.status === 200) {
          navigate('/home');
        } else {
          toast.error("Invalid OTP");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };
  return (
    <div className="px-2">
      <Toaster position='top-center' toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }} />
      <div className='p-3 my-2  px-8 mx-auto text-lg bg-green-300 rounded-lg w-32'> {otp}
      </div>
      <div className="p-8 bg-BrandColor rounded-2xl">
        <div className="flex flex-col justify-center">
          <h1 className="mx-2 text-2xl text-center text-black font-poppins">Verification Code</h1>
        </div>
        <div className="flex justify-center mt-2">
          <p className="text-sm font-normal text-center text-slate-800 text-wrap font-poppins">OTP sent to +91 {phone_no}</p>
        </div>
        <div className="flex justify-center space-x-1 mt-3">
          {codes.map((code, index) => (
            <input
              key={index}
              type="text"
              id={`verificationCode${index}`}
              name={`verificationCode${index}`}
              value={code}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(input) => (codeInputs.current[index] = input)}
              maxLength="1"
              autoComplete="off"
              className="w-11 h-11 text-2xl text-center border border-gray-300 md:w-16 md:h-16 rounded-2xl focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button className='p-2 mt-3 font-poppins bg-gray-300 rounded-md' onClick={resendotps}>Resend Otp</button>
        </div>
        <div className="flex pt-5 mx-2 font-thin rounded-xl">
          <button
            type="submit"
            className="w-full py-4 text-sm font-normal text-white bg-buttonColor rounded-2xl font-poppins"
            onClick={handleOtp}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;


