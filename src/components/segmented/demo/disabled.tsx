import { Segmented } from "@/index";
import React from "react";

const App: React.FC = () => (
  <>
    <Segmented
      style={{ marginBottom: "20px" }}
      options={["Map", "Transit", "Satellite"]}
      disabled
    />
    <br />
    <Segmented
      options={[
        "Daily",
        { label: "Weekly", value: "Weekly", disabled: true },
        "Monthly",
        { label: "Quarterly", value: "Quarterly", disabled: true },
        "Yearly",
      ]}
    />
  </>
);

export default App;
