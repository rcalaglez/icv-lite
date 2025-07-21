import { useState } from 'react';
import { Step1_SelectProfile } from './components/Step1_SelectProfile';
import { Step2_JobOffer } from './components/Step2_JobOffer';
import { EvaluationLoader } from './components/EvaluationLoader';
import { Step3_EvaluationReport } from './components/Step3_EvaluationReport';
import { useCvEvaluation } from './hooks/useCvEvaluation';
import useResumeStore from '@/hooks/useResumeStore';

export const EvaluationView = () => {
  const [step, setStep] = useState(1);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const { cvScore, isLoading, error, performEvaluation } = useCvEvaluation();
  const getProfileById = useResumeStore((state) => state.getProfileById);

  const handleProfileSelected = (profileId: string) => {
    setSelectedProfileId(profileId);
    setStep(2);
  };

  const handleEvaluate = async (jobOfferText?: string) => {
    if (!selectedProfileId) return;
    const profile = getProfileById(selectedProfileId);
    if (!profile) return;

    setStep(3);
    await performEvaluation(profile.data, jobOfferText);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_SelectProfile onProfileSelected={handleProfileSelected} />;
      case 2:
        return <Step2_JobOffer onEvaluate={handleEvaluate} />;
      case 3:
        if (isLoading) {
          return <EvaluationLoader />;
        }
        if (error) {
          return <p>Error: {error}</p>; // Placeholder for error display
        }
        if (cvScore) {
          return <Step3_EvaluationReport cvScore={cvScore} />;
        }
        return null; // Should not happen
      default:
        return <Step1_SelectProfile onProfileSelected={handleProfileSelected} />;
    }
  };

  return <div className="p-4 sm:p-6 lg:p-8">{renderStep()}</div>;
};
