import { Link } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

type RenderAactionLiinkType = {
  row: any;
  column: any;
};
const RenderAactionLiink: React.FC<RenderAactionLiinkType> = ({ row, column }) => {
  const params: any = useParams();
  const { key } = column;

  return (
    <Link href={`/${params.name}/${row[key]}`} underline="always">
      {row[key]}
    </Link>
  );
};

export default RenderAactionLiink;
