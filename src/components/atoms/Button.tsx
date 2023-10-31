import React from 'react';
import styled from 'styled-components';

// Define a type for the props of the Button component
type ButtonProps = {
  text: string; // text prop should be a string
  onClick: () => void; // onClick prop should be a function that takes no arguments and returns void
};

const ButtonStyled = styled.button`
  border-radius: 5px;
  border: 1px solid #000;
  color: #000;
  background-color: #fff;
`;

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonStyled onClick={onClick}>
      {text}
    </ButtonStyled>
  );
};

export default Button;