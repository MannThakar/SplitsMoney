/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, FilePenLine, IndianRupee } from 'lucide-react';

const AddExpense = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        description: Yup.string().required('Description is required'),
        money: Yup.number().required('Amount is required').positive('Amount must be positive').integer('Amount must be an integer'),
    });

    const handleSubmit = async ({ description, money }, { setSubmitting }) => {
        try {
            console.log('Submitted Form:', { description, money });
        } catch (error) {
            console.error('Error:', error);
        }
        setSubmitting(false);
    };

    return (
        <div className="bg-primaryColor h-screen px-3 flex flex-col items-center">
            <div className="flex gap-2 pt-3 items-center w-full">
                <ArrowLeft className="text-white" onClick={() => navigate(-1)} />
                <h2 className="text-white text-base font-satoshi">back</h2>
            </div>
            <h2 className="text-xl my-5 font-poppins text-center text-white">Add expense</h2>

            <Formik
                initialValues={{ description: '', money: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form className="w-full max-w-md">
                        <div className="flex gap-3 justify-center items-center mb-3">
                            <FilePenLine className='text-white' />
                            <Field type="text" id="description" name="description" className="border-b w-full max-w-xs border-gray-400 p-2 bg-transparent text-white" placeholder="Enter the description" value={values.description} onChange={handleChange} />
                        </div>
                        <div className='flex justify-end w-full'>
                            <ErrorMessage name="description" component="div" className="text-sm text-red-500 w-full flex justify-around" />
                        </div>

                        <div className="flex gap-3 justify-center items-center mb-3">
                            <IndianRupee className='text-white' />
                            <Field type="number" id="money" name="money" className="border-b w-full max-w-xs border-gray-400 p-2 bg-transparent text-white" placeholder="0.00" value={values.money} onChange={handleChange} />
                        </div>
                        <div className='w-full flex justify-center'>
                            <ErrorMessage name="money" component="div" className="text-sm text-red-500 w-full flex justify-around" />
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="submit" className="w-36 py-2 font-medium text-black rounded-md bg-buttonColor font-poppins" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddExpense;
