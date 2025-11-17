import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Zustand from "./zustand/zustand";
import Zustands from "./zustand/zustands";
import Jotai from "./jotai/jotai";
import Jotais from "./jotai/jotais";
import Redux from "./redux/redux";
import Reduxs from "./redux/reduxs";

const { Header, Content, Sider } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "white", fontSize: 20, padding: 16, textAlign: "center" }}>
          My first Exam
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/">Zustand</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/zustands">Zustands</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/jotai">Jotai</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/jotais">Jotais</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/redux">Redux</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/reduxs">Reduxs</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: 24 }}>
          Hdm kadagiim ba ya azob
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Zustand /> },
        { path: "zustands", element: <Zustands /> },
        { path: "jotai", element: <Jotai /> },
        { path: "jotais", element: <Jotais /> },
        { path: "redux", element: <Redux /> },
        { path: "reduxs", element: <Reduxs /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
