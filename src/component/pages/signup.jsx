/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// Define the Yup schema for validation
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/@.*\.com$/, { message: 'Email must include "@" and end with ".com"' })
    .required('Email is required'),
});

// Define the Zod schema for phone number validation
const phoneSchema = z.object({
  phone_no: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' }),
});

// Custom validation function combining Yup and Zod
const validate = async (values) => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
  } catch (yupError) {
    return yupError.inner.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
  }

  try {
    phoneSchema.parse(values);
  } catch (zodError) {
    return zodError.errors.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
  }

  return {};
};

function SignUp() {
  const navigate = useNavigate();
  const type = 'verification';

  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, email, phone_no } = values;

    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/send-otp?phone_no=${phone_no}&type=${type}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      if (response.status === 200) {
        const data = {
          otps: response.data.otp,
          name,
          email,
          phone_no,
          type,
        };
        setTimeout(() => navigate('/otp', { state: data }), 2000);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error:', error);
    }

    setSubmitting(false);
  };

  return (
    <div className="w-full">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 7000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <div className="h-svh mx-2 p-9 rounded-2xl shadow-md bg-BrandColor">
        <h2 className="mb-4 text-3xl font-semibold text-center font-poppins">Sign Up</h2>
        <Formik
          initialValues={{ type: '', phone_no: '', name: '', email: '' }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="flex justify-start mb-2 text-base font-medium font-poppins">
                  Name
                </label>
                <Field type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="name" component="div" className="text-sm flex justify-start text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="flex justify-start mb-2 font-medium font-poppins">
                  Email
                </label>
                <Field type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="email" component="div" className="text-sm flex justify-start text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone_no" className="flex justify-start mb-2 font-medium font-poppins">
                  Mobile No
                </label>
                <Field
                  type="number"
                  id="phone_no"
                  name="phone_no"
                  inputMode="numeric"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setFieldValue('phone_no', value);
                    }
                  }}
                />
                <ErrorMessage name="phone_no" component="div" className="text-sm flex justify-start text-red-500" />
              </div>

              <button
                type="submit"
                className="w-full py-2 font-medium text-white rounded-md bg-buttonColor hover:bg-red-600 font-poppins"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <h2 className="pt-4 text-sm flex justify-center gap-1 font-medium text-black font-poppins">
                Already have an account? <Link to="/signin" className="text-blue-500">Log in</Link>
              </h2>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
