/* eslint-disable @typescript-eslint/no-explicit-any */
type ICustomInputType = {
  label?: string;
  type?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
  min?: string;
  id?: string;
  options?: any;
  value?: string | number;
  onChange?: any;
};

const CustomSelect: React.FC<ICustomInputType> = ({
  label,
  name,
  id,
  defaultValue,
  options,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full mb-5">
      <label htmlFor="amount" className="font-bold">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <select
        className="border-2 px-2 border-blue-400 py-2 rounded-lg  "
        name={name}
        defaultValue={defaultValue}
        required={required}
      >
        {options.map((option: any) => (
          <option
            onChange={onChange}
            id={id}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
