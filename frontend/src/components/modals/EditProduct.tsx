import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { Product } from "../../types/product";
import { ProductType } from "../../types/product-type";
import { CustomField, CustomSelect } from "../Common";
import { Modal } from "../Modal";

type Values = {
  order_n: number;
  name: string;
  description: string;
  types: string;
};

type Props = {
  product?: Product;
  types?: ProductType[];
  onOk: (product: any) => void;
};

const validationSchema = Yup.object({
  order_n: Yup.number(),
  name: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
  types: Yup.string(),
});

export const EditProductModal: FC<Props> = ({
  product,
  types,
  onOk,
  ...props
}) => (
  <Formik<Values>
    initialValues={{
      order_n: product?.order_n ?? 1,
      name: product?.name ?? "",
      description: product?.description ?? "",
      types: String(product?.types ?? ""),
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => onOk({ ...values, id: product?.id })}
  >
    {({ handleSubmit }) => (
      <Modal
        {...props}
        title={product?.id ? "Editar Producto" : "Crear Producto"}
        okLabel="Guardar"
        onOk={handleSubmit}
      >
        <Form>
          <Field name="order_n" label="N° Orden" type="number" component={CustomField} />
          
          <Field name="name" label="Nombre" component={CustomField} />

          <Field
            name="description"
            label="Descripcion"
            component={CustomField}
          />

          <Field name="types" label="Tipos" component={CustomSelect}>
            <option value=""></option>
            {types?.map((type) => (
              <option value={type.id} key={type.id}>
                {type.name}
              </option>
            ))}
          </Field>
        </Form>
      </Modal>
    )}
  </Formik>
);
