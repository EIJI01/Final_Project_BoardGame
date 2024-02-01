import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages";
import { Suspense } from "react";
import Fallback from "../hooks/Fallback";
import { lazyLoadWithDelay } from "../utils/lazyload";
import { GuardedRoute } from "../hooks/GuardedRoute";

// import MemberProfile from '../pages/member/MemberProfile';

const LoginPage = lazyLoadWithDelay("../pages", "LoginPage");
const RegisterPage = lazyLoadWithDelay("../pages", "RegisterPage");
const BookingQueue = lazyLoadWithDelay("../pages", "BookingQueue");
const CallingGm = lazyLoadWithDelay("../pages", "CallingGm");
const ScanQrcode = lazyLoadWithDelay("../pages", "ScanQrcode");
const ManageQrScan = lazyLoadWithDelay("../pages", "ManageQrScan");
const ManageQueue = lazyLoadWithDelay("../pages", "ManageQueue");
const ManageTable = lazyLoadWithDelay("../pages", "ManageTable");
const MemberProfile = lazyLoadWithDelay("../pages", "MemberProfile");
const GmProfile = lazyLoadWithDelay("../pages", "GmProfile");
const ManageTableComp = lazyLoadWithDelay("../components", "ManageTableComp");
const TableId = lazyLoadWithDelay("../components", "TableId");
const IdScaned = lazyLoadWithDelay("../components", "IdScaned");
const ScanQRCode = lazyLoadWithDelay("../components", "ScanQRCode");
const ManageQueueTable = lazyLoadWithDelay("../components", "ManageQueueTable");
const CardId = lazyLoadWithDelay("../components", "CardId");

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
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <BookingQueue />
            </Suspense>
          </GuardedRoute>
        ),
      },
      {
        path: "member/calling-gm",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <CallingGm />
            </Suspense>
          </GuardedRoute>
        ),
      },
      {
        path: "member/scan-qr",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <ScanQrcode />
            </Suspense>
          </GuardedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <GuardedRoute>
                <Suspense fallback={<Fallback />}>
                  <ScanQRCode />
                </Suspense>
              </GuardedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <GuardedRoute>
                <Suspense fallback={<Fallback />}>
                  <IdScaned />
                </Suspense>
              </GuardedRoute>
            ),
          },
        ],
      },
      {
        path: "member/profile",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <MemberProfile />
            </Suspense>
          </GuardedRoute>
        ),
      },
      {
        path: "gm/profile",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <GmProfile />
            </Suspense>
          </GuardedRoute>
        ),
      },
      {
        path: "gm/manage-queue",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <ManageQrScan />
            </Suspense>
          </GuardedRoute>
        ),
      },
      {
        path: "gm/manage-cards",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <ManageQueue />
            </Suspense>
          </GuardedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <GuardedRoute>
                <Suspense fallback={<Fallback />}>
                  <ManageQueueTable />
                </Suspense>
              </GuardedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <GuardedRoute>
                <Suspense fallback={<Fallback />}>
                  <CardId />
                </Suspense>
              </GuardedRoute>
            ),
          },
        ],
      },
      {
        path: "gm/manage-table",
        element: (
          <GuardedRoute>
            <Suspense fallback={<Fallback />}>
              <ManageTable />
            </Suspense>
          </GuardedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <GuardedRoute>
                <Suspense fallback={<Fallback />}>
                  <ManageTableComp />
                </Suspense>
              </GuardedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <GuardedRoute>
                <Suspense fallback={<Fallback />}>
                  <TableId />
                </Suspense>
              </GuardedRoute>
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
]);
