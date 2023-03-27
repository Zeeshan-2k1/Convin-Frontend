import { Form, Input, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AlertContext } from 'context/AlertContext';

import { useGetPlayCard } from 'hooks/useGetPlayCards';

import { updatePlayCard } from 'reducers/bucketReducer';

const EditPlayCardModal = ({ id, isOpen, setIsOpen, bucketId }) => {
  const { playCard } = useGetPlayCard(bucketId, id);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(playCard?.title);
  const [description, setDescription] = useState(playCard?.description);
  const [sourceURL, setSourceURL] = useState(playCard?.mediaURL);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(playCard?.title);
    setDescription(playCard?.description);
    setSourceURL(playCard?.url);
  }, [playCard]);

  const preCheck = () => {
    return (
      title &&
      title?.length &&
      description &&
      description.length &&
      sourceURL &&
      sourceURL.length &&
      bucketId &&
      bucketId.length
    );
  };

  const editPlayCardModal = async () => {
    try {
      setIsLoading(true);
      if (!preCheck()) {
        error('Invalid input fields');
        closePlayCardModal();
        return;
      }
      dispatch(
        updatePlayCard({
          title,
          description,
          updatedAt: Date.now(),
          url: sourceURL,
          bucket: bucketId,
          id: id,
        })
      );
      success('Play Card Upated');
      closePlayCardModal();
    } catch (e) {
      console.log(e);
      error(e.statusText ?? 'Something went wrong. Please try again.');
      closePlayCardModal();
    }
  };

  const closePlayCardModal = () => {
    setDescription('');
    setIsLoading(false);
    setTitle('');
    setSourceURL('');
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title="Edit Bucket"
        open={isOpen}
        onOk={editPlayCardModal}
        confirmLoading={isLoading}
        onCancel={closePlayCardModal}
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
          <Form.Item label="Media URL">
            <Input
              type="url"
              required
              value={sourceURL}
              onChange={({ target }) => setSourceURL(target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditPlayCardModal;
