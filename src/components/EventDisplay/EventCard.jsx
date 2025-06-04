import { Card, Typography, Space, Tag, Divider } from 'antd'
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { formatDate, formatTime, getRelativeTime } from '../../utils/dateUtils'

const { Title, Text, Paragraph } = Typography

const EventCard = ({ event, type }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'today':
        return '#f5576c'
      case 'future':
        return '#667eea'
      case 'past':
        return '#52c41a'
      default:
        return '#1890ff'
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case 'today':
        return 'Today'
      case 'future':
        return 'Upcoming'
      case 'past':
        return 'Completed'
      default:
        return 'Event'
    }
  }

  return (
    <Card
      className="event-card"
      hoverable
      style={{ marginBottom: '16px' }}
      styles={{ padding: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <Title level={4} style={{ margin: 0, marginRight: '12px' }}>
              {event.title}
            </Title>
            <Tag color={getTypeColor()}>{getTypeLabel()}</Tag>
          </div>

          <Paragraph style={{ color: '#666', marginBottom: '16px' }}>
            {event.description}
          </Paragraph>

          <Space split={<Divider type="vertical" />} wrap>
            <Space>
              <CalendarOutlined style={{ color: '#1890ff' }} />
              <Text>{formatDate(event.date)}</Text>
            </Space>

            <Space>
              <ClockCircleOutlined style={{ color: '#1890ff' }} />
              <Text>{formatTime(event.time)}</Text>
            </Space>

            <Space>
              <EnvironmentOutlined style={{ color: '#1890ff' }} />
              <Text>{event.location}</Text>
            </Space>
          </Space>

          <div style={{ marginTop: '12px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {getRelativeTime(event.date)}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EventCard