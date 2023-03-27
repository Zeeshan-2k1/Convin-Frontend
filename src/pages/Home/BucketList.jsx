import { useDispatch } from 'react-redux';
import { Col, Typography, Button, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import BucketCard from 'components/Cards/BucketCard';
import AddBucketModal from 'components/Modal/AddBucketModal';

import { useBucketSelector } from 'hooks/useBucketSelector';

import { getBuckets } from 'reducers/bucketReducer';

const { Title } = Typography;

const BucketList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { buckets, isLoading, error } = useBucketSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) return;
    dispatch(getBuckets());
  }, [isLoading, dispatch]);

  return (
    <div style={{ marginBottom: '4.5rem' }}>
      <Col span={24}>
        <div className="__row-between">
          <Title level={3}>Buckets</Title>
          <Button type="primary" onClick={() => setIsOpen(true)}>
            Add Bucket
          </Button>
        </div>
        {error ? (
          <Col
            style={{
              border: '1px solid #f5f5f5',
              borderRadius: '1rem',
            }}
            span={24}
          >
            <div className="__block">
              <Title style={{ color: '#d0d0d0' }} level={4}>
                Couldn't fetch Bucket List
              </Title>
            </div>
          </Col>
        ) : (
          <Row gutter={[16, 16]}>
            {isLoading ? (
              <>
                <Col xs={24} md={12} xl={6}>
                  <BucketCard key={1} sklLoader={true} />
                </Col>
                <Col xs={24} md={12} xl={6}>
                  <BucketCard key={2} sklLoader={true} />
                </Col>
                <Col xs={24} md={12} xl={6}>
                  <BucketCard key={3} sklLoader={true} />
                </Col>
              </>
            ) : (
              <>
                {buckets.length !== 0 ? (
                  buckets.map((item, index) => {
                    return (
                      <Col key={item?.id ?? index} xs={24} md={12} xl={6}>
                        <BucketCard
                          title={item?.title ?? ''}
                          description={item?.description ?? ''}
                          count={item?.playCards?.length ?? 0}
                          id={item?.id}
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
                        No Buckets
                      </Title>
                    </div>
                  </Col>
                )}
              </>
            )}
          </Row>
        )}
      </Col>
      <AddBucketModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BucketList;
