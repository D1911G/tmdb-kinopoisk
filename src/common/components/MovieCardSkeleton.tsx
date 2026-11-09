import Skeleton from "@mui/material/Skeleton";

export const MovieCardSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={300} height={450} />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </div>
  );
};
