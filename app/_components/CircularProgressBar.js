import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CircularProgressBar({ value = 0 }) {
  return (
    <Box
      position="relative"
      display="inline-flex"
      sx={{
        width: {
          xs: 120, // smaller width on xs screens
          sm: 140, // medium size on small+ screens
          md: 160, // original size on medium+ screens
        },
        height: {
          xs: 120,
          sm: 140,
          md: 160,
        },
      }}
      aria-label={`Progress: ${value}%`}
      role="progressbar"
    >
      <CircularProgress
        variant="determinate"
        value={value}
        thickness={6}
        sx={{
          color: "#FF6F00",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
            transition: "stroke-dashoffset 0.5s ease",
          },
        }}
        size="100%" // fill the Box container's width/height responsively
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ userSelect: "none" }}
      >
        <Typography
          variant="h5" // smaller font variant on smaller size, or you can use sx for responsive font size
          component="div"
          sx={{
            color: "#FF6F00",
            fontWeight: 700,
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            fontFeatureSettings: "'tnum'",
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "2rem",
            },
          }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
