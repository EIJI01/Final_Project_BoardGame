import { FooterWithLogo } from "../../components";
import CarouselComp from "../../components/Carousels/CarouselComp";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import Background from "../../assets/background/background1.png";
import { EVENT_IMAGE } from "../../data/event";
import { UseUserContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import { checkTypeUser } from "../../utils/routing";
import { BranchAllIdResponse } from "../../models/data/branch";
import { getAllBranchId } from "../../data/services/branch-service/getAllIdbranch";
import { CheckIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function HomePage({}: Props) {
  const { currentColor } = useStateDispatchContext();
  const [open, setOpen] = useState<boolean>(false);
  const { currentUser } = UseUserContext();
  const [branchData, setBranchData] = useState<BranchAllIdResponse[]>([]);
  const [branch, setBranch] = useState<string>("");
  const [clickBranch, setClickBranch] = useState<string>("");
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  useEffect(() => {
    const check = localStorage.getItem("check");
    if (check === null && currentUser && checkTypeUser(currentUser?.role)) {
      setOpen(true);
    }
    const getBranch = async () => {
      try {
        var result = await getAllBranchId();
        setBranchData(result);
      } catch (err: any) {
        console.log(err);
      }
    };
    getBranch();
  }, [currentUser]);

  console.log(open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (branch) {
      setIsLoadingButton(true);
      setTimeout(() => {
        setIsLoadingButton(false);
        setOpen(false);
        localStorage.setItem("check", "true");
        localStorage.setItem("branchId", branch);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  const handleChangeBranch = (data: any) => {
    setBranch(data);
  };
  return (
    <div className="">
      <Dialog
        placeholder={""}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="md"
      >
        <DialogHeader placeholder={""}>Please Select Branch</DialogHeader>
        <DialogBody placeholder={""} className="h-auto mt-3  p-4">
          <div className="flex justify-center items-center w-full h-full gap-5">
            {branchData?.map((data) => {
              return (
                <div
                  className={` rounded-lg lg:p-12 p-6 border-purple-500 border-[5px] text-xl font-semibold cursor-pointer`}
                  onClick={() => {
                    handleChangeBranch(data.id);
                    setClickBranch(data.id);
                  }}
                >
                  <div className="mx-auto text-center">{data.branchName}</div>
                  <div className="mx-auto flex justify-center items-center">
                    {data.id === clickBranch ? <CheckIcon className="w-10 h-10" /> : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button placeholder={""} variant="gradient" color="green" onClick={handleClose}>
            <span>
              {isLoadingButton ? <Spinner color="blue" className="mx-auto" /> : "Confirm"}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="mb-20 lg:mb-0 lg:px-20">
        <div className="lg:grid grid-cols-2 lg:h-screen w-full gap-5">
          <div className="flex flex-col mt-16 lg:mt-40 lg:pr-10 text-center lg:text-left">
            <div className="lg:text-6xl text-3xl font-bold">
              <div className="my-40 lg:flex hidden absolute top-[98px] left-[66px]">
                <div className="mx-auto h-20 w-20 animate-spin rounded-3xl p-6 outline-dotted outline-2 outline-gray-500"></div>
              </div>
              <div className="animate-pulse bg-gradient-to-r from-pink-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                Welcome to
              </div>
              <div className="animate-pulse bg-gradient-to-r from-pink-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                BoardGame website
              </div>
              <div className="my-40 lg:flex hidden absolute top-0 right-80">
                <div className="relative mx-auto h-10 w-10 animate-bounce">
                  <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-gray-400"></div>
                  <span className="absolute flex h-5 w-5 animate-spin">
                    <span className="h-4 w-4 rounded-full bg-gray-400"> </span>
                  </span>
                </div>
              </div>

              <div className="my-40 lg:flex hidden absolute bottom-0 right-6">
                <div className="mx-auto h-20 w-20 animate-spin rounded-3xl p-6 outline-dotted outline-2 outline-gray-500"></div>
              </div>
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
