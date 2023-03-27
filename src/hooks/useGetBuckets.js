import { useState, useEffect, useCallback } from 'react';

import { axiosInstance } from 'axiosInstance';

import { BucketURL } from 'utils/constants';

export const useGetBucketList = () => {
  const [buckets, setBuckets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getBuckets();
  }, []);

  const getBuckets = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/buckets');
      if (response.status === 200) {
        setBuckets(response.data);
        setIsLoading(false);
        setError(undefined);
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setBuckets([]);
      setError(
        error?.statuText || "Something went wrong. Couldn't fetch buckets."
      );
    }
  };

  return { buckets, error, isLoading, refresh: getBuckets };
};

export const useGetBucket = (id) => {
  const [bucket, setBucket] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getBucket = useCallback(async () => {
    try {
      if (id === undefined) return;
      setIsLoading(true);
      const response = await axiosInstance.get(`${BucketURL}/${id}`);
      if (response.status === 200) {
        setBucket(response.data);
        setIsLoading(false);
        setError(undefined);
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setBucket(undefined);
      setError(
        error?.statuText || "Something went wrong. Couldn't fetch the bucket."
      );
    }
  }, [id]);
  useEffect(() => {
    getBucket();
  }, [getBucket]);

  return { bucket, error, isLoading, refresh: getBucket };
};
