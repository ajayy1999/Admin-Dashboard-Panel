import { useState } from 'react'
import { Row, Col, Button, Typography, Card, Statistic, Space, Modal } from 'antd'
import { PlusOutlined, CalendarOutlined, TrophyOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useEvents } from '../../contexts/EventContext'
import { getEventCounts } from '../../utils/eventUtils'
import EventForm from './EventForm'
import EventList from './EventList'

const { Title } = Typography

const AdminDashboard = () => {
  const { events } = useEvents()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const eventCounts = getEventCounts(events)

  const handleAddEvent = () => {
    setEditingEvent(null)
    setIsModalVisible(true)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setEditingEvent(null)
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="admin-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Space align="center">
              <CalendarOutlined style={{ fontSize: '32px' }} />
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                Admin Dashboard
              </Title>
            </Space>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleAddEvent}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Add New Event
            </Button>
          </Col>
        </Row>
      </div>

      {/* Statistics */}
      <Row style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Events"
              value={eventCounts.total}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Today's Events"
              value={eventCounts.today}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#f5576c' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Future Events"
              value={eventCounts.future}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#667eea' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Past Events"
              value={eventCounts.past}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Event List */}
      <Card title="All Events" style={{ marginTop: '24px' }}>
        <EventList onEdit={handleEditEvent} />
      </Card>

      {/* Add/Edit Event Modal */}
      <Modal
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        destroyOnClose
      >
        <EventForm
          event={editingEvent}
          onCancel={handleModalClose}
          onSuccess={handleModalClose}
        />
      </Modal>
    </div>
  )
}

export default AdminDashboard