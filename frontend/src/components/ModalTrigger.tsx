import React, { FC, ReactElement, useState, useCallback } from "react";

type Props = {
  button: ReactElement;
  modal: ReactElement;
};

export const ModalTrigger: FC<Props> = ({ button, modal }) => {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), [open, setOpen]);

  return (
    <>
      <button.type {...button.props} onClick={openModal} />
      <modal.type {...modal.props} open={open} onOpenChange={setOpen} />
    </>
  );
};
