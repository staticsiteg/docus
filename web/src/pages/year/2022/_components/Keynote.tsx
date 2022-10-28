import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { H3, P1 } from './typograph';

export interface KeynoteProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Keynote({ icon, title, description }: KeynoteProps) {
  return (
    <Box maxWidth={418}>
      <Box>
        {icon}
      </Box>
      <H3 mt={6}>
        {title}
      </H3>
      <P1 mt={2}>
        {description}
      </P1>
    </Box>
  );
}