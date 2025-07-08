import { stabilityService } from "./stability.service";
import { withErrorHandler } from "@/api/withErrorHandler";
import { ERROR_MSG } from "@/shared/messages/errors";

export const generateFurnitureModel = async (file: File) => {
  return withErrorHandler({ message: ERROR_MSG.stability.generateModel })(() =>
    stabilityService.generateFurnitureModel(file)
  );
};
