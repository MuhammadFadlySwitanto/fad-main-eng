import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Stack,
  Input,
  Select,
  Spinner
} from "@chakra-ui/react";
import Axios from "axios";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import Header from "../components/header";
import { color } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Instrument() {
  const [dataInstrument, setDataInstrument] = useState([]);
  const [inputText, setInputText] = useState("");
  const [submitText, setSubmitText] = useState("");
  const [switchAllData, setSwitchAllData] = useState(false);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [hardnessData, setHardnessData] = useState([]);
  const [thicknessData, setThicknessData] = useState([]);
  const [diameterData, setDiameterData] = useState([]);
  const [stringData1, setStringData1new] = useState("")
  const [stringData2, setStringData2new] = useState("")
  const [stringData3,setStringData3new] = useState("")
  const [stringData4, setStringData4new] = useState("")
  const [stringData5, setStringData5new] = useState("")

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue("rgba(var(--color-border))", "rgba(var(--color-border))");
  const tulisanColor = useColorModeValue("rgba(var(--color-text))", "rgba(var(--color-text))");
  const hoverBorderColor = useColorModeValue("rgba(var(--color-border2))", "rgba(var(--color-border2))");

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );



  const fetchData = async () => {
    let response = await Axios.get("http://10.126.15.197:8002/part/instrument");
    setDataInstrument(response.data);
  };


  let switchAll = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Data loaded successfully!");
          // Or call reject("Error message") to simulate an error.
        }, 2000); // Simulating a delay, replace with your logic
      }),
      {
        pending: "Loading data, please wait...",
        success: "Data successfully loaded!",
        error: "Failed to load data, please try again later.",
      }
    );
    setSwitchAllData(true);
  };
  let hidenAll = () => {
    toast.warning("All data has been hidden!");
    setSwitchAllData(false);
  };

  let inputHendeler = (e) => {
    var dataInput = e.target.value;
    setInputText(dataInput);
  };

  let clickSubmit = async () => {
    setLoading(true); // Start spinner
    setError(null);   // Clear previous errors

    try {
    setSubmitText(inputText);
    let data = { nobatch: `${submitText}` };
    let hardness = await Axios.post(
      "http://10.126.15.197:8002/part/hardness",
      data
    );

    var result1 = [];
    for (var i = 0; i < hardness.data.length; i++) {
      var obj1 = {
        x: i,
        y: Number(hardness.data[i].y),
      };
      result1.push(obj1);
    }

    setHardnessData(result1);

    let thickness = await Axios.post(
      "http://10.126.15.197:8002/part/thickness",
      data
    );
    var result2 = [];
    for (var i = 0; i < thickness.data.length; i++) {
      var obj2 = {
        x: i,
        y: Number(thickness.data[i].y),
      };
      result2.push(obj2);
      console.log(thicknessOptions.data);
    }

    setThicknessData(result2);

    let diameter = await Axios.post(
      `http://10.126.15.197:8002/part/diameter`,
      data
    );
    var result3 = [];
    for (var i = 0; i < diameter.data.length; i++) {
      var obj3 = {
        x: i,
        y: Number(diameter.data[i].y),
      };
      result3.push(obj3);
    }

    setDiameterData(result3);
  } catch (err) {
    console.error("Error fetching data:", err);
    setError("Failed to fetch data. Please try again.");
  } finally {
    const delay = 2000; // 2 seconds in milliseconds
      setTimeout(() => {
        setLoading(false); // Stop spinner
        console.log("Finished fetching data, stopping spinner...");
      }, delay);
  }
  };

  const backeupFilter = () => {
    const filterData1 = dataInstrument.filter((el) => {
      if (submitText == "" && switchAllData == false) {
        return null;
      }
      if (switchAllData == true && submitText == "") {
        return el;
      }
      if (switchAllData == true && !submitText == "") {
        return el.nobatch.includes(submitText);
      }
    });
    setDataToFilter(filterData1)
    console.log(filterData1);
  }


  const renderInstrumentList = () => {

    const filterData = dataInstrument.filter((el) => {
      if (submitText == "" && switchAllData == false) {
        return null;
      }
      if (switchAllData == true && submitText == "") {
        return el;
      }
      if (switchAllData == true && !submitText == "") {
        return el.nobatch.includes(submitText);
      }
    });
    console.log(filterData);
    return filterData.map((instrument) => {
      return (
        <Tr>
          <Td>{instrument.operator}</Td>
          <Td>{instrument.produk}</Td>
          <Td>{instrument.nobatch}</Td>
          <Td>{instrument.date}</Td>
          <Td>{instrument.time}</Td>
          <Td>{instrument.notest}</Td>
          <Td
            className={
              Number(instrument.thickness) < Number(instrument.R_thickness_min) ||
              Number(instrument.thickness) > Number(instrument.R_thickness_max)
                ? "bg-red-200"
                : "bg-blue-300"
            }
          >
            {instrument.thickness}
          </Td>
          <Td
            className={
              Number(instrument.diameter) < Number(instrument.R_diameter_min)
                ? "bg-red-500"
                : "bg-blue-300"
            }
          >
            {instrument.diameter}
          </Td>
          <Td
            className={
              Number(instrument.hardness) < Number(instrument.R_hardness_max) ||
              Number(instrument.hardness) > Number(instrument.R_hardness_min)
                ? "bg-red-200"
                : "bg-blue-300"
            }
          >
            {instrument.hardness}
          </Td>
          <Td>{instrument.R_thickness_min}</Td>
          <Td>{instrument.R_thickness_max}</Td>
          <Td>{instrument.R_diameter_min}</Td>
          <Td>{instrument.R_hardness_max}</Td>
          <Td>{instrument.R_hardness_min}</Td>

          {/* Ini masih kebalik antara min dan max dari hardness */}
        </Tr>
      );
    });

   
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let response = await Axios.get("http://10.126.15.197:8002/part/instrument");

  //     // Set data points for each chart
  //     let thickness = await Axios.post("http://10.126.15.197:8002/part/thickness", response.data);
  //     setThicknessData(thickness.data.map((item, i) => ({ x: i, y: Number(item.y) })));

  //     let diameter = await Axios.post("http://10.126.15.197:8002/part/diameter", response.data);
  //     setDiameterData(diameter.data.map((item, i) => ({ x: i, y: Number(item.y) })));

  //     let hardness = await Axios.post("http://10.126.15.197:8002/part/hardness", response.data);
  //     setHardnessData(hardness.data.map((item, i) => ({ x: i, y: Number(item.y) })));
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
 

    const fetchDataFilter = async () => {
      await   fetchData();
      backeupFilter()
    }
    fetchDataFilter()

    // RenderDisition()
  
  
  }, [dataToFilter]);
  //==============================DISITION MAKING (buat machine learning)=============================================

// const RenderDisition = async() => {


//   const makeDecision = (record) => {
//     console.log(record);
//     const hardnessParse = parseFloat(record.hardness);
//     const thicknessParse = parseFloat(record.thickness);

//     const hardness_minParse = parseFloat(record.R_hardness_min);
//     const thickness_minParse = parseFloat(record.R_thickness_min);

//     const hardness_maxParse = parseFloat(record.R_hardness_max);
//     const thickness_maxParse = parseFloat(record.thickness_max);

//     let decision = "Data memenuhi syarat referensi";

//     if (hardnessParse < hardness_maxParse) {
//       decision =
//         "Data tidak memenuhi syarat referensi: Hardness terlalu rendah.";
//     } else if (hardnessParse > hardness_minParse) {
//       decision =
//         "Data tidak memenuhi syarat referensi: Hardness terlalu tinggi.";
//     }

//     if (thicknessParse < thickness_minParse) {
//       decision =
//         "Data tidak memenuhi syarat referensi: Thickness terlalu kecil.";
//     } else if (thicknessParse > thickness_maxParse) {
//       decision =
//         "Data tidak memenuhi syarat referensi: Thickness terlalu besar.";
//     }

//     return decision;
//   };

//   const penyimpanganCounts = {
//     "Hardness terlalu rendah": 0,
//     "Hardness terlalu tinggi": 0,
//     "Thickness terlalu kecil": 0,
//     "Thickness terlalu besar": 0,
//   };

//   const keputusanData = [];

//   const hardnessValues = [];
//   const thicknessValues = [];
//   const diameterValues =[]

//   const ambildataDesetin = (data) => {
//     setStringData5new(data)
//   }

// console.log(dataToFilter);
//   dataToFilter.forEach((record) => {
//     const decision = makeDecision(record);
//     keputusanData.push({ id: record.id, decision });
//     ambildataDesetin(decision)
//     // Memeriksa alasan penyimpangan dan meningkatkan hitungan yang sesuai
//     Object.keys(penyimpanganCounts).forEach((reason) => {
//       if (decision.includes(reason)) {
//         penyimpanganCounts[reason] += 1;
//       }
//     });
  

//     // Menambahkan nilai hardness dan thickness yang memenuhi syarat
//     if (!decision.includes("Hardness terlalu rendah")) {
//       hardnessValues.push(parseFloat(record.hardness));
//       diameterValues.push(parseFloat(record.diameter))
//     }
//     if (!decision.includes("Thickness terlalu kecil")) {
//       thicknessValues.push(parseFloat(record.thickness));
//       diameterValues.push(parseFloat(record.diameter))
//     }
//   });

//   const totalTablet = dataToFilter.length;
//   const presentasePenyimpangan =
//     (Object.values(penyimpanganCounts).reduce((acc, val) => acc + val, 0) /
//       totalTablet) *
//     100;

//   function calculateMean(arr) {
//     const sum = arr.reduce((acc, current) => acc + current, 0);

//     return sum / arr.length;
//   }


//   const dataPushDesicition = (data1,data2,data3,data4) => {
//     setStringData1new(data1)
//     setStringData2new(data2)
//     setStringData3new(data3)
//     setStringData4new(data4)

//   }

//   const describe = {
//     "Avarage hardness": calculateMean(hardnessValues).toFixed(2),
//     "Avarage thickness": calculateMean(thicknessValues).toFixed(2),
//     "Avarage diameter" : calculateMean(diameterValues).toFixed(2),
//   };



//   var string1data = JSON.stringify(describe)
//   var sring2data = `Total tablet yang tidak memenuhi syarat: ${Object.values(
//     penyimpanganCounts
//   ).reduce((acc, val) => acc + val, 0)}`
//   var string3data = `Presentase penyimpangan: ${presentasePenyimpangan.toFixed(2)}%`
//   var string4data = ""

//   dataPushDesicition(string1data,sring2data,string3data,string4data)
//   const mostCommonReason = Object.keys(penyimpanganCounts).reduce((a, b) =>
//     penyimpanganCounts[a] > penyimpanganCounts[b] ? a : b
//   );

//   if (
//     Object.values(penyimpanganCounts).reduce((acc, val) => acc + val, 0) === 0
//   ) {
//     string4data = "Semua data memenuhi syarat.";
//   } else {
//     string4data =
//       `Parameter yang paling banyak menyebabkan penyimpangan: ${mostCommonReason}`
    
//   }
// }

  //==================================KODE BUAT CUSTOMISASI CHART ========================================

  const thicknessOptions = {
    theme: isDarkMode ? "dark2" : "light2",
    axisY: {
      prefix: "",
      gridColor: isDarkMode ? "#444" : "#bfbfbf",
      labelFontColor: isDarkMode ? "white" : "black",
      tickLength: 5,
      tickThickness: 2,
      tickColor: isDarkMode ? "#d6d6d6" : "#5e5e5e",
    },
    axisX: {
      lineColor: isDarkMode ? "#d6d6d6" : "#474747",
      labelFontColor: isDarkMode ? "white" : "black",
      tickLength: 5,
      tickThickness: 2,
      tickColor: isDarkMode ? "#d6d6d6" : "#474747",
    },
  toolTip: {
      shared: true,
  },
  backgroundColor: isDarkMode ? "#171717" : "#ffffff",
  title: { text: "Thickness", fontColor: isDarkMode ? "white" : "black" },
  data: [
      {
        type: "spline",
        name: "Thickness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        lineColor: isDarkMode ? "#00bfff" : "#1e90ff",  
        color: isDarkMode ? "#00bfff" : "#1e90ff",  
        markerColor: isDarkMode ? "#00bfff" : "#1e90ff", 
        markerSize: 2,
        dataPoints: thicknessData,   
      },
    ],     
  };

  const diameterOptions = {
    theme: isDarkMode ? "dark2" : "light2",
    axisY: {
      prefix: "",
      gridColor: isDarkMode ? "#444" : "#bfbfbf",
      labelFontColor: isDarkMode ? "white" : "black",
      tickLength: 5,
      tickThickness: 2,
      tickColor: isDarkMode ? "#d6d6d6" : "#5e5e5e",
    },
    axisX: {
      lineColor: isDarkMode ? "#d6d6d6" : "#474747",
      labelFontColor: isDarkMode ? "white" : "black",
      tickLength: 5,
      tickThickness: 2,
      tickColor: isDarkMode ? "#d6d6d6" : "#474747",
    },
  toolTip: {
      shared: true,
  },
  backgroundColor: isDarkMode ? "#171717" : "#ffffff",
  title: { text: "Diameter", fontColor: isDarkMode ? "white" : "black" },
  data: [
      {
        type: "spline",
        name: "Diameter",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        color: isDarkMode ? "#ffa500" : "#ff4500",
        lineColor: isDarkMode ? "#ffa500" : "#ff4500",
        markerColor: isDarkMode ? "#ffa500" : "#ff4500",
        markerSize: 2,
        dataPoints: diameterData,   
      },
    ],     
  };

  const hardnessOptions = {
    theme: isDarkMode ? "dark2" : "light2",
    axisY: {
      prefix: "",
      gridColor: isDarkMode ? "#444" : "#bfbfbf",
      labelFontColor: isDarkMode ? "white" : "black",
      tickLength: 5,
      tickThickness: 2,
      tickColor: isDarkMode ? "#d6d6d6" : "#5e5e5e",
    },
    axisX: {
      lineColor: isDarkMode ? "#d6d6d6" : "#474747",
      labelFontColor: isDarkMode ? "white" : "black",
      tickLength: 5,
      tickThickness: 2,
      tickColor: isDarkMode ? "#d6d6d6" : "#474747",
    },
  toolTip: {
      shared: true,
  },
  backgroundColor: isDarkMode ? "#171717" : "#ffffff",
  title: { text: "Hardness", fontColor: isDarkMode ? "white" : "black" },
  data: [
      {
        type: "spline",
        name: "Hardness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        lineColor: isDarkMode ? "#00ff00" : "#32cd32",
        color: isDarkMode ? "#00ff00" : "#32cd32",
        markerColor: isDarkMode ? "#00ff00" : "#32cd32",
        markerSize: 2,
        dataPoints: hardnessData,   
      },
    ],     
  };
     

  // const diameterOptions = {
  //   ...commonOptions,
  //   title: { text: "Diameter", fontColor: isDarkMode ? "white" : "black" },
  //   data: [
  //     {
  //       type: "spline",
  //       name: "Diameter",
  //       showInLegend: true,
  //       xValueFormatString: "",
  //       yValueFormatString: "",
  //       dataPoints: diameterData,
  //       lineColor: isDarkMode ? "#ffa500" : "#ff4500",
  //       markerColor: isDarkMode ? "#ffa500" : "#ff4500",
  //     },
  //   ],
  // };

  // const hardnessOptions = {
  //   ...commonOptions,
  //   title: { text: "Hardness", fontColor: isDarkMode ? "white" : "black" },
  //   data: [
  //     {
  //       type: "spline",
  //       name: "Hardness",
  //       showInLegend: true,
  //       xValueFormatString: "",
  //       yValueFormatString: "",
  //       dataPoints: hardnessData,
  //       lineColor: isDarkMode ? "#00ff00" : "#32cd32",
  //       markerColor: isDarkMode ? "#00ff00" : "#32cd32",
  //     },
  //   ],
  // };

  //console.log(hardnessData);

  return (
    <div>
      <Header />
      <div className="bg-background shadow-md">
        <h1 className="block text-center font-medium text-4xl antialiased hover:subpixel-antialiased; p-6 pb-3">
              HARDNESS TESTER
        </h1>
        <p className="block text-center text-xl antialiased hover:subpixel-antialiased;">
              Instrument Production
        </p>
        <br /> 
        <div className="block bg-card p-2 rounded-lg shadow-lg mx-8">
        {loading ? (
        <div className="flex flex-col items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
        ) : error ? (
          <div className="text-red-500 flex flex-col items-center">No available data</div>
        ) : (
          <CanvasJSChart options={thicknessOptions} />
        )}
        </div>
        <br />
        <div className="block bg-card p-2 rounded-lg shadow-lg mx-8">
        {loading ? (
        <div className="flex flex-col items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
        ) : error ? (
          <div className="text-red-500 flex flex-col items-center">No available data</div>
        ) : (
          <CanvasJSChart options={diameterOptions} />
        )}
        </div>
        <br />
        <div className="block bg-card p-2 rounded-lg shadow-lg mx-8">
        {loading ? (
        <div className="flex flex-col items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
        ) : error ? (
          <div className="text-red-500 ">No available data</div>
        ) : (
          <CanvasJSChart options={hardnessOptions} />
        )}
        </div>
        <br />
        <div
          className="flex flex-row justify-center"
          direction="row"
          spacing={4}
          align="center">
          <div className="main">
            <h1 className="mb-1 text-text">Search Batch</h1>
            <div className="search">
              <input
                onChange={inputHendeler}
                data-type="instrument"
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
                className="block w-full rounded-md pl-1 bg-background border border-border hover:border-border2 text-text py-1.5 focus:ring-1 focus:ring-blue-700 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <br />
            <Button
              className="ml-4"
              colorScheme="blue"
              onClick={() => clickSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
        <br />
        <div className="flex justify-center gap-6">
          <Button className="ml-4" colorScheme="blue" onClick={() => switchAll()}>
            Show All Data
          </Button>
          <Button className="ml-4" colorScheme="red" onClick={() => hidenAll()}>
            Hidden All Data
          </Button>
        </div>
        <br /> 
        <TableContainer  className="bg-card rounded-md mx-1" 
        sx={{ 
        overflowX: "auto", 
        maxWidth: "100%", }}>
          <Table key={colorMode} variant="simple" sx={{ minWidth: "1200px" /* Adjust as needed */ }}>
            <TableCaption sx={{
            color: tulisanColor,
            }}>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                  <Th sx={{
                color: tulisanColor,
                }}>Operator</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Product</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>No.Batch</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Date</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Time</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>No.Test</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Thickness</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Diameter</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Hardness</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Ref. Thickness min</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Ref. Thickness max</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Ref. Diameter </Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Ref. Hardness min</Th>
                  <Th sx={{
                color: tulisanColor,
                }}>Ref. Hardness max</Th>
              </Tr>
            </Thead>
            <Tbody>{renderInstrumentList()}</Tbody>
          </Table>
        </TableContainer>
        <ToastContainer position="top-center" autoClose={3000} 
        hideProgressBar closeOnClick pauseOnHover draggable  />
      </div>
    </div>
  );
}

export default Instrument;
