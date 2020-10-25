import {ErrorMessage, Field} from 'formik';
import React from "react";

const MaterialField = ({label, ...props}) => {

    return (
        <Field
            label={label}
            {...props}
            helperText={ <ErrorMessage name={props.name}/>}
        />
    );
};

export default MaterialField;