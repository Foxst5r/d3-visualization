export const Dropdown = ({
  options,
  id,
  selectedValue,
  onSelectedValueChange,
}) => {
  return (
    <select
      id={id}
      onChange={(event) => onSelectedValueChange(event.target.value)}
    >
      {options.map(({ value, label }, idx) => (
        <option key={idx} value={value} selected={value === selectedValue}>
          {label}
        </option>
      ))}
    </select>
  );
};
