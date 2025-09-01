import Link from "next/link";
const Favorite = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <h1 className="font-bold text-2xl mdtext-4xl ">Favorite movies</h1>
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

export default Favorite;
