import { useContext } from 'react';
import { PoemsContext } from './PoemsContext.jsx';

export function usePoems() {
  const context = useContext(PoemsContext);
  if (!context) {
    throw new Error('usePoems must be used within a PoemsProvider');
  }
  return context;
}