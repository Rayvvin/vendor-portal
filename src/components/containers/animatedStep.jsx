/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import * as React from "react";
import { Wizard, useWizard } from "react-use-wizard";
import { motion } from "framer-motion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 800 : -800,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
    };
  },
};

const AnimatedStep = React.memo(({ children, previousStepIndex }) => {
  const { activeStep } = useWizard();

  React.useEffect(() => {
    // console.log(previousStepIndex);
    return () => {
      previousStepIndex.current = activeStep;
    };
  }, [activeStep, previousStepIndex]);

  return (
    <motion.div
      custom={activeStep - previousStepIndex.current}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
});

export default AnimatedStep;
