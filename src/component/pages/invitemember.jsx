
// import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import VerifyLoaderComponent from '../utils/VerifyLoaderComponent'
=======
import VerifyLoaderComponent from '../utils/verifyloadercomponent'
>>>>>>> 5822a1837d6e3ac803a8a8c011116fdd15ff5424
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
<<<<<<< HEAD
                    
=======

>>>>>>> 5822a1837d6e3ac803a8a8c011116fdd15ff5424
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
            < VerifyLoaderComponent />
        </>
    )
}

export default GroupInvite;