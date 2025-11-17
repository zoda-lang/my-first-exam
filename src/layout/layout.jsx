import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, Layout as AntLayout } from "antd";

const { Header, Content } = AntLayout;

const Layout = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { key: "/", label: <Link to="/">Zustand</Link> },
    { key: "/zustands", label: <Link to="/zustands">Zustands</Link> },
    { key: "/jotai", label: <Link to="/jotai">Jotai</Link> },
    { key: "/jotais", label: <Link to="/jotais">Jotais</Link> },
    { key: "/redux", label: <Link to="/redux">Redux</Link> },
    { key: "/reduxs", label: <Link to="/reduxs">Reduxs</Link> },
  ];

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
        />
      </Header>
      <Content style={{ padding: "20px" }}>
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;
