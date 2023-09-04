import React from "react";
import { useParams } from "react-router-dom";
import Dashboard from "@/components/dashboard";
// import FormConfig from "@/components/formConfig";
import ListView from "@/components/listView";

const LayoutContainer: React.FC = () => {
  const params = useParams();
  if (params.name == "dashboard") {
    return <Dashboard />;
  } else {
    return <ListView name={params.name}/>;
  }
};

export default LayoutContainer;
