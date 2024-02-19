import { Tag } from "@/index";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";

const App: React.FC = () => {
  const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("Clicked! But prevent default.");
  };
  return (
    <>
      <Tag>Tag</Tag>&nbsp;
      <Tag>
        <a href="https://ant-design.antgroup.com/components/tag-cn#api">link</a>
      </Tag>
      &nbsp;
      <Tag closeIcon={<CloseCircleOutlined />} onClose={preventDefault}>
        可关闭标签（但阻止默认事件）
      </Tag>
      &nbsp;
      <Tag closeIcon>可关闭标签</Tag>
    </>
  );
};

export default App;
