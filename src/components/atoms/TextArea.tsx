import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: yellow;
  border: none; /* Optional: Remove border for a clean look */
`;

const TextArea = () => {
  return (
    <StyledTextArea rows={7} />
  );
};

export default TextArea;