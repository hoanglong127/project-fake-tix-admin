import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import "./style.css";
import Logo from "../../../assets/images/logo.png";
import AdminAvatar from "../../../component/AdminAvatar";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [key, setKey] = useState("movies");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case "/movies":
        setKey("movies");
        break;
      case "/users":
        setKey("users");
        break;
      default:
        setKey("");
    }
  }, [location.pathname]);

  const handleSetCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={key}>
          <Menu.Item key="movies" icon={<VideoCameraOutlined />}>
            <Link to="/movies">Quản lý phim</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/users">Quản lý người dùng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined
              className="trigger"
              onClick={handleSetCollapsed}
            />
          ) : (
            <MenuFoldOutlined
              className="trigger"
              onClick={handleSetCollapsed}
            />
          )}
          <AdminAvatar />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
