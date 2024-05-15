/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
const Home = () => {
  const params = useParams();
  const [runEffect, setRunEffect] = useState(true);
  const groupId = params.groupId;
  const [res, setRes] = useState([]);
  const colors = ["#7c3aed", "#0891b2", "#16a34a", "#ea580c"];

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
  
  const navigate = useNavigate();
  return (
    <div>
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
      <div className="px-3 py-1 flex flex-row-reverse border-b border-gray-300 justify-between">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="gray"
              onClick={() => navigate("/creategroup")}
              d="M12.5 11.95q.725-.8 1.113-1.825T14 8t-.387-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8t-1 2.625t-2.5 1.325M18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2zM8 12q-1.65 0-2.825-1.175T4 8t1.175-2.825T8 4t2.825 1.175T12 8t-1.175 2.825T8 12m-8 8v-2.8q0-.85.438-1.562T1.6 14.55q1.55-.775 3.15-1.162T8 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20z"
            />
          </svg>
        </div>
        <div className="flex justify-start">
          <h1 className="text-lg text-black flex justify-start font-semibold">
            Groups Details
          </h1>
        </div>
      </div>
      {res.length ? (
        res?.map((e, index) => {
          return (
            <>
              <div className="flex">
                <Link
                  className="flex gap-3 container mt-2"
                  to={`/groups/${e.id}`}
                >
                  <div
                    className="flex w-20 rounded-xl"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>

                  <h2 className="text-sm mt-2 flex justify-start items-center my-2 font-poppins text-black">
                    <span className="text-xl font-poppins text-zinc-800">
                      &nbsp; {e.name}
                    </span>
                  </h2>
                </Link>
              </div>
            </>
          );
        })
      ) : (
        <div className="flex justify-center my-4">
          <h3 className='font-poppins text-lg'>No group available</h3>
        </div>
      )}
      <>
        <div className="flex justify-center items-center">
          <div className="bg-white mt-2">
            <button
              className="h-10 px-5 font-poppins items-center rounded-lg text-base flex text-black bg-BrandColor hover:text-white hover:bg-red-200 flex-row-reverse gap-2"
              onClick={() => navigate("/creategroup")}
            >
              Start a new group
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="gray"
                  d="M12.5 11.95q.725-.8 1.113-1.825T14 8t-.387-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8t-1 2.625t-2.5 1.325M18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2zM8 12q-1.65 0-2.825-1.175T4 8t1.175-2.825T8 4t2.825 1.175T12 8t-1.175 2.825T8 12m-8 8v-2.8q0-.85.438-1.562T1.6 14.55q1.55-.775 3.15-1.162T8 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-around w-full fixed bottom-0">
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => navigate("/group")}
          >
            <svg
              className="flex items-center"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c.02.01.03.03.04.04c1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5"
              />
            </svg>
            <span className="flex justify-start font-poppins text-gray-400">
              Groups
            </span>
          </button>

          <button
            className="flex flex-col justify-center items-center"
            onClick={() => navigate("/friends")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
              />
            </svg>
            <span className="flex justify-start font-poppins text-gray-400">
              Friends
            </span>
          </button>

          <button
            className="flex flex-col justify-center items-center"
            onClick={() => navigate("/accounts")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
              />
            </svg>
            <span className="flex justify-start font-poppins text-gray-400">
              Account
            </span>
          </button>
        </div>
      </>
    </div>
  );
};

export default Home;
