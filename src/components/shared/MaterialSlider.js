import {useField} from 'formik';
import React from "react";
import Slider from "@material-ui/core/Slider";

const MaterialSlider = (props) => {
    const [field, meta, helpers] = useField(props);
    return (
        <Slider
            name = {props.name}
            {...field}
            {...props}
            onBlur={(e) => helpers.setTouched(e)}
            onChange={(e, v) => helpers.setValue(v)}
        />
    );
};

export default MaterialSlider;