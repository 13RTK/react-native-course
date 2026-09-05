import { Media } from '@/types/media';
import { atom } from 'jotai';

export const mediasAtom = atom<Media[]>([]);
