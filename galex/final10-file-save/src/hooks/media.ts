import { Asset } from 'expo-media-library';

export function useMedia() {
  async function addMediaToGallery(uri: string) {
    try {
      const asset = await Asset.create(uri);

      return asset;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function deleteMediaFromGallery(id: string) {
    try {
      const asset = new Asset(id);

      await asset.delete();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    addMediaToGallery,
    deleteMediaFromGallery,
  };
}
