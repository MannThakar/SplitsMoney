/* eslint-disable no-unused-vars */
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import Modal from "../../component/pages/modal";
import { useEffect, useState } from "react";
import axios from "axios";

const GroupInfo = () => {
  const navigate = useNavigate();
  //   const location = useLocation();
  // const { name, description } = location.state;
  const { id } = useParams();
  const [modals, setModals] = useState(false);
  const [group, setGroup] = useState(null);

  const getGroupApi = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    setGroup(res.data);
  };

  useEffect(() => {
    getGroupApi();
  }, [id]);

  return (
    <div>
      <div className="flex w-full bottom-0 justify-between px-3 pt-3 h-20 bg-BrandColor">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate("/home")}
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              d="m6.8 13l2.9 2.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L6.8 11H20q.425 0 .713.288T21 12t-.288.713T20 13z"
            />
          </svg>
        </button>
        <Link to={`/groups/${id}/settings`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate("/settings")}
            width="29"
            height="29"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.487 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"
            />
          </svg>
        </Link>
      </div>
      <div className="w-16 h-16 absolute bg-red-500 top-10 left-12 rounded-2xl"></div>

      {/* Group name and description */}
      <div className="relative top-8">
        <div className="absolute left-12">
          <h1 className="font-poppins text-lg">{group?.name}</h1>
          <h2 className="font-poppins text-sm">{group?.description}</h2>
        </div>
      </div>
      <div className="absolute right-5 bottom-20 flex">
        <button
          className="h-10 flex items-start w-44 px-5 pt-1 py-1 font-poppins text-base bg-BrandColor text-black hover:text-white hover:bg-red-300  rounded-xl"
          onClick={() => navigate("/addexpense")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 48 48"
          >
            <g fill="none" stroke="black">
              <path d="m16.517 14.344l7.705-4.8l10.274 8.688v12.566l-5.967 4.836V23.817zm9.541-5.086L31.9 5.646l10.46 7.293l-6.433 4.926m.277 10.748l6.296-5.14m-6.296 2.479l6.296-5.14m-6.296 2.48l6.296-5.14m-6.296 2.48l6.296-5.14" />
              <path d="m35.314 14.172l2.723-2.077l-1.865-1.247l-1.498 1.131M5.5 31.954l13.543 10.4l7.423-5.91" />
              <path d="m5.5 29.285l13.543 10.4l7.423-5.91" />
              <path d="m5.604 26.616l13.543 10.401l7.423-5.91" />
              <path d="m5.59 23.948l13.542 10.4l7.423-5.91m-6.32-4.688c-.226 1.027-1.694 1.554-3.278 1.175h0c-1.584-.378-2.685-1.517-2.459-2.545c.226-1.027 1.694-1.553 3.278-1.175s2.685 1.518 2.459 2.545" />
              <path d="m15.051 15.826l-9.295 5.595l13.331 10.117l7.64-6.015" />
            </g>
          </svg>
          Add Expense
        </button>
      </div>

      {/* Add member button */}
      <a
        className="relative top-56 gap-4 flex items-center justify-center"
        onClick={() => setModals(true)}
      >
        <div className="rounded-full h-10 w-10 justify-center p-2 items-center bg-red-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              onClick={() => navigate("/creategroup")}
              d="M12.5 11.95q.725-.8 1.113-1.825T14 8t-.387-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8t-1 2.625t-2.5 1.325M18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2zM8 12q-1.65 0-2.825-1.175T4 8t1.175-2.825T8 4t2.825 1.175T12 8t-1.175 2.825T8 12m-8 8v-2.8q0-.85.438-1.562T1.6 14.55q1.55-.775 3.15-1.162T8 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20z"
            />
          </svg>
        </div>
        <h3 className="font-poppins text-lg">Add group members</h3>
      </a>

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

      {modals && <Modal onClose={() => setModals(false)} ids= {id} />}

    </div>
  );
};

export default GroupInfo;
