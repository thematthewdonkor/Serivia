import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex items-center text-gray-400 justify-center shadow-sm  bg-slate-800/30">
      <div>
        <div className="pt-12 pb-4">
          <small className="flex justify-center flex-col">
            <footer>©2025 Serivia All Rights Reserved️</footer>
            <span className="text-xs text-center">
              🧑‍💻
              <Link
                href="https://gocircle.link/thematthewdonkor"
                className="underline ml-1 text-[10px] md:text-xs"
              >
                @thematthewdonkor
              </Link>
            </span>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
