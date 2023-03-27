import { v4 } from 'uuid';
import { Form, Input, Modal, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AlertContext } from 'context/AlertContext';

import { useBucketSelector } from 'hooks/useBucketSelector';

import { addPlayCard } from 'reducers/bucketReducer';

const AddPlayCardModal = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sourceURL, setSourceURL] = useState(null);
  const [bucket, setBucket] = useState('');
  const { success, error } = useContext(AlertContext);
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
      if (!preCheck()) {
        error('Invalid Input Fields');
        handleCloseModal();
        return;
      }

      dispatch(
        addPlayCard({
          title,
          description,
          updatedAt: Date.now(),
          createAt: Date.now(),
          url: sourceURL,
          bucket,
          id: v4(),
        })
      );
      success('Updated the Card');
      handleCloseModal();
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
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Play Card"
        open={isOpen}
        onOk={handleCreatePlayCard}
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
