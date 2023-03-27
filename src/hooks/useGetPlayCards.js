import { useState, useEffect } from 'react';

import { useBucketSelector } from './useBucketSelector';

export const useGetPlayCard = (bucketId, id) => {
  const [playCard, setPlayCard] = useState();
  const { buckets } = useBucketSelector();
  useEffect(() => {
    const bucket = buckets?.find((item) => item.id === bucketId);
    if (bucket) {
      const playCard = bucket?.playCards.find((item) => item.id === id);
      setPlayCard(playCard);
    }
  }, [bucketId, id, buckets]);

  return { playCard };
};

export const useGetPlayCardList = () => {
  const { buckets } = useBucketSelector();
  const [playCards, setPlayCards] = useState([]);

  useEffect(() => {
    let playCards = [];
    try {
      buckets?.forEach((item) => {
        if (item?.playCards) {
          playCards = [...playCards, ...item?.playCards];
        }
      });
    } catch (error) {
      console.log(error);
    }
    setPlayCards(playCards);
  }, [buckets]);

  return { playCards };
};
