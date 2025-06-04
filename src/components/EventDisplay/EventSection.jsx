import { Collapse, Badge, Empty } from 'antd';
import {
  CalendarOutlined,
} from '@ant-design/icons';
import EventCard from './EventCard';

const EventSection = ({ title, events, type, emptyMessage }) => {
  const getEventCount = () => events.length;
  const getDisplayEvents = () => events.slice(0, 3);
  const hasMoreEvents = () => events.length > 3;

  const renderHeader = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{title}</span>
      <Badge
        count={getEventCount()}
        style={{
          backgroundColor:
            type === 'today'
              ? '#f5576c'
              : type === 'future'
              ? '#667eea'
              : '#52c41a'
        }}
      />
    </div>
  );

  const renderContent = () => {
    if (events.length === 0) {
      return (
        <div className="empty-state">
          <Empty
            image={<CalendarOutlined />}
            description={emptyMessage}
          />
        </div>
      );
    }

    return (
      <div>
        {getDisplayEvents().map((event) => (
          <EventCard key={event.id} event={event} type={type} />
        ))}
        {hasMoreEvents() && (
          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              color: '#666',
              fontStyle: 'italic'
            }}
          >
            ... and {events.length - 3} more events
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`event-section ${type}-events`}>
      <Collapse
        defaultActiveKey={['1']}
        ghost
        size="large"
        items={[
          {
            key: '1',
            label: renderHeader(),
            children: renderContent()
          }
        ]}
      />
    </div>
  );
};

export default EventSection;
