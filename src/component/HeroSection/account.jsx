import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { UserContext } from '../utils/usercontext';
import { useContext, useState } from 'react';
import { User, Mail, Smartphone, Pencil } from 'lucide-react';
import AccountModal from '../modal/accountmodal'


const Account = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

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


            <button className='flex'>

            </button>
            <div className="px-4 flex flex-col items-center md:items-start">
                <h2 className="font-satoshi text-white py-2 text-2xl">Account</h2>
                <hr className="w-full" />

                <div className='flex gap-6 py-5 items-center w-full'>
                    {userData ? (
                        <>
                            <div className='flex flex-col gap-5'>
                                <div className='flex gap-3'>
                                    <User className='text-white' />
                                    <h1 className='text-sm font-poppins text-slate-400'>{userData.username}</h1>
                                </div>
                                <div className='flex gap-3'>
                                    <Mail className='text-white' />
                                    <h2 className='text-sm font-poppins text-slate-400'>{userData.useremail}</h2>
                                </div>
                                <div className='flex gap-3'>
                                    <Smartphone className='text-white' />
                                    <h2 className='text-sm font-satoshi text-slate-400'>8989896756</h2>
                                </div>

                            </div>
                        </>
                    ) : (
                        <span className='text-white'>Loading...</span>
                    )}

                </div>

                {/* <div className="md:flex md:flex-row gap-6 py-5 items-center w-full">
                    <div className="bg-zinc-700 rounded-full h-8 w-10"></div>
                    {userData ? (
                        <div className="text-center md:text-left">
                            <span className="text-base text-white font-satoshi block">{userData.username}</span>
                            <span className="text-base text-white font-satoshi block">{userData.useremail}</span>
                        </div>
                    ) : (
                        <span className="text-white">Loading...</span>
                    )}
                </div> */}
                <div className="flex gap-5 items-center w-full">
                    <LogOut className="text-red-500" />
                    <button type="button" onClick={handleLogout} className="md:w-1/6 py-2 w-1/2 md:py-4 rounded-full bg-buttonColor font-satoshi text-lg text-black">
                        Logout
                    </button>
                </div>
            </div>
            {modal && <AccountModal onClose={() => setModal(false)} />}
        </div>
    );
};

export default Account;
