// apps/portfolio/app/page.tsx
"use client";

import { Box, Button, Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={3}
      >
        <Typography variant="h3" component="h1">
          RhodesHub
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A portfolio and career command center for William (Troy) Rhodes.
        </Typography>
        <Button variant="contained" size="large">
          View Projects
        </Button>
      </Box>
    </Container>
  );
}
