import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { Users } from 'lucide-react';
import { ReceiptText } from 'lucide-react';
import { UserContext } from '../utils/usercontext';
import { useContext } from 'react';

const CreateGroup = () => {
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
            .required('Group Name is required'),
        description: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
            .required('Description is required'),
    });

    const HandleSubmit = async ({ name, description }, { setSubmitting }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/groups`, {
                name,
                description,
            }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                },
            });

            console.log(response);

            if (response.status === 200) {
                const data = {
                    ids: response.data.group.id,
                    name: response.data.name,
                    info: response.data.description,
                };
                const userInformation = {
                    username: response.data.owner.name,
                    useremail: response.data.owner.email,
                };
                setUserData(userInformation);
                setTimeout(() => navigate('/home'), 5000);
                navigate('/home', { state: data });
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
        setSubmitting(false);
    };

    return (
        <div className="bg-primaryColor min-h-screen flex flex-col items-center">
            <div className="py-3 flex gap-2 px-2 w-full">
                <Toaster position='top-center' toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }} />
                <button className='flex items-center flex-row-reverse gap-2' onClick={() => navigate('/home')}>
                    <h2 className='text-white text-base font-satoshi'>back</h2>
                    <ArrowLeft className='text-white' />
                </button>
            </div>
            <h1 className="font-santoshi text-white text-2xl flex justify-center items-center mb-4">Create a group</h1>
            <div className="w-full max-w-md px-4">
                <Formik
                    initialValues={{ name: '', description: '' }}
                    validationSchema={validationSchema}
                    onSubmit={HandleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full">
                            <div className='py-4 flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <Users className='text-white' />
                                    <Field type='text' name="name" className="w-full p-2 border-b-2 bg-transparent font-satoshi text-white" placeholder="Group name" />
                                </div>
                                <div className='flex justify-center'>
                                    <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                                </div>

                                <div className='flex items-center gap-3'>
                                    <ReceiptText className='text-white' />
                                    <Field type='text' name="description" className="w-full p-2 border-b-2 bg-transparent font-satoshi text-white" placeholder="Group description" />
                                </div>
                                <div className='flex justify-center'>
                                    <ErrorMessage name="description" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type='submit' className="text-xl w-full md:w-1/2 py-2 md:py-4 h-10 flex items-center justify-center rounded-full bg-buttonColor font-santoshi font-semibold text-black" disabled={isSubmitting}>
                                    {isSubmitting ? 'Wait...' : 'Done'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateGroup;
