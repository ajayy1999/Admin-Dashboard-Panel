import { useState, useEffect } from 'react'
import { Form, Input, DatePicker, TimePicker, Button, Space, message } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useEvents } from '../../contexts/EventContext'
import { validateEvent } from '../../utils/eventUtils'

const { TextArea } = Input

const EventForm = ({ event, onCancel, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { addEvent, updateEvent } = useEvents()

  const isEditing = Boolean(event)

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        title: event.title,
        description: event.description,
        date: dayjs(event.date),
        time: dayjs(`2000-01-01 ${event.time}`),
        location: event.location
      })
    } else {
      form.resetFields()
    }
  }, [event, form])

  const handleSubmit = async (values) => {
    try {
      setLoading(true)

      const eventData = {
        title: values.title.trim(),
        description: values.description.trim(),
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        location: values.location.trim()
      }

      // Validate the event data
      const validation = validateEvent(eventData)
      if (!validation.isValid) {
        Object.keys(validation.errors).forEach(field => {
          form.setFields([{
            name: field,
            errors: [validation.errors[field]]
          }])
        })
        setLoading(false)
        return
      }

      if (isEditing) {
        await updateEvent(event.id, eventData)
      } else {
        await addEvent(eventData)
      }

      form.resetFields()
      onSuccess()
    } catch (error) {
      message.error('Failed to save event')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="title"
          label="Event Title"
          rules={[
            { required: true, message: 'Please enter event title' },
            { max: 100, message: 'Title must be less than 100 characters' }
          ]}
        >
          <Input
            placeholder="Enter event title"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter event description' },
            { max: 500, message: 'Description must be less than 500 characters' }
          ]}
        >
          <TextArea
            placeholder="Enter event description"
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Event Date"
          rules={[
            { required: true, message: 'Please select event date' }
          ]}
        >
          <DatePicker
            style={{ width: '100%' }}
            size="large"
            format="YYYY-MM-DD"
            placeholder="Select event date"
          />
        </Form.Item>

        <Form.Item
          name="time"
          label="Event Time"
          rules={[
            { required: true, message: 'Please select event time' }
          ]}
        >
          <TimePicker
            style={{ width: '100%' }}
            size="large"
            format="HH:mm"
            placeholder="Select event time"
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[
            { required: true, message: 'Please enter event location' },
            { max: 200, message: 'Location must be less than 200 characters' }
          ]}
        >
          <Input
            placeholder="Enter event location"
            size="large"
          />
        </Form.Item>

        <div className="form-actions">
          <Space>
            <Button
              size="large"
              onClick={handleCancel}
              icon={<CloseOutlined />}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
            >
              {isEditing ? 'Update Event' : 'Create Event'}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}

export default EventForm