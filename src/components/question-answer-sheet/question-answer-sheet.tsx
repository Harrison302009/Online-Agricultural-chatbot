import { CssVarsProvider, Typography } from "@mui/joy";

export default function QA({
  number,
  question,
  answer,
}: {
  number: number;
  question: string;
  answer: string;
}) {
  return (
    <CssVarsProvider>
      <Typography level="title-lg">
        {number}. {question}
      </Typography>
      <Typography level="title-md">Answer: {answer}</Typography>
    </CssVarsProvider>
  );
}
