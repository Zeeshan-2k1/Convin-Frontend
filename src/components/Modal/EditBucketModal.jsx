import { Form, Input, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AlertContext } from 'context/AlertContext';

import { updateBucket } from 'reducers/bucketReducer';
import { useBucketSelector } from 'hooks/useBucketSelector';

const EditBucketModal = ({ id, isOpen, setIsOpen }) => {
  const { success, error } = useContext(AlertContext);
  const { buckets } = useBucketSelector();
  const bucket = buckets.find((item) => item.id === id);

  const [title, setTitle] = useState(bucket?.title);
  const [description, setDescription] = useState(bucket?.description);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(bucket?.title);
    setDescription(bucket?.description);
  }, [bucket]);

  const editBucketModal = async () => {
    try {
      dispatch(
        updateBucket({
          id,
          title,
          description,
          updatedAt: Date.now(),
        })
      );

      success('Bucket Upated');
      closeEditModal();
    } catch (e) {
      console.log(e);
      error(e.statusText ?? 'Something went wrong. Please try again.');
      closeEditModal();
    }
  };

  const closeEditModal = () => {
    setDescription('');
    setTitle('');
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title="Edit Bucket"
        open={isOpen}
        onOk={editBucketModal}
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
