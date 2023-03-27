import { v4 } from 'uuid';
import { Form, Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AlertContext } from 'context/AlertContext';

import { addBucket } from 'reducers/bucketReducer';

const AddBucketModal = ({ isOpen, setIsOpen, refresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  const handleCreateBucket = async () => {
    try {
      setLoading(true);
      if (!title?.length) {
        error('inValid Input');
        return;
      }
      dispatch(
        addBucket({
          title,
          description,
          id: v4(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      );

      success('New bucket created!');
      handleCloseModal();
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
