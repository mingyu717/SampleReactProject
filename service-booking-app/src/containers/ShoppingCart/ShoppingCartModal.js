import React from "react";
import Modal from "react-modal";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";

Modal.setAppElement("body");

const ShoppingCartModal = props => {
  const { isOpen, closeModal, data, deleteService } = props;
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Shopping Cart Modal"
      className="shopping-cart-modal"
      overlayClassName="shopping-cart-modal-overlay"
    >
      <ShoppingCart
        closeModal={closeModal}
        data={data}
        deleteService={deleteService}
      />
    </Modal>
  );
};

export default ShoppingCartModal;
