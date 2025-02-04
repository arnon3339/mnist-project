import ImageUpload from "@/components/image-upload";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center pt-10">
    <div className="text-4xl font-bold">
      Digit prediction
    </div>
    <div className="text-2xl">
      Generated by create next app to predict digit number by using CNN.
    </div>
      <ImageUpload />
    </div>
  );
}