import styled from "styled-components";

const TagContainer = styled.div`
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return <TagContainer>{label}</TagContainer>;
};

export default Tag;
