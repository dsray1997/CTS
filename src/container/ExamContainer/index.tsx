import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Questions from "@/components/questions";
import QuestionNo from "@/components/questionNo";
import QuestionNoHeader from "@/components/questionNoHeader";

const ExamContainer: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ paddingBottom: "20px", width: "95.5%" }}>
        <QuestionNoHeader />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Questions />
        </Grid>
        <Grid item xs={0}></Grid>
        <QuestionNo />
      </Grid>
    </Box>
  );
};
export default ExamContainer;
