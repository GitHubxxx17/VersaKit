import { Segmented } from "@/index";
import React from "react";

const App: React.FC = () => (
  <>
    <Segmented options={["Map", "Transit", "Satellite"]} disabled />
    {/* <Segmented
      options={[
        "Daily",
        { label: "Weekly", value: "Weekly", disabled: true },
        "Monthly",
        { label: "Quarterly", value: "Quarterly", disabled: true },
        "Yearly",
      ]}
    /> */}
  </>
);

export default App;
