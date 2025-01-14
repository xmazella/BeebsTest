import { useEffect, useState } from "react";
import styled from "styled-components";

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 1px #0066ff;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
`;

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  min?: string;
  max?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
}

const DatePicker = ({
  label,
  value,
  onChange,
  min,
  max,
  id,
  required = false,
  disabled = false,
}: DatePickerProps) => {
  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(max);

  useEffect(() => {
    setMinDate(min);
    setMaxDate(max);
  }, [min, max]);

  return (
    <DatePickerWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <DateInput
        type="date"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        required={required}
        disabled={disabled}
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;
