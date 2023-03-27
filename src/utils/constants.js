export const isDev = process.env.IS_DEV;
export const baseURL = isDev
  ? 'http://localhost:3004'
  : 'https://sun-hat-pig.cyclic.app/';
export const BucketURL = '/buckets';
export const HistroyURL = '/history';
