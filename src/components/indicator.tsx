import Link from "next/link";

export function Indicator() {
  return (
    <Link href="https://bit.ly/trypolymath">
      <div className="absolute right-3 z-50 flex items-center justify-center rounded-md bg-[#431F54] p-3 font-bold text-white sm:bottom-10 sm:right-7 md:-bottom-96 lg:fixed lg:bottom-10">
        <h3>Made with Polymath</h3>
      </div>
    </Link>
  );
}
