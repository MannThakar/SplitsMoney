import { useNavigate } from 'react-router-dom'
// import notfound from '../../assets/Logo/footer.jpg'

const Account = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('Token')
        navigate('/signin')
    }
    return (
        <div>
            <div className='h-20 flex items-center pl-3 bg-BrandColor'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/home')} width="32" height="32" viewBox="0 0 24 24"><path fill="black" d="m6.8 13l2.9 2.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L6.8 11H20q.425 0 .713.288T21 12t-.288.713T20 13z" /></svg>

            </div>
            <h2 className='font-poppins py-5 text-2xl pl-4'>Account</h2>
            <hr />
            <div className='flex gap-6 py-5 items-center'>
                <div className="bg-slate-800 rounded-full h-8 w-8 ml-2"></div>
                <div>
                    <h1 className='text-lg font-poppins text-slate-400'>User Name</h1>
                    <h2 className='text-lg font-poppins text-slate-400'>email</h2>
                </div>
            </div>

            <hr />
            <div className="py-5 px-2 flex gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.354v6.65h7.442L17.72 9.28a.75.75 0 0 1-.073-.977l.073-.084a.75.75 0 0 1 .976-.072l.084.072l2.997 2.998a.75.75 0 0 1 .073.976l-.073.084l-2.996 3.003a.75.75 0 0 1-1.134-.975l.072-.084l1.713-1.717h-7.431L12 19.25a.75.75 0 0 1-.88.738l-8.5-1.501a.75.75 0 0 1-.62-.739V5.75a.75.75 0 0 1 .628-.74l8.5-1.396a.75.75 0 0 1 .872.74m-3.498 7.145a1.002 1.002 0 1 0 0 2.005a1.002 1.002 0 0 0 0-2.005M13 18.502h.765l.102-.007a.75.75 0 0 0 .648-.744l-.007-4.25H13zM13.002 10L13 8.725V5h.745a.75.75 0 0 1 .743.647l.007.101l.007 4.252z" /></svg>
                <button type='submit' onClick={handleLogout} className="w-32 rounded-xl border-2 hover:text-black hover:bg-red-300 font-poppins text-lg text-slate-400">Logout</button>
            </div>
            <div className='grow h-48'></div>
            {/* <footer className='sticky bottom-0'>
                <img src={notfound} alt='footer image' />
            </footer> */}
        </div>
    );
}

export default Account;