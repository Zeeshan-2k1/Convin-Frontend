import { Modal, Typography } from 'antd';

const { Title } = Typography;

const DeleteModal = ({ isOpen, handleClose, handleSubmit, title }) => {
  return (
    <>
      <Modal
        title={title ?? 'Delete'}
        open={isOpen}
        onOk={handleSubmit}
        onCancel={handleClose}
        okText={'Delete'}
      >
        <Title level={5}>Do you really want to delete?</Title>
      </Modal>
    </>
  );
};

export default DeleteModal;
