import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddExpense = () => {
    const navigate = useNavigate();
    // check pull request 

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
        <div>
            <div className="flex gap-5 px-5 items-center bg-BrandColor h-20">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)} width="35" height="35" viewBox="0 0 24 24"><path fill="black" d="m6.8 13l2.9 2.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L6.8 11H20q.425 0 .713.288T21 12t-.288.713T20 13z" /></svg>
                <h2 className="text-xl font-poppins">Add expense</h2>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z" /></svg> */}
            </div>
            <div className='grow h-20'></div>

            <Formik
                initialValues={{ description: '', money: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form>
                        <div className='flex gap-2 justify-center flex-col items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 18h6q.425 0 .713-.288T16 17t-.288-.712T15 16H9q-.425 0-.712.288T8 17t.288.713T9 18m0-4h6q.425 0 .713-.288T16 13t-.288-.712T15 12H9q-.425 0-.712.288T8 13t.288.713T9 14m-3 8q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.587 1.413T18 22zm7-14V4H6v16h12V9h-4q-.425 0-.712-.288T13 8M6 4v5zv16z" /></svg>
                            <Field type='text' id='description' name='description' className='border-b w-48 border-gray-400' placeholder='Enter the description' value={values.description} onChange={handleChange}></Field>
                            <ErrorMessage name="description" component="div" className='text-sm flex justify-start text-red-500' />
                        </div>

                        <div className='flex justify-center items-center flex-col gap-2 mt-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13.66 7c-.56-1.18-1.76-2-3.16-2H6V3h12v2h-3.26c.48.58.84 1.26 1.05 2H18v2h-2.02c-.25 2.8-2.61 5-5.48 5h-.73l6.73 7h-2.77L7 14v-2h3.5c1.76 0 3.22-1.3 3.46-3H6V7z" /></svg>
                            <Field type='number' id='money' name='money' className='border-b border-gray-400' placeholder='0.00' value={values.money} onChange={handleChange}></Field>
                            <ErrorMessage name="money" component="div" className="text-sm flex justify-start text-red-500" />
                        </div>

                        <div className='mt-4 flex justify-end'>
                            <button type="submit" className="w-36 py-2 font-medium text-white rounded-md bg-buttonColor hover:bg-red-600 font-poppins" disabled={isSubmitting} >
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

