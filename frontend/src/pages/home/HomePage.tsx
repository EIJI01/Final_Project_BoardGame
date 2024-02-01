import { FooterWithLogo } from "../../components";
import CarouselComp from "../../components/Carousels/CarouselComp";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import Background from "../../assets/background/background1.png";
import { EVENT_IMAGE } from "../../data/event";

type Props = {};

export default function HomePage({}: Props) {
  const { currentColor } = useStateDispatchContext();

  return (
    <div className="">
      <div className="mb-20 lg:mb-0 lg:px-20">
        <div className="lg:grid grid-cols-2 lg:h-screen w-full gap-5">
          <div className="flex flex-col mt-16 lg:mt-40 lg:pr-10 text-center lg:text-left">
            <div className="font-bold lg:text-6xl text-3xl" style={{ color: currentColor }}>
              Welcome to boardgame website
            </div>
            <div className="font-normal text-md text-gray-600 mt-3 leading-6 dark:text-main-dark-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet deleniti dolores
              perspiciatis, quos repellendus, quidem in quasi veritatis pariatur ducimus recusandae
              velit, a reprehenderit nemo nam aliquid. Animi, vel modi.
            </div>
          </div>
          {/* <div style={{backgroundImage: "url()"}}></div> */}
          <div className="flex items-center">
            <img src={Background} alt="background" className="rounded-lg mx-auto lg:-mt-20 mt-16" />
          </div>
        </div>
      </div>
      <div className="flex items-center py-6 lg:mb-20" style={{ backgroundColor: currentColor }}>
        <div className="lg:px-20">
          <CarouselComp deley={5000} autoplay loop image={EVENT_IMAGE} />
        </div>
      </div>
      {/* <div></div> */}
      <FooterWithLogo />
    </div>
  );
}
