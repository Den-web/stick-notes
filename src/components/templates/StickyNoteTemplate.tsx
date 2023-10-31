import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import StickyNote from '../organisms/StickyNote/StickyNote';
import Trash from '../organisms/Trash/Trash';
import { Note } from '../../types/Note.types';
import { updateLocalStorage } from '../../utils/localStorage';

const initialPosition = { top: 50, left: 50 };

const NoteApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]); // Store notes in state

  useEffect(() => {
    // Retrieve notes from local storage
    const notesJSON = localStorage.getItem('notes');

    if (notesJSON) {
      // If there are notes in local storage, parse the JSON string
      const savedNotes: Note[] = JSON.parse(notesJSON);
      setNotes(savedNotes);
    }
  }, []);

  const handleCreateNote = (position: { top: number; left: number }) => {
    const zIndex = Math.max(...notes.map((note) => note.zIndex || 0), 0) + 1;
    const newNote: Note = {
      id: notes.length + 1,
      position,
      zIndex,
      text: '', // Initialize text with an empty string
    };
    setNotes([...notes, newNote]);

    const updatedNotes = [...notes, newNote];
    updateLocalStorage<Note[]>('notes', updatedNotes);
  };

  const handleDeleteNote = (noteId: string | number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    updateLocalStorage<Note[]>('notes', updatedNotes);
  };

  const handleResizeNote = (noteId: string | number, newSize: { width: number; height: number }) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, size: newSize } : note
    );
    setNotes(updatedNotes);
  };

  const handleMoveNote = (noteId: string | number, newPosition: { top: number; left: number }) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);

    updateLocalStorage<Note[]>('notes', updatedNotes);
  };

  return (
    <div>
      <Button onClick={() => handleCreateNote(initialPosition)} text={'Create Note'} key={'create-note-button'} />
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          id={note.id}
          setNotes={setNotes}
          notes={notes}
          onDrag={handleMoveNote}
          onResize={handleResizeNote}
          zIndex={note.zIndex}
          text={note.text} // Pass the note text
          initialPosition={note.position}
          onDrop={() => handleDeleteNote(note.id)}
        />
      ))}
      <Trash onDrop={handleDeleteNote} />
    </div>
  );
};

export default NoteApp;
