import { Col, Row } from "@/index";
import React from "react";

const DemoBox: React.FC<{ children: React.ReactNode; value: number }> = (
  props
) => <p style={{ height: `${props.value}px` }}>{props.children}</p>;

const App: React.FC = () => (
  <>
    <h3>Align Top</h3>
    <Row justify="center" align="top">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>

    <h3>Align Middle</h3>
    <Row justify="space-around" align="middle">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>

    <h3>Align Bottom</h3>
    <Row justify="space-between" align="bottom">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>
  </>
);

export default App;
