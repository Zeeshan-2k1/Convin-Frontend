import { Modal, Typography } from 'antd';

const { Title } = Typography;

const DeleteModal = ({ isOpen, handleClose, handleSubmit, loading, title }) => {
  return (
    <>
      <Modal
        title={title ?? 'Delete'}
        open={isOpen}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={handleClose}
        okText={'Delete'}
      >
        <Title level={5}>Do you really want to delete?</Title>
      </Modal>
    </>
  );
};

export default DeleteModal;
