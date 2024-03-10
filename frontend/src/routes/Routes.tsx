import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  BookingQueue,
  ForgetPassword,
  GmProfile,
  HomePage,
  LoginPage,
  ManageQrScan,
  ManageQueue,
  ManageTable,
  MemberProfile,
  RegisterPage,
  ResetPassword,
  ScanQrcode,
} from "../pages";
import { Suspense } from "react";
import Fallback from "../hooks/Fallback";
import {
  CardId,
  IdScaned,
  ManageQueueTable,
  ManageTableComp,
  ScanQRCode,
  TableId,
} from "../components";
import ReservationQueue from "../components/ComponentPage/Customer/ReservationQueue";
import QueueId from "../components/ComponentPage/Customer/QueueId";
import QueueTableId from "../components/ComponentPage/Customer/QueueTableId";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "member/booking-queue",
        element: (
          <Suspense fallback={<Fallback />}>
            <BookingQueue />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Fallback />}>
                <ReservationQueue />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Fallback />}>
                <QueueId />
              </Suspense>
            ),
          },
          {
            path: "queue/table/:id",
            element: (
              <Suspense fallback={<Fallback />}>
                <QueueTableId />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "member/scan-qr",
        element: (
          <Suspense fallback={<Fallback />}>
            <ScanQrcode />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Fallback />}>
                <ScanQRCode />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Fallback />}>
                <IdScaned />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "member/profile",
        element: (
          <Suspense fallback={<Fallback />}>
            <MemberProfile />
          </Suspense>
        ),
      },
      {
        path: "gm/profile",
        element: (
          <Suspense fallback={<Fallback />}>
            <GmProfile />
          </Suspense>
        ),
      },
      {
        path: "gm/manage-queue",
        element: (
          <Suspense fallback={<Fallback />}>
            <ManageQrScan />
          </Suspense>
        ),
      },
      {
        path: "gm/manage-cards",
        element: (
          <Suspense fallback={<Fallback />}>
            <ManageQueue />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Fallback />}>
                <ManageQueueTable />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Fallback />}>
                <CardId />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "gm/manage-table",
        element: (
          <Suspense fallback={<Fallback />}>
            <ManageTable />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Fallback />}>
                <ManageTableComp />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Fallback />}>
                <TableId />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Fallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Fallback />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<Fallback />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<Fallback />}>
        <ResetPassword />
      </Suspense>
    ),
  },
]);
