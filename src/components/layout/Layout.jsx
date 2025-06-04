import { Layout as AntLayout } from 'antd'
import Header from './Header'

const { Content } = AntLayout

const Layout = ({ children }) => {
  return (
    <AntLayout className="app-container">
      <Header />
      <Content className="main-content">
        {children}
      </Content>
    </AntLayout>
  )
}

export default Layout