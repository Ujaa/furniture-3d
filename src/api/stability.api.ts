import axios from "axios";
import FormData from "form-data";
import { STABILITY_AI_API_KEY } from "@/shared/config";

const STABILITY_API_URL = "https://api.stability.ai/v2beta/3d/stable-fast-3d";

/**
 * Stability AI API를 사용하여 이미지를 3D 모델(GLB)로 변환
 * @param file - 변환할 가구 이미지 파일
 * @returns Promise<Uint8Array> - GLB 바이너리 데이터
 */

export const generateFurnitureModel = async (
  file: File
): Promise<Uint8Array> => {
  try {
    const payload = {
      image: file,
    };

    const response = await axios.postForm(
      STABILITY_API_URL,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${STABILITY_AI_API_KEY}`,
        },
      }
    );
    if (response.status === 200) {
      return new Uint8Array(response.data);
    } else {
      console.log(response);
      throw new Error(
        `오류 발생: ${response.status} - ${response.data.toString()}`
      );
    }
  } catch (error) {
    console.error("3D 모델 생성 실패:", error);
    throw error;
  }
};
