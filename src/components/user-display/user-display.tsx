"use client";
import {
  Button,
  CircularProgress,
  CssVarsProvider,
  Modal,
  ModalClose,
  ModalDialog,
  Snackbar,
  Stack,
  Typography,
} from "@mui/joy";
import { CldImage } from "next-cloudinary";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import QA from "../question-answer-sheet/question-answer-sheet";
import { useState } from "react";

export default function UserApplication({
  applicant,
  id,
  examId,
  open,
  close,
  Answer1,
  Answer2,
  Answer3,
  Answer4,
  Answer5,
  Answer6,
  Answer7,
  Answer8,
  Answer9,
  Answer10,
  certificate,
}: {
  applicant: string;
  open: boolean;
  close: () => void;
  id: string;
  examId: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
  Answer5: string;
  Answer6: string;
  Answer7: string;
  Answer8: string;
  Answer9: string;
  Answer10: string;
  certificate: string;
}) {
  const [success1, setSuccess1] = useState(true);
  const [success2, setSuccess2] = useState(true);
  const [failure1, setFailure1] = useState(true);
  const [failure2, setFailure2] = useState(true);
  const poster = async (url: string, { arg }: { arg: any }) => {
    const APIContact = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
    if (!APIContact.ok) {
      throw new Error("Something went wrong");
    }
    return await APIContact.json();
  };
  const {
    trigger: trigger1,
    isMutating: isMutating1,
    data: data1,
    error: error1,
  } = useSWRMutation("/api/survey/update", poster);
  const decline = async (url: string, { arg }: { arg: any }) => {
    const APIContact = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
    if (!APIContact.ok) {
      throw new Error("Something went wrong in the server");
    }
    return await APIContact.json();
  };
  const {
    trigger: trigger2,
    isMutating: isMutating2,
    data: data2,
    error: error2,
  } = useSWRMutation("/api/survey/decline", decline);
  const submitValues = async () => {
    const result = await trigger1({ userId: id, examId: examId });
    console.log("@@result", result);
  };
  const DeclineApp = async () => {
    const result = await trigger2({ userId: id, examId: examId });
    console.log("@@result", result);
  };
  return (
    <CssVarsProvider>
      {data1 && (
        <Snackbar
          open={success1}
          onClose={() => setSuccess1(false)}
          variant="soft"
          color="success"
          autoHideDuration={2000}
        >
          Accepted {applicant}&apos;s application
        </Snackbar>
      )}
      {error1 && (
        <Snackbar
          open={failure1}
          onClose={() => setFailure1(false)}
          variant="soft"
          color="danger"
          autoHideDuration={2000}
        >
          Failed to accept {applicant}&apos;s application
        </Snackbar>
      )}
      {data2 && (
        <Snackbar
          open={success2}
          onClose={() => setSuccess2(false)}
          variant="soft"
          color="success"
          autoHideDuration={2000}
        >
          Declined {applicant}&apos;s application
        </Snackbar>
      )}
      {error2 && (
        <Snackbar
          open={failure2}
          onClose={() => setFailure2(false)}
          variant="soft"
          color="danger"
          autoHideDuration={2000}
        >
          Failed to neutralize {applicant}&apos;s application
        </Snackbar>
      )}
      <Modal open={open} onClose={close}>
        <ModalDialog sx={{ overflowY: "auto" }}>
          <ModalClose />
          <Stack>
            <Typography level="h1">{applicant}&apos;s Application</Typography>
            <br />
            <QA
              number={1}
              question="What specific areas of agricultural research have you focused
              on in your career?"
              answer={Answer1}
            />
            <br />
            <QA
              number={2}
              question="Please select a preferred area of expertise:"
              answer={Answer2}
            />
            <br />
            <QA
              number={3}
              question="How many months/years of experience do you have?"
              answer={Answer3}
            />
            <br />
            <QA
              number={4}
              question="What is your highest level of education?"
              answer={Answer4}
            />
            <br />
            <CldImage
              src={certificate}
              alt={`${applicant}'s certificate`}
              width={270}
              height={150}
            />
            <br />
            <QA
              number={5}
              question="Can you detail any significant projects you've worked on
              in the field of agriculture?"
              answer={Answer5}
            />
            <br />
            <QA
              number={6}
              question="What research methods and techniques are you most proficient
              in?"
              answer={Answer6}
            />
            <br />
            <QA
              number={7}
              question="How do you stay updated with the latest developments and
                  trends in agriculture?"
              answer={Answer7}
            />
            <br />
            <QA
              number={8}
              question="What strengths do you believe you bring to this position,
                  and how do they align with our organization's goals?"
              answer={Answer8}
            />
            <br />
            <QA
              number={9}
              question="How do you see your research contributing to advancements
                  in agriculture?"
              answer={Answer9}
            />
            <br />
            <QA
              number={10}
              question="How do you approach collaboration with other researchers
                  and professionals in the field?"
              answer={Answer10}
            />
            <br />
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="soft"
                color="danger"
                onClick={DeclineApp}
                disabled={isMutating2}
              >
                {isMutating2 ? <CircularProgress /> : "Decline Application"}
              </Button>
              <Button
                variant="soft"
                color="success"
                onClick={submitValues}
                disabled={isMutating1}
              >
                {isMutating1 ? <CircularProgress /> : "Accept Application"}
              </Button>
            </Stack>
          </Stack>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  );
}
