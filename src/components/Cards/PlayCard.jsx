import {
  DeleteOutlined,
  PlayCircleFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Skeleton, Tooltip } from 'antd';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AlertContext } from 'context/AlertContext';

import { removePlayCard } from 'reducers/bucketReducer';
import { addHistory, removeHistory } from 'reducers/historyReducers';

import DeleteModal from '../Modal/DeleteModal';
import EditPlayCardModal from '../Modal/EditPlayCard';
import PlayModal from '../Modal/PlayModal';

import PreviewImage from 'assets/preview.webp';

import './styles.css';

const { Meta } = Card;

const PlayCard = ({
  sklLoading,
  title,
  description,
  url,
  id,
  bucketId,
  lastPlayTime,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteHistoryModal, setDeleteHistoryModal] = useState(false);
  const [playModal, setPlayModal] = useState(false);
  const { success, error } = useContext(AlertContext);
  const dispatch = useDispatch();

  const deletePlayCard = async () => {
    try {
      if (!id) {
        error('Invalid Id');
        return;
      }
      if (!bucketId) {
        error('Something went wrong');
        return;
      }

      dispatch(removePlayCard({ bucket: bucketId, id }));
      success('Successfully Deleted');
      closeDeleteModal();
    } catch (error) {
      console.log(error);
      error(error?.statusText ?? 'Something went wrong.');
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleAddHistory = async () => {
    try {
      dispatch(
        addHistory({
          title,
          description,
          url,
          id,
          bucket: bucketId,
          lastPlayTime: Date.now(),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistory = async () => {
    try {
      dispatch(removeHistory(id));
      success('Successfully Deleted');
      setDeleteHistoryModal(false);
    } catch (err) {
      console.log(err);
      error('Something went wrong');
      setDeleteHistoryModal(false);
    }
  };

  return (
    <>
      <Card
        cover={<img width="100%" alt={title} src={PreviewImage} />}
        actions={
          lastPlayTime !== undefined
            ? [
                <Tooltip placement="bottom" title="Delete History">
                  <DeleteOutlined
                    onClick={() => setDeleteHistoryModal(true)}
                    key={'delete'}
                  />
                </Tooltip>,
              ]
            : [
                <Tooltip placement="bottom" title="Edit">
                  <SettingOutlined
                    onClick={() => setEditModal(true)}
                    key={'settings'}
                  />
                </Tooltip>,
                <Tooltip title="Delete" placement="bottom">
                  <DeleteOutlined
                    onClick={() => setDeleteModal(true)}
                    key={'delete'}
                  />
                </Tooltip>,
              ]
        }
      >
        <Skeleton loading={sklLoading} active>
          <Meta
            style={{ position: 'relative' }}
            title={title}
            description={
              <>
                {description}
                <div className="__playCard-play-btn">
                  <Tooltip title="Play Video" placement="bottom">
                    <PlayCircleFilled
                      onClick={() => {
                        setPlayModal(true);
                        handleAddHistory();
                      }}
                    />
                  </Tooltip>
                </div>
              </>
            }
          ></Meta>
          {lastPlayTime && (
            <Meta
              style={{ marginTop: '1rem', position: 'relative' }}
              description={`Last Played: ${new Date(
                lastPlayTime
              ).toLocaleString()}`}
            ></Meta>
          )}
        </Skeleton>
      </Card>
      <EditPlayCardModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        bucketId={bucketId}
        id={id}
      />
      <DeleteModal
        handleClose={() => setDeleteModal(false)}
        handleSubmit={deletePlayCard}
        isOpen={deleteModal}
        title="Delete Play Card"
      />
      <DeleteModal
        handleClose={() => setDeleteHistoryModal(false)}
        handleSubmit={deleteHistory}
        isOpen={deleteHistoryModal}
        title="Delete History"
      />
      <PlayModal isOpen={playModal} setIsOpen={setPlayModal} url={url} />
    </>
  );
};

export default PlayCard;
