import React, { FC } from "react";
import { Modal } from "./Modal";
import { ModalTrigger } from "./ModalTrigger";

type ModalProps = {
  title?: string;
  okLabel?: string;
  onOpenChange?: (open: boolean) => void;
  onClick: () => void;
};

type Props = {
  title?: string;
  okLabel?: string;
  onClick: () => void;
};

const ConfirmModal: FC<ModalProps> = ({ onClick, onOpenChange, ...props }) => (
  <Modal
    {...props}
    onOk={() => {
      onClick();

      if (typeof onOpenChange === "function") {
        onOpenChange(false);
      }
    }}
  />
);

export const Confirm: FC<Props> = ({ onClick, children, ...props }) => (
  <ModalTrigger
    button={<span>{children}</span>}
    modal={<Modal {...props} onOk={onClick} />}
  />
);
