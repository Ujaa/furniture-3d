import axios from "axios";
import FormData from "form-data";
import { STABILITY_AI_API_KEY } from "@/shared/config/config";
import { ERROR_MSG } from "@/shared/messages/errors";

const STABILITY_API_URL = "https://api.stability.ai/v2beta/3d/stable-fast-3d";

/**
 * Stability AI API를 사용하여 이미지를 3D 모델(GLB)로 변환
 * @param file - 변환할 가구 이미지 파일
 * @returns Promise<Uint8Array> - GLB 바이너리 데이터
 */
const generateFurnitureModel = async (file: File): Promise<Uint8Array> => {
  const response = await axios.postForm(
    STABILITY_API_URL,
    axios.toFormData({ image: file }, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${STABILITY_AI_API_KEY}`,
      },
    }
  );

  if (response.status === 200 && response.data) {
    return new Uint8Array(response.data);
  }
  throw new Error(ERROR_MSG.stability.generateModel);
};

export const stabilityService = {
  generateFurnitureModel,
};
