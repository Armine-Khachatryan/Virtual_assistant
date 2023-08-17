import  React, { useEffect, useState } from "react";
import classes from './Checkbox.module.css';



export const Checkbox = ({
                             label,
                             index,
                             disabled = false,
                             onChange = () => {},
                             name,
                             rounded = false,
                             className,
                             checked,
                             defaultChecked,
                             ...props
                         }) => {
    const [value, setValue] = useState(checked);
    console.log(value, "valueeeeeeeeeeeeeeeeeeeeee")

    useEffect(() => {
        setValue(checked);
    }, [checked]);

    if (rounded) {
        return (
            <label className={[classes.label, className].join(" ")}>
                <input
                    type="checkbox"
                    onChange={onChange}
                    name={name}
                    index={index}
                    checked={value}
                    defaultChecked={defaultChecked}
                    {...props}
                />
                <div className={classes.block}>
                    <span className={classes.checkmark_container}>
                        <span />
                    </span>
                </div>
                {label}
            </label>
        );
    }

    return (
        <div className={classes.container}>
            <label
                className={[
                    classes["form-control"],
                    disabled ? classes["form-control--disabled"] : "",
                    rounded ? classes["checkbox-round"] : "",
                    className,
                ].join(" ")}
            >
                <input
                    type="checkbox"
                    name={name}
                    index={index}
                    checked={value}
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    onChange={(e) => onChange(e)}
                    {...props}
                />
                <span>{label} </span>
            </label>
            {/* {label ?

                // <input type="checkbox"
                //     name={name}
                //     disabled={disabled}
                //     defaultChecked={checked}
                //     onChange={(e) => onChange(e)}
                //     {...props} />
            // } */}
        </div>
    );
};


