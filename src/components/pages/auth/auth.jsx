import * as React from "react";
import SignUpWizard from "./signup-wizard";
import SignInWizard from "./signin-wizard";
import VerificationWizard from "./verification-wizard"

const Auth = () => {
  const [mode, setMode] = React.useState("login");
  const [cred, setCred] = React.useState(null);

  return (
    <>
      {
        {
          login: <SignInWizard mode={mode} setMode={setMode} cred={cred} setCred={setCred} />,
          signup: <SignUpWizard mode={mode} setMode={setMode} cred={cred} setCred={setCred} />,
          verify: <VerificationWizard mode={mode} setMode={setMode} cred={cred} setCred={setCred} />
        }[mode]
      }
    </>
  );
};

export default Auth;
