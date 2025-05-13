import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import {  useColorMode, useColorModeValue, Select, Input } from "@chakra-ui/react";

const ProductionInput = () => {
  // State untuk form input
  const [formData, setFormData] = useState({
    shift: '1',
    tanggal: new Date().toISOString().split('T')[0], // Default ke format yyyy-mm-dd
    // tanggal: formatDate(new Date()), // kalau mau pake yg format itu pakelah yg ini
  });

  // State untuk menyimpan data tabel
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const userGlobal = useSelector((state) => state.user.user);

  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue("rgba(var(--color-border))", "rgba(var(--color-border))");
  const hoverBorderColor = useColorModeValue("rgba(var(--color-border2))", "rgba(var(--color-border2))");

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  
  // State untuk menyimpan opsi detail downtime berdasarkan tipe
  const [downtimeOptions, setDowntimeOptions] = useState({
    Minor: [],
    Planned: [],
    Unplanned: []
  });

  // Fungsi untuk format tanggal menjadi dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Load opsi downtime saat komponen dimuat
  useEffect(() => {
    const fetchDowntimeOptions = async () => {
      try {
        // Fetch semua opsi downtime sekali di awal
        const [minorRes, plannedRes, unplannedRes] = await Promise.all([
          axios.get("http://10.126.15.197:8002/part/alldowntime", { params: { type: 'Minor' } }),
          axios.get("http://10.126.15.197:8002/part/alldowntime", { params: { type: 'Planned' } }),
          axios.get("http://10.126.15.197:8002/part/alldowntime", { params: { type: 'Unplanned' } })
        ]);

        setDowntimeOptions({
          Minor: minorRes.data,
          Planned: plannedRes.data,
          Unplanned: unplannedRes.data
        });
      } catch (err) {
        console.error('Error fetching downtime options:', err);
      }
    };

    fetchDowntimeOptions();
  }, []);

  // Handle submit form untuk fetch data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Format tanggal untuk API jika diperlukan (tergantung format yang dibutuhkan API)
      // dikomen 2 const ini, karena kalau gak dia akan coba nge-try. dan malah gak di eksekusi si endpoint ini
      // const [day, month, year] = formData.date.split('/');
      // const formattedDate = `${year}-${month}-${day}`;
      
      // Ganti dengan endpoint API yang sebenarnya
      const response = await axios.get("http://10.126.15.197:8002/part/HM1Report", {
        params: {
          shift: formData.shift,
          // tanggal: formattedDate, //ini kalau pake yang format
          tanggal: formData.tanggal, // Menggunakan format yyyy-mm-dd (langsung tembak)
        }
      });
      
      setTableData(response.data);
    } catch (err) {
      setError('Gagal mengambil data. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle perubahan dropdown "Downtime Type"
  const handleDowntimeTypeChange = (rowIndex, downtimeType) => {
    // Update tipe downtime untuk baris tertentu
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].downtime_type = downtimeType;
    updatedTableData[rowIndex].detail = ''; // Reset detail ketika tipe berubah
    setTableData(updatedTableData);
  };

  // Handle perubahan dropdown "Detail"
  const handleDetailChange = (rowIndex, detail) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].detail = detail;
    setTableData(updatedTableData);
  };

  // Handle submit downtime untuk setiap baris
  const handleSubmitDowntime = async (rowIndex) => {
    const currentRow = tableData[rowIndex];
    
    if (!currentRow.downtime_type || !currentRow.detail) {
      alert('Silakan pilih Downtime Type dan Detail terlebih dahulu');
      return;
    }
    
    try {
      // Mendapatkan waktu saat ini untuk timestamp
      const submitDateTime = new Date().toISOString();
      
      // Data yang akan dikirim ke server untuk update baris yang sudah ada
      const postData = {
        id: currentRow.id, // ID baris yang akan diupdate
        downtime_type: currentRow.downtime_type,
        downtime_detail: currentRow.detail,
        username: userGlobal.name,
        submitted_at: submitDateTime
      };
      
      console.log('Data yang dikirim ke server:', postData);
      
      // Endpoint API untuk update data
      await axios.post("http://10.126.15.197:8002/part/HM1InsertDowntime", postData);
      
      alert('Data berhasil disimpan');
      
      // Refresh data setelah submit
      handleSubmit();
    } catch (err) {
      alert('Gagal menyimpan data. Silakan coba lagi.');
      console.error(err);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Production Downtime Input</h1>
      
      {/* Form Input */}
      <div className="bg-card shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-text mb-1">
              Shift
            </label>
            <Select
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              className="block w-full px-3"
              sx={{
                border: "1px solid",
                borderColor: borderColor,
                borderRadius: "0.336rem",
                background: "var(--color-background)", // background color from Tailwind config
      
                _hover: {
                  borderColor: hoverBorderColor,
                },
              }}
            >
              <option value="1">Shift 1</option>
              <option value="2">Shift 2</option>
              <option value="3">Shift 3</option>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-text mb-1">
              Date
            </label>
            <Input
              type="date"
              name="tanggal"
              value={formData.tanggal} // bisa ganti dari .tanggal ke .date kalau mau pake yang format itu
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
              className="block w-full px-3"
              css={{
                "&::-webkit-calendar-picker-indicator": {
                  color: isDarkMode ? "white" : "black",
                  filter: isDarkMode ? "invert(1)" : "none",
                },
              }}
              sx={{
                border: "1px solid",
                borderColor: borderColor,
                borderRadius: "0.336rem",
                background: "var(--color-background)", // background color from Tailwind config
      
                _hover: {
                  borderColor: hoverBorderColor,
                },
              }}
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Get Data'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Table */}
      {tableData.length > 0 && (
        <div className="bg-card shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 dark:bg-[#242424]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">Finish</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">Total (Minutes)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">Downtime Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">Detail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={row.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{row.start}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{row.finish}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{row.total_menit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      value={row.downtime_type || ''}
                      onChange={(e) => handleDowntimeTypeChange(index, e.target.value)}
                      disabled={row.is_processed} // Disable jika sudah diproses
                      className="block w-full px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      sx={{
                        border: "1px solid",
                        borderColor: borderColor,
                        background: "var(--color-background)", // background color from Tailwind config
              
                        _hover: {
                          borderColor: hoverBorderColor,
                        },
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Minor">Minor</option>
                      <option value="Planned">Planned</option>
                      <option value="Unplanned">Unplanned</option>
                    </Select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.downtime_type ? (
                      <Select
                        value={row.detail || ''}
                        onChange={(e) => handleDetailChange(index, e.target.value)}
                        className="block w-full px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        sx={{
                          border: "1px solid",
                          borderColor: borderColor,
                          background: "var(--color-background)", // background color from Tailwind config
                
                          _hover: {
                            borderColor: hoverBorderColor,
                          },
                        }}
                        disabled={row.is_processed} // Disable jika sudah diproses
                      >
                      <option value="">Select Detail</option>
                      {downtimeOptions[row.downtime_type]?.map((detail, detailIndex) => (
                        <option key={detailIndex} value={detail.detail}>
                          {detail.detail}
                        </option>
                      ))}
                      </Select>
                    ) : (
                      <span className="text-sm text-text2">Select Downtime Type first</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.is_processed ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Processed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSubmitDowntime(index)}
                        disabled={!row.downtime_type || !row.detail}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductionInput;