import { useState } from 'react'
import { Table, Button, Space, Popconfirm, Tag, Input, Empty } from 'antd'
import { EditOutlined, DeleteOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons'
import { useEvents } from '../../contexts/EventContext'
import { formatDate, formatTime, isDateToday, isDateFuture } from '../../utils/dateUtils'
import { searchEvents } from '../../utils/eventUtils'

const { Search } = Input

const EventList = ({ onEdit }) => {
  const { events, deleteEvent, loading } = useEvents()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState(null)

  const filteredEvents = searchEvents(events, searchTerm)

  const handleDelete = async (eventId) => {
    try {
      setDeleting(eventId)
      await deleteEvent(eventId)
    } catch (error) {
      console.error('Failed to delete event:', error)
    } finally {
      setDeleting(null)
    }
  }

  const getEventStatus = (date) => {
    if (isDateToday(date)) {
      return <Tag color="red">Today</Tag>
    } else if (isDateFuture(date)) {
      return <Tag color="blue">Upcoming</Tag>
    } else {
      return <Tag color="green">Past</Tag>
    }
  }

  const columns = [
    {
      title: 'Event Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      responsive: ['md'],
      render: (text) => (
        <span title={text}>
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => formatDate(date, 'MMM DD, YYYY'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      responsive: ['sm'],
      render: (time) => formatTime(time),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
      responsive: ['lg'],
    },
    {
      title: 'Status',
      dataIndex: 'date',
      key: 'status',
      render: (date) => getEventStatus(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this event?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              loading={deleting === record.id}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  if (events.length === 0) {
    return (
      <Empty
        image={<CalendarOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
        description="No events found. Create your first event!"
      />
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Search
          placeholder="Search events by title, description, or location"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={setSearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px' }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredEvents}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} events`,
        }}
        scroll={{ x: 800 }}
        size="middle"
      />
    </div>
  )
}

export default EventList