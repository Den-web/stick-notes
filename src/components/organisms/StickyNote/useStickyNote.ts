import React, {CSSProperties, MouseEvent, useState, ChangeEvent} from "react";
import {Note} from "../../../types/Note.types";
import {updateLocalStorage} from "../../../utils/localStorage";

interface useStickyNoteProps {
  id: string | number;
  notes: Note[];
  initialPosition: { top: number; left: number };
  onDrag: (id: string | number, newPosition: { top: number; left: number }) => void;
  onResize: (id: string | number, newSize: { width: number; height: number }) => void;
  setNotes: (notes: Note[]) => void;
}

export const useStickyNote = ({id, initialPosition, onResize, onDrag, setNotes, notes}: useStickyNoteProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 200, height: 150 });

  const [isDragging, setIsDragging] = useState(false);
  const [resizeType, setResizeType] = useState(''); // 'top', 'bottom', 'left', 'right'
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [noteContent, setNoteContent] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state variable when the input value changes
    setNoteContent(e.target.value);
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: e.target.value } : note
    );
    setNotes(updatedNotes);

    updateLocalStorage<Note[]>('notes', updatedNotes);
    console.log(e.target.value);
    console.log(noteContent);
  };

  const handleDragEnd = (e: MouseEvent) => {
    const newPosition = { top: e.clientY, left: e.clientX };

    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, position: newPosition };
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
    setPosition(newPosition);

    updateLocalStorage<Note[]>('notes', updatedNotes);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeType('');
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - initialMouseX;
      const deltaY = e.clientY - initialMouseY;

      if (resizeType === 'top') {
        setSize({ ...size, height: size.height - deltaY });
        setPosition({ ...position, top: position.top + deltaY });
      } else if (resizeType === 'bottom') {
        setSize({ ...size, height: size.height + deltaY });
      } else if (resizeType === 'left') {
        setSize({ ...size, width: size.width - deltaX });
        setPosition({ ...position, left: position.left + deltaX });
      } else if (resizeType === 'right') {
        setSize({ ...size, width: size.width + deltaX });
      }

      setInitialMouseX(e.clientX);
      setInitialMouseY(e.clientY);

      onResize(id, size);
      onDrag(id, position);
    }
  };

  // @ts-ignore
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  const containerStyle: CSSProperties = {
    top: position.top,
    left: position.left,
    width: size.width,
    height: size.height,
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return {
    noteContent,
    containerStyle,
    handleDragEnd,
    handleFormSubmit,
    handleInputChange
  }
}