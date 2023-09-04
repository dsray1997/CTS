import React from "react";

type RenderAvatarType = {
  row: any;
};
const RenderAvatar: React.FC<RenderAvatarType> = ({ row }) => {
  return (
    <div
      className={"avter"}
      style={{ backgroundImage: `url(${row.avatar})` }}
    />
  );
};

export default RenderAvatar;
