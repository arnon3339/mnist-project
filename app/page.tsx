import Predict from "@/components/predict";
import Wrapper from "@/components/wrapper";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center pt-10 relative">
      <div className="text-4xl font-bold max-md:text-2xl">
        Digit prediction
      </div>
      <div className="text-2xl max-md:text-xl px-2 text-center">
        Generated by create next app to predict digit number by using CNN.
      </div>
      <div className="py-6">
        <Link href="https://github.com/arnon3339/mnist-project" target="_blank">
          <img src="https://img.shields.io/github/stars/arnon3339/mnist-project?style=for-the-badge&label=github" alt="GitHub stars" 
            className="rounded-lg border border-foreground h-6"
          />
        </Link>
      </div>
        <Wrapper />
        <Predict />
    </div>
  );
}