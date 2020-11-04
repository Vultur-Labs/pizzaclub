import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

/* Select Component with Addon */
interface SelectOptions {
    value: string | number;
    label: string | number;
}

type Props ={
    value: (string | number);
    options: SelectOptions[];
    onOk: (data: any) => void;
}

type Values = {
    data: (number | string);
};
  
const validationSchema = Yup.object({
    data: Yup.string().required("Campo requerido"),
});
  
  
export const SelectWithAddon: FC<Props> = ({
    value,
    options,
    onOk,
    ...props
}) => (
    <Formik<Values>
        initialValues={{ data: options[0].value }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
            await onOk(values);
            setSubmitting(false);
        }}
    >
        {({ isSubmitting}) => (
        <Form>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <div className="select is-fullwidth">         
                        <Field as="select" name="data" disabled={isSubmitting}>
                            {options.map(({value, label}, idx) => (
                                <option value={value} key={idx}>{label}</option>
                            ))}
                        </Field>
                    </div>
                </div>
                <div className="control">
                    <button 
                        type="submit"
                        className={`button is-success ${isSubmitting?"is-loading":null}`}
                    >
                        Abrir
                    </button>
                </div>
            </div>
        </Form>
        )}
</Formik>
);