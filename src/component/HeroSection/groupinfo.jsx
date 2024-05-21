/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import Modal from "../../component/modal/modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from 'lucide-react';
import { Settings } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { ReceiptText } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';



const GroupInfo = () => {
  const navigate = useNavigate();
  //   const location = useLocation();
  // const { name, description } = location.state;
  const { id } = useParams();
  const [modals, setModals] = useState(false);
  const [group, setGroup] = useState(null);
  const isActive = (path) => location.pathname === path ? 'text-highlightColor' : 'text-white';

  console.log("Current Path:", location.pathname);

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
    <div className='h-svh bg-primaryColor'>
      <div className="flex w-full bottom-0 justify-between px-3 pt-3">
        <button className='flex items-center flex-row-reverse gap-2' onClick={() => navigate('/home')}>
          <h2 className='text-white text-base font-satoshi'>back</h2>
          <ArrowLeft className='text-white' />
        </button>
        <Link to={`/groups/${id}/settings`}>
          <Settings onClick={() => navigate('/settings')} className='text-white' />
        </Link>
      </div>
      <div className="w-16 h-16 absolute bg-red-500 top-14 left-10 rounded-2xl"></div>

      {/* Group name and description */}
      <div className="relative top-24">
        <div className="absolute left-10">
          <h1 className="font-satoshi text-lg text-white">{group?.name}</h1>
          <h2 className="font-satoshi text-sm text-white">{group?.description}</h2>
        </div>
      </div>
      <div className="absolute right-5 bottom-20 flex flex-row">


        <div className='flex flex-col'>
          <button className='text-black w-40 font-satoshi bg-buttonColor gap-1 py-2 flex justify-center items-center rounded-full' onClick={() => navigate('/addexpense')}><ReceiptText className='text-black' />Add expense</button>
        </div>

      </div>

      {/* Add member button */}
      <a
        className="relative top-56 gap-4 flex items-center justify-center"
        onClick={() => setModals(true)}
      >
        <button className="flex gap-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 shadow-lg px-4">
          <UserRoundPlus className='text-white' />
          <h3 className="font-satoshi text-lg flex items-center text-white hover:text-black">Add group members</h3>
        </button>
      </a>


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

      {modals && <Modal onClose={() => setModals(false)} ids={id} />}

    </div>
  );
};

export default GroupInfo;
