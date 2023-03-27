import { Form, Input, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosInstance } from 'axiosInstance';

import { AlertContext } from 'context/AlertContext';

import { useGetBucket } from 'hooks/useGetBuckets';

import { getBuckets } from 'reducers/bucketReducer';

import { BucketURL } from 'utils/constants';

const EditBucketModal = ({ id, isOpen, setIsOpen }) => {
  const { bucket } = useGetBucket(id);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(bucket?.title);
  const [description, setDescription] = useState(bucket?.description);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(bucket?.title);
    setDescription(bucket?.description);
  }, [bucket]);

  const editBucketModal = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(`${BucketURL}/${id}`, {
        title,
        description,
        updatedAt: Date.now(),
      });
      if (response.status === 200) {
        success('Bucket Upated');
        dispatch(getBuckets());
        closeEditModal();
      } else {
        throw response;
      }
    } catch (e) {
      console.log(e);
      error(e.statusText ?? 'Something went wrong. Please try again.');
      closeEditModal();
    }
  };

  const closeEditModal = () => {
    setDescription('');
    setIsLoading(false);
    setTitle('');
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title="Edit Bucket"
        open={isOpen}
        onOk={editBucketModal}
        confirmLoading={isLoading}
        onCancel={closeEditModal}
        okText={'Submit'}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              type="text"
              required
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditBucketModal;
