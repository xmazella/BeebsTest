import React, { Dispatch, SetStateAction, useId } from "react";
import ReactSelect from "react-select";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
`;

interface SelectProps {
  options: string[];
  multiple?: boolean;
  value?: Options | unknown;
  setter: Dispatch<SetStateAction<Option | unknown>>;
  label?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  options,
  multiple = false,
  value = null,
  setter,
  label,
}) => {
  const handleChange = (newValues: Option | unknown) => {
    setter(multiple ? newValues : [newValues]);
  };

  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <ReactSelect
        isMulti={multiple}
        options={options.map((option) => ({ value: option, label: option }))}
        value={value || []}
        onChange={handleChange}
        instanceId={useId()}
      />
    </SelectWrapper>
  );
};

export default CustomSelect;
