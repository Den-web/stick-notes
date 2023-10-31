import React, { ReactNode, ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: yellow;
  border: none;
`;

interface TextAreaProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  children?: ReactNode;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  return (
    <StyledTextArea rows={7} value={value} onChange={onChange} />
  );
};

export default TextArea;