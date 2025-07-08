import AddPhotoIcon from "@/assets/icons/ic_add_photo.svg?react";
import { fileToBase64 } from "@/shared/utils/file";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import toast from "react-hot-toast";

export default function ImageUploader() {
  const setImageFile = useFurnitureStore((state) => state.setImageFile);
  const setPreviewUrl = useFurnitureStore((state) => state.setPreviewUrl);

  const uploadFile = async (file: File) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/webp"
    ) {
      setPreviewUrl(await fileToBase64(file));
      setImageFile(file);
    } else {
      toast.error("png, jpg, webp 형식의 이미지만 업로드 가능합니다.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <>
      <label
        htmlFor="file-upload"
        className="furniture-container pt-10 pb-8 border-dashed flex flex-col items-center hover:border-blue-400 hover:bg-blue-50 hover:cursor-pointer hover:text-blue-400 transition-colors ease-in-out duration-400"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <AddPhotoIcon />
        <p className="text-xs mt-4 font-semibold text-center">
          이 영역을 클릭하거나 드래그해
          <br />
          배경이 투명한 가구 이미지를 올려주세요
        </p>
        <p className="mt-2 text-xs">PNG, JPG, WEPG 이미지만 가능합니다</p>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
