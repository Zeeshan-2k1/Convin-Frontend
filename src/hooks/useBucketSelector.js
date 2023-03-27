import { useSelector } from 'react-redux';

export const useBucketSelector = () => useSelector((state) => state.bucket);
