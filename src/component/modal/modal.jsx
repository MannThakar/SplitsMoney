/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function Modal({ onClose }) {
    const modalRef = useRef();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id)

    const [token, setToken] = useState(null);

    const groupInvite = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API}/invite-group-member`,
                { email, group_id: id },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: `Bearer ${localStorage.getItem('Token')}`
                    }
                }
            );

            if (response.status === 200) {
                const receivedToken = response.data.token;
                setToken(receivedToken);
                localStorage.setItem('Invite Token', receivedToken);

                const inviteResponse = axios.post(
                    `${import.meta.env.VITE_API}/invite-group/?token=${receivedToken}`,
                    { token: receivedToken },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }
                );

                if (inviteResponse.status === 200) {
                    console.log('Invitation sent successfully');
                    // toast.success('Invitation sent successfully');
                } else if (inviteResponse.status === 400) {
                    alert('Invalid invitation');
                    navigate('/signup');
                } else {
                    console.error('Error while sending invitation');
                    // toast.error('Error while sending invitation');
                    navigate('/signup');
                }
                onClose(false);
            } else {
                console.error('Error while sending invitation');
                // toast.error('Error while sending invitation');
            }
        } catch (error) {
            console.error('Error:', error);
            // toast.error('Error while sending invitation');
        }
    };




    function closeModal(e) {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-opacity-30 backdrop-blur-sm ">
            {/* <Toaster position='top-center' toastOptions={{
                duration: 2000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            }} /> */}
            <div className='grow h-44'></div>
            <div className='w-11/12 md:w-1/5 h-56 py-3 px-4 rounded-xl mx-auto bg-stone-800'>
                <div className='flex justify-end w-full'>
                    <button onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <h1 className='font-satoshi text-base text-white'>Invite other members too.</h1>
                        <p className='font-satoshi text-base text-white'>Invite the other members via mail.</p>
                    </div>
                    <form onSubmit={groupInvite} className='pt-2 flex flex-col justify-center gap-3'>
                        <div className='flex gap-3 items-center'>
                            <Mail className='text-white' />
                            <input type="email" placeholder='Enter the email' className='p-2 border-b-2 text-white bg-transparent w-full font-satoshi' pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" className='p-2 hover:border-4 hover:border-textColor  text-black w-24 flex justify-center items-center font-satoshi bg-buttonColor rounded-2xl'>Invite</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;