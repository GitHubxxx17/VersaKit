import { Segmented } from "@/index";
import React from "react";

const App: React.FC = () => (
  <>
    <Segmented
      style={{ marginBottom: "15px" }}
      size="large"
      options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
    />
    <br />
    <Segmented
      style={{ marginBottom: "15px" }}
      options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
    />
    <br />
    <Segmented
      size="small"
      options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
    />
  </>
);

export default App;
