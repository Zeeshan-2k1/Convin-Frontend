import { v4 } from 'uuid';
import { Form, Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosInstance } from 'axiosInstance';

import { AlertContext } from 'context/AlertContext';

import { getBuckets } from 'reducers/bucketReducer';

import { BucketURL } from 'utils/constants';

const AddBucketModal = ({ isOpen, setIsOpen, refresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  const handleCreateBucket = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(BucketURL, {
        title,
        description,
        id: v4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      if (response.status === 201) {
        success('New bucket created!');
        handleCloseModal();
        dispatch(getBuckets());
      } else {
        throw response;
      }
    } catch (e) {
      console.log(e);
      error(e?.statusText || 'Something went wrong! Please try again.');
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Bucket"
        open={isOpen}
        onOk={handleCreateBucket}
        confirmLoading={loading}
        onCancel={handleCloseModal}
        okText={'Submit'}
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
        </Form>
      </Modal>
    </>
  );
};

export default AddBucketModal;
