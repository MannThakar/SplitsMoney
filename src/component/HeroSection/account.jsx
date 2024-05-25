/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UsersRound, UserRound, CircleUserRound, LogOut, User, Mail, Smartphone, Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import AccountModal from '../modal/accountmodal'
import axios from 'axios'
import LogoutModal from '../modal/Logout';

const Account = () => {
    const isActive = (path) => location.pathname === path ? 'text-highlightColor' : 'text-white';
    const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams()
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
    const [logout, setLogout] = useState(false);
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const navigate = useNavigate();
    const handleLogout = () => {
        const f = 'Token'
        if (f == 'Token') {
            localStorage.removeItem('Token');
        }
        else {
            localStorage.removeItem('Token')
        }
        navigate('/signin');
    };


    return (

        <div className="bg-black min-h-screen flex flex-col items-center justify-start  px-4">
            <div className="absolute top-4 right-4">
                <button
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
                    onClick={() => setModal(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>
            </div>
            <div className="absolute top-4 left-4">
                <button
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>
            </div>
            {logout && <LogoutModal onLogout={handleLogout} onCancel={() => setLogout(false)} />}
            {modal && <AccountModal onClose={() => setModal(false)} id={id} isEdit={isEdit} setIsEdit={setIsEdit} />}
            <div className=" text-white rounded-lg shadow-lg p-8 w-full max-w-md mt-24">
                <h2 className="text-3xl font-bold mb-6 text-center">Account Details</h2>
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <p className="text-lg flex-grow">{name}</p>
                </div>
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </div>
                    <p className="text-lg flex-grow">{email}</p>
                </div>
                <div className="flex items-center mb-8">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
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

                <button className="flex flex-col justify-center items-center" onClick={() => navigate("/")}>
                    <UsersRound className={`size-5 ${isActive('/')}`} />
                    <span className={`flex justify-start text-base font-satoshi ${isActive('/')}`}>Groups</span>
                </button>

                <button className="flex flex-col justify-center items-center" onClick={() => navigate("/friends")}>
                    <User className={`size-5 ${isActive('/friends')}`} />
                    <span className={`flex justify-start text-base font-satoshi ${isActive('/friends')}`}>Friends</span>
                </button>

                <button className="flex flex-col justify-center items-center" onClick={() => navigate("/accounts")}>
                    <CircleUserRound className={`size-5 ${isActive('/accounts')}`} />
                    <span className={`flex justify-start text-base font-satoshi ${isActive('/accounts')}`}>Account</span>
                </button>
            </div>
        </div>
    );
};

export default Account;
