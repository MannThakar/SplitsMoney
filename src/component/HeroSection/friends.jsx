import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { UsersRound } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';


const Friends = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-primaryColor h-svh'>
            <div className='py-3 px-2 flex gap-2'>
                <ArrowLeft className='text-white' onClick={() => navigate('/home')} />
                <h2 className='text-white text-base font-satoshi'>back</h2>
            </div>

            <div className="flex justify-around w-full fixed bottom-0">
                <button className='flex flex-col justify-center items-center'>
                    <UsersRound onClick={() => navigate('/group')} className='text-white' />
                    <span className="flex justify-start font-satoshi text-white">Groups</span>
                </button>


                <button className="flex flex-col justify-center items-center">
                    <UserRound onClick={() => navigate("/friends")} className='text-white' />
                    <span className="flex justify-start font-satoshi text-white">Friends</span>
                </button>

                <button className="flex flex-col justify-center items-center" >
                    <CircleUserRound onClick={() => navigate("/accounts")} className='text-white' />
                    <span className="flex justify-start font-satoshi text-white">Account</span>
                </button>
            </div>

        </div>
    );
}

export default Friends;
