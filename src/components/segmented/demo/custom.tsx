import { Segmented } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Segmented
    options={[
      {
        label: (
          <div style={{ padding: 4 }}>
            <div>Spring</div>
            <div>Jan-Mar</div>
          </div>
        ),
        value: "spring",
      },
      {
        label: (
          <div style={{ padding: 4 }}>
            <div>Summer</div>
            <div>Apr-Jun</div>
          </div>
        ),
        value: "summer",
      },
      {
        label: (
          <div style={{ padding: 4 }}>
            <div>Autumn</div>
            <div>Jul-Sept</div>
          </div>
        ),
        value: "autumn",
      },
      {
        label: (
          <div style={{ padding: 4 }}>
            <div>Winter</div>
            <div>Oct-Dec</div>
          </div>
        ),
        value: "winter",
      },
    ]}
  />
);

export default App;
