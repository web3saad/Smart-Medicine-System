type ICustomInputType = {
  label?: string;
  type?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
  min?: string;
  id?: string;
  className?: string;
};

const CustomInput: React.FC<ICustomInputType> = ({
  label,
  type,
  id,
  name,
  defaultValue,
  required,
  min,
  className,
}) => {
  return (
    <div className="flex flex-col w-full mb-5">
      <label htmlFor="amount" className="font-bold">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        className={`${className} rounded-md  px-2 h-12 border-2 border-blue-400`}
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        required={required}
        min={min}
      />
    </div>
  );
};

export default CustomInput;
