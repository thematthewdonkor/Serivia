import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h1 className="font-bold text-2xl mdtext-4xl ">Trending movies</h1>
      <span>
        ( Coming soon, please go to
        <Link href="/" className="underline mx-2 font-bold">
          {" "}
          home page
        </Link>
        <br></br> You can search for lastest movies and watch movie trailers or
        recaps 😊)
      </span>
    </div>
  );
};

export default Page;
