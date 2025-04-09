// src/context/StepContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface StepContextType {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

// Create context with default values
const StepContext = createContext<StepContextType>({
  activeStep: 0,
  setActiveStep: () => { },
});

interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <StepContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => useContext(StepContext);