import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PowerManagement() {
  const [dailyPower, setDailyPower] = useState([]);
  const [monthlyPower, setMonthlyPowe] = useState([]);
  const [avarageDaily, setAvarageDaily] = useState(0);
  const [totalDaily, setTotalDaily] = useState(0);
  const [avarageMonthly, setAvarageMonthly] = useState(0);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [powerArea, setPowerArea] = useState();
  const [startMonth, setStartMonth] = useState();
  const [finishMonth, setFinishMonth] = useState();
  const [areaMonth, setAreaMonth] = useState();

  const [secArea, setSecArea] = useState();
  const [secStart, setSecStart] = useState();
  const [secFinish, setSecFinish] = useState();

  const [secFreq, setSecFreq] = useState([]);
  const [secPtP, setSecPtP] = useState([]);
  const [secPtN, setSecPtN] = useState([]);

  const [maxSecFreq, setmaxSecFreq] = useState([]);
  const [maxSecPtP, setmaxSecPtP] = useState([]);
  const [maxSecPtN, setmaxSecPtN] = useState([]);
  const [minSecFreq, setminSecFreq] = useState([]);
  const [minSecPtP, setminSecPtP] = useState([]);
  const [minSecPtN, setminSecPtN] = useState([]);

  const [datamaxFreq, setdatamaxFreq] = useState();
  const [datamaxPtoP, setdatamaxPtoP] = useState();
  const [datamaxPtoN, setdatamaxPtoN] = useState();
  const [dataminFreq, setdataminFreq] = useState();
  const [dataminPtoP, setdataminPtoP] = useState();
  const [dataminPtoN, setdataminPtoN] = useState();
  const [dataavgFreq, setdataavgFreq] = useState();
  const [dataavgPtoP, setdataavgPtoP] = useState();
  const [dataavgPtoN, setdataavgPtoN] = useState();

  const [percentRR, setPercentRR] = useState(0);
  const [percentSS, setPercentSS] = useState(0);
  const [percentTT, setPercentTT] = useState(0);
  const [percentRN, setPercentRN] = useState(0);
  const [percentSN, setPercentSN] = useState(0);
  const [percentTN, setPercentTN] = useState(0);

  const [totalRR, settotalRR] = useState(0);
  const [totalSS, settotalSS] = useState(0);
  const [totalTT, settotalTT] = useState(0);
  const [totalRN, settotalRN] = useState(0);
  const [totalSN, settotalSN] = useState(0);
  const [totalTN, settotalTN] = useState(0);

  const [datawidth, setWidth] = useState();
  const [dataheight, setHeight] = useState();

  useEffect(() => {
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    setWidth(bodyWidth);
    setHeight(bodyHeight);
  }, []);

  const fetchDataDayly = async () => {
    let response = await axios.get(
      "http://10.126.15.197:8002/part/getpowerdata",
      {
        params: {
          area: powerArea,
          start: startDate,
          finish: finishDate,
        },
      }

    );
    console.log(response.data);
    
    if (powerArea === "cMT-Gedung-UTY_MVMDP_data") {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      }));
    } else if (
      powerArea === "cMT-Gedung-UTY_LVMDP1_data" ||
      powerArea === "cMT-Gedung-UTY_LVMDP2_data" ||
      powerArea === "cMT-Gedung-UTY_SDP.1-Produksi_data"
    ) {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      }));
    } else {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      }));
    }

    setDailyPower(multipliedData);

    const totalY = multipliedData.reduce((sum, data) => sum + data.y, 0);
    const averageY = Math.ceil(totalY / multipliedData.length);

    setAvarageDaily(averageY);
    setTotalDaily(totalY);
  };

  const fetchDataMonthly = async () => {
    let response = await axios.get(
      "http://10.126.15.197:8002/part/getpowermonthly",
      {
        params: {
          area: areaMonth,
          start: startMonth,
          finish: finishMonth,
        },
      }
    );
    

    if (areaMonth === "cMT-Gedung-UTY_MVMDP_data") {
      var multipliedData1 = response.data.map((data) => ({
        label: data.label,
        y: Number(data.y),
      }));
    } else if (
      areaMonth === "cMT-Gedung-UTY_LVMDP1_data" ||
      areaMonth === "cMT-Gedung-UTY_LVMDP2_data" ||
      areaMonth === "cMT-Gedung-UTY_SDP.1-Produksi_data"
    ) {
      var multipliedData1 = response.data.map((data) => ({
        label: data.label,
        y: Number(data.y),
      }));
    } else {
      var multipliedData1 = response.data.map((data) => ({
        label: data.label,
        y: Number(data.y),
      }));
    }

    setMonthlyPowe(multipliedData1);

    const totalY = multipliedData1.reduce((sum, data) => sum + data.y, 0);
    const averageY = Math.ceil(totalY / multipliedData1.length);
    setAvarageMonthly(averageY);
    setTotalMonthly(totalY);
  };

  const fetchSec = async () => {
    let response = await axios.get(
      "http://10.126.15.197:8002/part/getPowerSec",
      {
        params: {
          area: secArea,
          start: secStart,
          finish: secFinish,
        },
      }
    );
    let response2 = await axios.get(
      "http://10.126.15.197:8002/part/getavgpower",
      {
        params: {
          area: secArea,
          start: secStart,
          finish: secFinish,
        },
      }
    );

    const totalLL =
      Number(response2.data[0].RR) +
      Number(response2.data[0].SS) +
      Number(response2.data[0].TT);

    const totalLN =
      Number(response2.data[0].RN) +
      Number(response2.data[0].SN) +
      Number(response2.data[0].TN);

    const RRdata = (Number(response2.data[0].RR) / totalLL) * 100;
    const SSdata = (Number(response2.data[0].SS) / totalLL) * 100;
    const TTdata = (Number(response2.data[0].TT) / totalLL) * 100;

    const RNdata = (Number(response2.data[0].RN) / totalLN) * 100;
    const SNdata = (Number(response2.data[0].SN) / totalLN) * 100;
    const TNdata = (Number(response2.data[0].TN) / totalLN) * 100;

    // let response1 = await axios.get("http://10.126.15.197:8002/part/getRangeSet");

    setPercentRR(RRdata);
    setPercentSS(SSdata);
    setPercentTT(TTdata);
    setPercentRN(RNdata);
    setPercentSN(SNdata);
    setPercentTN(TNdata);
    if (secArea == "cMT-Gedung-UTY_MVMDP_Detik_data") {
      var multipliedData = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.freq.toFixed(2)),
        x: data.id,
      }));
      var multipliedData1 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoP.toFixed(2)),
        x: data.id,
      }));
      var multipliedData2 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoN.toFixed(2)),
        x: data.id,
      }));

      const maxFreq = Math.max(...response.data.map((item) => item.freq));
      const maxPtoP = Math.max(...response.data.map((item) => item.PtoP));
      const maxPtoN = Math.max(...response.data.map((item) => item.PtoN));
      const minFreq = Math.min(...response.data.map((item) => item.freq));
      const minPtoP = Math.min(...response.data.map((item) => item.PtoP));
      const minPtoN = Math.min(...response.data.map((item) => item.PtoN));
      const sumFreq = response.data.reduce(
        (total, item) => total + item.freq,
        0
      );
      const sumPtoP = response.data.reduce(
        (total, item) => total + item.PtoP,
        0
      );
      const sumPtoN = response.data.reduce(
        (total, item) => total + item.PtoN,
        0
      );
      const avgFreq = sumFreq / response.data.length;
      const avgPtoP = sumPtoP / response.data.length;
      const avgPtoN = sumPtoN / response.data.length;
      setdatamaxFreq(maxFreq.toFixed(2));
      setdatamaxPtoP(maxPtoP.toFixed(2));
      setdatamaxPtoN(maxPtoN.toFixed(2));
      setdataminFreq(minFreq.toFixed(2));
      setdataminPtoP(minPtoP.toFixed(2));
      setdataminPtoN(minPtoN.toFixed(2));
      setdataavgFreq(avgFreq.toFixed(2));
      setdataavgPtoP(avgPtoP.toFixed(2));
      setdataavgPtoN(avgPtoN.toFixed(2));
      settotalRR(Number(response2.data[0].RR).toFixed(2));
      settotalSS(Number(response2.data[0].SS).toFixed(2));
      settotalTT(Number(response2.data[0].TT).toFixed(2));
      settotalRN(Number(response2.data[0].RN).toFixed(2));
      settotalSN(Number(response2.data[0].SN).toFixed(2));
      settotalTN(Number(response2.data[0].TN).toFixed(2));
    } else {
      var multipliedData = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.freq.toFixed(2)) / 1000,
        x: data.id,
      }));
      var multipliedData1 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoP.toFixed(2)) / 100,
        x: data.id,
      }));
      var multipliedData2 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoN.toFixed(2)) / 100,
        x: data.id,
      }));

      var freqArrayMax = [];
      var freqArrayMin = [];

      // for (var i = 0; i <= response.data.length; i++) {
      //   freqArrayMax.push({
      //     y: response1.data[0].Freq_max,
      //     x: response.data[0].id + i,
      //   });
      //   freqArrayMin.push({
      //     y: response1.data[0].Freq_min,
      //     x: response.data[0].id + i,
      //   });
      // }

      setmaxSecFreq(freqArrayMax);
      setminSecFreq(freqArrayMin);

      // var multipliedData3 = response1.data.map((data) => ({
      //   y: Number(data.Freq_max),
      //   x: data.id,
      // }));
      const maxFreq = Math.max(...response.data.map((item) => item.freq));
      const maxPtoP = Math.max(...response.data.map((item) => item.PtoP));
      const maxPtoN = Math.max(...response.data.map((item) => item.PtoN));
      const minFreq = Math.min(...response.data.map((item) => item.freq));
      const minPtoP = Math.min(...response.data.map((item) => item.PtoP));
      const minPtoN = Math.min(...response.data.map((item) => item.PtoN));
      const sumFreq = response.data.reduce(
        (total, item) => total + item.freq,
        0
      );
      const sumPtoP = response.data.reduce(
        (total, item) => total + item.PtoP,
        0
      );
      const sumPtoN = response.data.reduce(
        (total, item) => total + item.PtoN,
        0
      );
      const avgFreq = sumFreq / response.data.length;
      const avgPtoP = sumPtoP / response.data.length;
      const avgPtoN = sumPtoN / response.data.length;
      setdatamaxFreq((maxFreq / 1000).toFixed(2));
      setdatamaxPtoP((maxPtoP / 100).toFixed(2));
      setdatamaxPtoN((maxPtoN / 100).toFixed(2));
      setdataminFreq((minFreq / 1000).toFixed(2));
      setdataminPtoP((minPtoP / 100).toFixed(2));
      setdataminPtoN((minPtoN / 100).toFixed(2));
      setdataavgFreq((avgFreq / 1000).toFixed(2));
      setdataavgPtoP((avgPtoP / 100).toFixed(2));
      setdataavgPtoN((avgPtoN / 100).toFixed(2));
      settotalRR((Number(response2.data[0].RR) / 100).toFixed(2));
      settotalSS((Number(response2.data[0].SS) / 100).toFixed(2));
      settotalTT((Number(response2.data[0].TT) / 100).toFixed(2));
      settotalRN((Number(response2.data[0].RN) / 100).toFixed(2));
      settotalSN((Number(response2.data[0].SN) / 100).toFixed(2));
      settotalTN((Number(response2.data[0].TN) / 100).toFixed(2));
    }

    setSecFreq(multipliedData);
    setSecPtP(multipliedData1);
    setSecPtN(multipliedData2);
  };

  let dateStart = (e) => {
    var dataInput = e.target.value;
    setStartDate(dataInput);
  };

  let dateFinish = (e) => {
    var dataInput = e.target.value;
    setFinishDate(dataInput);
  };

  let getPowerArea = (e) => {
    var dataInput = e.target.value;
    setPowerArea(dataInput);
  };

  let getStartMonth = (e) => {
    var dataInput = e.target.value;
    setStartMonth(dataInput);
  };
  let getFinishMonth = (e) => {
    var dataInput = e.target.value;
    setFinishMonth(dataInput);
  };
  let getAreaMonth = (e) => {
    var dataInput = e.target.value;
    setAreaMonth(dataInput);
  };

  let getSecArea = (e) => {
    var dataInput = e.target.value;
    setSecArea(dataInput);
  };
  let getSecStart = (e) => {
    var dataInput = e.target.value;
    let unixStart = Math.floor(new Date(dataInput).getTime() / 1000 + 25200);
    setSecStart(unixStart);
  };
  let getSecFinish = (e) => {
    var dataInput = e.target.value;
    let unixStart = Math.floor(new Date(dataInput).getTime() / 1000 + 25200);
    setSecFinish(unixStart);
  };

  const options = {
    theme: "light1",
    title: {
      text: "Daily Power",
    },
    subtitles: [
      {
        text: "kilo watt per hour",
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
        name: "Kwh",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: dailyPower,
      },
    ],
  };

  const options2 = {
    theme: "light2",
    title: {
      text: "Monthly Power",
    },
    subtitles: [
      {
        text: "kilo watt per hour",
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
        name: "Kwh",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: monthlyPower,
      },
    ],
  };

  const options3 = {
    theme: "light5",
    title: {
      text: "Phase to Netral",
    },
    subtitles: [
      {
        text: "Trend Volt",
      },
    ],
    axisY: {
      valueFormatString: "#,##0.##",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: "Volt L-N",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: secPtN,
      },
    ],
  };

  const options4 = {
    theme: "light3",
    title: {
      text: "Phase to Phase",
    },
    subtitles: [
      {
        text: "Trend Volt",
      },
    ],
    axisY: {
      valueFormatString: "#,##0.##",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        name: "Volt L-L",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: secPtP,
      },
    ],
  };

  const options5 = {
    theme: "light2",
    title: {
      text: "Frequency",
    },
    subtitles: [
      {
        text: "Trend Frequency",
      },
    ],
    axisY: {
      valueFormatString: "##.###.##",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: "Hz",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: secFreq,
      },
      // {
      //   type: "spline",
      //   name: "Set",
      //   showInLegend: true,
      //   xValueFormatString: "",
      //   yValueFormatString: "",
      //   dataPoints: maxSecFreq,
      // },
      // {
      //   type: "spline",
      //   name: "Set",
      //   showInLegend: true,
      //   xValueFormatString: "",
      //   yValueFormatString: "",
      //   dataPoints: minSecFreq,
      // },
    ],
  };

  const options6 = {
    theme: "light2",
    animationEnabled: true,
    // width: datawidth,
    // height: dataheight,

    title: {},
    subtitles: [
      {
        //text: `${oeeCalculation.oee.toFixed(2)}% OEE`,

        text: `Volt L-L`,
        verticalAlign: "center",

        fontSize: 30,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        //click: visitorsChartDrilldownHandler,

        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y} | {volt} V",
        yValueFormatString: "##.##'%'",

        dataPoints: [
          { name: "Line-R", y: percentRR, volt: totalRR },
          { name: "Line-S", y: percentSS, volt: totalSS },
          { name: "Line-T", y: percentTT, volt: totalTT },
        ],
      },
    ],
  };
  const options7 = {
    theme: "light2",
    animationEnabled: true,
    // width: datawidth,
    // height: dataheight,

    title: {},
    subtitles: [
      {
        //text: `${oeeCalculation.oee.toFixed(2)}% OEE`,

        text: `Volt L-N`,
        verticalAlign: "center",

        fontSize: 30,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        //click: visitorsChartDrilldownHandler,

        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y} | {volt} V",
        yValueFormatString: "##.##'%'",

        dataPoints: [
          { name: "Line-R", y: percentRN, volt: totalRN },
          { name: "Line-S", y: percentSN, volt: totalSN },
          { name: "Line-T", y: percentTN, volt: totalTN },
        ],
      },
    ],
  };

  return (
    <div>
      <Stack
        className="flex flex-row justify-center mb-4  "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getPowerArea}>
            <option value="cMT-Gedung-UTY_MVMDP_data">MVMDP</option>
            <option value="cMT-Gedung-UTY_LVMDP1_data">LVMDP1</option>
            <option value="cMT-Gedung-UTY_LVMDP2_data">LVMDP2</option>
            <option value="cMT-Gedung-UTY_Inverter1-6_SP_data">
              Solar-Panel1-6
            </option>
            <option value="cMT-Gedung-UTY_Inverter7-12_SP_data">
              Solar-Panel7-12
            </option>
            <option value="cMT-Gedung-UTY_SDP.1-Utility_data">
              SDP.1-Utility
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data">
              PPLP.1-UtilityLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Chiller_data">
              PP.1-Chiller
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data">
              PPLP.1-UtilityLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Genset_data">PP.1-Genset</option>
            <option value="cMT-Gedung-UTY_PP.1-Boiler&PW_data">
              PP.1-Boiler & PW
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Kompressor_data">
              PP.1-Kompressor
            </option>
            <option value="cMT-Gedung-UTY_PP.1-HWP_data">PP.1-HWP</option>
            <option value="cMT-Gedung-UTY_PP.1-PUMPS_data">PP.1-PUMPS</option>
            <option value="cMT-Gedung-UTY_PP.1-Lift_data">PP.1-Lift</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.1_data">PP.1-AC1.1</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.2_data">PP.1-AC1.2</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.3_data">PP.1-AC1.3</option>
            <option value="cMT-Gedung-UTY_PP.1-AC2.3_data">PP.1-AC2.3</option>
            <option value="cMT-Gedung-UTY_SDP.1-Produksi_data">
              SDP.1-Produksi
            </option>
            <option value="cMT-Gedung-UTY_SDP.2-Produksi_data">
              SDP.2-Produksi
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Hydrant_data">
              PP.2-Hydrant.
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fatigon_data">
              PP.2-Fatigon
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Puyer_data">PP.2-Puyer</option>
            <option value="cMT-Gedung-UTY_PP.2-Mixagrib_data">
              PP.2-Mixagrib
            </option>
            <option value="cMT-Gedung-UTY_PP.2-LabLt.2_data">
              PP.2-LabLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fasilitas_data">
              PP.2-Fasilitas
            </option>
            <option value="cMT-Gedung-UTY_PP.2-PackWH_data">PP.2-PackWH</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.1_data">LP.2-PRO1.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.2_data">LP.2-PRO1.2</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.3_data">LP.2-PRO1.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO2.3_data">LP.2-PRO2.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO3.1_data">LP.2-PRO3.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO4.1_data">LP.2-PRO4.1</option>
            <option value="cMT-Gedung-UTY_LP.2WH1.1_data">LP.2-WH1.1</option>
            <option value="cMT-Gedung-UTY_LP.2MEZZ1.1_data">
              PPLP.2-Mezz1.1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga1_data">
              PPLP.1-PosJaga1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga2_data">
              PPLP.1-PosJaga2
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Workshop_data">
              PPLP.1-Workshop
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Koperasi_data">
              PPLP.1-Koperasi
            </option>
            <option value="cMT-Gedung-UTY_GCP_Genset_data">GCPGenset</option>
            <option value="cMT-Gedung-UTY_SDP_Genset_data">SDPGenset</option>
            <option value="cMT-Gedung-UTY_PP.1WWTP_data">PP.1-WWTP</option>
            <option value="cMT-Gedung-UTY_PP.2DumbWaiter_data">
              PP.1-DumbWaiter
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2OfficeLt1_data">
              PP.1-OfficeLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.2Pumpit_data">
              PP.1-PumpitUtama
            </option>
            <option value="cMT-Gedung-UTY_Chiller1_data">PPChiller1</option>
            <option value="cMT-Gedung-UTY_Chiller2_data">PPChiller2</option>
            <option value="cMT-Gedung-UTY_Chiller3_data">PPChiller3</option>
          </Select>
        </div>
        <div>
          <h2>Start Time</h2>
          <Input
            onChange={dateStart}
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
        </div>
        <div>
          <h2>Finish Time</h2>
          <Input
            onChange={dateFinish}
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => fetchDataDayly()}
          >
            Submit
          </Button>
        </div>
        <div className="mt-3">
          <div className="ml-16">Total = {totalDaily.toLocaleString()} Kwh</div>
          <div className="ml-16">
            Avarage = {avarageDaily.toLocaleString()} Kwh
          </div>
        </div>
      </Stack>
      <div className="flex flex-row justify-center mx-12 pb-10 ">
        <CanvasJSChart className="" options={options} />
      </div>

      <Stack
        className="flex flex-row justify-center mb-4  "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getAreaMonth}>
            <option value="cMT-Gedung-UTY_MVMDP_data">MVMDP</option>
            <option value="cMT-Gedung-UTY_LVMDP1_data">LVMDP1</option>
            <option value="cMT-Gedung-UTY_LVMDP2_data">LVMDP2</option>
            <option value="cMT-Gedung-UTY_Inverter1-6_SP_data">
              Solar-Panel1-6
            </option>
            <option value="cMT-Gedung-UTY_Inverter7-12_SP_data">
              Solar-Panel7-12
            </option>
            <option value="cMT-Gedung-UTY_SDP.1-Utility_data">
              SDP.1-Utility
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data">
              PPLP.1-UtilityLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Chiller_data">
              PP.1-Chiller
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data">
              PPLP.1-UtilityLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Genset_data">PP.1-Genset</option>
            <option value="cMT-Gedung-UTY_PP.1-Boiler&PW_data">
              PP.1-Boiler & PW
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Kompressor_data">
              PP.1-Kompressor
            </option>
            <option value="cMT-Gedung-UTY_PP.1-HWP_data">PP.1-HWP</option>
            <option value="cMT-Gedung-UTY_PP.1-PUMPS_data">PP.1-PUMPS</option>
            <option value="cMT-Gedung-UTY_PP.1-Lift_data">PP.1-Lift</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.1_data">PP.1-AC1.1</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.2_data">PP.1-AC1.2</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.3_data">PP.1-AC1.3</option>
            <option value="cMT-Gedung-UTY_PP.1-AC2.3_data">PP.1-AC2.3</option>
            <option value="cMT-Gedung-UTY_SDP.1-Produksi_data">
              SDP.1-Produksi
            </option>
            <option value="cMT-Gedung-UTY_SDP.2-Produksi_data">
              SDP.2-Produksi
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Hydrant_data">
              PP.2-Hydrant.
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fatigon_data">
              PP.2-Fatigon
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Puyer_data">PP.2-Puyer</option>
            <option value="cMT-Gedung-UTY_PP.2-Mixagrib_data">
              PP.2-Mixagrib
            </option>
            <option value="cMT-Gedung-UTY_PP.2-LabLt.2_data">
              PP.2-LabLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fasilitas_data">
              PP.2-Fasilitas
            </option>
            <option value="cMT-Gedung-UTY_PP.2-PackWH_data">PP.2-PackWH</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.1_data">LP.2-PRO1.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.2_data">LP.2-PRO1.2</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.3_data">LP.2-PRO1.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO2.3_data">LP.2-PRO2.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO3.1_data">LP.2-PRO3.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO4.1_data">LP.2-PRO4.1</option>
            <option value="cMT-Gedung-UTY_LP.2WH1.1_data">LP.2-WH1.1</option>
            <option value="cMT-Gedung-UTY_LP.2MEZZ1.1_data">
              PPLP.2-Mezz1.1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga1_data">
              PPLP.1-PosJaga1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga2_data">
              PPLP.1-PosJaga2
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Workshop_data">
              PPLP.1-Workshop
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Koperasi_data">
              PPLP.1-Koperasi
            </option>
            <option value="cMT-Gedung-UTY_GCP_Genset_data">GCPGenset</option>
            <option value="cMT-Gedung-UTY_SDP_Genset_data">SDPGenset</option>
            <option value="cMT-Gedung-UTY_PP.1WWTP_data">PP.1-WWTP</option>
            <option value="cMT-Gedung-UTY_PP.2DumbWaiter_data">
              PP.1-DumbWaiter
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2OfficeLt1_data">
              PP.1-OfficeLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.2Pumpit_data">
              PP.1-PumpitUtama
            </option>
            <option value="cMT-Gedung-UTY_Chiller1_data">PPChiller1</option>
            <option value="cMT-Gedung-UTY_Chiller2_data">PPChiller2</option>
            <option value="cMT-Gedung-UTY_Chiller3_data">PPChiller3</option>
          </Select>
        </div>
        <div>
          <h2>Month serch</h2>
          <Select placeholder="Select Mounth" onChange={getStartMonth}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">Mei</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Agu</option>
            <option value="9">Sep</option>
            <option value="10">Okt</option>
            <option value="11">Nov</option>
            <option value="12">Des</option>
          </Select>
        </div>
        <div>
          <h2>Month serch</h2>
          <Select placeholder="Select Mounth" onChange={getFinishMonth}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">Mei</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Agu</option>
            <option value="9">Sep</option>
            <option value="10">Okt</option>
            <option value="11">Nov</option>
            <option value="12">Des</option>
          </Select>
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => fetchDataMonthly()}
          >
            Submit
          </Button>
        </div>
        <div className="mt-3">
          <div className="ml-16">
            Total = {totalMonthly.toLocaleString()} Kwh
          </div>
          <div className="ml-16">
            Avarage = {avarageMonthly.toLocaleString()} Kwh
          </div>
        </div>
      </Stack>
      <CanvasJSChart className="" options={options2} />

      <Stack
        className="flex flex-row justify-center mb-4 mt-4 "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getSecArea}>
            <option value="cMT-Gedung-UTY_MVMDP_Detik_data">MVMDP</option>
            <option value="cMT-Gedung-UTY_LVMDP1_Detik_data">LVMDP1</option>
            <option value="cMT-Gedung-UTY_LVMDP2_Detik_data">LVMDP2</option>
            <option value="cMT-Gedung-UTY_Mixagrip_Detik_data">Line 1</option>
            <option value="cMT-Gedung-UTY_Puyer_Detik_data">Line 2</option>
            <option value="cMT-Gedung-UTY_Fatigon_Detik_data">Line 3</option>
          </Select>
        </div>
        <div>
          <h2>Start Time</h2>
          <Input
            onChange={getSecStart}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <h2>Finish Time</h2>
          <Input
            onChange={getSecFinish}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => fetchSec()}
          >
            Submit
          </Button>
        </div>
      </Stack>
      <div className="flex justify-center font-bold text-4xl mt-10">
        Voltage Balance
      </div>
      <div className="flex flex-row mx-50 px-30 mt-2">
        <CanvasJSChart className="" options={options6} />
        <CanvasJSChart className="" options={options7} />
      </div>

      <div className="flex flex-row mt-10">
        <CanvasJSChart className="" options={options3} />
        <CanvasJSChart className="" options={options4} />
        <CanvasJSChart className="" options={options5} />
      </div>
      <div className="flex flex-row justify-around mt-4">
        <div className="flex flex-col">
          <p> Max L-N : {datamaxPtoN} V</p>
          <p> Min L-N : {dataminPtoN} V</p>
          <p> avg L-N : {dataavgPtoN} V</p>
        </div>
        <div className="flex flex-col">
          <p> Max L-L : {datamaxPtoP} V</p>
          <p> Min L-L : {dataminPtoP} V</p>
          <p> avg L-L : {dataavgPtoP} V</p>
        </div>
        <div className="flex flex-col">
          <p> Max Freq : {datamaxFreq} Hz</p>
          <p> Min Freq : {dataminFreq} Hz</p>
          <p> avg Freq : {dataavgFreq} Hz</p>
        </div>
      </div>
    </div>
  );
}
