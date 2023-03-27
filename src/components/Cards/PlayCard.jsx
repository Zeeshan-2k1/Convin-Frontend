import {
  DeleteOutlined,
  PlayCircleFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Skeleton, Tooltip } from 'antd';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosInstance } from 'axiosInstance';

import { AlertContext } from 'context/AlertContext';

import { useHistorySelector } from 'hooks/useGetHistory';
import { useGetBucket } from 'hooks/useGetBuckets';

import { getBuckets } from 'reducers/bucketReducer';
import { getHistory } from 'reducers/historyReducers';
import { getPlayCards } from 'reducers/playCardReducers';

import { BucketURL, HistroyURL } from 'utils/constants';

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
  const { bucket } = useGetBucket(bucketId);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteHistoryModal, setDeleteHistoryModal] = useState(false);
  const [playModal, setPlayModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success, error } = useContext(AlertContext);
  const { list } = useHistorySelector();
  const dispatch = useDispatch();

  const deletePlayCard = async () => {
    try {
      setLoading(true);
      if (!id) {
        error('Invalid Id');
        return;
      }
      if (!bucket) {
        error('Something went wrong');
        return;
      }

      const playCards = bucket?.playCards;
      const updatedPlayCards = playCards.filter((item) => item.id !== id);
      const response = await axiosInstance.patch(`${BucketURL}/${bucketId}`, {
        playCards: updatedPlayCards,
      });
      if (response.status === 200) {
        success('Successfully Deleted');
        dispatch(getPlayCards());
        dispatch(getBuckets());
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
    setLoading(false);
    setDeleteModal(false);
  };

  const addHistory = async () => {
    try {
      if (!list) throw new Error("Can't find history. History Disabled");
      const playCard = list?.filter((item) => item.id === id);
      if (!playCard.length) {
        await axiosInstance.post(HistroyURL, {
          title,
          description,
          url,
          id,
          bucket: bucketId,
          lastPlayTime: Date.now(),
        });
      } else {
        await axiosInstance.patch(`${HistroyURL}/${id}`, {
          lastPlayTime: Date.now(),
        });
      }
      if (!lastPlayTime) {
        dispatch(getHistory());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`${HistroyURL}/${id}`);
      if (response.status === 200) {
        success('Successfully Deleted');
        dispatch(getHistory());
        setLoading(false);
        setDeleteHistoryModal(false);
      } else {
        throw response;
      }
    } catch (err) {
      console.log(err);
      error('Something went wrong');
      setLoading(false);
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
          <Meta title={title} description={description} />
          {lastPlayTime && (
            <Meta
              style={{ marginTop: '1rem' }}
              description={`Last Played: ${new Date(
                lastPlayTime
              ).toLocaleString()}`}
            />
          )}
        </Skeleton>
        <div className="__playCard-play-btn">
          <Tooltip title="Play Video" placement="bottom">
            <PlayCircleFilled
              onClick={() => {
                setPlayModal(true);
                addHistory();
              }}
            />
          </Tooltip>
        </div>
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
        loading={loading}
        title="Delete Play Card"
      />
      <DeleteModal
        handleClose={() => setDeleteHistoryModal(false)}
        handleSubmit={deleteHistory}
        isOpen={deleteHistoryModal}
        loading={loading}
        title="Delete History"
      />
      <PlayModal
        isOpen={playModal}
        setIsOpen={setPlayModal}
        url={url}
        afterClose={() => dispatch(getHistory())}
      />
    </>
  );
};

export default PlayCard;
