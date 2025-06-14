interface ProgressStepsProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { number: 1, label: "배경", key: "background" },
  { number: 2, label: "색상", key: "colors" },
  { number: 3, label: "텍스트", key: "text" },
  { number: 4, label: "이모지", key: "emoji" },
  { number: 5, label: "공연정보", key: "performance" },
];

export default function ProgressSteps({ currentStep, onStepChange }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${
                step.number === currentStep
                  ? "bg-yellow-200 little-prince-gold"
                  : step.number < currentStep
                  ? "bg-green-100 hover:bg-green-200"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => onStepChange(step.number)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.number === currentStep
                    ? "little-prince-gold"
                    : step.number < currentStep
                    ? "bg-green-300"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`text-sm font-bold ${
                    step.number === currentStep || step.number < currentStep
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.number}
                </span>
              </div>
              <span
                className={`text-sm font-medium ${
                  step.number === currentStep || step.number < currentStep
                    ? "text-gray-700"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-4 h-0.5 bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
