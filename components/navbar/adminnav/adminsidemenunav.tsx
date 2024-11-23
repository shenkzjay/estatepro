"use client";

import { Logo } from "@/public/svgIcons/logo";
import { Pills } from "@/stories/Pill/Pills";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LogoIconOnly } from "@/public/svgIcons/logoIconOnly";
import { LogOutIcon } from "@/public/svgIcons/logoutIcon";
import { HomeIcon } from "@/public/svgIcons/homeIcon";
import { BarcodeIcon } from "@/public/svgIcons/barcodeIcon";
import { PaymentIcon } from "@/public/svgIcons/paymentIcon";
import { MarketplaceIcon } from "@/public/svgIcons/marketIcon";
import { MaintenanceIcon } from "@/public/svgIcons/maitainanceIcon";
import { UpdatesIcon } from "@/public/svgIcons/updatesIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { usePathname } from "next/navigation";

interface SideMenuProps {
  isCollapse: boolean;
  SetIsCollapse: Dispatch<SetStateAction<boolean>>;
}

export const AdminSideMenuNav = ({ isCollapse, SetIsCollapse }: SideMenuProps) => {
  //useMatch media hook to check for viewport size
  const mobileView = useMatchMedia("(max-width:800px)");

  //init pathname
  const pathname = usePathname();
  return (
    <>
      {!mobileView ? (
        <nav
          role="navigation"
          className={`bg-[#021412] z-[9] ${isCollapse ? "md:w-[18vw] w-[100vw] " : "scaledown"} h-full fixed top-0 p-2`}
        >
          <div className="">
            {isCollapse ? (
              <Logo color="white" />
            ) : (
              <div className="flex justify-center">
                <LogoIconOnly />
              </div>
            )}
          </div>

          <ul className="text-[14px] mt-12 flex flex-col gap-1 text-nowrap" id="collapse">
            <li>
              {isCollapse ? (
                <div
                  className={`${pathname === "/admin" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin"}>
                    <Pills
                      pillText="Home"
                      bgColor="transparent"
                      iconAlign="before"
                      icon={HomeIcon}
                      color="white"
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${pathname === "/admin" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin"}>
                    {" "}
                    <Pills
                      pillText=""
                      bgColor="transparent"
                      iconAlign="before"
                      icon={HomeIcon}
                      color="white"
                      tooltip="Home"
                    />
                  </Link>
                </div>
              )}
            </li>
            <li>
              {isCollapse ? (
                <div
                  className={`${pathname === "/admin/manage-residents" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-residents"}>
                    <Pills
                      pillText="Manage residents"
                      bgColor="transparent"
                      iconAlign="before"
                      icon={BarcodeIcon}
                      color="white"
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${pathname === "/admin/manage-residents" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-residents"}>
                    {" "}
                    <Pills
                      pillText=""
                      bgColor="transparent"
                      iconAlign="before"
                      icon={BarcodeIcon}
                      color="white"
                      tooltip="Manage residents"
                    />
                  </Link>
                </div>
              )}
            </li>
            <li>
              {isCollapse ? (
                <div
                  className={`${pathname === "/admin/manage-staffs" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-staffs"}>
                    <Pills
                      pillText="Manage staffs"
                      bgColor="transparent"
                      iconAlign="before"
                      icon={PaymentIcon}
                      color="white"
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${pathname === "/admin/manage-staffs" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-staffs"}>
                    {" "}
                    <Pills
                      pillText=""
                      bgColor="transparent"
                      iconAlign="before"
                      icon={PaymentIcon}
                      color="white"
                      tooltip="Manage staffs"
                    />
                  </Link>
                </div>
              )}
            </li>
            <li>
              {isCollapse ? (
                <div
                  className={`${pathname === "/admin/manage-vendors" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-vendors"}>
                    <Pills
                      pillText="Manage vendors"
                      bgColor="transparent"
                      iconAlign="before"
                      icon={MaintenanceIcon}
                      color="white"
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${pathname === "/admin/manage-vendors" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-vendors"}>
                    {" "}
                    <Pills
                      pillText=""
                      bgColor="transparent"
                      iconAlign="before"
                      icon={MaintenanceIcon}
                      color="white"
                      tooltip="Manage vendors"
                    />
                  </Link>
                </div>
              )}
            </li>
            <li>
              {isCollapse ? (
                <div
                  className={`${pathname === "/admin/manage-updates" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-updates"}>
                    <Pills
                      pillText="Estate Updates"
                      bgColor="transparent"
                      iconAlign="before"
                      icon={UpdatesIcon}
                      color="white"
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${pathname === "/admin/manage-updates" ? "bg-primary" : ""} hover:bg-primary rounded-[4px]`}
                >
                  <Link href={"/admin/manage-vendors"}>
                    {" "}
                    <Pills
                      pillText=""
                      bgColor="transparent"
                      iconAlign="before"
                      icon={UpdatesIcon}
                      color="white"
                      tooltip="Estate Updates"
                    />
                  </Link>
                </div>
              )}
            </li>
            {/* <li>
              {isCollapse ? (
                <div className="relative hover:bg-primary rounded-[4px]">
                  <Link href={"/"}>
                    <Pills
                      pillText="Marketplace"
                      bgColor="transparent"
                      iconAlign="before"
                      icon={MarketplaceIcon}
                      color="white"
                    />
                  </Link>
                </div>
              ) : (
                <div className="relative hover:bg-primary rounded-[4px]">
                  <Link href={"/"}>
                    {" "}
                    <Pills
                      pillText=""
                      bgColor="transparent"
                      iconAlign="before"
                      icon={MarketplaceIcon}
                      color="white"
                      tooltip="Marketplace"
                    />
                  </Link>
                </div>
              )}
            </li> */}
          </ul>

          <footer className="flex flex-row text-white absolute bottom-0 left-0 text-[14px] w-full justify-between p-2">
            {isCollapse ? (
              <div className="flex flex-row justify-between w-full">
                <div>
                  <h3>Alison Eyo</h3>
                  <p>alison@rayna.ui</p>
                </div>

                <div className="flex justify-center items-center md:justify-end  w-full">
                  <LogOutIcon />
                </div>
              </div>
            ) : (
              <div className="flex justify-center  items-center w-full">
                <LogOutIcon />
              </div>
            )}
          </footer>
        </nav>
      ) : null}
    </>
  );
};
