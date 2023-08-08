import React, { useState } from 'react';
import { UserOutlined, FileOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

interface CustomTemplateProps {
  children: React.ReactNode;
}

const items = [
  {
    key: '/users',
    label: 'Users',
    icon: UserOutlined,
  },
  {
    key: '/tickets',
    label: 'Tickets',
    icon: FileOutlined,
  },
];

const CustomTemplate = ({ children }: CustomTemplateProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleNavigate = (key: string) => {
    navigate(key);
  };

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items.map((item) => ({
            key: item.key,
            icon: React.createElement(item.icon),
            label: item.label,
          }))}
          onClick={({ key }) => handleNavigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default CustomTemplate;
