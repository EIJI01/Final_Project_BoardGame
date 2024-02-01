import { Carousel } from "@material-tailwind/react";
import { TypeImage } from "../../data/event";
import { useState } from "react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

type Props = {
  loop?: boolean;
  autoplay?: boolean;
  deley?: number;
  image: TypeImage;
};

export default function CarouselComp({ loop, autoplay, deley, image }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="lg:flex justify-between">
      <div className="lg:mx-auto lg:hidden mb-5">
        {image.map((item, i) => {
          if (i === index)
            return (
              <div key={i} className="font-semibold text-2xl text-center text-main-bure-text">
                {item.title}
              </div>
            );
        })}
      </div>
      <Carousel
        placeholder={""}
        className="rounded-xl lg:w-[65%] w-[100%] shadow-lg"
        autoplayDelay={deley}
        autoplay={autoplay}
        loop={loop}
        transition={{ duration: 2 }}
        navigation={({ setActiveIndex, activeIndex, length }) => {
          setIndex(activeIndex);
          return (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => {
                    setActiveIndex(i);
                  }}
                />
              ))}
            </div>
          );
        }}
      >
        {image.map((item, index) => {
          return (
            <img key={index} src={item.img} alt={item.alt} className="h-full w-full object-cover" />
          );
        })}
      </Carousel>
      <div className="lg:mt-0 mt-5 lg:mx-auto items-center lg:flex">
        {image.map((item, i) => {
          if (i === index)
            return (
              <div key={i}>
                <div className="font-semibold text-2xl text-center hidden lg:block text-main-bure-text">
                  {item.title}
                </div>
                <div className="lg:w-96 text-center mt-6 font-normal text-main-dark-text">
                  {item.detail}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
