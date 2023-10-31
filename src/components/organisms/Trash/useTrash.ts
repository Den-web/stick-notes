import React from "react";

interface useTrashProps {
  onDrop: (id: string) => void;
}

export const useTrash = ({onDrop}: useTrashProps)  => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData('noteId');
    onDrop(noteId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return {
    handleDrop,
    handleDragOver
  }
}