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
import { createClient } from "@supabase/supabase-js";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);

const SignUpStep = ({
  number,
  loading,
  translate,
  redirect,
  isSmall,
  inputBody,
  submitRef,
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
  //   useEffect(()=>{
  //     console.log(activeStep)
  //   },[activeStep])

  // This handler is optional
  handleStep(() => {
    // alert("Going to step 2");
  });

  const checkValid = async ({ data, number }) => {
    function isValidEmail(email) {
      // Regular expression to validate email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // Test the email against the regex
      return emailRegex.test(email);
    }

    function isValidPassword(password, confirmPassword) {
      // Regular expression to validate password
      const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

      // Check if password matches the regex and confirmPassword matches password
      return passwordRegex.test(password) && password === confirmPassword;
    }

    function matchPasswords() {
      if (
        data.password &&
        data.confirm_password &&
        data.password === data.confirm_password
      ) {
        return true;
      } else {
        return false;
      }
    }

    async function checkEmail() {
      let { data: medusa_user, medusa_error } = await supabase
        .from("user")
        .select("*")
        .eq("email", data?.email)
        .limit(1);
      let { data: supabase_user, supabase_error } = await supabase
        .from("users")
        .select("*")
        .eq("email", data?.email)
        .limit(1);

      console.log(medusa_user, supabase_user, !medusa_user.length && !supabase_user.length, medusa_user.length || supabase_user.length)

      if (!medusa_user.length && !supabase_user.length) {
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

    if (!isValidPassword(data.password, data.confirm_password)) {
      errors.password =
        "A valid password is required, it must be up to 6 characters with at least one symbol and one uppercase letter.";
    }

    switch (number) {
      case 0:
        if (errors.type) {
          // notify(errors.type, { type: "warning" });
          toast.warn(errors.type);
        } else {
          // notify("");
          nextStep();
        }

        break;
      case 1:
        if (errors.email) {
          // notify(errors.email, { type: "warning" });
          toast.warn(errors.email);
        } else {
          // notify("");
          // console.log(await checkEmail())
          let check = await toast.promise(
            checkEmail,
            {
              pending: 'Checking Existing Accounts',
              // success: 'Email Validation Complete',
              error: `Couldn't Validate Email, Try Again🤯`
            }
        )
          if (!check) {
            toast.warn("Email already in use");
          } else {
            toast.success("Email not in use");
            nextStep();
          }
        }

        break;

      case 2:
        if (errors.password) {
          // notify(errors.password, { type: "warning" });
          toast.warn(errors.password);
          if (!matchPasswords()) {
            toast.warn("Both passwords have to match");
          }
        } else {
          // notify("");
          nextStep();
        }

        break;

      default:
        nextStep();
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

export default SignUpStep;
