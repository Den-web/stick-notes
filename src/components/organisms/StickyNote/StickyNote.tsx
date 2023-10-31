import React from 'react';
import NoteTitle from '../../molecules/NoteTitle';
import styled from 'styled-components';
import { useStickyNote } from './useStickyNote';
import { Note } from '../../../types/Note.types';

interface StickyNoteProps {
  id: string | number;
  notes: Note[];
  initialPosition: { top: number; left: number };
  onDrag: (id: string | number, newPosition: { top: number; left: number }) => void;
  onResize: (id: string | number, newSize: { width: number; height: number }) => void;
  onDrop: (id: string | number) => void;
  setNotes: (notes: Note[]) => void;
  text: string;
  zIndex: number;
}

const StickyNote: React.FC<StickyNoteProps> = (
  {
    id,
    initialPosition,
    onDrag,
    onResize,
    zIndex,
    setNotes,
    notes,
    text, // Add text prop
  }) => {
  const {
    containerStyle,
    handleDragEnd,
    handleInputChange,
  } = useStickyNote({
    id,
    initialPosition,
    onResize,
    onDrag,
    setNotes,
    notes,
  });

  const NoteContainer = styled.div`
    position: absolute;
    background-color: yellow;
    border: 1px solid #000;
    cursor: grab;
    resize: both;
    overflow: auto;
    top: ${initialPosition.top}px; // Remove the arrow function
    left: ${initialPosition.left}px; // Remove the arrow function
  `;

  return (
    <NoteContainer style={{ ...containerStyle, zIndex }} draggable onDragEnd={handleDragEnd}>
      <NoteTitle
        value={text}
        onChange={handleInputChange}
        />
    </NoteContainer>
  );
};

export default StickyNote;
