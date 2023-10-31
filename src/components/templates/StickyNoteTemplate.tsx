import React, {useState} from 'react';

import Button from "../atoms/Button";
import StickyNote from '../organisms/StickyNote/StickyNote';
import Trash from '../organisms/Trash/Trash';

interface Note {
  id: number;
  position: {
    top: number;
    left: number;
  };
}

const initialPosition = { top: 50, left: 50 };

const NoteApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]); // Store notes in state
  const [nextNoteId, setNextNoteId] = useState(1);

  const handleCreateNote = (position: { top: number; left: number }) => {
    setNotes([...notes, { id: nextNoteId, position }]);
    setNextNoteId(nextNoteId + 1);
  };

  const handleDeleteNote = (noteId: string | number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const handleResizeNote = (noteId: string | number, newSize: { width: number; height: number }) => {
    const updatedNotes = notes.map((note) =>
      // @ts-ignore
      note.id === noteId ? { ...note, size: newSize } : note
    );
    setNotes(updatedNotes);
  };

  const handleMoveNote = (noteId: string | number, newPosition: { top: number; left: number }) => {
    const updatedNotes = notes.map((note) =>
      // @ts-ignore
      note.id === noteId ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div>
      <Button onClick={() => handleCreateNote(initialPosition)} text={'Create Note'} key={'create-note-button'}/>
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          id={note.id}
          onDrag={handleMoveNote}
          onResize={handleResizeNote}
          initialPosition={note.position}
          onDrop={handleDeleteNote}
        />
      ))}
      <Trash onDrop={handleDeleteNote} />
    </div>
  );
};

export default NoteApp;