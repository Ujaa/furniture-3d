import FurnitureCheckbox from "./FurnitureCheckbox";
import CancelButton from "./CancelButton";
import CreateButton from "./CreateButton";
import WidthInput from "./WidthInput";
import DepthInput from "./DepthInput";
import HeightInput from "./HeightInput";

export default function FurnitureForm() {
  return (
    <>
      <form className="flex flex-wrap gap-2 mb-4">
        <h2 className="text-sm mb-2 font-semibold">가구 정보 입력하기</h2>
        <br />
        <WidthInput />
        <DepthInput />
        <HeightInput />
        <FurnitureCheckbox />
      </form>
      <div className="flex gap-2 w-full">
        <CancelButton />
        <CreateButton />
      </div>
    </>
  );
}
