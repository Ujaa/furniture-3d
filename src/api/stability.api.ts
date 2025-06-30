import axios from "axios";
import FormData from "form-data";
import { STABILITY_AI_API_KEY } from "@/shared/config";

export const generateFurnitureModel = async (
  file: File
): Promise<Uint8Array> => {
  try {
    const payload = {
      image: file,
    };

    const response = await axios.postForm(
      "https://api.stability.ai/v2beta/3d/stable-fast-3d",
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
