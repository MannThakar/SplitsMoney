// import axios from 'axios'

// const axiosClient = axios.create({
//     baseURL: 124,
//     timeout: 30000,
//     headers: {
//         "Access-Control-Allow-Headers":
//             "Origin, X-Requested-With, Content-Type, Accept",

//         "X-Requested-With": "XMLHttpRequest",
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json; charset=utf-8",
//         Accept: "application/json",
//     },
// });

// axiosClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('Token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosClient;