import Button from "@/components/ui/button/Button";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  const isAuth = false;
  return (
    <div className="flex flex-row gap-3">
      <Button theme="secondary">Sign in</Button>
      <Button theme="primary">Sign up</Button>
    </div>
  );
};

export default Profile;
