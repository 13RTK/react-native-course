import { Feed, feedSchema } from '@/schemas/feed';
import { faker } from '@faker-js/faker';
import { fake, setFaker } from 'zod-schema-faker/v4';

setFaker(faker);

function generateFeedWithoutImage() {
  const mockFeedWithoutImage = fake(feedSchema);

  return mockFeedWithoutImage;
}

function generateFeed() {
  const mockFeedWithoutImage = generateFeedWithoutImage();

  return {
    ...mockFeedWithoutImage,
    image: `https://picsum.photos/seed/post-${mockFeedWithoutImage.id}/600/400`,
  };
}

export function generateFeeds(count: number) {
  const mockFeeds: Feed[] = [];

  for (let i = 0; i < count; i++) {
    mockFeeds.push(generateFeed());
  }

  return mockFeeds;
}
