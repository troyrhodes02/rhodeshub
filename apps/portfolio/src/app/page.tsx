import Hero from "@/sections/landing/Hero";
import FeaturedProjects from "@/sections/landing/FeaturedProjects";
import SkillsAndTechnologies from "@/sections/landing/SkillsAndTechnologies";
import EngineeringJourney from "@/sections/landing/EngineeringJourney";
import Connect from "@/sections/landing/Connect";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      <Hero />
      <FeaturedProjects />
      <SkillsAndTechnologies />
      <EngineeringJourney />
      <Connect />
    </Box>
  );
}
