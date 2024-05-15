/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function Modal({ onClose }) {
    const modalRef = useRef();
    const [email, setEmail] = useState('');

    async function groupInvite(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://35.154.22.58/api/v1/invite-group-member`,
                { email, group_id: 14 }, // Assuming group_id is a constant
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: `Bearer ${localStorage.getItem('Token')}`
                    }
                }
            );


            if (response.status == 200) {
                toast.success('Invitation sent successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });

            } else {
                toast.error('Error while sending invitation', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
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
            <div className='flex flex-col w-11/12 h-64 gap-3 mx-auto mt-12 bg-BrandColor items-center '>
                <div className='flex justify-end pt-3 pr-3 w-full'>
                    <button onClick={onClose} className=''>
                        <X />
                    </button>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1>Invite other members too.</h1>
                        <p>Invite the other members via mail.</p>
                    </div>
                    <form onSubmit={groupInvite} className='pt-2'>
                        <input type="email" placeholder='Enter the email' className='p-2' required onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit" className='p-2 text-white bg-black rounded-sm'>Invite</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;