import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

const HistoryTabelIsi = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedEndpoint, setSelectedEndpoint] = useState('');

    const { colorMode } = useColorMode();
    const borderColor = useColorModeValue("rgba(var(--color-border))", "rgba(var(--color-border))");
    const tulisanColor = useColorModeValue("rgba(var(--color-text))", "rgba(var(--color-text))");
    const hoverBorderColor = useColorModeValue("rgba(var(--color-border2))", "rgba(var(--color-border2))");
    const kartuColor = useColorModeValue("rgba(var(--color-card))", "rgba(var(--color-card))");
  
    const [isDarkMode, setIsDarkMode] = useState(
      document.documentElement.getAttribute("data-theme") === "dark"
    );

    const endpoints = [
        { value: '/GetDailyVibrasi138', label: 'Get Daily Vibrasi 138' },
        { value: '/GetDailyGedung138', label: 'Get Daily Gedung 138' },
        { value: '/GetDailyChiller138', label: 'Get Daily Chiller 138' },
        { value: '/GetDailyBoiler138', label: 'Get Daily Boiler 138' },
        { value: '/GetDailyInstrumentIPC', label: 'Get Daily Instrument IPC' },
        { value: '/GetDailyPower55', label: 'Get Daily Power 55' },
      ];
    
      const fetchData = async () => {
        if (!selectedEndpoint) {
          alert('Please select an endpoint');
          return;
        }
    
        setLoading(true);
        // setIsTableVisible(true); // Show table container when starting to fetch
        setError(false);
        try {
          const response = await axios.get(`http://10.126.15.137:8002/part${selectedEndpoint}`);
          setData(response.data);
          setIsTableVisible(true);
        } catch (error) {
          console.error('Error fetching data: ', error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };
    
      const renderData = () => {
        const flattenedData = data.flat();
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentData = flattenedData.slice(indexOfFirstRow, indexOfLastRow);
    
        if (flattenedData.length === 0) {
          return (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No data available
              </td>
            </tr>
          );
        }
    
        return currentData.map((row, index) => {
          const [name, value] = Object.entries(row)[0];
          return (
            <tr key={index} className="border-b hover:bg-blue-100 text-white dark:hover:text-black">
              <td className="text-center text-text py-2">{indexOfFirstRow + index + 1}</td>
              <td className="text-center text-text py-2">{name.replace('Tanggal_', '').replace(/_/g, ' ')}</td>
              <td className="text-center text-text py-2">{formatDate(value)}</td>
            </tr>
          );
        });
      };
    
      const handleNextPage = () => {
        if (currentPage < Math.ceil(data.flat().length / rowsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };  

    useEffect(() => {
      const handleThemeChange = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setIsDarkMode(currentTheme === 'dark');
      };
      // Observe attribute changes
      const observer = new MutationObserver(handleThemeChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  
      return () => observer.disconnect();
    }, []);

    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Data Viewer</h1>
        
        <div className="space-y-6 md:space-y-0 xl:flex xl:items-start xl:space-x-4">
          {/* Controls Section */}
          <div className="flex flex-col space-y-4 xl:w-1/3">
            {/* Endpoint Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text">
                Select Endpoint
              </label>
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                className="w-full border-border bg-cobabg hover:border-border2 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                {endpoints.map((endpoint) => (
                  <option key={endpoint.value} value={endpoint.value}>
                    {endpoint.label}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Rows per page Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text">
                Rows per page
              </label>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="w-full md:w-32 border-border bg-cobabg hover:border-border2 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[10, 20, 40, 60, 100].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Buttons */}
            <div className="flex flex-col space-y-2">
              <button
                onClick={fetchData}
                disabled={loading || !selectedEndpoint}
                className={`px-4 py-2 rounded-md text-white font-medium
                  ${loading || !selectedEndpoint 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-text" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  'Fetch Data'
                )}
              </button>
            </div>
          </div>
  
          {/* Table Section */}
          {isTableVisible && (
            <div className="flex-1">
              <div className="border rounded-md overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-600">
                    Error fetching data. Please try again.
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-cobabg">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Name
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-cobabg divide-y divide-gray-200">
                      {renderData()}
                    </tbody>
                  </table>
                )}
              </div>
  
              {/* Pagination */}
              {!loading && data.length > 0 && (
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md border
                      ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-text hover:bg-blue-500'
                      }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-text">
                    Page {currentPage} of {Math.ceil(data.flat().length / rowsPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(data.flat().length / rowsPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(data.flat().length / rowsPerPage)}
                    className={`px-4 py-2 rounded-md border
                      ${currentPage === Math.ceil(data.flat().length / rowsPerPage)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-text hover:bg-blue-500'
                      }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

export default HistoryTabelIsi