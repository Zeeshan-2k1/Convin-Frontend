import { useState, useEffect, useCallback } from 'react';

import { axiosInstance } from 'axiosInstance';

import { BucketURL } from 'utils/constants';

export const useGetPlayCard = (bucketId, id) => {
  const [playCard, setPlayCard] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getPlayCard = useCallback(async () => {
    try {
      if (id === undefined) return;
      setIsLoading(true);
      const response = await axiosInstance.get(`${BucketURL}/${bucketId}`);
      if (response.status === 200) {
        setPlayCard(
          response.data.playCards.filter((item) => item.id === id)[0]
        );
        setIsLoading(false);
        setError(undefined);
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setPlayCard(undefined);
      setError(
        error?.statuText || "Something went wrong. Couldn't fetch the bucket."
      );
    }
  }, [id, bucketId]);
  useEffect(() => {
    getPlayCard();
  }, [getPlayCard]);

  return { playCard, error, isLoading, refresh: getPlayCard };
};
