import { useEffect, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, Input, Select, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function WaterManagement() {
  const [WaterDaily, setWaterDaily] = useState([]);
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [WaterArea, setWaterArea] = useState();
  const [totalair, settotalair]= useState ([]);
  const [highair, sethighair]= useState ([]);
  const [lowair, setlowhair]= useState ([]);  
  const [SumberPDAM, setSumberPDAM] = useState([]);
  const [PDAMDom, setPDAMDom] = useState([]);
  const [DomWorkshop, setDomWork] = useState([]);
  const [DomQC, setDomQC] = useState([]);
  const [DomToilet, setDomToilet] = useState([]);
  const [PDAMIP, setPDAMIP] = useState([]);
  const [IPOP, setIPOP] = useState([]);
  const [OPOsmo, setOPOsmo] = useState([]);
  const [OsmoCIP, setOsmoCIP] = useState([]);
  const [OsmoPDAM, setOsmoPDAM] = useState([]);
  const [OPSoftwater, setOPSoftwater] = useState([]);
  const [SoftLab, setSoftLab] = useState([]);
  const [SoftChill, setSoftChill] = useState([]);
  const [SoftHot, setSoftHot] = useState([]);
  const [PDAMBoiler, setPDAMBoiler] = useState([]);
  const [PDAMTaman, setPDAMTaman] = useState([]);
  const [TamanAirMancur, setTamanAirMancur] = useState([]);
  const [OsmoRO, setOsmoRO] = useState([]);
  const [startSankey, setStartSankey] = useState();
  const [finishSankey, setFinishSankey] = useState();
  const [SupplyAir, setSupllyAir]= useState ([]);
  const [SoftWashing, setWashing]= useState ([]);
  const [OsmoLoopo, setOsmoLoopo]= useState ([]);
  const [LoopoProduksi, setLoopoProduksis]= useState ([]);
  const [Lantai1, setlantai1]= useState ([]);
  
  const [PDAMDomm3, setPDAMDomm3] = useState([]);
  const [DomWorkshopm3, setDomWorkm3] = useState([]);
  const [DomQCm3, setDomQCm3] = useState([]);
  const [DomToiletm3, setDomToiletm3] = useState([]);
  const [PDAMIPm3, setPDAMIPm3] = useState([]);
  const [IPOPm3, setIPOPm3] = useState([]);
  const [OPOsmom3, setOPOsmom3] = useState([]);
  const [OsmoCIPm3, setOsmoCIPm3] = useState([]);
  const [OPSoftwaterm3, setOPSoftwaterm3] = useState([]);
  const [SoftLabm3, setSoftLabm3] = useState([]);
  const [SoftChillm3, setSoftChillm3] = useState([]);
  const [SoftHotm3, setSoftHotm3] = useState([]);
  const [PDAMBoilerm3, setPDAMBoilerm3] = useState([]);
  const [PDAMTamanm3, setPDAMTamanm3] = useState([]);
  const [TamanAirMancurm3, setTamanAirMancurm3] = useState([]);
  const [OsmoROm3, setOsmoROm3] = useState([]);
  const [SoftWashingm3, setWashingm3]= useState ([]);
  const [OsmoLoopom3, setOsmoLoopom3]= useState ([]);
  const [LoopoProduksim3, setLoopoProduksism3]= useState ([]);
  const [OsmoPDAM1, setOsmoPDAM1] = useState([]);
  const [SumberPDAM1, setSumberPDAM1] = useState([]);
  const [Lantai1m3, setlantai1m3]= useState ([]);

  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue("rgba(var(--color-border))", "rgba(var(--color-border))");
  const tulisanColor = useColorModeValue("rgba(var(--color-text))", "rgba(var(--color-text))");
  const hoverBorderColor = useColorModeValue("rgba(var(--color-border2))", "rgba(var(--color-border2))");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  
  const fetchWaterSankey = async () => {
    let response1 = await axios.get(
      "http://10.126.15.197:8002/part/waterSankey", 
      {
        params: {
          start: startSankey,
          finish: finishSankey, 
        }
      }
    ); 

    var OsmotoLoopo = 0;
    var OsmotoLoopom3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var OP = Number(response1.data[i].OutletPretreatment.toFixed(2))
      var soft = Number(response1.data[i].Softwater.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var value = OP - ro - soft
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      OsmotoLoopo = data
      OsmotoLoopom3 = Number(value.toFixed(2))
    }
    setOsmoLoopo(OsmotoLoopo);
    setOsmoLoopom3(OsmotoLoopom3)

    var domtolt1 = 0;
    var domtolt1om3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var dom = Number(response1.data[i].Domestik.toFixed(2))
      var qc = Number(response1.data[i].AtasLabQC.toFixed(2))
      var toilet = Number(response1.data[i].AtasToiletLt2.toFixed(2))
      var wh = Number(response1.data[i].Workshop.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var value = dom - qc - toilet - wh 
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      domtolt1 = data
      domtolt1om3 = Number(value.toFixed(2))
    }
    setlantai1(domtolt1);
    setlantai1m3(domtolt1om3)

    var LoopotoProduksi = 0;
    var LoopotoProduksim3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var OP = Number(response1.data[i].OutletPretreatment.toFixed(2))
      var soft = Number(response1.data[i].Softwater.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var CIP = Number (response1.data[i].Cip.toFixed(2))
      var sumber = pdam + ro
      var value = OP - ro - soft - CIP
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      LoopotoProduksi = data
      LoopotoProduksim3 = value
    } 
    setLoopoProduksis(LoopotoProduksi);
    setLoopoProduksism3(LoopotoProduksim3);

    var PDAMtoDom = 0;
    var PDAMtoDomm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Domestik.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      PDAMtoDom = data
      PDAMtoDomm3 = value
    }
    setPDAMDom(PDAMtoDom);
    setPDAMDomm3(PDAMtoDomm3);

    var OsmotoRO = 0;
    var OsmotoROm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].RejectOsmotron.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      OsmotoRO = data;
      OsmotoROm3 = value;
    }
    setOsmoRO(OsmotoRO);
    setOsmoROm3(OsmotoROm3);

    var PDAMtoIP = 0;
    var PDAMtoIPm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].InletPretreatment.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      PDAMtoIP = data;
      PDAMtoIPm3 = value;
    }
    setPDAMIP(PDAMtoIP);
    setPDAMIPm3(PDAMtoIPm3);

    var PDAMtoBoiler = 0;
    var PDAMtoBoilerm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Boiler.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      PDAMtoBoiler = data;
      PDAMtoBoilerm3 = value;
    }
    setPDAMBoiler(PDAMtoBoiler);
    setPDAMBoilerm3(PDAMtoBoilerm3);

    var SumbertoPDAM = 0;
    var SumbertoPDAM1 =0;
    for (var i = 0; i < response1.data.length; i++) {
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      SumbertoPDAM = pdam;
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = pdam/sumber*100
      var data = Number(total.toFixed(2))
      SumbertoPDAM1 = data;
    }
    setSumberPDAM(SumbertoPDAM);
    setSumberPDAM1(SumbertoPDAM1);

    var SupplyAir = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var data = Number(sumber.toFixed(2))
      SupplyAir = data;
      
    }
    setSupllyAir(SupplyAir);

    var DomtoWorkshop = 0;
    var DomtoWorkshopm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Workshop.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      DomtoWorkshopm3 = value;
      DomtoWorkshop = data;
    }
    setDomWork(DomtoWorkshop);
    setDomWorkm3(DomtoWorkshopm3);

    var DomtoQC = 0;
    var DomtoQCm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].AtasLabQC.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      DomtoQC = data;
      DomtoQCm3 = value;
    }
    setDomQC(DomtoQC);
    setDomQCm3(DomtoQCm3);

    var DomtoToilet = 0;
    var DomtoToiletm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].AtasToiletLt2.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      DomtoToilet = data;
      DomtoToiletm3 = value;
    }
    setDomToilet(DomtoToilet);
    setDomToiletm3(DomtoToiletm3);

    var IPtoOP = 0;
    var IPtoOPm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].OutletPretreatment.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      IPtoOP = data;
      IPtoOPm3 = value;
    }
    setIPOP(IPtoOP);
    setIPOPm3(IPtoOPm3);

    var OPtoOsmo = 0;
    var OPtoOsmom3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var OP = Number(response1.data[i].OutletPretreatment.toFixed(2))
      var Soft = Number(response1.data[i].Softwater.toFixed(2))
      var value = OP - Soft
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      OPtoOsmo = data;
      OPtoOsmom3 = Number(value.toFixed(2));
    }
    setOPOsmo(OPtoOsmo);
    setOPOsmom3(OPtoOsmom3);

    var OsmotoCIP = 0;
    var OsmotoCIPm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Cip.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      OsmotoCIP = data;
      OsmotoCIPm3 = value;
    }
    setOsmoCIP(OsmotoCIP);
    setOsmoCIPm3(OsmotoCIPm3);

    var OsmotoPDAM = 0;
    var OsmotoPDAM1 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var ro = Number(response1.data[i].RejectOsmotron.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      OsmotoPDAM = ro;
      var sumber = pdam + ro
      var total = ro/sumber*100
      var data = Number(total.toFixed(2))
      OsmotoPDAM1 = data;
    }
    setOsmoPDAM(OsmotoPDAM);
    setOsmoPDAM1(OsmotoPDAM1);

    var OPtoSoft = 0;
    var OPtoSoftm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Softwater.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      OPtoSoft = data;
      OPtoSoftm3 = value;
    }
    setOPSoftwater(OPtoSoft);
    setOPSoftwaterm3(OPtoSoftm3);

    var TamantoAirMancur = 0;
    var TamantoAirMancurm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].AirMancur.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      TamantoAirMancur = data;
      TamantoAirMancurm3 = value;
    }
    setTamanAirMancur(TamantoAirMancur);
    setTamanAirMancurm3(TamantoAirMancurm3);

    var SofttoLab = 0;
    var SofttoLabm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Lab.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      SofttoLab = data;
      SofttoLabm3 = value;
    }
    setSoftLab(SofttoLab);
    setSoftLabm3(SofttoLabm3);

    var SofttoWash = 0;
    var SofttoWashm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var soft = Number(response1.data[i].Softwater.toFixed(2))
      var lab1 = Number(response1.data[i].Lab.toFixed(2))
      var hot = Number(response1.data[i].Hotwater.toFixed(2))
      var chill = Number(response1.data[i].Chiller.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var value = soft-lab1-hot-chill
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      SofttoWash = data;
      SofttoWashm3 = value; 
    }
    setWashing(SofttoWash);
    setWashingm3(SofttoWashm3);

    var SofttoChill = 0;
    var SofttoChillm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Chiller.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      SofttoChill = data;
      SofttoChillm3 = value;
    }
    setSoftChill(SofttoChill);
    setSoftChillm3(SofttoChillm3);

    var SofttoHot = 0;
    var SofttoHotm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Hotwater.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      SofttoHot = data;
      SofttoHotm3 = value;
    }
    setSoftHot(SofttoHot);
    setSoftHotm3(SofttoHotm3);

    var PDAMtoTaman = 0;
    var PDAMtoTamanm3 = 0;
    for (var i = 0; i < response1.data.length; i++) {
      var value = Number(response1.data[i].Taman.toFixed(2))
      var pdam = Number(response1.data[i].Pdam.toFixed(2))
      var ro = Number (response1.data[i].RejectOsmotron.toFixed(2))
      var sumber = pdam + ro
      var total = value/sumber*100
      var data = Number(total.toFixed(2))
      PDAMtoTaman = data;
      PDAMtoTamanm3 = value;
    }
    setPDAMTaman(PDAMtoTaman);
    setPDAMTamanm3(PDAMtoTamanm3);
  }
  
  const fetchWaterDaily = async () => {
    setLoading(true);
    setError(null);

    try {
      let response = await axios.get(
        "http://10.126.15.197:8002/part/waterSystem",
        {
          params: {
            area: WaterArea,
            start: startDate,
            finish: finishDate,
          },
        }
      );

      if (WaterArea === "cMT-BWT_PDAM_Sehari_data"){
          var multipliedData = response.data.map((data) => ({
              label: data.label,
              y: data.y,
              x: data.x,
          }));
        } else if (
          WaterArea === "cMT-BWT_Dom_sehari_data" ||
          WaterArea === "cMT-BWT_Softwater_sehari_data" ||
          WaterArea === "cMT-BWT_Boiler_sehari_data"
        ) {
          multipliedData = response.data.map((data) => ({
            label: data.label,
            y: data.y,
            x: data.x,
          }));
        } else {
          multipliedData = response.data.map((data) => ({
            label: data.label,
            y: data.y,
            x: data.x,
          }));
        }
      setWaterDaily(multipliedData);

      const totalWater = multipliedData.reduce ((sum, data) => sum + data.y, 0);
      var total = 0
      total = Number(totalWater.toFixed(2))
      settotalair(total); 
      

      const maxwater = multipliedData.reduce ((acc, data) => Math.max (acc, data.y), Number.NEGATIVE_INFINITY);
      var max = Number(maxwater.toFixed(2))
      sethighair(max);

      const minwater = Math.min(...response.data.map((data) => data.y));
      var min = Number(minwater.toFixed(2))
      setlowhair(min);

      // Error jika data kosong
      if (multipliedData.length === 0) {
        setError("No available data");
      }
    } catch (err) {
      setError("No available data");
    } finally {
      setLoading(false);
    }
  };

  let dateStart = (e) =>{
      var dataInput = e.target.value;
      setStartDate(dataInput);
  };
  let dateFinish = (e) =>{
      var dataInput = e.target.value;
      setFinishDate(dataInput);
  };
  let getWaterArea = (e) =>{
      var dataInput = e.target.value;
      setWaterArea(dataInput);
  };

  let sankeyStart = (e) =>{
      var dataInput = e.target.value;
      setStartSankey(dataInput);
  };
  let sankeyFinish = (e) =>{
      var dataInput = e.target.value;
      setFinishSankey(dataInput);
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

  const colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
  '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

  const options1 = {
    responsive: true,
    maintainAspectRatio: false, 
    tooltip: { isHtml: true },
    sankey: {
      node: { nodePadding: 20,
              label: { fontSize: 16 },
            },
      link: {
        colorMode: 'gradient',
        colors: colors
      }, 
    }
  };

  const options = {
    zoomEnabled: true,
    theme: isDarkMode ? "dark1" : "light1",
    backgroundColor: isDarkMode ? "#171717" : "#ffffff",
    
    title: {
      text: "Daily Water Consumption",
      fontColor: isDarkMode ? "white" : "black"
    },
    subtitles: [
      {
        text: "Meter Cubic",
        fontColor: isDarkMode ? "white" : "black"
      },
    ],
    axisY: {
      prefix: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "splineArea",
        name: "Meter Cubic",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: WaterDaily,
      },
    ],
  };
    
  const data = [
    ["From", "To", "Consumption (%)"],
    ["a","b",0] 
  ]; 
    
    if (OsmoCIP >0){
      var cip = ['Loopo','CIP']
      cip.push(OsmoCIP)
      data.push(cip)
    }
    if (OsmoLoopo >0){
      var loopo = ['Osmotron','Loopo']
      loopo.push(OsmoLoopo)
      data.push(loopo)
    } 
    if (TamanAirMancur >0){
      var airmancur = ["Taman & Pos Jaga","Air Mancur"]
      airmancur.push(TamanAirMancur)
      data.push(airmancur)
    }
    if (PDAMDom >0){
      var dom = ["Total Supply Air","Domestik"]
      dom.push(PDAMDom)
      data.push(dom)
    }
    if (PDAMBoiler >0){
      var boiler = ["Total Supply Air","Boiler"]
      boiler.push(PDAMBoiler)
      data.push(boiler)
    }
    if (PDAMIP >0){
      var IP = ["Total Supply Air","Inlet Pretreatment"]
      IP.push(PDAMIP)
      data.push(IP)
    }
    if (PDAMTaman >0){
      var taman = ["Total Supply Air","Taman & Pos Jaga"]
      taman.push(PDAMTaman)
      data.push(taman)
    }
    if (DomQC >0){
      var QC = ["Domestik","Atas Lab QC"]
      QC.push(DomQC)
      data.push(QC)
    }
    if (DomToilet >0){
      var toilet = ["Domestik","Atas Toilet Lt.2"]
      toilet.push(DomToilet)
      data.push(toilet)
    }
    if (DomWorkshop >0){
      var Workshop = ["Domestik","Workshop"]
      Workshop.push(DomWorkshop)
      data.push(Workshop)
    }
    if (IPOP >0){
      var OP = ["Inlet Pretreatment","Outlet Pretreatment"]
      OP.push(IPOP)
      data.push(OP)
    }
    if (OPOsmo >0){
      var Osmo = ["Outlet Pretreatment","Osmotron"]
      Osmo.push(OPOsmo)
      data.push(Osmo)
    }
    if (OPSoftwater >0){
      var soft = ["Outlet Pretreatment","Softwater"]
      soft.push(OPSoftwater)
      data.push(soft)
    }
    if (SoftLab >0){
      var lab = ["Softwater","Lab"]
      lab.push(SoftLab)
      data.push(lab)
    }
    if (SoftHot >0){
      var hot = ["Softwater","Hotwater"]
      hot.push(SoftHot)
      data.push(hot)
    }
    if (SoftChill >0){
      var chill = ["Softwater","Chiller"]
      chill.push(SoftChill)
      data.push(chill)
    }
    if (SoftWashing >0){
      var wash = ["Softwater","Washing"]
      wash.push(SoftWashing)
      data.push(wash)
    }
    if (OsmoRO >0){
      var ro = ["Osmotron","Reject Osmotron"]
      ro.push(OsmoRO)
      data.push(ro)
    }
    if (Lantai1 >0){
      var l1 = ["Domestik","Lantai 1"]
      l1.push(Lantai1)
      data.push(l1)
    }
    if (LoopoProduksi >0){
      var produksi = ["Loopo","Lab & Produksi"]
      produksi.push(LoopoProduksi)
      data.push(produksi)
    }
    if (SumberPDAM1 >0){
      var pdam1 = ["PDAM","Total Supply Air"]
      pdam1.push(SumberPDAM1)
      data.push(pdam1)
    }
    if (OsmoPDAM1 >0){
      var ropdam1 = ["RO","Total Supply Air"]
      ropdam1.push(OsmoPDAM1)
      data.push(ropdam1)
    }

  const data1 = [
    ["From", "To", "Consumption (m3)"],
    ["a","b",0] 
  ]; 

    if (OsmoCIPm3 >0){
      var cip3 = ['Loopo','CIP']
      cip3.push(OsmoCIPm3)
      data1.push(cip3)
    }
    if (OsmoLoopom3 >0){
      var loopo3 = ['Osmotron','Loopo']
      loopo3.push(OsmoLoopom3)
      data1.push(loopo3)
    } 
    if (TamanAirMancurm3 >0){
      var airmancur3 = ["Taman & Pos Jaga","Air Mancur"]
      airmancur3.push(TamanAirMancurm3)
      data1.push(airmancur3)
    }
    if (PDAMDomm3 >0){
      var dom3 = ["Total Supply Air","Domestik"]
      dom3.push(PDAMDomm3)
      data1.push(dom3)
    }
    if (PDAMBoilerm3 >0){
      var boiler3 = ["Total Supply Air","Boiler"]
      boiler3.push(PDAMBoilerm3)
      data1.push(boiler3)
    }
    if (PDAMIPm3 >0){
      var IP3 = ["Total Supply Air","Inlet Pretreatment"]
      IP3.push(PDAMIPm3)
      data1.push(IP3)
    }
    if (PDAMTamanm3 >0){
      var taman3 = ["Total Supply Air","Taman & Pos Jaga"]
      taman3.push(PDAMTamanm3)
      data1.push(taman3)
    }
    if (DomQCm3 >0){
      var QC3 = ["Domestik","Atas Lab QC"]
      QC3.push(DomQCm3)
      data1.push(QC3)
    }
    if (DomToiletm3 >0){
      var toilet3 = ["Domestik","Atas Toilet Lt.2"]
      toilet3.push(DomToiletm3)
      data1.push(toilet3)
    }
    if (DomWorkshopm3 >0){
      var Workshop3 = ["Domestik","Workshop"]
      Workshop3.push(DomWorkshopm3)
      data1.push(Workshop3)
    }
    if (IPOPm3 >0){
      var OP3= ["Inlet Pretreatment","Outlet Pretreatment"]
      OP3.push(IPOPm3)
      data1.push(OP3)
    }
    if (OPOsmom3 >0){
      var Osmo3 = ["Outlet Pretreatment","Osmotron"]
      Osmo3.push(OPOsmom3)
      data1.push(Osmo3)
    }
    if (OPSoftwaterm3 >0){
      var soft3 = ["Outlet Pretreatment","Softwater"]
      soft3.push(OPSoftwaterm3)
      data1.push(soft3)
    }
    if (SoftLabm3 >0){
      var lab3 = ["Softwater","Lab"]
      lab3.push(SoftLabm3)
      data1.push(lab3)
    }
    if (SoftHotm3 >0){
      var hot3 = ["Softwater","Hotwater"]
      hot3.push(SoftHotm3)
      data1.push(hot3)
    }
    if (SoftChillm3 >0){
      var chill3 = ["Softwater","Chiller"]
      chill3.push(SoftChillm3)
      data1.push(chill3)
    }
    if (SoftWashingm3 >0){
      var wash3 = ["Softwater","Washing"]
      wash3.push(SoftWashingm3)
      data1.push(wash3)
    }
    if (OsmoROm3 >0){
      var ro3 = ["Osmotron","Reject Osmotron"]
      ro3.push(OsmoROm3)
      data1.push(ro3)
    }
    if (Lantai1m3 >0){
      var l1m3 = ["Domestik","Lantai 1"]
      l1m3.push(Lantai1m3)
      data1.push(l1m3)
    }
    if (LoopoProduksim3 >0){
      var produksi3 = ["Loopo","Lab & Produksi"]
      produksi3.push(LoopoProduksim3)
      data1.push(produksi3)
    }
    if (SumberPDAM >0){
      var pdam3 = ["PDAM","Total Supply Air"]
      pdam3.push(SumberPDAM)
      data1.push(pdam3)
    }
    if (OsmoPDAM >0){
      var ropdam = ["RO","Total Supply Air"]
      ropdam.push(OsmoPDAM)
      data1.push(ropdam)
    }
    
  return(
    <div>
      <div className="flex flex-col xl:flex-row justify-center my-4 space-y-4 xl:space-y-0 xl:space-x-4">
        <div className="flex flex-col items-center xl:w-64">
          <h5 className="mb-1">Flow Meter</h5>
          <Select placeholder="Select Flow Meter" onChange={getWaterArea}>
            <option value="cMT-DB-WATER-UTY_PDAM_Sehari_data">PDAM</option>
            <option value="cMT-DB-WATER-UTY_Dom_sehari_data">Domestik</option>
            <option value="cMT-DB-WATER-UTY_Softwater_sehari_data">Softwater</option>
            <option value="cMT-DB-WATER-UTY_Boiler_sehari_data">Boiler</option>
            <option value="cMT-DB-WATER-UTY_Inlet_Sehari_data">Inlet Pretreatment</option>
            <option value="cMT-DB-WATER-UTY_Outlet_sehari_data">Outlet Pretreatment</option>
            <option value="cMT-DB-WATER-UTY_RO_sehari_data">Reject Osmotronn</option>
            <option value="cMT-DB-WATER-UTY_Chiller_sehari_data">Chiller</option>
            <option value="cMT-DB-WATER-UTY_Taman_sehari_data">Taman & Pos Jaga</option>
            <option value="cMT-DB-WATER-UTY_WWTP_Biologi_1d_data">WWTP Biologi</option>
            <option value="cMT-DB-WATER-UTY_WWTP_Kimia_1d_data">WWTP Kimia</option>
            <option value="cMT-DB-WATER-UTY_WWTP_Outlet_1d_data">WWTP Outlet</option>
            <option value="cMT-DB-WATER-UTY_CIP_Sehari_data">CIP</option>
            <option value="cMT-DB-WATER-UTY_Hotwater_Sehari_data">Hotwater</option>
            <option value="cMT-DB-WATER-UTY_Lab_Sehari_data">Lab</option>
            <option value="cMT-DB-WATER-UTY_AtsToilet_Sehari_data">Atas Toilet lt.2</option>
            <option value="cMT-DB-WATER-UTY_Atas QC_Sehari_data">Atas Lab QC</option>
            <option value="cMT-DB-WATER-UTY_Workshop_Sehari_data">Workshop</option>
            <option value="cMT-DB-WATER-UTY_AirMancur_Sehari_data">Air Mancur</option>
            <option value="cMT-DB-WATER-UTY_Osmotron_Sehari_data">Osmotron</option>
            <option value="cMT-DB-WATER-UTY_Loopo_Sehari_data">Loopo</option>
            <option value="cMT-DB-WATER-UTY_Produksi_Sehari_data">Produksi</option>
            <option value="cMT-DB-WATER-UTY_Washing_Sehari_data">Washing</option>
            <option value="cMT-DB-WATER-UTY_Lantai1_Sehari_data">Lantai 1</option>
          </Select>
        </div>
        <div className="flex flex-col items-center xl:w-56">
          <h5 className="mb-1">Start Time</h5>
          <Input
            onChange={dateStart}
            placeholder="Select Date and Time"
            size="md"
            type="date"
            css={{
              "&::-webkit-calendar-picker-indicator": {
                color: isDarkMode ? "white" : "black",
                filter: isDarkMode ? "invert(1)" : "none",
              },
            }}
            sx={{
              border: "1px solid",
              borderColor: borderColor,
              borderRadius: "0.395rem",
              background: "var(--color-background)", // background color from Tailwind config
    
              _hover: {
                borderColor: hoverBorderColor,
              },
            }}
          />
        </div>
        <div className="flex flex-col items-center xl:w-56">
          <h5 className="mb-1">Finish Time</h5>
          <Input
            onChange={dateFinish}
            placeholder="Select Date and Time"
            size="md"
            type="date"
            // width="200px"
            css={{
              "&::-webkit-calendar-picker-indicator": {
                color: isDarkMode ? "white" : "black",
                filter: isDarkMode ? "invert(1)" : "none",
              },
            }}
            sx={{
              border: "1px solid",
              borderColor: borderColor,
              borderRadius: "0.395rem",
              background: "var(--color-background)", // background color from Tailwind config
    
              _hover: {
                borderColor: hoverBorderColor,
              },
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-1 invisible">jan diapus</div>
          <Button
            className="ml-2"
            colorScheme="blue"
            onClick={() => fetchWaterDaily()}
          >
            Submit
          </Button>
        </div>
        <div className="mt-3">
          <div className="ml-16 text-text">Total = {totalair.toLocaleString()} Meter Cubic</div>
          <div className="ml-16 text-text">Max = {highair.toLocaleString()} Meter Cubic</div>
          <div className="ml-16 text-text">Min = {lowair.toLocaleString()} Meter Cubic</div>
        </div>
      </div>
      <div className="flex flex-row justify-center p-1 mx-8 bg-card rounded-lg shadow-lg overflow-x-auto relative">
        {loading ? (
          <div className="flex justify-center items-center w-full ">
            <Spinner size="xl" color="blue.500" />
          </div>
        ) : error ? (
          <div className="text-red-500 w-full flex justify-center items-center ">
            {error}
          </div>
        ) : (
          <CanvasJSChart options={options} />
        )}
      </div>
      <br />
      <div className="flex flex-col xl:flex-row justify-center my-4 space-y-4 xl:space-y-0 xl:space-x-4">
        <div className="flex flex-col xl:w-56">
          <h5 className="mb-1">Start Time</h5>
          <Input
            onChange={sankeyStart}
            placeholder="Select Date and Time"
            size="md"
            type="date"
            css={{
              "&::-webkit-calendar-picker-indicator": {
                color: isDarkMode ? "white" : "black",
                filter: isDarkMode ? "invert(1)" : "none",
              },
            }}
            sx={{
              border: "1px solid",
              borderColor: borderColor,
              borderRadius: "0.395rem",
              background: "var(--color-background)", // background color from Tailwind config
    
              _hover: {
                borderColor: hoverBorderColor,
              },
            }}
          />
        </div>
        <div className="flex flex-col xl:w-56">
          <h5 className="mb-1">Finish Time</h5>
          <Input
            onChange={sankeyFinish}
            placeholder="Select Date and Time"
            size="md"
            type="date"
            css={{
              "&::-webkit-calendar-picker-indicator": {
                color: isDarkMode ? "white" : "black",
                filter: isDarkMode ? "invert(1)" : "none",
              },
            }}
            sx={{
              border: "1px solid",
              borderColor: borderColor,
              borderRadius: "0.395rem",
              background: "var(--color-background)", // background color from Tailwind config
    
              _hover: {
                borderColor: hoverBorderColor,
              },
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-1 invisible">jan diapus</div>
          <Button
            className="ml-1"
            colorScheme="blue"
            onClick={() => fetchWaterSankey()}
          >
            Submit
          </Button>
        </div>
      </div>
      <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Water Sankey Diagram (%)</b></h1></div>
      <div align="center"><h3 style={{ fontSize: "1rem"}}><b>PDAM : {SumberPDAM} Meter Cubic</b></h3></div>
      <div align="center"><h3 style={{ fontSize: "1rem"}}><b>Reject Osmotron : {OsmoPDAM} Meter Cubic</b></h3></div>
      <div align="center"><h3 style={{ fontSize: "1rem"}}><b>Total Supply Air (PDAM+RO) : {SupplyAir} Meter Cubic</b></h3></div>
      <div align="center" className={`flex flex-row justify-center pb-10 overflow-x-auto overflow-y-hidden relative ${isDarkMode ? 'sankey-dark' : 'sankey-light'}`}>
        <Chart
          chartType="Sankey"
          width= "900px"
          height="1000px"
          data={data}
          options={options1}
          style={{ minWidth: "1000px" }}>
        </Chart>
      </div>
      <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Water Sankey Diagram </b></h1></div>
      <div align="center"><h3 style={{ fontSize: "1rem"}}><b>Meter Cubic</b></h3></div>
      <div className={`flex flex-row justify-center pb-10 overflow-x-auto overflow-y-hidden relative ${isDarkMode ? 'sankey-dark' : 'sankey-light'}`}>
        <Chart
          chartType= "Sankey"
          width= "900px"
          height="1000px"
          data={data1}
          options={options1}
          style={{ minWidth: "1000px" }}>
        </Chart>
      </div>
    </div>
  );
}