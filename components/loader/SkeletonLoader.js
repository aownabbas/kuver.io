import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function SkeletonLoader({ width, height }) {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={width} height={height} />
    </Stack>
  );
}

export default SkeletonLoader;
