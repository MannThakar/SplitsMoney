/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { UserContext } from '../utils/usercontext';
import { useContext, useState, useEffect } from 'react';
import { User, Mail, Smartphone, Pencil } from 'lucide-react';
import AccountModal from '../modal/accountmodal'
import axios from 'axios'

const Account = () => {
    const [isEdit, setIsEdit] = useState(false);
    const getAccountDetail = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API}/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            setName(res.data.name)
            setEmail(res.data.email)
            setPhone(res.data.phone_no)
            console.log(res)
        } catch (error) {
            console.log('Error fething data:', error)
        }
    }
    useEffect(() => {
        getAccountDetail();
    }, [isEdit]);

    const [modal, setModal] = useState(false);
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('Token');
        navigate('/signin');
    };


    return (
        <div className="bg-primaryColor h-svh flex flex-col">

            <div className='flex justify-between px-3'>
                <button className="py-3 flex items-center  gap-2 bg-primaryColor" onClick={() => navigate('/home')}>
                    <ArrowLeft className="text-white" />
                    <h2 className="text-white text-base font-satoshi">back</h2>
                </button>
                <button className=''>
                    <Pencil className='text-white size-5' onClick={() => setModal(true)} />
                </button>
            </div>

            <div className="px-4 flex flex-col items-center md:items-start">
                <h2 className="font-satoshi text-white py-2 text-2xl">Account</h2>
                <hr className="w-full" />

                <div className='flex gap-6 py-5 items-center w-full'>
                    {getAccountDetail ? (
                        <>
                            <div className='flex flex-col gap-5'>
                                <div className='flex gap-3'>
                                    <User className='text-white' />
                                    <h1 className='text-sm font-poppins text-slate-400'>{name}</h1>
                                </div>
                                <div className='flex gap-3'>
                                    <Mail className='text-white' />
                                    <h2 className='text-sm font-poppins text-slate-400'>{email}</h2>
                                </div>
                                <div className='flex gap-3'>
                                    <Smartphone className='text-white' />
                                    <h2 className='text-sm font-satoshi text-slate-400'>{phone}</h2>
                                </div>

                            </div>
                        </>
                    ) : (
                        <span className='text-white'>Loading...</span>
                    )}

                </div>
                <div className="flex gap-5 items-center w-full">
                    <LogOut className="text-red-500" />
                    <button type="button" onClick={handleLogout} className="md:w-1/6 py-2 w-1/2 md:py-4 rounded-full bg-buttonColor font-satoshi text-lg text-black">
                        Logout
                    </button>
                </div>
            </div>
            {modal && <AccountModal onClose={() => setModal(false)}  isEdit={isEdit} setIsEdit={setIsEdit} />}
        </div>
    );
};

export default Account;
