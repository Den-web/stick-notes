import React from 'react';
import NoteTitle from '../../molecules/NoteTitle';
import styled from 'styled-components';
import {useStickyNote} from "./useStickyNote";

const NoteContainer = styled.div`
  position: absolute;
  background-color: yellow;
  border: 1px solid #000;
  cursor: grab;
  resize: both; /* Allow both horizontal and vertical resizing */
  overflow: auto; /* Add scrollbars when the content overflows */
`;

interface StickyNoteProps {
  id: string | number;
  initialPosition: { top: number; left: number };
  onDrag: (id: string | number, newPosition: { top: number; left: number }) => void;
  onResize: (id: string | number, newSize: { width: number; height: number }) => void;
  onDrop: (id: string | number) => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({ id, initialPosition, onDrag, onResize }) => {
  const {containerStyle, handleDragEnd, handleFormSubmit} = useStickyNote({id, initialPosition, onResize, onDrag});
  return (
    <NoteContainer style={containerStyle} draggable onDragEnd={(e) => handleDragEnd(e)}
    >
      <form onSubmit={handleFormSubmit}>
        <NoteTitle />
      </form>
    </NoteContainer>
  );
};

export default StickyNote;
