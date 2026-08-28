import { generateFeeds } from '@/utils/feedHelper';

export async function getFeeds() {
  return generateFeeds(1000);
}
