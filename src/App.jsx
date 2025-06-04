import { Routes, Route } from 'react-router'
import EventsView from './components/EventDisplay/EventsView'
import AdminDashboard from './components/AdminPanel/AdminDashboard'
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EventsView />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App