/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import Modal from "../modal/modal";
// import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import UpdateModal from "../modal/updatemodal";
import { ArrowLeft } from 'lucide-react';

const Settings = () => {
    const [modal, setModal] = useState(false);
    const [modals, setModals] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [group, setGroup] = useState(null);

    const getGroupApi = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API}/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        });
        setGroup(res.data.name);
    };

    useEffect(() => {
        getGroupApi();
    }, [id]);

    //Delete Group
    const handleDelete = async (groupId) => {
        let del = confirm("Are you sure!!");
        if (del) {
            try {
                const res = await axios.delete(
                    `${import.meta.env.VITE_API}/groups/${groupId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`,
                        },
                    }
                );
                if (res.status === 200) {
                    navigate('/home'); // Redirect to home after deletion
                }

            } catch (error) {
                console.error("Error:", error);
                toast.error("An error occurred. Please try again later.");
            }
        } else {
            toast.error("You pressed cancel");
        }
    };

    return (
        <div className="bg-primaryColor h-svh">
            <div className='flex pt-3 pl-2 gap-2'>
                <ArrowLeft className='text-white' onClick={() => navigate('/home')} />
                <h2 className='text-white text-base font-satoshi'>back</h2>
            </div>
            <div className='px-4'>
                <div className="py-2">
                    <h4 className='font-santoshi font-semibold text-white text-2xl flex justify-center'>Group settings</h4>
                </div>
                <hr />

                {/* Group name and edit functionality*/}
                <div className='flex py-3 items-center justify-between'>
                    <div className='h-16 w-16 bg-red-400 rounded-2xl'> </div>
                    <span className="font-santoshi text-white text-lg">{group}</span>
                    <a><svg xmlns="http://www.w3.org/2000/svg" onClick={() => setModals(true)} width="28" height="28" viewBox="0 0 24 24"><path fill="gray" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L17.625 2.175L21.8 6.45L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" /></svg></a>
                </div>

                {/* Group member detail add people in group and email */}
                <div className='my-2'>
                    <span className="font-santoshi text-white text-lg">Group members</span>
                    <div className='space-y-5 my-2'>
                        <a className="flex gap-5 items-center" onClick={() => setModal(true)}>
                            <div className="rounded-full h-10 w-10 p-2 bg-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="black"
                                        className='text-textColor'
                                        onClick={() => navigate("/groups/creategroup")}
                                        d="M12.5 11.95q.725-.8 1.113-1.825T14 8t-.387-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8t-1 2.625t-2.5 1.325M18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2zM8 12q-1.65 0-2.825-1.175T4 8t1.175-2.825T8 4t2.825 1.175T12 8t-1.175 2.825T8 12m-8 8v-2.8q0-.85.438-1.562T1.6 14.55q1.55-.775 3.15-1.162T8 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-santoshi text-white text-lg">Add group members</h3>
                            </div>
                        </a>
                        <div>{modal && <Modal onClose={() => setModal(false)} />}</div>
                        {modals && <UpdateModal onClose={() => setModals(false)} ids={id} setGroup={setGroup} />}
                        <a className="flex space-x-5 items-center" onClick={() => handleDelete(id)}>
                            <div className='rounded-full h-10 w-10 p-2 bg-white flex justify-center'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="red"
                                        d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
                                    />
                                </svg>
                            </div>
                            <span className="font-santoshi text-white text-lg">Delete group</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
