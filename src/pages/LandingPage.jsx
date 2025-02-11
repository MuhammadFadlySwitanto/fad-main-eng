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
    const hasFetched = useRef(false);

    const checkConnection = async () => {
        try {
            const response = await Axios.get('http://10.126.15.137:8002/api/connection');
            const { db1, db2, db3, db4, postgresql } = response.data;

            if (db1 === "YOMAN") {
                toast.success("Connection to DB1 successful!");
            } else {
                toast.error("Error: Connection to DB1 failed.");
                setConnectionError(true);
            }
            
            if (db2 === "YOMAN") {
                toast.success("Connection to DB2 successful!");
            } else {
                toast.error("Error: Connection to DB2 failed.");
                setConnectionError(true);
            }

            if (db3 === "YOMAN") {
                toast.success("Connection to DB3 successful!");
            } else {
                toast.error("Error: Connection to DB3 failed.");
                setConnectionError(true);
            }

            if (db4 === "YOMAN") {
                toast.success("Connection to DB4 successful!");
            } else {
                toast.error("Error: Connection to DB4 failed.");
                setConnectionError(true);
            }

            if (postgresql === "YOMAN") {
                toast.success("Connection to PostgreSQL successful!");
            } else {
                toast.error("Error: Connection to PostgreSQL failed.");
                setConnectionError(true);
            }

        } catch (error) {
            setConnectionError(true);
            toast.error("Error: Unable to connect to the server. Please check your connection and try again.");
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            checkConnection();
            hasFetched.current = true;
        }
    }, []);

    const goLogin = () => {
        navigate("/login");
    };
    const goRegs = () => {
        navigate("/register");
    };
  
    
    return (

<div className="min-h-screen bg-black">
    <ToastContainer />
    {connectionError && (
        <div className="bg-red-500 text-white p-4">
            Error: Unable to connect to the server. Please check your connection and try again.
        </div>
    )}
    <div className="w-[423px] h-[392px] left-[179px] top-[165px] absolute bg-[#008000] rounded-full blur-[201.80px] z-0" />
    <div className="w-[254px] h-[254px] left-[946px] top-[273px] absolute bg-[#009900] rounded-full blur-[201.80px] z-0" />
    <div className="w-[254px] h-[254px] left-[623px] top-[217px] absolute bg-[#005a00] rounded-full blur-[201.80px] z-0" />
    <div className="w-[254px] h-[254px] right-[434px] top-[300px] absolute bg-[#009900] rounded-full blur-[201.80px] z-0" />  
    <div className="w-[254px] h-[254px] right-[573px] top-[407px] absolute bg-[#005a00] rounded-full blur-[201.80px] z-0" />
    <div className="w-[254px] h-[254px] right-[354px] top-[509px] absolute bg-[#008000] shadow-[201.8px_201.8px_201.8px_rgba(0,0,0,0.25)] rounded-full blur-[201.8px] z-0"></div>

  <header className="sticky top-2 shadow" >
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8 ">
      <div className="flex items-center text-2xl">
        <div className="w-32 mr-3">
          <img classNameName="mx-12 h-12 w-auto ml-5" src={logoIcon}/>
        </div>
      </div>
      <div className="flex mt-4 sm:mt-0">
        <a className="px-4" href="#features"></a>
        <a className="px-4" href="#services"></a>
        <a className="px-4" href="#stats"></a>
        <a className="px-4" href="#testimonials"></a>
      </div>
      <div className="hidden md:block space-x-4">
        <button type="button" onClick={() => goRegs()}
          className=" py-3 px-8 text-sm border-2 border-hijau hover:bg-hijau rounded text-white ">Sign Up
        </button>
        <button type="button" onClick={() => goLogin()}
          className=" py-3 px-8 text-sm bg-hijau hover:bg-hijau2 rounded text-white ">Login
        </button>
      </div>
    </div>
  </header>
  <div className="flex flex-grow">
        <section className="pt-25 md:pt-36 flex-1">
            <div className="container mx-auto px-8 lg:flex gap-y-6">
                <div className="text-center lg:text-left lg:w-1/2 lg:h-1/2 flex items-center">
                    <div className="hidden md:block w-0.5 h-36 bg-[#D9DBE1] mr-8 mt-10"></div>
                
                    <div>
                    <h1 className="text-7xl lg:text-7xl xl:text-6xl font-bold leading-none text-white font-jakarta mb-8 pr-10">
                         HISTORICAL MACHINERY
                    </h1>
                    <p className="text-xl lg:text-1xl mt-6 font-light text-white text-left">
                        Pantau dan kendalikan seluruh proses produksi Anda secara real-time dan historis. Dapatkan data akurat dan visualisasi yang jelas untuk pengambilan keputusan yang lebih baik.
                    </p>
                    <p className="mt-8 md:mt-12">
                        <button type="button" onClick={() => goLogin()} className="px-12 h-11 bg-hijau hover:bg-hijau2 rounded text-white">
                            Get Started
                        </button>
                    </p>
                    <p className="mt-4 text-gray-600"></p>
                    </div>
                </div>
                <div class="relative lg:w-1/2 z-10 pl-20">
                    <MySvgComponent />   
                </div>
            </div>
        </section>
        </div>
</div>

  )
}

export default LandingPage