import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationStep1 from './VerificationStep1';
import VerificationStep2 from './VerificationStep2';
import VerificationStep3 from './VerificationStep3';

const VerificationPage = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const nextStep = () => setStep(prev => prev + 1);
    const handleFinish = () => navigate('/dashboard/home');

    const renderStep = () => {
        switch(step) {
            case 1:
                return <VerificationStep1 onNext={nextStep} />;
            case 2:
                return <VerificationStep2 onNext={nextStep} />;
            case 3:
                return <VerificationStep3 onFinish={handleFinish} />;
            default:
                return <VerificationStep1 onNext={nextStep} />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {renderStep()}
            </div>
        </div>
    );
};

export default VerificationPage;
