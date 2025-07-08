import { furnitureService } from "./furniture.service";
import { withErrorHandler } from "@/api/withErrorHandler";
import { ERROR_MSG } from "@/shared/messages/errors";

export const createFurniture = async (
  userId: string,
  furnitureData: IFurniture
) => {
  return withErrorHandler({ message: ERROR_MSG.furniture.create })(() =>
    furnitureService.createFurniture(userId, furnitureData)
  );
};

export const uploadGLBToStorage = (file: File) => {
  return withErrorHandler({ message: ERROR_MSG.furniture.uploadGLB })(() =>
    furnitureService.uploadGLBToStorage(file)
  );
};

export const uploadPreviewToStorage = (previewImage: string) => {
  return withErrorHandler({ message: ERROR_MSG.furniture.uploadPreview })(() =>
    furnitureService.uploadPreviewToStorage(previewImage)
  );
};

export const getFurnitureList = (userId: string) => {
  return withErrorHandler({ message: ERROR_MSG.furniture.fetchList })(() =>
    furnitureService.getFurnitureList(userId)
  );
};

export const deleteFurniture = (userId: string, furnitureId: string) => {
  return withErrorHandler({ message: ERROR_MSG.furniture.delete })(() =>
    furnitureService.deleteFurniture(userId, furnitureId)
  );
};
