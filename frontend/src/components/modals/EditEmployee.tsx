import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { Employee } from "../../types/employee";
import { CustomField } from "../Common";
import { Modal } from "../Modal";
import { http, apiRoutes } from "../../services/http";

type Values = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  dni: string;
  cuil: string;
  phone: string;
  address: string;
};

type Props = {
  employee?: Employee; 
  onOk: (employee: any) => void;
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Campo requerido")
    .matches(/^\w{5,}$/, "Debe contener solo letras, números y _. Mínimo 5 carácteres."),
  password: Yup.string().required("Campo requerido"),
  email: Yup.string().required("Campo requerido"),
  first_name: Yup.string(),
  last_name: Yup.string(),
  dni: Yup.string()
    .required("Campo requerido")
    .matches(/^\d{8,9}$/, "Debe tener entre 8 y 9 dígitos."),
  cuil: Yup.string()
    .required("Campo requerido")
    .matches(/^\d{11,12}$/, "Debe tener entre 11 y 12 dígitos."),
  phone: Yup.string().matches(/^\d{7,11}$/, "Ingrese solo números."),
  address: Yup.string().required("Campo requerido"),
});


export const EditEmployeeModal: FC<Props> = ({
  employee,
  onOk,
  ...props
}) => {

    const validateUsername = async (value: string) => {
        let error;
        if (!value) return error;
        const id = employee?.user.id
        const query = (id)?`?id=${id}&username=${value}`:`?username=${value}`;
        const validation = await http.get(`${apiRoutes.validate_username}${query}`);
        if (!validation.ok) error = "El Usuario ya existe. Elija otro por favor."
        return error;
    }
  
    return (
    <Formik<Values>
        initialValues={{
            username: employee?.user.username ?? "",
            password: "",
            email: employee?.user.email ?? "",
            first_name: employee?.user.first_name ?? "",
            last_name: employee?.user.last_name ?? "",
            dni: employee?.dni ?? "",
            cuil: employee?.cuil ?? "",
            phone: employee?.phone ?? "",
            address: employee?.address?.address ?? "",
            }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => {
            const { username, email, first_name, last_name, password } = values;
            const { dni, cuil, phone, address} = values;
            const user: Record<string, any> = {
                username,
                first_name,
                last_name,
                email,
                password
            }

            onOk({ 
                user,
                dni,
                cuil,
                phone,
                address
            });
        }}
    >
        {({ handleSubmit}) => (
        <Modal
            {...props}
            title={employee ? "Editar Empleado" : "Crear Empleado"}
            okLabel="Guardar"
            onOk={handleSubmit}
        >
            <Form>
            <Field
                name="username"
                label="Username"
                validate={validateUsername}
                component={CustomField} />
            
            <Field 
                name="password"
                label="Password"
                type="password"
                component={CustomField} />

            <Field name="email" label="Correo Electrónico" component={CustomField} />
            <Field name="first_name" label="Nombre" component={CustomField} />
            <Field name="last_name" label="Apellido" component={CustomField} />
            <Field name="address" label="Dirección" component={CustomField} />
            <Field name="dni" label="DNI" component={CustomField} />
            <Field name="cuil" label="CUIL" component={CustomField} />
            <Field name="phone" label="Teléfono" component={CustomField} />
            </Form>
        </Modal>
        )}
    </Formik>
    )
};