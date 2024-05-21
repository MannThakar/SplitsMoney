/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Mail } from 'lucide-react';

function Modal({ onClose, ids }) {
    const modalRef = useRef();
    const [email, setEmail] = useState('');

    async function groupInvite(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://35.154.22.58/api/v1/invite-group-member`,
                { email, group_id: ids },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: `Bearer ${localStorage.getItem('Token')}`
                    }
                }
            );
            onClose(false)


            if (response.status == 200) {
                toast.success('Invitation sent successfully')

            } else {
                toast.error('Error while sending invitation')
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function closeModal(e) {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm ">
            <Toaster position='top-center' toastOptions={{
                duration: 2000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            }} />
            <div className='grow h-44'></div>
            <div className='w-11/12 md:w-1/5 h-56 py-3 px-4 rounded-xl mx-auto bg-primaryColor'>
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
                            <button type="submit" className='p-2 text-black w-24 flex justify-center items-center font-satoshi bg-buttonColor rounded-2xl'>Invite</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;