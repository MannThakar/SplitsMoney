/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UsersRound,
  UserRound,
  CircleUserRound,
  LogOut,
  User,
  Mail,
  Smartphone,
  Pencil,
} from "lucide-react";
import { useState, useEffect } from "react";
import AccountModal from "../modal/accountmodal";
import axios from "axios";
import LogoutModal from "../modal/Logout";
// import { Edit, BackIcon, UserIcon } from "../../icons";

const Account = () => {
  const isActive = (path) =>
    location.pathname === path ? "text-highlightColor" : "text-white";
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const getAccountDetail = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone_no);
      console.log(res);
    } catch (error) {
      console.log("Error fething data:", error);
    }
  };
  useEffect(() => {
    getAccountDetail();
  }, [isEdit]);

  const [modal, setModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    const f = "Token";
    if (f == "Token") {
      localStorage.removeItem("Token");
    } else {
      localStorage.removeItem("Token");
    }
    navigate("/signin");
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start  px-4">
      <div className="absolute top-4 right-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
          onClick={() => setModal(true)}
        >
          <Pencil />
        </button>
      </div>
      <div className="absolute top-4 left-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
      </div>
      {logout && (
        <LogoutModal
          onLogout={handleLogout}
          onCancel={() => setLogout(false)}
        />
      )}
      {modal && (
        <AccountModal
          onClose={() => setModal(false)}
          id={id}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      <div className=" text-white rounded-lg shadow-lg p-8 w-full max-w-md mt-24">
        <h2 className="text-3xl font-bold mb-6 text-center">Account Details</h2>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
            <User />
          </div>
          <p className="text-lg flex-grow">{name}</p>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
            <Mail />
          </div>
          <p className="text-lg flex-grow">{email}</p>
        </div>
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
            <Smartphone />
          </div>
          <p className="text-lg flex-grow">{phone}</p>
        </div>
        <button
          className="bg-white hover:bg-red-700 text-black font-bold py-3 px-6 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setLogout(true)}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-around w-full fixed bottom-0 bg-primaryColor p-2">
        <button
          className="flex flex-col justify-center items-center"
          onClick={() => navigate("/")}
        >
          <UsersRound className={`size-5 ${isActive("/")}`} />
          <span
            className={`flex justify-start text-base font-satoshi ${isActive(
              "/"
            )}`}
          >
            Groups
          </span>
        </button>

        <button
          className="flex flex-col justify-center items-center"
          onClick={() => navigate("/friends")}
        >
          <User className={`size-5 ${isActive("/friends")}`} />
          <span
            className={`flex justify-start text-base font-satoshi ${isActive(
              "/friends"
            )}`}
          >
            Friends
          </span>
        </button>

        <button
          className="flex flex-col justify-center items-center"
          onClick={() => navigate("/accounts")}
        >
          <CircleUserRound className={`size-5 ${isActive("/accounts")}`} />
          <span
            className={`flex justify-start text-base font-satoshi ${isActive(
              "/accounts"
            )}`}
          >
            Account
          </span>
        </button>
      </div>
    </div>
  );
};

export default Account;
