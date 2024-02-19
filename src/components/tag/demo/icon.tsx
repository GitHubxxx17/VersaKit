import { Tag } from "@/index";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";

const App: React.FC = () => (
  <>
    <Tag icon={<TwitterOutlined />} color="#55acee">
      Twitter
    </Tag>
    &nbsp;
    <Tag icon={<YoutubeOutlined />} color="#cd201f">
      Youtube
    </Tag>
    &nbsp;
    <Tag icon={<FacebookOutlined />} color="#3b5999">
      Facebook
    </Tag>
    &nbsp;
    <Tag icon={<LinkedinOutlined />} color="#55acee">
      LinkedIn
    </Tag>
  </>
);

export default App;
