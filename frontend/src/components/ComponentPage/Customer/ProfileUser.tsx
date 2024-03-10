import { Card, CardHeader, CardBody, Typography, Input, Spinner } from "@material-tailwind/react";
import { UseUserContext } from "../../../contexts/ContextProvider";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../..";
import { useEffect, useState } from "react";
import ProfileImage from "../../../assets/avatar/good-pic.png";
import { updateInformationUser } from "../../../data/services/user-service/update-information";
import AlertSuccess from "../../Alert/AlertSuccess";

export type FromUser = {
  userId: string;
  name: string;
  phoneNumber: string;
  imageName: string;
  imageSrc: string | ArrayBuffer | null | undefined;
  imageFile: File | null;
};

export default function ProfileUser() {
  const { currentUser } = UseUserContext();
  const { currentColor } = useStateDispatchContext();
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const initialValue = {
    userId: "",
    name: "",
    phoneNumber: "",
    imageName: "",
    imageSrc: "",
    imageFile: null,
  };
  useEffect(() => {
    if (currentUser) {
      setValues({
        userId: "",
        name: currentUser?.name as string,
        phoneNumber: currentUser?.tel as string,
        imageName: "",
        imageSrc: currentUser?.image ? currentUser?.image : ProfileImage,
        imageFile: null,
      });
    }
  }, [currentUser?.name, currentUser?.tel]);

  const [values, setValues] = useState<FromUser>(initialValue);
  const [error, setError] = useState<any>({});

  const handlerErrorOpen = () => setIsErrorOpen(!isErrorOpen);

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const showPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x: ProgressEvent<FileReader>) => {
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target?.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: currentUser?.image ? currentUser?.image : ProfileImage,
      });
    }
  };

  const validate = () => {
    let temp: any = {};
    temp.name = values.name === "" ? false : true;
    temp.phoneNumber = values.phoneNumber === "" ? false : true;
    setError(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handlerFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      try {
        setIsLoadingButton(true);
        var result = await updateInformationUser(values);
        if (result) {
          setTimeout(() => {
            setIsLoadingButton(false);
            window.location.reload();
          }, 2000);
        }
        console.log(result);
      } catch (err: any) {
        setIsLoadingButton(false);
        setIsErrorOpen(true);
        setTimeout(() => {
          setIsErrorOpen(false);
        }, 2000);
        console.log(err);
      }
    }
  };
  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <div className="lg:pt-4 pt-4 lg:px-20 lg:mt-10">
      <form autoComplete="off" noValidate onSubmit={handlerFormSubmit}>
        <div className="lg:grid grid-flow-col gap-20 border-x-1 border-gray-400">
          <div className="w-full flex lg:justify-end justify-center">
            <Card
              placeholder={""}
              className="lg:w-96 rounded-none lg:rounded-xl shadow-none lg:shadow-md w-full dark:lg:bg-[#292929] dark:bg-inherit"
            >
              <CardHeader
                placeholder={""}
                floated={false}
                className="h-320 lg-max:w-96 lg-max:mx-auto border-4 border-white lg:border-none"
              >
                <img src={values?.imageSrc as string} alt="profile-picture" />
              </CardHeader>
              <div className="lg:pl-6 mt-2 lg-max:mx-auto">
                <input type="file" accept="image/*" onChange={showPreview} />
              </div>
              <CardBody placeholder={""} className="text-center">
                <Typography
                  placeholder={""}
                  variant="h4"
                  color="blue-gray"
                  className="mb-2 text-main-dark-text"
                  style={{ color: currentColor }}
                >
                  {currentUser?.name}
                </Typography>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-main-bure-text dark:text-main-dark-text"
                  textGradient
                >
                  <span className="font-semibold ">username:</span> {currentUser?.username}
                </Typography>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-main-bure-text dark:text-main-dark-text"
                  textGradient
                >
                  <span className="font-semibold ">tel: </span>
                  {currentUser?.tel}
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="flex lg:justify-start justify-center mt-8 lg:mt-0 items-center w-full">
            <Card
              placeholder={""}
              color="transparent"
              shadow={false}
              className="h-full lg-max:w-full px-3 lg:px-0"
            >
              <Typography
                placeholder={""}
                variant="h4"
                color="blue-gray"
                style={{ color: currentColor }}
              >
                Edit information
              </Typography>
              <Typography
                placeholder={""}
                color="gray"
                className="mt-1 font-normal dark:text-main-dark-text"
              >
                Nice to meet you! {currentUser?.name}
              </Typography>
              <div className="mt-8 mb-2 w-full lg:w-96 lg:max-w-96 h-full lg:relative">
                <div className="mb-1 flex flex-col gap-8 ">
                  <div>
                    <Typography
                      placeholder={""}
                      variant="h6"
                      color="blue-gray"
                      className="dark:text-main-dark-text"
                    >
                      Your Name
                    </Typography>
                    <Input
                      crossOrigin={""}
                      size="lg"
                      placeholder="Saksit"
                      value={values?.name}
                      name="name"
                      onChange={handlerInputChange}
                      className={` ${
                        error.name === false
                          ? "!border-red-400 !border-1"
                          : "!border-t-blue-gray-200 focus:!border-t-gray-900"
                      }  dark:text-main-dark-text dark:focus:!border-white`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {error.name === false ? (
                      <p className="text-red-400 text-xs">Name has required.</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <Typography
                      placeholder={""}
                      variant="h6"
                      color="blue-gray"
                      className="dark:text-main-dark-text"
                    >
                      Telephone Number
                    </Typography>
                    <Input
                      crossOrigin={""}
                      size="lg"
                      placeholder="098xxxxxxx"
                      value={values?.phoneNumber}
                      onChange={handlerInputChange}
                      name="phoneNumber"
                      className={` ${
                        error.phoneNumber === false
                          ? "!border-red-400 !border-1"
                          : "!border-t-blue-gray-200 focus:!border-t-gray-900"
                      } dark:text-main-dark-text dark:focus:!border-white`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {error.phoneNumber === false ? (
                      <p className="text-red-400 text-xs">Phone number has required.</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <ButtonCustom
                  size="md"
                  type="submit"
                  fullWidth
                  color={currentColor}
                  className=" lg:absolute bottom-0 mt-8 text-main-dark-text"
                >
                  {isLoadingButton ? <Spinner color="blue" className="mx-auto" /> : "Save"}
                </ButtonCustom>
              </div>
            </Card>
          </div>
        </div>
      </form>
      {isErrorOpen && (
        <div className=" fixed top-0 inset-0 z-50 mx-auto h-24 flex items-center justify-center">
          <div>
            <AlertSuccess
              open={isErrorOpen}
              data="Update information failed."
              onClose={handlerErrorOpen}
              type="error"
            />
          </div>
        </div>
      )}
    </div>
  );
}
