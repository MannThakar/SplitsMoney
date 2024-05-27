/* eslint-disable no-unused-vars */

// import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from "../utils/SplashScreen";
import axios from 'axios';
const GroupInvite = () => {

    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');


    useEffect(() => {
        checkInvitation();
    }, [])
    // const token = localStorage.getItem('Invite Token');

    async function checkInvitation() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API}/invite-group/?token=${token}`,
                { token: token },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );


            if (response.status === 400) {
                alert("Invalid Token")
            } else if (response.status === 200) {
                console.log(response)
                navigate('/');

                /* console.log('Invitation sent successfully'); */
            } else {
                console.log('Error while sending invitation');
            }


        } catch (error) {
            /* console.error('Error:', error); */
        }
    }

    return (
        <>
            <SplashScreen />
        </>
    )
}

export default GroupInvite;