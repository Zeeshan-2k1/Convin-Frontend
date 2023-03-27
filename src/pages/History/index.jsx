import { Col, Row, Typography } from 'antd';

import PlayCard from 'components/Cards/PlayCard';

import { useHistorySelector } from 'hooks/useGetHistory';

const { Title } = Typography;

const History = () => {
  const { list } = useHistorySelector();

  return (
    <div>
      <Col span={24}>
        <div data-testid="__history_title" className="__row-between">
          <Title level={3}>Your History</Title>
        </div>

        <Row gutter={[16, 16]}>
          <>
            {list.length !== 0 ? (
              list.map((item, index) => {
                return (
                  <Col key={item?.id ?? index} xs={24} md={12} xl={6}>
                    <PlayCard
                      title={item?.title ?? ''}
                      description={item?.description ?? ''}
                      id={item?.id}
                      url={item?.url}
                      bucketId={item?.bucket}
                      lastPlayTime={item?.lastPlayTime}
                    />
                  </Col>
                );
              })
            ) : (
              <Col
                style={{
                  border: '1px solid #f5f5f5',
                  borderRadius: '1rem',
                }}
                span={24}
              >
                <div className="__block">
                  <Title style={{ color: '#d0d0d0' }} level={4}>
                    No Play Cards
                  </Title>
                </div>
              </Col>
            )}
          </>
        </Row>
      </Col>
    </div>
  );
};

export default History;
