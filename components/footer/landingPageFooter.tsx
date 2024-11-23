import { Logo } from "@/public/svgIcons/logo";
import { FaceBookIcon } from "@/public/svgIcons/facebookIcon";
import { TwitterIcon } from "@/public/svgIcons/twitterIcon";
import { LinkedInIcon } from "@/public/svgIcons/linkenInIcon";

export const LandingPageFooter = () => {
  return (
    <footer className="flex flex-col gap-24">
      <div className="flex md:flex-row flex-col justify-between gap-6 mdLgap-0 ">
        <div>
          <Logo color="black" />
        </div>
        <div className="flex flex-row gap-4">
          <span className="w-16 h-16 bg-primary flex rounded-full justify-center items-center">
            <FaceBookIcon />
          </span>
          <span className="w-16 h-16 bg-primary flex rounded-full justify-center items-center">
            <TwitterIcon />
          </span>
          <span className="w-16 h-16 bg-primary flex rounded-full justify-center items-center">
            <LinkedInIcon />
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-center text-buttongray">
        <p>© 2024 Smart Premises. All rights reserved.</p>
      </div>
    </footer>
  );
};
