import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import Modal from "../../component/modal/modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Settings, UsersRound, UserRound, CircleUserRound, ReceiptText, UserRoundPlus } from 'lucide-react';

const GroupInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [modals, setModals] = useState(false);
  const [expense, setExpenseList] = useState('');
  const isActive = (path) => location.pathname === path ? 'text-highlightColor' : 'text-white';
  const groupColor = location.state?.color || '#7c3aed'; // Default color if none is passed

  const getGroupApi = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setGroup(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const expenseList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setExpenseList(res.data);
    } catch (error) {
      console.error("Expense List", error);
    }
  };

  useEffect(() => {
    getGroupApi();
    expenseList();
  }, [id]);

  return (
    <div className='h-svh bg-primaryColor'>
      <div className="flex w-full bottom-0 justify-between px-3 pt-3">
        <button className='flex items-center flex-row-reverse gap-2' onClick={() => navigate(-1)}>
          <h2 className='text-white text-base font-satoshi'>back</h2>
          <ArrowLeft className='text-white' />
        </button>
        <Link to={`/group/${id}/settings`} state={{ color: groupColor }}>
          <Settings className='text-white hover:text-textColor' />
        </Link>
      </div>

      <div
        className="w-14 h-14 absolute top-11 left-10 rounded-2xl"
        style={{ backgroundColor: groupColor }}
      ></div>

      <div className="relative top-16">
        <div className="absolute left-10">
          <h1 className="font-satoshi text-lg text-white">{group?.name}</h1>
          <h2 className="font-satoshi text-sm text-white">{group?.description}</h2>
        </div>
      </div>

      <div className="absolute right-5 bottom-20 flex flex-row">
        <div className='flex flex-col'>
          <Link to={`/group/${id}/addexpense`}>
            <button className='text-black w-40 hover:border-4 hover:border-textColor font-satoshi bg-buttonColor font-bold gap-1 py-2 flex justify-center items-center rounded-full'>
              <ReceiptText className='text-black' />Add expense
            </button>
          </Link>
        </div>
      </div>

      <a className="relative top-36 gap-4 flex items-center justify-center" onClick={() => setModals(true)}>
        <button className="flex gap-1 bg-white hover:border-4 hover:border-textColor backdrop-blur-sm rounded-2xl py-2 shadow-lg px-4">
          <UserRoundPlus className='text-black' />
          <h3 className="font-satoshi text-lg flex items-center font-bold bg-white text-black">Add group members</h3>
        </button>
      </a>
      <h2 className='text-white'>{expense}</h2>
      <div className="flex justify-around w-full fixed bottom-0 bg-primaryColor p-2">
        <button className="flex flex-col justify-center items-center" onClick={() => navigate("/")}>
          <UsersRound className={`size-5 ${isActive('/')}`} />
          <span className={`flex justify-start text-base font-satoshi ${isActive('/')}`}>Groups</span>
        </button>
        <button className="flex flex-col justify-center items-center" onClick={() => navigate("/friends")}>
          <UserRound className={`size-5 ${isActive('/friends')}`} />
          <span className={`flex justify-start text-base font-satoshi ${isActive('/friends')}`}>Friends</span>
        </button>
        <button className="flex flex-col justify-center items-center" onClick={() => navigate("/accounts")}>
          <CircleUserRound className={`size-5 ${isActive('/accounts')}`} />
          <span className={`flex justify-start text-base font-satoshi ${isActive('/accounts')}`}>Account</span>
        </button>
      </div>
      {modals && <Modal setOpenModal={setModals} groupId={id} />}
    </div>
  );
};

export default GroupInfo;
