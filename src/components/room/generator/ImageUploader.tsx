import AddPhotoIcon from "@/assets/icons/ic_add_photo.svg?react";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";

export default function ImageUploader() {
  const { setImageFile, setPreviewUrl } = useFurnitureStore(
    useShallow((state) => ({
      setImageFile: state.setImageFile,
      setPreviewUrl: state.setPreviewUrl,
    }))
  );

  const isValidImageFile = (file: File) =>
    ["image/png", "image/jpeg", "image/webp"].includes(file.type);

  const processFile = async (file: File) => {
    if (!isValidImageFile(file)) {
      toast.error("png, jpg, webp 형식의 이미지만 업로드 가능합니다.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImageFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 기본 동작 방지 (브라우저가 파일 열지 않게 함)
    const file = event.dataTransfer.files?.[0]; // 드래그한 파일 중 첫 번째 파일 가져오기
    if (file) processFile(file);
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
