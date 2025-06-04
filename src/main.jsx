import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './styles/global.css'
import { EventProvider } from './contexts/EventContext'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
        }}
      >
        <EventProvider>
          <App />
        </EventProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)