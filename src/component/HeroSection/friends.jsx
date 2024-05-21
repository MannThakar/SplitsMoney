/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UsersRound, UserRound, CircleUserRound } from 'lucide-react';
import axios from 'axios';

const Friends = () => {
    const [group, setGroup] = useState([]);
    const navigate = useNavigate();

    const getGroupApi = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            setGroup(res.data);  // Assuming the data you need is in res.data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getGroupApi();
    }, []);

    return (
        <div className='bg-primaryColor min-h-screen'>
            <div className='py-3 px-2 flex gap-2'>
                <ArrowLeft className='text-white' onClick={() => navigate('/home')} />
                <h2 className='text-white text-base font-satoshi'>back</h2>
            </div>

            <div className='p-4'>
                <h2 className='text-white text-2xl font-satoshi mb-4'>Friends List</h2>
                {group.length > 0 ? (
                    <div className='grid grid-cols-1 gap-4'>
                        {group.map((item, index) => (
                            <div key={index} className='bg-boxColor p-4 flex flex-col gap-2 rounded-md shadow-md'>
                                <div className='flex gap-2'>
                                    <User className='text-white' />
                                    <h3 className='text-white text-xl font-semibold'>{item.name}</h3>
                                </div>
                                <div className='flex gap-2'>
                                    <Mail className='text-white' />
                                    <p className='text-white text-sm font-satoshi'>{item.email}</p>
                                </div>
                                {/* <p className='text-white text-sm font-satoshi'>{item.phone}</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-white font-satoshi'>No friends found.</p>
                )}
            </div>

            <div className="flex justify-around w-full fixed bottom-0 bg-primaryColor py-2">
                <button className='flex flex-col justify-center items-center'>
                    <UsersRound onClick={() => navigate('/group')} className='text-white' />
                    <span className="flex justify-start font-satoshi text-white">Groups</span>
                </button>

                <button className="flex flex-col justify-center items-center">
                    <UserRound onClick={() => navigate("/friends")} className='text-white' />
                    <span className="flex justify-start font-satoshi text-white">Friends</span>
                </button>

                <button className="flex flex-col justify-center items-center">
                    <CircleUserRound onClick={() => navigate("/accounts")} className='text-white' />
                    <span className="flex justify-start font-satoshi text-white">Account</span>
                </button>
            </div>
        </div>
    );
}

export default Friends;
