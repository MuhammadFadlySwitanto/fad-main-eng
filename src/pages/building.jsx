import BuildingBAS from "./buildingBAS";
import BuildingEMS from "./buildingEMS";
import BuildingRnD from "./buildingRnD";
import BuildingWH1 from "./buildingWH1";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Building() {
  const userGlobal = useSelector((state) => state.user.user);
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab");

  const getTabIndex = () => {
    switch (initialTab) {
      case "WH1":
        return userGlobal.level > 2 ? "WH1" : "EMS";
      case "RnD":
        return userGlobal.level > 2 ? "RnD" : "EMS";
      case "BAS":
        return "BAS";
      case "EMS":
      default:
        return "EMS";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabIndex());

  useEffect(() => {
    setActiveTab(getTabIndex());
  }, [initialTab, userGlobal.level]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "EMS":
        return <BuildingEMS />
      case "BAS":
        return <BuildingBAS />
      case "RnD":
        return <BuildingRnD />
      case "WH1":
        return <BuildingWH1 />
      default:
        return <BuildingEMS />
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

export default Building;
