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
  Option,
  Select,
} from "@material-tailwind/react";
import { checkTypeUser } from "../../utils/routing";
import { BranchAllIdResponse } from "../../models/data/branch";
import { getAllBranchId } from "../../data/services/branch-service/getAllIdbranch";

type Props = {};

export default function HomePage({}: Props) {
  const { currentColor } = useStateDispatchContext();
  const [open, setOpen] = useState<boolean>(false);
  const { currentUser } = UseUserContext();
  const [branchData, setBranchData] = useState<BranchAllIdResponse[]>([]);
  const [branch, setBranch] = useState<string>("");

  useEffect(() => {
    const check = localStorage.getItem("check");
    if (check === null && checkTypeUser(currentUser?.role!)) {
      setOpen(true);
      localStorage.setItem("check", "true");
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
      setOpen(false);
      localStorage.setItem("check", "false");
      localStorage.setItem("branchId", branch);
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
        size="sm"
      >
        <DialogHeader placeholder={""}>Please Select Branch</DialogHeader>
        <DialogBody placeholder={""} className="h-[100px] lg:p-4 p-0">
          <div className="flex justify-center items-center w-full h-full">
            <Select placeholder={""} onChange={handleChangeBranch} label="Select Branch">
              {branchData?.map((data) => {
                return (
                  <Option value={data.id} key={data.id}>
                    {data.branchName}
                  </Option>
                );
              })}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button placeholder={""} variant="gradient" color="green" onClick={handleClose}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
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
