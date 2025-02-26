/* eslint-disable react/prop-types */
import * as React from "react";
import { Wizard, useWizard } from "react-use-wizard";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
  Typography,
  StepButton,
  Step,
  Stepper,
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
} from "react-admin";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useWatch } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function StepperForm({
  children,
  regNewMarket,
  state_obj,
  nearby_market_obj,
  new_market_obj,
  formComplete,
  setFormComplete
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const {
    isLoading,
    isLastStep: isLstStp,
    isFirstStep: isFstStp,
    activeStep: actvStp,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep: hndlStp,
  } = useWizard();
  const data = useWatch();
  const notify = useNotify();
  const redirect = useRedirect();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    if(isLastStep() && allStepsCompleted()){
      setFormComplete(true)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    checkValid({ data: data, number: activeStep, nw_compltd: newCompleted });
  };

  const checkValid = async ({ data, number, nw_compltd }) => {
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

    function personalDataComplete() {
      if (
        errors.firstname ||
        errors.lastname ||
        errors.country ||
        errors.phone ||
        errors.username
      ) {
        return false;
      } else {
        return true;
      }
    }

    function businessDataComplete() {
      if (
        errors.business_name ||
        errors.province ||
        errors.city ||
        errors.address
      ) {
        return false;
      } else {
        return true;
      }
    }

    function marketDataComplete() {
      if (errors.market) {
        return false;
      } else {
        if (data.market === "others") {
          if (errors.new_market_name || errors.nearby_market) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
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
        "A valid password is required, it must be up to 6 characters.";
    }

    if (!data.firstname) {
      errors.firstname = "Choose a valid firstname";
    }

    if (!data.lastname) {
      errors.lastname = "Choose a valid lastname";
    }

    if (!data.country) {
      errors.country = "Choose a valid country";
    }

    if (!data.phone) {
      errors.phone = "Choose a valid phone";
    }

    if (!data.username) {
      errors.username = "Choose a valid username";
    }

    if (!data.business_name) {
      errors.business_name = "Choose a valid Business name";
    }

    if (!data.province) {
      errors.province = "Choose a valid Province";
    }

    if (!data.city) {
      errors.city = "Choose a valid City";
    }

    if (!data.address) {
      errors.address = "Choose a valid Address";
    }

    if (!data.market) {
      errors.market = "Choose a valid Market";
    }

    if (!data.nearby_market) {
      errors.nearby_market = "Choose a valid Nearby market";
    }

    if (!data.new_market_name) {
      errors.new_market_name = "Enter a valid New market Name";
    }

    switch (number) {
      case 0:
        if (!personalDataComplete()) {
          // notify("Personal Data Incomplete", { type: "warning" });
          toast.warn("Personal Data Incomplete");
        } else {
          nw_compltd[activeStep] = true;
          setCompleted(nw_compltd);
          handleNext();
        }

        break;
      case 1:
        if (!businessDataComplete()) {
          // notify("Business Data Incomplete", { type: "warning" });
          toast.warn("Business Data Incomplete");
        } else {
          nw_compltd[activeStep] = true;
          setCompleted(nw_compltd);
          handleNext();
        }

        break;

      case 2:
        if (!marketDataComplete()) {
          // notify("Business Data Incomplete", { type: "warning" });
          toast.warn("Market Data Incomplete");
        } else {
          nw_compltd[activeStep] = true;
          setCompleted(nw_compltd);
          handleNext();
        }

        break;

      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormComplete(false)
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {children.map((label, index) => (
          <Step key={label.title} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
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
              <Stack justifyContent={"center"} alignItems={"center"}>
                <CheckCircleOutlineIcon color="secondary" fontSize="large" />
              </Stack>
              <Typography
                sx={{
                  mt: 2,
                  mb: 1,
                  textAlign: "center",
                  fontWeight: "600",
                  lineHeight: "1.2175",
                  color: "var(--title-color)",
                  fontFamily: "Rubik, sans-serif",
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                }}
              >
                You&apos;re Good to Go
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  mb: 1,
                  textAlign: "center",
                  fontWeight: "300",
                  lineHeight: "1.2175",
                  color: "var(--title-color)",
                  fontFamily: "Rubik, sans-serif",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                }}
              >
                Confirm your info and Click the Button Below
              </Typography>
              <Stack direction={"column"}>
                {Object.keys(data).flatMap((dt) => {
                  if (["confirm_password"].includes(dt)) {
                    return null;
                  } else {
                    let fieldname = dt;
                    let fieldvalue = data[dt];
                    switch (dt) {
                      case "province":
                        fieldvalue = state_obj.name;
                        break;

                      case "nearby_market":
                        fieldvalue = nearby_market_obj.market_name;
                        break;

                      case "new_market_name":
                        fieldvalue = new_market_obj.un_reg_market;
                        break;

                      default:
                        break;
                    }
                    return (
                      <Stack
                        key={fieldname}
                        direction={"row"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          sx={{
                            mt: 2,
                            mb: 1,
                            textAlign: "center",
                            fontWeight: "600",
                            lineHeight: "1.2175",
                            color: "var(--title-color)",
                            fontFamily: "Rubik, sans-serif",
                            whiteSpace: "nowrap",
                            fontSize: "12px",
                          }}
                        >
                          {`${fieldname} :`}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 2,
                            mb: 1,
                            textAlign: "center",
                            fontWeight: "300",
                            lineHeight: "1.2175",
                            color: "var(--title-color)",
                            fontFamily: "Rubik, sans-serif",
                            whiteSpace: "nowrap",
                            fontSize: "12px",
                          }}
                        >
                          {fieldvalue}
                        </Typography>
                      </Stack>
                    );
                  }
                })}
              </Stack>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Go Back to Editing</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
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
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                // pauseOnFocusLoss
                // draggable
                // pauseOnHover
                theme="light"
              />
              {children[activeStep].body}
            </Card>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep === 0 ? (
                <Button
                  variant="contained"
                  type="button"
                  color="primary"
                  disabled={
                    activeStep === 0 ? (!isLstStp ? true : false) : null
                  }
                  style={{
                    padding: "5px 10px",

                    height: "38px",
                    fontSize: "12px",
                  }}
                  sx={{ ml: 1 }}
                  onClick={() => previousStep()}
                >
                  <ChevronLeftIcon />
                </Button>
              ) : (
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              )}

              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed and saved
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Next"}
                  </Button>
                ))}

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  type="button"
                  color="primary"
                  disabled={
                    actvStp === stepCount - 1
                      ? !isFstStp
                        ? true
                        : false
                      : null
                  }
                  style={{
                    padding: "5px 10px",

                    height: "38px",
                    fontSize: "12px",
                  }}
                  sx={{ mr: 1 }}
                  onClick={() => nextStep()}
                >
                  <ChevronRightIcon />
                </Button>
              ) : (
                <Button onClick={()=>{
                  redirect('/admin')
                }} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
