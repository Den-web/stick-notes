export interface Note {
  id: number;
  position: {
    top: number;
    left: number;
  };
  text: string;
  zIndex: number;
}