import React, { useState } from 'react';

interface ButtonProps {
  onClick?: () => void;
  onChange?: () => void;
  className?: string;
  children?: string;
  required?:any
  disabled?:any
  title?:string
  type?:any
  name?:string
  placeholder?:string
}

const InputFieldComponent : React.FC<ButtonProps> = ({ type, title, placeholder,required, onChange, disabled, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className='form-input'>
      <div className='w-full mt-4'>
        <div className='relative'>
          <label
            htmlFor='input'
            className={`absolute py-2 mt-2 left-3 transition-all ${
              isFocused
                ? 'top-1 text-primaryColor font-bold text-sm'
                : 'top-3.5 text-gray-700 text-base'
            }`}
          >
            {title}
          </label>
          <input
            name={name}
            disabled={disabled}
            onChange={onChange}
            type={type}
            required={required}
            
            className='shadow appearance-none border rounded w-full h-16 pt-8 mt-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-primaryColor focus:border-blue-600'
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default InputFieldComponent;
