/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // Replace this with your actual authentication check logic
    return !!localStorage.getItem('Token');
};

const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/" /> : children;
};

export default PublicRoute;
