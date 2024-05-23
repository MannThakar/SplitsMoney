/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function UpdateModal({ onClose, setGroup }) {
    const modalRef = useRef();
    const [groupName, setGroupName] = useState('');
    const [groupDescr, setGroupDescription] = useState('');
    const { id } = useParams();

    async function viewGroup() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/groups/${id}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            setGroupName(response.data.name)
            setGroupDescription(response.data.description)
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        viewGroup();
    }, [id]);

    async function groupUpdate(e) {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API}/groups/${id}`,
                {
                    name: groupName,
                    description: groupDescr
                },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: `Bearer ${localStorage.getItem('Token')}`
                    }
                }


            );
            onClose(false);

            if (response.status == 200) {
                setGroup(groupName)
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


            <div className='flex flex-col w-11/12 rounded-xl h-64 gap-3 mx-auto mt-12 bg-BrandColor items-center'>
                <div className='flex justify-end pt-3 pr-3 w-full'>
                    <button onClick={onClose}>

                        <Toaster position='top-center' toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                        }} />
                        <div className='flex flex-col w-11/12 h-64 gap-3 mx-auto mt-12 bg-BrandColor items-center '>
                            <div className='flex justify-end pt-3 pr-3 w-full'>
                                <button onClick={onClose} className=''>

                                    <X />
                                </button>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div className='flex justify-center'>
                                    <h1 className='font-poppins text-base'>Update group details</h1>

                                </div>

                                <div className='flex justify-center'>
                                    <form onSubmit={groupUpdate} className='pt-2 flex flex-col leading-4 gap-4'>
                                        <input type="text" placeholder='Enter group name' className='p-2 rounded-md font-poppins' value={groupName} required onChange={(e) => setGroupName(e.target.value)} />
                                        <input type="text" placeholder='Enter group description' className='p-2 rounded-md font-poppins' value={groupDescr} required onChange={(e) => setGroupDescription(e.target.value)} />
                                        <div className='flex justify-center'>
                                            <button type="submit" className='p-2 text-white font-poppins rounded-lg w-24 hover:text-black hover:bg-sky-200 bg-black'>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

    )
}
export default UpdateModal;