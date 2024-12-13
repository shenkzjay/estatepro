import { Logo } from "@/public/svgIcons/logo";
import { Pills } from "@/stories/Pill/Pills";
import { HomeIcon } from "@/public/svgIcons/homeIcon";
import { BarcodeIcon } from "@/public/svgIcons/barcodeIcon";
import { PaymentIcon } from "@/public/svgIcons/paymentIcon";
import { MarketplaceIcon } from "@/public/svgIcons/marketIcon";
import { MaintenanceIcon } from "@/public/svgIcons/maitainanceIcon";
import { UpdatesIcon } from "@/public/svgIcons/updatesIcon";
import { LogOutIcon } from "@/public/svgIcons/logoutIcon";
import { usePathname } from "next/navigation";

export const AdminMobileMenuNavbar = () => {
  //init pathname
  const pathname = usePathname();
  return (
    <nav className="relative" role="navigation" aria-labelledby="mobile-navigation">
      <div className="flex  px-6 items-center justify-between bg-[#021412]  w-full z-20">
        <a>
          <Logo color="white" />
        </a>

        <a className="flex flex-col gap-1" href="#mobilecollapse">
          <span className="w-6 h-1 bg-white flex rounded-full"></span>
          <span className="w-6 h-1 bg-white flex rounded-full"></span>
          <span className="w-6 h-1 bg-white flex rounded-full"></span>
        </a>
      </div>

      <ul
        className="text-[14px] px-6 pt-6 absolute top-0 left-0  z-20 bg-[#021412] text-nowrap target:[transform:_translateX(0%)] [transform:_translateX(-100%)] [transition:_transform_0.3s_ease-out] overflow-hidden w-full h-[100vh]"
        id="mobilecollapse"
      >
        <li className="flex flex-row items-center justify-between mb-6">
          <a>
            <Logo color="white" />
          </a>
          <a href="#" className="text-white">
            close menu
          </a>
        </li>
        <li
          id="mobile"
          className={`${pathname === "/admin" ? "bg-primary" : ""} hover:bg-primary rounded-[4px] `}
        >
          <a href={"/admin"}>
            <Pills
              pillText="Home"
              bgColor="transparent"
              iconAlign="before"
              icon={HomeIcon}
              color="white"
            />
          </a>
        </li>
        <li
          className={`${pathname === "/admin/manage-residents" ? "bg-primary" : ""} hover:bg-primary rounded-[4px] `}
        >
          <a href={"/admin/manage-residents"}>
            <Pills
              pillText="Manage residents"
              bgColor="transparent"
              iconAlign="before"
              icon={BarcodeIcon}
              color="white"
            />
          </a>
        </li>
        <li
          className={`${pathname === "/admin/manage-staffs" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
        >
          <a href={"/admin/manage-staffs"}>
            <Pills
              pillText="Manage staffs"
              bgColor="transparent"
              iconAlign="before"
              icon={PaymentIcon}
              color="white"
            />
          </a>
        </li>
        <li
          className={`${pathname === "/admin/manage-vendors" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
        >
          <a href={"/admin/manage-vendors"}>
            <Pills
              pillText="Manage vendors"
              bgColor="transparent"
              iconAlign="before"
              icon={MaintenanceIcon}
              color="white"
            />
          </a>
        </li>
        <li
          className={`${pathname === "/admin/manage-updates" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
        >
          <a href={"/admin/manage-updates"}>
            <Pills
              pillText="Estate Updates"
              bgColor="transparent"
              iconAlign="before"
              icon={UpdatesIcon}
              color="white"
            />
          </a>
        </li>
        {/* <li>
          <a href={"/"}>
            <Pills
              pillText="Marketplace is left"
              bgColor="transparent"
              iconAlign="before"
              icon={MarketplaceIcon}
              color="white"
            />
          </a>
        </li> */}
        <li className="flex flex-row text-white mt-6 text-[14px] w-full justify-between p-2">
          <div className="flex flex-col gap-6 ">
            <div>
              <h3>Alison Eyo</h3>
              <p>alison@rayna.ui</p>
            </div>

            <div className="flex gap-3 w-full">
              Logout <LogOutIcon />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};