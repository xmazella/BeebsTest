import styled from "styled-components";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div>
      <SearchInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un événement, un lieu, une date, un theme et bien plus..."
      />
    </div>
  );
};

export default SearchBar;
