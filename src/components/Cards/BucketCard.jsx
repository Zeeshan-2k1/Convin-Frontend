import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Skeleton } from 'antd';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosInstance } from 'axiosInstance';

import { AlertContext } from 'context/AlertContext';

import { getBuckets } from 'reducers/bucketReducer';

import { BucketURL } from 'utils/constants';

import DeleteModal from '../Modal/DeleteModal';
import EditBucketModal from '../Modal/EditBucketModal';
import { getPlayCards } from '../../reducers/playCardReducers';

const { Meta } = Card;

const BucketCard = ({ title, description, id, sklLoader, count }) => {
  const [isLoading, setIsLoading] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  const deleteBucket = async () => {
    try {
      setIsLoading(true);
      if (!id) {
        error('Invalid Id');
        return;
      }
      const response = await axiosInstance.delete(`${BucketURL}/${id}`);
      if (response.status === 200) {
        success('Successfully Deleted');
        dispatch(getBuckets());
        dispatch(getPlayCards());
        closeDeleteModal();
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      error(error?.statusText ?? 'Something went wrong.');
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Card
        actions={[
          <SettingOutlined
            key={'settings'}
            onClick={() => setEditModal(true)}
          />,
          <DeleteOutlined key={'delete'} onClick={() => setIsOpen(true)} />,
        ]}
      >
        <Skeleton loading={sklLoader} active>
          <Meta title={title} description={<p>{description}</p>} />
          <Meta
            style={{ marginTop: '1rem' }}
            description={`Total Videos: ${count}`}
          />
        </Skeleton>
      </Card>
      <DeleteModal
        isOpen={isOpen}
        handleClose={closeDeleteModal}
        handleSubmit={deleteBucket}
        loading={isLoading}
        title="Delete Bucket"
      />
      <EditBucketModal id={id} isOpen={editModal} setIsOpen={setEditModal} />
    </>
  );
};

export default BucketCard;
