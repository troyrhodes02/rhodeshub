import Hero from "@/sections/landing/Hero";
import FeaturedProjects from "@/sections/landing/FeaturedProjects";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Hero />
      <FeaturedProjects />
    </Box>
  );
}
