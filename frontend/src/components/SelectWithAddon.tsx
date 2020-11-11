import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import lodash from "lodash";

/* Select Component with Addon */
interface SelectOptions {
  value: string | number;
  label: string | number;
}

type Props = {
  options: SelectOptions[];
  labelNoOptions: string;
  onOk: (data: any) => void;
};

type Values = {
  data: string;
};

const validationSchema = Yup.object().shape({
  data: Yup.string().required("Campo requerido"),
});

export const SelectWithAddon: FC<Props> = ({
  options,
  labelNoOptions,
  onOk,
}) => (
  <Formik<Values>
    initialValues={{ data: "" }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setFieldValue }) => {
      if (values.data) await onOk(values);
      setFieldValue("data", "");
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <Field
                as="select"
                name="data"
                disabled={isSubmitting || lodash.isEmpty(options)}
              >
                <option key="-1" value="" label={labelNoOptions} />
                {options.map(({ value, label }, idx) => (
                  <option value={value} key={idx} label={String(label)} />
                ))}
              </Field>
            </div>
          </div>
          <div className="control">
            <button
              type="submit"
              className={`button is-success ${
                isSubmitting ? "is-loading" : null
              }`}
            >
              Abrir
            </button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);
