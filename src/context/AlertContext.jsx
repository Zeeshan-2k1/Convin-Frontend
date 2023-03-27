import { message } from 'antd';

const { createContext } = require('react');

export const AlertContext = createContext();

const AlertWrapper = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };
  return (
    <AlertContext.Provider value={{ success, error, warning }}>
      <>
        {contextHolder}
        {children}
      </>
    </AlertContext.Provider>
  );
};

export default AlertWrapper;
