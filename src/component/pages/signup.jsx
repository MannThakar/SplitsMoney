/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function SignUp() {
  const navigate = useNavigate();
  const type = 'verification'
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone_no: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  });



  const handleSubmit = async ({ name, email, phone_no }, { setSubmitting }) => {
    try {

      const response = await axios.get(`${import.meta.env.VITE_API}/send-otp?phone_no=${phone_no}&type=${type}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      if (response.status == 200) {
        const data = {
          otps: response.data.otp,
          name,
          email,
          phone_no,
          type
        }
        setTimeout(() => navigate("/otp", { state: data }), 2000)
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error:', error);
    }
    setSubmitting(false);
    const numberInput = document.getElementById('phone_no');


  }
  return (
    <div className="md:flex md:justify-center items-center h-screen">
      <Toaster position='top-center' toastOptions={{
        duration: 7000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }} />
      <div className="max-w-md h-svh mx-2 p-9 rounded-2xl shadow-md bg-BrandColor">
        <h2 className="mb-4 text-3xl font-semibold text-center font-poppins">Sign Up</h2>
        <Formik
          initialValues={{ type: '', phone_no: '', name: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="flex justify-start mb-2 text-base font-medium font-poppins">Name</label>
                <Field type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="name" component="div" className="text-sm flex justify-start text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="flex justify-start mb-2 font-medium font-poppins">Email</label>
                <Field type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="email" component="div" className="text-sm flex justify-start text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="flex justify-start mb-2 font-medium font-poppins">Mobile No</label>
                <Field type="tel" id="phone_no" min="1" max="10" maxLength="10" name="phone_no" inputMode="numeric" className="w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="phone_no" component="div" className="text-sm flex justify-start text-red-500" />
              </div>

              <button type="submit" className="w-full py-2 font-medium text-white rounded-md bg-buttonColor hover:bg-red-600 font-poppins" disabled={isSubmitting} >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <h2 className='pt-4 text-sm flex justify-center gap-1 font-medium text-black font-poppins'>Already have account?<Link to="/signin" className='text-blue-500'>Log in</Link></h2>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  );
}
export default SignUp;


