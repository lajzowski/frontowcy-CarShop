import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';

export interface Store {
  list: string[];
  update: (parts: string[]) => void;
}

export const useCreatorListStore = create<Store>()(
  persist(
    (set) => ({
      list: [''],
      update: (parts) => {
        set(() => ({
          list: [...parts],
        }));
      },
    }),
    {
      name: 'eq-list', // Klucz w localStorage
    }
  )
);
