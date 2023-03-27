import { useSelector } from 'react-redux';

export const usePlayCardSelector = () => useSelector((state) => state.playCard);
