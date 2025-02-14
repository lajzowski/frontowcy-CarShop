import './ButtonChangeStyle.scss';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const ButtonChangeStyle = ({ isDarkMode, setIsDarkMode }: Props) => {
  return (
    <button
      className={'button-change-styles'}
      onClick={() => setIsDarkMode((dark) => !dark)}
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};
