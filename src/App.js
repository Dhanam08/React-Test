import { Layout } from "antd";
import React from "react";
import SaveSegment from "./components/SaveSegment";
const { Header, Content } = Layout;

const App = () => (
  <Layout>
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <h2 style={{ color: "white" }}>React Test</h2>
    </Header>
    <Content
      className="site-layout"
      style={{
        height: "100vh",
        padding: "50px 50px 50px",
        marginTop: 64,
      }}
    >
      <SaveSegment />
    </Content>
  </Layout>
);

export default App;
