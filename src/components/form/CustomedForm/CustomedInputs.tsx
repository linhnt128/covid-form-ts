import { useField  } from 'formik';
import { Form as BsForm } from "react-bootstrap";





interface ICustomedTextInput {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  className: string;
  danger: boolean;
};

interface ICustomedDateSelect {
  type: string;
  label: string;
  name: string;
  className: string;
  danger?: boolean;
};

interface ICustomSelect {
  // type: string;
  label: string;
  name: string;
  className: string;
  danger: boolean;
};




const CustomedTextInput: React.FC<ICustomedTextInput> = ({ danger, placeholder, className, label, ...props  }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`  
  const [field, meta] = useField(props);
  

    return (
      <>
        <BsForm.Group>
          <BsForm.Label htmlFor={props.name}>{label}</BsForm.Label>
          {
            danger === true && 
            <span className="text-danger">*</span>
          }       
          <BsForm.Control 
            {...field} // name, value, onChange, onBlur
            {...props} // type, label, placeholder, disabled
            className={className}
            // id={props.name}
            type={props.type}
            placeholder={placeholder}
          />
          {
            meta.touched && meta.error 
            ? (
              <div className="text-danger">{meta.error}</div>
              ) 
            : null
          }
        </BsForm.Group>
      </>
    );
};


const CustomedDateSelect: React.FC<ICustomedDateSelect> = ({ danger,className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <BsForm.Group>
      <BsForm.Label htmlFor={props.name}>{label}</BsForm.Label>
      {
        danger === true && 
        <span className="text-danger">*</span>
      }  
      <BsForm.Control
        {...field} // name, value, onChange, onBlur
        {...props} // type, label, placeholder, disabled
        className={className}
        type={props.type}
      />
        {
            meta.touched && meta.error 
            ? (
              <div className="text-danger">{meta.error}</div>
              ) 
            : null
          }
    </BsForm.Group>
  );
};


const CustomedSelect: React.FC<ICustomSelect> = ({ danger, className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <BsForm.Group>
      <BsForm.Label htmlFor={props.name}>{label}</BsForm.Label>
      {
        danger === true && 
        <span className="text-danger">*</span>
      }
        <BsForm.Select
          {...field} // name, value, onChange, onBlur
          {...props} // type, label, placeholder, disabled
          className={className}
          // type={props.type}

        />
      {
      meta.touched && meta.error 
        ? (
          <div className="text-danger">{meta.error}</div>
          ) 
        : null
      }
    </BsForm.Group>
  );
};







export {
  CustomedTextInput,
  CustomedDateSelect,
  CustomedSelect,
  
};

