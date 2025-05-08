import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
} from "@chakra-ui/react";
import ProductionSummary from "./ProductionSummary";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductionInput from "./ProductionInput";

function Production() {
  const userGlobal = useSelector((state) => state.user.user);
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab");

  const getTabIndex = () => {
    switch (initialTab) {
      case "Input":
        return userGlobal.level >= 5 ? "Input" : "Prod";
      case "Prod":
      default:
        return "Prod";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabIndex());

  useEffect(() => {
    setActiveTab(getTabIndex());
  }, [initialTab, userGlobal.level]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Prod":
        return <ProductionSummary />
      case "Input":
        return <ProductionInput />
      default:
        return <ProductionSummary />
    }
  };

  return (
    <div>
      <>
        {renderTabContent()}
      </>
    </div>
  );
}

export default Production;
