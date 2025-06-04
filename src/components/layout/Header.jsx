import { Layout, Menu, Typography } from 'antd'
import { CalendarOutlined, SettingOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router'

const { Header: AntHeader } = Layout
const { Title } = Typography

const Header = () => {
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <CalendarOutlined />,
      label: <Link to="/">Events</Link>,
    },
    {
      key: '/admin',
      icon: <SettingOutlined />,
      label: <Link to="/admin">Admin Panel</Link>,
    },
  ]

  return (
    <AntHeader style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <CalendarOutlined style={{ fontSize: '24px', color: 'white', marginRight: '12px' }} />
        <Title level={3} style={{ color: 'white', margin: 0, flex: 1 }}>
          Dynamic Event Management System
        </Title>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          background: 'transparent',
          borderBottom: 'none',
          minWidth: '300px'
        }}
      />
    </AntHeader>
  )
}

export default Header