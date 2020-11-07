import React, { FC, ReactElement } from "react";
import { Modal } from "./Modal";
import { ModalTrigger } from "./ModalTrigger";

type Props = {
  children: ReactElement;
  title?: string;
  okLabel?: string;
  onClick: () => void;
};

export const Confirm: FC<Props> = ({ onClick, children, ...props }) => (
  <ModalTrigger button={children} modal={<Modal {...props} onOk={onClick} />} />
);
