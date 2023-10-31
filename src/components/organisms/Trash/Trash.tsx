import React from 'react';
import {useTrash} from './useTrash';
import styled from 'styled-components';

const TrashContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background-color: #ccc;
  border: 2px dashed #000;
`;

interface TrashProps {
  onDrop: (id: string) => void;
}

const Trash: React.FC<TrashProps> = ({ onDrop }) => {
  const { handleDrop, handleDragOver } = useTrash({onDrop});

  return (
    <TrashContainer onDrop={handleDrop} onDragOver={handleDragOver}>
      Drag notes here to delete.
    </TrashContainer>
  );
};

export default Trash;
