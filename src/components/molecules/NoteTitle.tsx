import React, { ChangeEvent } from 'react';
import TextArea from '../atoms/TextArea';

interface NoteTitleProps {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;

}

const NoteTitle = ({onChange, value = ''}: NoteTitleProps) => {

  return (
    <label>
      Sticky Note Content:
      <TextArea value={value} onChange={onChange} />
    </label>
  );
};

export default NoteTitle;