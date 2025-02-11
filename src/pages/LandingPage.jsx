import React, { useEffect, useState, useRef } from 'react';
import logoIcon from '../assets/kalbe CH-logo-putih.png';
import { useNavigate } from "react-router";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MySvgComponent from '../assets/GambarLanding';

function LandingPage () {
    const navigate = useNavigate();
    const [connectionError, setConnectionError] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState(''); // '' | 'success' | 'error'
    const toastDisplayed = useRef(false);

    const checkConnection = async () => {
        try {
            const response = await Axios.get('http://10.126.15.137:8002/api/connection');
            const { db1, db2, db3, db4, postgresql } = response.data;
            
            const errors = [];
            //kirim pesan ke array error ceritanya, tergantung yang mana yg error
            if (db1 !== "YOMAN") errors.push("DB1 failed.");
            if (db2 !== "YOMAN") errors.push("DB2 failed.");
            if (db3 !== "YOMAN") errors.push("DB3 failed.");
            if (db4 !== "YOMAN") errors.push("DB4 failed.");
            if (postgresql !== "YOMAN") errors.push("PostgreSQL failed.");

            if (errors.length === 0) {
                setConnectionStatus('success');
                if (!toastDisplayed.current) {
                    toast.success("All connections are successful!");
                    toastDisplayed.current = true;
                }
            } else {
                setConnectionStatus('error');
                if (!toastDisplayed.current) {
                    toast.error(`Error: Connection to ${errors.join(', ')} failed.`);
                    toastDisplayed.current = true;
                }
            }
        } catch (error) {
            setConnectionStatus('error');
            if (!toastDisplayed.current) {
                toast.error("Error: Unable to connect to the server. Please check your connection and try again.");
                toastDisplayed.current = true;
            }
        }
    };

    useEffect(() => {
        checkConnection();
    }, []);

    const goLogin = () => {
        navigate("/login");
    };
    const goRegs = () => {
        navigate("/register");
    };
  
    
    return (

	<div className="min-h-screen bg-black relative overflow-hidden">
    <ToastContainer  draggable position="top-center"/>
    {connectionError && (
        <div className="bg-red-500 text-white p-4">
            Error: Unable to connect to the server. Please check your connection and try again.
        </div>
    )}
		<div className="fixed inset-0 pointer-events-none">
			<div className="w-[423px] h-[392px] left-[179px] top-[165px] absolute bg-[#008000] rounded-full blur-[201.80px] z-0" />
			<div className="w-[254px] h-[254px] left-[946px] top-[273px] absolute bg-[#009900] rounded-full blur-[201.80px] z-0" />
			<div className="w-[254px] h-[254px] left-[623px] top-[217px] absolute bg-[#005a00] rounded-full blur-[201.80px] z-0" />
			<div className="w-[254px] h-[254px] right-[434px] top-[300px] absolute bg-[#009900] rounded-full blur-[201.80px] z-0" />  
			<div className="w-[254px] h-[254px] right-[573px] top-[407px] absolute bg-[#005a00] rounded-full blur-[201.80px] z-0" />
			<div className="w-[254px] h-[254px] right-[354px] top-[509px] absolute bg-[#008000] shadow-[201.8px_201.8px_201.8px_rgba(0,0,0,0.25)] rounded-full blur-[201.8px] z-0"></div>
		</div>
		{/* Header */}
		<header className="sticky top-2 z-50">
			<div className="container mx-auto px-8 py-4">
				<div className="flex justify-between items-center">
					<div className="w-32">
						<img className="h-12 w-auto" src={logoIcon} alt="Logo" />
					</div>
					<div className="hidden md:flex space-x-4 items-center">
						<button
							onClick={goRegs}
							className="py-3 px-8 text-sm border-2 border-hijau hover:bg-hijau rounded text-white"
						>
							Sign Up
						</button>
						<button
							onClick={goLogin}
							className="py-3 px-8 text-sm bg-hijau hover:bg-hijau2 rounded text-white"
						>
							Login
						</button>
                        <div className={`w-9 h-9 rounded-full flex-shrink-0 self-center ${connectionStatus === 'success' ? 'bg-green-500' : connectionStatus === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
					</div>
				</div>
			</div>
		</header>
		{/* Main Content */}
		<main className="container mx-auto px-8 relative z-10 md:mt-4 xl:-mt-7">
			<div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-120px)]">
				{/* Left Content */}
                <div className="w-full xl:w-1/2 xl:pr-12">
                        <div className="text-center xl:text-left">
                            <h1 className="text-5xl lg:text-6xl xl:text-7xl xl:ml-8 font-bold leading-tight text-white font-jakarta mb-8">
                                HISTORICAL MACHINERY
                            </h1>
                            <div className="flex items-center justify-center xl:justify-start">
                                <div className="hidden xl:block w-0.5 h-28 bg-[#D9DBE1] mr-8 self-center"></div>
                                <p className="text-xl font-light text-white max-w-xl">
                                    Pantau dan kendalikan seluruh proses produksi Anda secara real-time dan historis. 
                                    Dapatkan data akurat dan visualisasi yang jelas untuk pengambilan keputusan yang lebih baik.
                                </p>
                            </div>
                            <div className="mt-8 flex justify-center xl:justify-center xl:ml-6">
                                <button
                                    onClick={goLogin}
                                    className="px-12 h-11 bg-hijau hover:bg-hijau2 rounded text-white"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
				 {/* SVG Section */}
                 <div className="w-full xl:w-1/2 mt-12 xl:mt-0">
                        <div className="max-w-2xl mx-auto">
                            <MySvgComponent />
                        </div>
				</div>
			</div>
		</main>
    </div>

  );
}

export default LandingPage