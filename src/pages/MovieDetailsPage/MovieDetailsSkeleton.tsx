import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const MovieDetailsSkeleton = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton variant="rectangular" width={100} height={36} sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Skeleton variant="rectangular" width={300} height={450} />

        <Box sx={{ flex: 1, minWidth: "300px" }}>
          <Skeleton variant="text" width="60%" height={60} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>

      <Skeleton variant="text" width={150} height={40} sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Box key={i} sx={{ width: 150 }}>
              <Skeleton variant="rectangular" width={150} height={225} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          ))}
      </Box>

      <Skeleton variant="text" width={200} height={40} sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Box key={i} sx={{ width: 300 }}>
              <Skeleton variant="rectangular" width={300} height={450} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          ))}
      </Box>
    </div>
  );
};
