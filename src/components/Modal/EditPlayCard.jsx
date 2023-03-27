import { Form, Input, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosInstance } from 'axiosInstance';

import { AlertContext } from 'context/AlertContext';

import { useGetBucket } from 'hooks/useGetBuckets';
import { useGetPlayCard } from 'hooks/useGetPlayCards';

import { getBuckets } from 'reducers/bucketReducer';
import { getPlayCards } from 'reducers/playCardReducers';

import { BucketURL } from 'utils/constants';

const EditPlayCardModal = ({ id, isOpen, setIsOpen, bucketId }) => {
  const { playCard } = useGetPlayCard(bucketId, id);
  const { bucket } = useGetBucket(bucketId);
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
      bucket &&
      bucket.length
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
      const playCards = bucket?.playCards;
      const updatedPlayCards = playCards.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            title,
            description,
            mediaURL: sourceURL,
            updatedAt: Date.now(),
          };
        }
        return item;
      });
      const response = await axiosInstance.patch(`${BucketURL}/${bucketId}`, {
        playCards: updatedPlayCards,
      });
      if (response.status === 200) {
        success('Play Card Upated');
        dispatch(getPlayCards());
        dispatch(getBuckets());
        closePlayCardModal();
      } else {
        throw response;
      }
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
