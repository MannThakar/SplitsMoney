/* eslint-disable no-undef */

// import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const GroupInvite = () => {
    const { token } = useParams()
    const navigate = useNavigate();
    console.log(token)

    useEffect(() => {
        checkInvitation();
    }, [])
    // const token = localStorage.getItem('Invite Token');

    async function checkInvitation() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/invite-group/?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ token: token })
            });

            const responseData = await response.json(); // Assuming the response is JSON

            if (response.status === 400) {
                localStorage.setItem('member-token', token)
                navigate('/signup');
            } else if (response.status === 200) {
                console.log('Invitation sent successfully');
            } else {
                console.log('Error while sending invitation');
            }

            console.log('Response:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div>GroupInvite</div>
            <p>{token}</p>
        </>
    )
}

export default GroupInvite;