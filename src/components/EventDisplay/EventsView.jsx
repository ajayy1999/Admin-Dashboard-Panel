import { useState } from 'react'
import { Button, Row, Col, Typography, Spin, Space } from 'antd'
import { ReloadOutlined, CalendarOutlined } from '@ant-design/icons'
import { useEvents } from '../../contexts/EventContext'
import { categorizeEvents } from '../../utils/eventUtils'
import EventSection from './EventSection'

const { Title } = Typography

const EventsView = () => {
  const { events, loading, refreshEvents } = useEvents()
  const [refreshing, setRefreshing] = useState(false)

  const categorizedEvents = categorizeEvents(events)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshEvents()
    setRefreshing(false)
  }

  if (loading && events.length === 0) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="fade-in">
      <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
        <Col>
          <Space align="center">
            <CalendarOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
            <Title level={2} style={{ margin: 0 }}>
              Event Dashboard
            </Title>
          </Space>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={refreshing}
            size="large"
          >
            Refresh Events
          </Button>
        </Col>
      </Row>

      <Row gutter={[0, 32]}>
        <Col span={24}>
          <EventSection
            title="Today's Events"
            events={categorizedEvents.today}
            type="today"
            emptyMessage="No events scheduled for today"
          />
        </Col>

        <Col span={24}>
          <EventSection
            title="Future Events"
            events={categorizedEvents.future}
            type="future"
            emptyMessage="No upcoming events scheduled"
          />
        </Col>

        <Col span={24}>
          <EventSection
            title="Past Events"
            events={categorizedEvents.past}
            type="past"
            emptyMessage="No past events found"
          />
        </Col>
      </Row>
    </div>
  )
}

export default EventsView