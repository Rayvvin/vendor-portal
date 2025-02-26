import { Wizard, useWizard } from "react-use-wizard";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import {
  Form,
  required,
  TextInput,
  DateInput,
  CheckboxGroupInput,
  useTranslate,
  useRedirect,
  useLogin,
  useNotify,
  useStore,
  email,
  minLength,
  maxLength,
  PasswordInput,
  SelectInput,
  useNotifyIsFormInvalid,
  NotFound,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInStep = ({
  number,
  loading,
  translate,
  redirect,
  isSmall,
  inputBody,
  submitRef,
  formComplete,
  setFormComplete,
}) => {
  const {
    isLoading,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep,
  } = useWizard();
  // const notify = useNotify();
  // const notify = toast;

  const data = useWatch();
  useEffect(() => {
    console.log(activeStep)
    if (isLastStep) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [activeStep]);

  // This handler is optional
  handleStep(() => {
    // alert("Going to step 2");
  });

  const checkValid = ({ data, number }) => {
    function isValidEmail(email) {
      // Regular expression to validate email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // Test the email against the regex
      return emailRegex.test(email);
    }

    function isValidPassword(password) {
      // Regular expression to validate password
      const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

      // Check if password matches the regex and confirmPassword matches password
      return passwordRegex.test(password);
    }

    function matchPasswords() {
      if (data.password) {
        return true;
      } else {
        return false;
      }
    }

    let errors = {};

    if (!data.type) {
      errors.type = "Choose a valid account type";
    }

    if (!isValidEmail(data.email)) {
      errors.email = "A valid email is required";
    }

    if (!isValidPassword(data.password)) {
      errors.password =
        "A valid password is required, it must be up to 6 characters with at least one symbol and one uppercase letter.";
    }

    switch (number) {
      // case 0:
      //   if (errors.type) {
      //     // notify(errors.type, { type: "warning" });
      //     toast.warn(errors.type);
      //   } else {
      //     // notify("");
      //     nextStep();
      //   }

      //   break;
      case 0:
        if (errors.email) {
          // notify(errors.email, { type: "warning" });
          toast.warn(errors.email);
        } else {
          // notify("");
          nextStep();
        }

        break;

      case 1:
        if (errors.password) {
          // notify(errors.password, { type: "warning" });
          toast.warn(errors.password);
          // if (!matchPasswords()) {
          //   toast.warn("Both passwords have to match");
          // }
        } else {
          // notify("");
          nextStep();
        }

        break;

      default:
        break;
    }
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          marginY: "1em",
          marginX: "1em",
          padding: "20px 10px",
          boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px",
          borderRadius: "6px",
        }}
      >
        {inputBody}
      </Card>
      <Stack
        spacing={1}
        direction="row"
        flexWrap="wrap"
        marginX={"1em"}
        justifyContent={"space-between"}
        sx={{ marginTop: "1em" }}
      >
        <Button
          variant="contained"
          type="button"
          color="primary"
          disabled={activeStep === 0 ? (!isLastStep ? true : false) : null}
          style={{
            padding: "5px 10px",
            height: "38px",
            fontSize: "12px",
          }}
          onClick={() => previousStep()}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="contained"
          type="button"
          // type="submit"
          color="primary"
          disabled={
            activeStep === stepCount - 1 ? (!isFirstStep ? true : false) : null
          }
          style={{
            padding: "5px 10px",
            height: "38px",
            fontSize: "12px",
          }}
          onClick={() => {
            console.log(data);
            checkValid({ data: data, number: activeStep });

            // submitRef();
            // console.log(email(data.email))
            // nextStep();
          }}
        >
          <ChevronRightIcon />
        </Button>
      </Stack>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SignInStep;
