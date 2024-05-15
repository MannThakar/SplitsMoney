import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
const CreateGroup = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Group Name is required'),
        description: Yup.string().required('Description is required'),
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
                    info: response.data.description
                }
                setTimeout(() => navigate('/home'), 5000)
                navigate('/home', { state: data });

            }
        } catch (error) {
            toast.error('Something went wrong');
        }
        setSubmitting(false);
    };

    return (
        <div>
            <div className="py-3 flex gap-2 px-2 w-full">
                <Toaster position='top-center' toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }} />
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/home')} width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z" />
                    </svg>
                </div>
                <h1 className="font-poppins text-lg flex justify-center items-center">Create a group</h1>
            </div>
            <div>
                <Formik
                    initialValues={{ name: '', description: '' }}
                    validationSchema={validationSchema}
                    onSubmit={HandleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="container">
                            <label className="flex justify-start font-poppins text-sm mb-1">Group Name</label>
                            <Field type='text' name="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your Group name" />
                            <ErrorMessage name="name" component="div" className="text-sm flex justify-start text-red-500" />

                            <label className="flex justify-start font-poppins text-sm pt-3 mb-1">Group Description</label>
                            <Field type='text' name="description" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your Group description" />
                            <ErrorMessage name="description" component="div" className="text-sm flex justify-start text-red-500" />

                            <div className="flex justify-end pt-5">
                                <button type='submit' className="text-xl w-20 h-10 rounded-xl bg-BrandColor font-poppins text-black hover:text-white hover:bg-red-200 " disabled={isSubmitting}>
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
