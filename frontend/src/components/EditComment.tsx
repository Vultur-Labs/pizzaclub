import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
// import { CustomField } from "./Common";

type Values = {
  data: string;
};

type Props = {
  value: string;
  label: string;
  onOk: (employee: any) => void;
};

const validationSchema = Yup.object({
  data: Yup.string(),
});

export const EditComment: FC<Props> = ({
  value = "",
  label = " Comentarios:",
  onOk,
}) => {
  return (
    <Formik<Values>
      enableReinitialize
      initialValues={{
        data: value,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onOk(values.data);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="field">
            <label className="label">{label}</label>
            <div className="control is-flex">
              <Field id="comment-data" name="data">
                {({ field }) => (
                  <textarea
                    type="text"
                    className="textarea is-medium non-min-width"
                    rows="3"
                    {...field}
                  ></textarea>
                )}
              </Field>
              <button
                type="submit"
                className={`button is-success ${
                  isSubmitting ? "is-loading" : ""
                }`}
                disabled={isSubmitting}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
