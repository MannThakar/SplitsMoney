import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cover from '../../assets/cover.svg';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const type = 'login';

  const validationSchema = Yup.object().shape({
    phone_no: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

  });

  const handleSubmit = async ({ phone_no }, { setSubmitting }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/send-otp?phone_no=${phone_no}&type=${type}`, {
        phone_no, type
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      if (response.status === 200) {
        const data = {
          otps: response.data.otp,
          phone_no,
          type
        }
        setTimeout(() => navigate("/otp", { state: data }), 1000)
      }
      if (response.data.original === 'User does not exist') {
        toast.error("Please signup first")
      }
    } catch (error) {
      toast.error(error)
    }
    setSubmitting(false);
  };

  return (
    <div className="px-2">
      <Toaster position='top-center' toastOptions={{
        duration: 2000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }} />
      <div className="bg-BrandColor h-svh rounded-2xl mx-auto max-w-md">
        <h1 className="font-poppins text-3xl pt-5 font-semibold text-center">Login</h1>
        <Formik
          initialValues={{ phone_no: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="px-3">
              <div className="flex flex-col mt-6">
                <label htmlFor="mobile" className="flex justify-start mb-2 font-medium font-poppins">Mobile No</label>
                <Field type="tel" id="phone_no" min="1" max="10" maxLength="10" name="phone_no" inputMode="numeric" className="w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="phone_no" component="div" className="text-sm flex justify-start text-red-500" />
              </div>
              <button type="submit" className="font-poppins text-xl px-6 py-2 rounded-lg bg-buttonColor hover:bg-red-600 text-white mt-4 w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending OTP...' : 'Get OTP'}
              </button>
            </Form>
          )}
        </Formik>
        <h2 className='pt-4 text-sm gap-1 flex justify-center font-medium text-black font-poppins'>Dont have an account? <Link to="/signup" className='text-blue-500'>Register</Link></h2>
        <div className='flex justify-center mt-6'>
          <img src={cover} alt='image' className='max-w-full h-auto' />
        </div>
      </div>
    </div >
  );
}

export default SignIn;
