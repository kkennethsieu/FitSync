"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateProfile } from "@/lib/data-service";
import { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const steps = [StepOne, StepTwo];

export default function OnboardingModal({ isOpen, onClose, profile }) {
  const [formData, setFormData] = useState(() => ({ ...profile }));

  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep];

  function handleChange(field, value) {
    if (field.startsWith("goals.")) {
      const goalField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        goals: {
          ...prev.goals,
          [goalField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  }

  async function next() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // On finish, save profile with onboarding complete flag
      await updateProfile(formData.user_id, { ...formData, onboarding: true });
      onClose();
    }
  }

  function back() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  const handleChangeForStepTwo = (field, value) => {
    handleChange(`goals.${field}`, value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Welcome {formData.name?.split(" ")[0]}!</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          {currentStep === 1 ? (
            // StepTwo: only goals fields, so wrap onChange
            <StepComponent data={formData} onChange={handleChangeForStepTwo} />
          ) : (
            // Other steps: full formData, full handleChange
            <StepComponent data={formData} onChange={handleChange} />
          )}
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={back} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={next}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogFooter>

        <div className="mt-4">
          <ProgressIndicator current={currentStep} total={steps.length} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
