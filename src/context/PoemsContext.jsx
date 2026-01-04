import { createContext, useContext, useState } from 'react';

const PoemsContext = createContext();

export function PoemsProvider({ children }) {
  const [poems, setPoems] = useState([
    // Some classic public domain starter poems to make it look alive from the start
    {
      id: 1,
      title: 'Hope is the thing with feathers',
      content: `"Hope" is the thing with feathers -\nThat perches in the soul -\nAnd sings the tune without the words -\nAnd never stops - at all -`,
      author: 'Emily Dickinson',
    },
    {
      id: 2,
      title: 'Stopping by Woods on a Snowy Evening',
      content: `Whose woods these are I think I know.\nHis house is in the village though;\nHe will not see me stopping here\nTo watch his woods fill up with snow.\n\nThe darkest evening of the year.\nHe gives his harness bells a shake\nTo ask if there is some mistake.\nThe only other sound’s the sweep\nOf easy wind and downy flake.\n\nThe woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.`,
      author: 'Robert Frost',
    },
    {
      id: 3,
      title: 'I Wandered Lonely as a Cloud',
      content: `I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.`,
      author: 'William Wordsworth',
    },
    {
      id: 4,
      title: 'The Tyger',
      content: `Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?`,
      author: 'William Blake',
    },
  ]);

  const addPoem = (title, content) => {
    const newPoem = {
      id: Date.now(),
      title,
      content,
      author: 'You', // We'll add real usernames later with auth
    };
    setPoems([newPoem, ...poems]); // Newest on top
  };

  return (
    <PoemsContext.Provider value={{ poems, addPoem }}>
      {children}
    </PoemsContext.Provider>
  );
}

export function usePoems() {
  return useContext(PoemsContext);
}