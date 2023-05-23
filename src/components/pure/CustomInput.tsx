import { useField } from "formik";
import { useEffect } from "react";
import "./CustomInput.css";

interface ICustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  handleChange: (arg1: string, arg2: string) => void;
  toogleVisibility?: () => void;
}

const CustomInput = ({
  label,
  handleChange,
  toogleVisibility,
  ...props
}: ICustomInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="custom-input-container">
      {props.type !== "textarea" ? (
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : "input-ok"}
          onBlur={(e) => handleChange(props.name, e.target.value)}
        />
      ) : (
        <textarea
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : "input-ok"}
          onBlur={(e) => handleChange(props.name, e.target.value)}
        ></textarea>
      )}

      <div
        className={`error`}
        style={{
          display: `${meta.touched && meta.error ? "inherit" : "none"}`,
        }}
      >
        {meta.error}
      </div>
    </div>
  );
};

export default CustomInput;
