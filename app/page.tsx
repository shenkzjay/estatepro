"use client";

import { Navbar } from "@/components/navbar/page";
import Building from "@/public/img/09ad6699a5 1.png";
import { StarsIcon } from "@/public/svgIcons/starsIcon";
import { Pills } from "@/stories/Pill/Pills";
import { Cards } from "@/stories/cards/cards";
import { LinkArrow } from "@/public/svgIcons/linkarrow";
import { SketchedStar } from "@/public/svgIcons/sketchedstar";
import Security from "@/public/img/Frame 2608287.png";
import { Button } from "@/stories/Button/Button";
import { Accordian } from "@/stories/accordian/accordian";
import { Inputs } from "@/stories/input/input";
import { DashedLines } from "@/public/svgIcons/dashedlines";
import { LandingPageFooter } from "@/components/footer/landingPageFooter";
import accordianData from "@/utils/accordiandata";

export default function Home() {
  return (
    <main className="mx-auto container">
      {/**header section */}
      <header>
        <Navbar />

        <div className="flex flex-col justify-center items-center pb-12 md:pt-24 pt-10">
          <div className="md:w-2/3 text-center flex flex-col gap-4 mx-6 md:mx-0">
            <h1 className="[font-size:_clamp(2rem,5vw,4rem)] font-semibold ">
              Seamless Estate Living, Simplified
            </h1>
            <p className="text-black">
              Unlock the power of a fully customizable and integrated estate management solution
              tailored to your community&apos;s unique needs.
            </p>
            <button></button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(20ch,1fr))] gap-[30px] h-full items-end mx-6 md:mx-0">
          <div className="flex flex-col gap-5 text-[14px]">
            <Cards
              cardType="justImage"
              image={Building}
              width={500}
              height={800}
              alt="a picture of a modern building"
            />

            <div className="">
              <Pills
                bgColor="#f1f1f3"
                icon={StarsIcon}
                iconAlign="before"
                iconbg={true}
                pillText="Start your journey now"
                bgIcon="#139d8f"
              />
            </div>
          </div>
          <div className="text-[14px] flex flex-col gap-5">
            <span className="">
              <SketchedStar />
            </span>
            <Pills bgColor="#f1f1f3" iconAlign="noIcon" pillText="Improve your estate experience" />
            <Cards
              cardType="titleContent"
              title="Standout"
              content="Elevate your community's living standards with our comprehensive estate management solution, designed to streamline operations, enhance security, and cultivate a harmonious environment for residents and stakeholders alike."
            />
          </div>
          <div className="flex flex-col gap-5  text-[14px] order-1 md:order-none">
            <Cards
              cardType="IconText"
              subtitle="Support"
              content="Our dedicated support team ensures a seamless experience with prompt assistance and personalized guidance."
            />
            <Pills
              bgColor="#f1f1f3"
              iconAlign="noIcon"
              iconbg={false}
              pillText="24/7 access and support"
              icon={LinkArrow}
            />
          </div>
          <div className="text-[14px] flex flex-col gap-5">
            <Pills bgColor="#f1f1f3" iconAlign="noIcon" pillText="More enhanced security" />
            <Cards
              cardType="imageText"
              image={Security}
              subtitle="Security"
              content="Robust security measures fortify your estate's operations, safeguarding data integrity and privacy."
            />
          </div>
        </div>
      </header>

      {/**textbanner section */}
      <section className="flex flex-col justify-center items-center py-[130px] gap-4 mx-6 md:mx-0">
        <h2 className="[font-size:_clamp(2rem,5vw,3rem)] font-semibold text-black">
          Elevate Your Estate Experience
        </h2>
        <p className=" text-black md:w-[80%] md:text-center text-balance">
          Experience a new level of convenience and control with our Estate Management Platform.
          Designed to streamline operations, enhance security, and foster a connected community, our
          solution empowers you to create a tailored estate management system that fits your unique
          requirements.
          <br />
          <br />
          From guest access management and service charge payments to maintenance requests and
          online marketplaces, our platform offers a comprehensive suite of features to simplify
          daily operations and enhance the resident experience.
        </p>
        <span>
          <SketchedStar />
        </span>
      </section>

      {/**features section */}
      <section>
        <div className="mx-6 md:mx-0">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <div className="[font-size:_clamp(2rem,5vw,3rem)] font-semibold text-black">
              Features that redefines estate living
            </div>
            <div className="flex flex-row w-full justify-center">
              <div className="flex flex-row">
                <Pills
                  pillText="Creating a seamless and secure experience for your estate"
                  iconAlign="noIcon"
                  bgColor="#f1f1f3"
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex md:flex-row flex-col justify-between gap-16 mt-12 h-full">
              <div className="md:w-[40%] md:flex md:flex-grow ">
                <Cards
                  cardType="justImage"
                  image={Building}
                  width={500}
                  height={800}
                  alt="a picture of a modern building"
                />
              </div>
              <div className="md:w-[60%] bg-pillbackground rounded-[20px] md:p-10 p-4">
                <div className="flex md:flex-row flex-col justify-between w-full gap-4 md:gap-0">
                  <h3 className="[font-size:_clamp(1.2rem,5vw,2rem)] font-semibold text-black">
                    Estate Manager
                  </h3>
                </div>
                <article className="md:p-10 p-4 bg-white divide-y-[.5px] rounded-[20px] mt-10">
                  <div className="flex flex-row items-center gap-3 pb-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 h-full rounded-full">
                      01
                    </span>
                    <p className="text-[14px]  text-secondaryblack">
                      Customize your estate management system
                    </p>
                  </div>

                  <div className="flex flex-row  items-center gap-3 py-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                      02
                    </span>
                    <p className="text-[14px] text-secondaryblack">
                      Manage residents, staff, and vendors with ease
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 py-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                      03
                    </span>
                    <p className="text-[14px] text-secondaryblack">
                      Set up access controls and payment gateways
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 py-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                      04
                    </span>
                    <p className="text-[14px] text-secondaryblack">
                      Integrate with third-party services and IoT devices
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="flex md:flex-row flex-col justify-between gap-16 mt-16">
              <div className="md:w-[40%] md:flex md:flex-grow md:order-1 bg-['url(/public/img/09ad6699a5 1.png')]">
                <Cards
                  cardType="justImage"
                  image={Building}
                  width={500}
                  height={800}
                  alt="a picture of a modern building"
                />
              </div>
              <div className="md:w-[60%]  bg-pillbackground rounded-[20px] md:p-10 p-4">
                <div className="flex md:flex-row flex-col justify-between w-full gap-4">
                  <h3 className="[font-size:_clamp(1.2rem,5vw,2rem)] font-semibold text-black">
                    Resident portal
                  </h3>
                </div>
                <article className="md:p-10 p-4 bg-white divide-y-[.5px] rounded-[20px] mt-10">
                  <div className="flex flex-row items-center gap-3 pb-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                      01
                    </span>
                    <p className="text-[14px]  text-secondaryblack">
                      Secure login and visitor management
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-3 py-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:md:h-10 rounded-full">
                      02
                    </span>
                    <p className="text-[14px] text-secondaryblack">
                      Upload and verify service charge payments
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 py-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                      03
                    </span>
                    <p className="text-[14px] text-secondaryblack">
                      Report and track maintenance issues
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 py-4">
                    <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                      04
                    </span>
                    <p className="text-[14px] text-secondaryblack">
                      Receive real-time notifications and updates
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**and more button section */}
      <section className="flex flex-row justify-center my-[50px]">
        <div className="md:w-2/3">
          <Pills bgColor="#f1f1f3" pillText="And so much more..." />
        </div>
      </section>

      {/**More features section */}
      <section>
        <div className="mx-6 md:mx-0">
          <div className="flex md:flex-row flex-col justify-between gap-16 items-center">
            <div className="md:w-[33.5%] w-full h-full">
              <Cards
                cardType="justImage"
                image={Building}
                width={500}
                height={800}
                alt="a picture of a modern building"
              />
            </div>
            <div className="md:w-[60%] flex flex-col h-full bg-pillbackground rounded-[20px] md:p-10 p-4">
              <div className="flex md:flex-row flex-col justify-between w-full gap-4">
                <h3 className="[font-size:_clamp(1.2rem,5vw,2rem)] font-semibold text-black">
                  Staff and Vendor Portals
                </h3>
              </div>
              <article className="flex flex-col md:p-10 p-4 bg-white divide-y-[.5px] rounded-[20px] mt-10">
                <div className="flex flex-row items-center gap-3 pb-4">
                  <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                    01
                  </span>
                  <p className="text-[14px]  text-secondaryblack">
                    Streamlined access control and incident logging
                  </p>
                </div>

                <div className="flex flex-row items-center gap-3 py-4">
                  <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                    02
                  </span>
                  <p className="text-[14px] text-secondaryblack">
                    Seamless communication and collaboration
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between gap-16 mt-[71px] mx-6 md:mx-0">
          <div className="md:w-[33.5%] md:order-1">
            <Cards
              cardType="justImage"
              image={Building}
              width={500}
              height={800}
              alt="a picture of a modern building"
            />
          </div>
          <div className="md:w-[60%] bg-pillbackground rounded-[20px]">
            <div className="md:p-10 p-4">
              <div className="flex md:flex-row flex-col justify-between w-full gap-4 ">
                <h3 className="[font-size:_clamp(1.2rem,5vw,2rem)] font-semibold text-black">
                  Estate Marketplace
                </h3>
              </div>
              <article className="md:p-10 p-4 bg-white divide-y-[.5px] rounded-[20px] mt-10">
                <div className="flex flex-row items-center gap-3 pb-4">
                  <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                    01
                  </span>
                  <p className="text-[14px]  text-secondaryblack">
                    Integrated online marketplace for residents
                  </p>
                </div>

                <div className="flex flex-row items-center gap-3 py-4">
                  <span className="md:text-xl p-1 md:p-0 bg-secondary flex flex-row justify-center items-center w-10 md:h-10 rounded-full">
                    02
                  </span>
                  <p className="text-[14px] text-secondaryblack">
                    Browse and purchase products and services
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/**FAQ section */}
      <section className="my-[130px] mx-6 md:mx-0">
        <div className="flex flex-col justify-center items-center">
          <h2 className="[font-size:_clamp(2rem,5vw,3rem)] font-semibold text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-buttongray">Here are some common questions and answers to help you</p>
        </div>
        <div className=" flex flex-col bg-pillbackground md:p-20 p-4 rounded-[20px] gap-8 mt-12">
          {accordianData &&
            accordianData.map((accordian) => (
              <span key={accordian.id}>
                <Accordian title={accordian.title} content={accordian.content} />
              </span>
            ))}
        </div>
      </section>

      {/**Get in touch section */}
      <section className="relative overflow-hidden">
        <div className="  bg-primary md:p-20 p-6 flex flex-col justify-center items-center w-full rounded-[20px]">
          <div className="mb-14">
            <h2 className="[font-size:_clamp(2rem,5vw,3rem)] text-[#C3F8F2] text-center">
              Have Questions? Get in Touch
            </h2>
            <p className="text-[#C3F8F2] text-center">
              Our team is ready to assist you with any inquiries or provide a personalized demo.
            </p>
          </div>
          <fieldset className="w-full md:flex justify-center">
            <form className=" relative flex flex-col gap-12 md:w-[40vw] z-[9]">
              <Inputs
                label="Fullname"
                title="fullname"
                placeholder=""
                inputtype="text"
                color="#ababab"
                arialabel="userfullname"
                required
              />
              <Inputs
                label="Email"
                title="Email"
                placeholder=""
                inputtype="email"
                color="#ababab"
                arialabel="useremail"
                required
              />
              <div className="flex flex-row justify-center">
                <Button
                  variant="Secondary"
                  label="Send message"
                  onClick={() => "click"}
                  iconAlign="after"
                />
              </div>
            </form>
          </fieldset>
          <span className="absolute bottom-0 right-0 opacity-50">
            <DashedLines />
          </span>
          <span className="absolute hidden md:flex bottom-0 left-0 [transform:_scale(-1,1)] opacity-50">
            <DashedLines />
          </span>
        </div>
      </section>

      <section className="py-[130px] mx-6 md:mx-0">
        <LandingPageFooter />
      </section>
    </main>
  );
}
