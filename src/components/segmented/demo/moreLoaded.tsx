import { Button, Segmented } from "@/index";
import React, { useState } from "react";

const Demo: React.FC = () => {
  const [options, setOptions] = useState(["Daily", "Weekly", "Monthly"]);
  const [moreLoaded, setMoreLoaded] = useState(false);

  const handleLoadOptions = () => {
    setOptions((prev) => [...prev, "Quarterly", "Yearly"]);
    setMoreLoaded(true);
  };

  return (
    <>
      <Segmented options={options} style={{ marginBottom: "20px" }} />
      <br />
      <Button type="primary" disabled={moreLoaded} onClick={handleLoadOptions}>
        Load more options
      </Button>
    </>
  );
};

export default Demo;
