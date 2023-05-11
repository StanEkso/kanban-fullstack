import { SVGProps } from "react";

export const Dashboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M21 9L3 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 21L9 9"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
