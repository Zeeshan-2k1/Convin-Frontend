import React, { useEffect, useState } from 'react';

import {
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useHistory } from 'react-router';

const RootLayout = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (window.innerWidth <= 992) {
      setCollapsed(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 992) setCollapsed(true);
    });

    return () => window.removeEventListener('resize', null);
  }, []);

  useEffect(() => {
    if (history.location.pathname === '/history') setSelectedKey('2');
    else setSelectedKey('1');
  }, [history.location.pathname]);

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="64"
          style={{
            backgroundColor: colorBgContainer,
            minHeight: '100vh',
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            style={{ height: '100%', paddingTop: '6rem' }}
            theme="light"
            mode="inline"
            selectedKeys={selectedKey}
          >
            <Menu.Item
              key={'1'}
              onClick={() => {
                history.push('/');
                setSelectedKey('1');
              }}
            >
              <HomeFilled />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item
              key={'2'}
              onClick={() => {
                history.push('/history');
                setSelectedKey('2');
              }}
            >
              <PlaySquareOutlined />
              <span>History</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: '1rem 4rem',
              background: colorBgContainer,
              borderBottom: '1px solid #f5f5f5',
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                onClick: () => {
                  if (window.innerWidth <= 992) setCollapsed(true);
                  else setCollapsed(!collapsed);
                },
                style: { fontSize: '2rem' },
                className: '__navbar-toggle-btn-trigger',
              }
            )}
          </Header>
          <Content
            style={{ backgroundColor: colorBgContainer, padding: '2rem 4rem' }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default RootLayout;
