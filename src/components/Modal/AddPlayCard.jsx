import { v4 } from 'uuid';
import { Form, Input, Modal, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosInstance } from 'axiosInstance';

import { AlertContext } from 'context/AlertContext';

import { useBucketSelector } from 'hooks/useBucketSelector';
import { useGetBucket } from 'hooks/useGetBuckets';

import { getBuckets } from 'reducers/bucketReducer';
import { getPlayCards } from 'reducers/playCardReducers';

import { BucketURL } from 'utils/constants';

const AddPlayCardModal = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sourceURL, setSourceURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bucket, setBucket] = useState('');
  const { success, error } = useContext(AlertContext);
  const { bucket: bucketData } = useGetBucket(bucket);
  const { buckets } = useBucketSelector();
  const dispatch = useDispatch();

  const preCheck = () => {
    return (
      title &&
      title?.length &&
      description &&
      description.length &&
      sourceURL &&
      sourceURL.length &&
      bucket &&
      bucket.length
    );
  };

  const handleCreatePlayCard = async () => {
    try {
      setLoading(true);
      if (!preCheck()) {
        error('Invalid Input Fields');
        handleCloseModal();
        return;
      }
      let data;
      if (bucketData?.playCards === undefined) {
        data = {
          playCards: [
            {
              title,
              description,
              id: v4(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
              url: sourceURL,
              bucket: bucket,
            },
          ],
        };
      } else {
        data = {
          playCards: [
            ...bucketData?.playCards,
            {
              title,
              description,
              id: v4(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
              url: sourceURL,
              bucket: bucket,
            },
          ],
        };
      }
      const response = await axiosInstance.patch(`${BucketURL}/${bucket}`, {
        playCards: data.playCards,
      });

      if (response.status === 200) {
        success('New Play Card created!');
        handleCloseModal();
        dispatch(getPlayCards());
        dispatch(getBuckets());
      } else {
        throw response;
      }
    } catch (e) {
      console.log(e);
      error(
        e?.statusText || e?.message || 'Something went wrong! Please try again.'
      );
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    setBucket('');
    setSourceURL('');
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Play Card"
        open={isOpen}
        onOk={handleCreatePlayCard}
        confirmLoading={loading}
        onCancel={handleCloseModal}
        okText={'Submit'}
        destroyOnClose={true}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              maxLength={25}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              type="text"
              required
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              maxLength={80}
            />
          </Form.Item>
          <Form.Item label="Media URL">
            <Input
              type="url"
              required
              value={sourceURL}
              onChange={({ target }) => setSourceURL(target.value)}
            />
          </Form.Item>
          <Form.Item label="Bucket">
            <Select
              value={bucket}
              onChange={(value) => setBucket(value)}
              options={buckets.map((item) => {
                return {
                  value: item?.id ?? '',
                  label: item?.title ?? '',
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPlayCardModal;
