
//Heli's code
const SplashScreen = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center mb-8">
                <div className="bg-gray-900 p-4 rounded-full mb-4">
                    <svg
                        className="h-16 w-16 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">splitMoney</h1>
                <p className="text-gray-400 text-center">
                    Effortlessly split expenses with friends
                </p>
            </div>
            <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-gray-600 animate-pulse mr-2"></div>
                <div className="h-2 w-2 rounded-full bg-gray-600 animate-pulse mr-2"></div>
                <div className="h-2 w-2 rounded-full bg-gray-600 animate-pulse"></div>
            </div>
        </div>
    );
};

export default SplashScreen;