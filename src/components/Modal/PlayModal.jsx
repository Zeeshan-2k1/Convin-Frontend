import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import './styles.css';

const PlayModal = ({ url, isOpen, setIsOpen, title, afterClose }) => {
  const [width, setWidth] = useState('75%');
  const [height, setHeight] = useState('600px');
  useEffect(() => {
    if (window.innerWidth <= 992) {
      setWidth('100%');
      setHeight('300px');
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 992) {
        setWidth('100%');
        setHeight('300px');
      } else {
        setWidth('75%');
        setHeight('600px');
      }
    });

    return () => window.removeEventListener('resize', null);
  }, []);
  return (
    <Modal
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={width}
      closeIcon={
        <span style={{ backgroundColor: 'whitesmoke', zIndex: 1 }}>
          <CloseCircleOutlined
            style={{
              fontSize: '36px',
              position: 'absolute',
              top: '5%',
              right: '5%',
            }}
          />
        </span>
      }
      afterClose={afterClose}
      destroyOnClose
    >
      <iframe
        width="100%"
        height={height}
        src={url}
        title={title ?? 'Player'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default PlayModal;
