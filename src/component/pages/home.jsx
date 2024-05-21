/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useLocation } from "react-router-dom";
import { Users } from 'lucide-react'
import Navigations from "./navigation";
import { UsersRound } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';

const Home = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [runEffect, setRunEffect] = useState(true);
  const groupId = params.groupId;
  const [res, setRes] = useState([]);
  const colors = ["#7c3aed", "#0891b2", "#16a34a", "#ea580c"];

  const isActive = (path) => location.pathname === path ? 'text-highlightColor' : 'text-white';

  console.log("Current Path:", location.pathname);

  //View Group
  async function viewGroup() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/groups`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setRes(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    viewGroup();
  }, []);

  //Delete Group
  // const handleDelete = async (id) => {
  //   let del = confirm("Are you sure!!");
  //   if (del) {
  //     try {
  //       const res = await axios.delete(
  //         `${import.meta.env.VITE_API}/groups/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //           },
  //         }
  //       );
  //       // console.log(res);
  //       toast.success("Deleted Successfully");
  //       viewGroup();
  //     } catch (error) {
  //       console.error("Error:", error);
  //       toast.error("An error occurred. Please try again later.");
  //     }
  //   } else {
  //     toast.error("You pressed cancel");
  //   }
  // };

  //Greeting to user
  // useEffect(() => {
  //   const Time = setTimeout(() => {
  //     toast.success('Welcome')
  //   }, 1000);
  //   return () => clearTimeout(Time);
  // }, [runEffect])


  return (
    <div className="bg-primaryColor h-svh">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="px-3 py-2 flex justify-between items-center flex-row-reverse  bg-opacity-50 backdrop-blur-sm">
        <button>
          <Users className="text-white" onClick={() => navigate('/groups/creategroup')} />
        </button>
        <div>
          <h1 className="text-xl text-white font-semibold">Groups Details</h1>
        </div>
      </div>
      {res.length ? (
        res.map((e, index) => (
          <div key={index} className="w-11/12 mx-auto mt-4">
            <Link to={`/groups/${e.id}`} className="block bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex gap-5 items-center">
                <div
                  className="flex w-14 h-14 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <h2 className="text-lg font-semibold text-white">{e.name}</h2>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="flex justify-center my-4">
          <h3 className="font-satoshi text-lg text-white">No group available</h3>
        </div>
      )}

      {/* <div className="flex justify-center items-center mt-6">
        <button
          className="bg-white bg-opacity-20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-md shadow-lg flex items-center gap-2 hover:bg-opacity-30 transition-all duration-300"
          onClick={() => navigate("/groups/creategroup")}
        >
          Start a new group
          <Users />
        </button>
      </div> */}

      <div className="flex justify-around w-full fixed bottom-0 bg-primaryColor p-2">
        <button className='flex flex-col justify-center items-center' onClick={() => navigate('/group')}>
          <UsersRound className={`${isActive('/group')}`} />
          <span className={`flex justify-start font-satoshi ${isActive('/group')}`}>Groups</span>
        </button>

        <button className="flex flex-col justify-center items-center" onClick={() => navigate("/friends")}>
          <UserRound className={`${isActive('/friends')}`} />
          <span className={`flex justify-start font-satoshi ${isActive('/friends')}`}>Friends</span>
        </button>

        <button className="flex flex-col justify-center items-center" onClick={() => navigate("/accounts")}>
          <CircleUserRound className={`${isActive('/accounts')}`} />
          <span className={`flex justify-start font-satoshi ${isActive('/accounts')}`}>Account</span>
        </button>
      </div>
      <div>

      </div>
    </div>

  );
};

export default Home;