import { Col, Typography, Row, Button, Tooltip } from 'antd';
import React, { useState } from 'react';

import AddPlayCardModal from 'components/Modal/AddPlayCard';
import PlayCard from 'components/Cards/PlayCard';

import { useBucketSelector } from 'hooks/useBucketSelector';

import { useGetPlayCardList } from '../../hooks/useGetPlayCards';

const { Title } = Typography;

const PlayCardList = () => {
  const { buckets, isLoading } = useBucketSelector();
  const [isOpen, setIsOpen] = useState(false);
  const { playCards } = useGetPlayCardList();

  return (
    <div>
      <Col span={24}>
        <div className="__row-between">
          <Title level={3}>Play Cards</Title>
          <Tooltip title={!buckets?.length ? 'No Buckets' : ''}>
            <Button
              disabled={!buckets?.length}
              type="primary"
              onClick={() => setIsOpen(true)}
            >
              Add Play Card
            </Button>
          </Tooltip>
        </div>
        <Row gutter={[16, 16]}>
          {isLoading ? (
            <>
              <Col xs={24} md={12} xl={6}>
                <PlayCard sklLoading={true} key={1} sklLoader={true} />
              </Col>
              <Col xs={24} md={12} xl={6}>
                <PlayCard sklLoading={true} key={2} sklLoader={true} />
              </Col>
              <Col xs={24} md={12} xl={6}>
                <PlayCard sklLoading={true} key={3} sklLoader={true} />
              </Col>
            </>
          ) : (
            <>
              {playCards.length !== 0 ? (
                playCards.map((item, index) => {
                  return (
                    <Col key={item?.id ?? index} xs={24} md={12} xl={6}>
                      <PlayCard
                        title={item?.title ?? ''}
                        description={item?.description ?? ''}
                        id={item?.id}
                        url={item?.url}
                        bucketId={item?.bucket}
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
          )}
        </Row>
      </Col>
      <AddPlayCardModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PlayCardList;
