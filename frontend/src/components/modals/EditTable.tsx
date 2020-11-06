import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { Table } from "../../types/table";
import { CustomField } from "../Common";
import { Modal } from "../Modal";

type Values = {
  number: number;
};

type Props = {
  table?: Table; 
  onOk: (table: any) => void;
};

const validationSchema = Yup.object({
  number: Yup.number().required("Campo requerido"),
});


export const EditTableModal: FC<Props> = ({
  table,
  onOk,
  ...props
}) => (
  <Formik<Values>
      initialValues={{ number: table?.number ?? 1 }}
      validationSchema={validationSchema}
      onSubmit={values => onOk(values)}
  >
      {({ handleSubmit}) => (
      <Modal
          {...props}
          title={table ? "Editar Mesa" : "Crear Mesa"}
          okLabel="Guardar"
          onOk={handleSubmit}
      >
          <Form>
          <Field
              name="number"
              label="Número de Mesa"
              type="number"
              component={CustomField} />
          </Form>
      </Modal>
      )}
  </Formik>
);