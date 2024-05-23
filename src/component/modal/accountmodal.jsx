/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { X, User, Mail, Smartphone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function AccountModal({ onClose, setGroup, isEdit, setIsEdit, id }) {
    const modalRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // const { id } = useParams();

    // Account Owner Information
    async function viewAccountStatus() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/me`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone_no);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        viewAccountStatus();
    }, [isEdit]);

    async function accountUpdate(e) {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API}/users/${id}`,
                {
                    name: name,
                    email: email,
                    phone_no: phone
                },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: `Bearer ${localStorage.getItem('Token')}`
                    }
                }
            );
            onClose(false);
            if (response.status === 200) {
                setIsEdit(!isEdit);
                onClose();
                toast.success('Group updated successfully');
            } else {
                toast.error('Error while updating group');
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
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                }}
            />
            <div className="bg-stone-800 w-11/12 h-80 py-4 md:w-2/5 rounded-xl mx-auto p-6">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <X className="text-white" />
                    </button>
                </div>
                <h1 className="text-center font-satoshi text-xl text-white mb-4">Account Update</h1>
                <form onSubmit={accountUpdate} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <User className="text-white" />
                        <input type="text" placeholder="Enter group name" className="flex-1 p-2 font-satoshi border-b-2 bg-transparent text-white" value={name} required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="text-white" />
                        <input type="email" placeholder="EMAIL" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" className="flex-1 p-2 font-satoshi border-b-2 bg-transparent text-white" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Smartphone className='text-white' />
                        <input
                            type='number'
                            placeholder="PHONE NO"
                            className='flex-1 p-2 font-mono border-b-2 bg-transparent text-white'
                            value={phone}
                            required
                            onChange={(e) => {
                                if (e.target.value.length <= 10) {
                                    setPhone(e.target.value);
                                }
                            }}
                            maxLength="10"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="w-2/4  p-2 text-black bg-buttonColor font-satoshi font-bold rounded-2xl">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountModal;
