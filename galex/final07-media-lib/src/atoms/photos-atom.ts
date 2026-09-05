import { atom } from 'jotai';

export const photosAtom = atom<{ id: string; uri: string }[]>([]);
