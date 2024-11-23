import { Button } from "@/stories/Button/Button";
import { Logo } from "@/public/svgIcons/logo";
import Link from "next/link";
import { XIcon } from "@/public/svgIcons/xIcon";

export function Navbar() {
  return (
    <nav
      role="navigation"
      className="relative flex flex-row justify-between items-center pt-4 text-[#4C4C4D] w-full "
    >
      <div className="flex md:flex-row flex-col md:space-x-16 space-x-0 items-center w-full mx-6 md:mx-0">
        <div className="flex  flex-row justify-between w-full items-center">
          <span className="sr-only">open menu</span>
          <a className="flex md:hidden flex-col gap-1.5" href="#menutoggle">
            <span className="flex w-8 h-1 bg-black rounded-full"></span>
            <span className="flex w-8 h-1 bg-black rounded-full"></span>
            <span className="flex w-8 h-1 bg-black rounded-full"></span>
          </a>
          <Logo color="black" />
        </div>
        <ul
          className="fixed md:static md:text-base text-2xl md:font-normal font-semibold top-0 h-full flex md:flex-row flex-col gap-6 bg-secondary md:bg-transparent w-full [transform:_translateX(-200%)] md:[transform:_none] target:[transform:_translateX(0%)] [transition:_transform_.5s_ease-out] p-6 md:p-0"
          id="menutoggle"
        >
          <li className="flex md:hidden ">
            <Logo color="black" />
          </li>
          <li>
            <Link href={"/resident"}>Home</Link>
          </li>
          <li>
            <Link href={"/resident"}>About</Link>
          </li>
          <li>
            <Link href={"/resident"}>Features</Link>
          </li>
          <li>
            <Link href={"/resident"}>Contact</Link>
          </li>
          <li className="absolute top-[2rem] right-[1.5rem] flex md:hidden">
            <span className="sr-only">close menu</span>
            <a href="#">
              <XIcon />
            </a>
          </li>
          <li className="flex md:hidden">
            <Button
              variant="Primary"
              label="Login"
              iconAlign="after"
              color="white"
              bgColor="#1AD9C5"
              onClick={() => "hello"}
            />
          </li>
        </ul>
      </div>
      <div>
        <div className=" flex-row md:flex hidden">
          <Link href={"/resident"}>
            <Button
              variant="Primary"
              label="Login"
              iconAlign="after"
              color="white"
              bgColor="#1AD9C5"
              onClick={() => "hello"}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
