import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Skeleton } from 'antd';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AlertContext } from 'context/AlertContext';

import { removeBucket } from 'reducers/bucketReducer';

import DeleteModal from '../Modal/DeleteModal';
import EditBucketModal from '../Modal/EditBucketModal';

const { Meta } = Card;

const BucketCard = ({ title, description, id, sklLoader, count }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  const deleteBucket = async () => {
    try {
      if (!id) {
        error('Invalid Id');
        return;
      }
      dispatch(removeBucket(id));
      success('Successfully Deleted');
      closeDeleteModal();
    } catch (error) {
      console.log(error);
      error(error?.statusText ?? 'Something went wrong.');
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
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
        title="Delete Bucket"
      />
      <EditBucketModal id={id} isOpen={editModal} setIsOpen={setEditModal} />
    </>
  );
};

export default BucketCard;
