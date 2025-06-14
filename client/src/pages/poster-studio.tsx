import { useRef } from 'react';
import { usePosterState } from '@/hooks/use-poster-state';
import { useToast } from '@/hooks/use-toast';
import ProgressSteps from '@/components/progress-steps';
import ToolSidebar from '@/components/tool-sidebar';
import PosterCanvas from '@/components/poster-canvas';
import PropertiesPanel from '@/components/properties-panel';

export default function PosterStudio() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    currentStep,
    elements,
    background,
    performanceInfo,
    selectedElement,
    selectedElementId,
    updateCurrentStep,
    updateBackground,
    addElement,
    updateElement,
    removeElement,
    selectElement,
    moveElementUp,
    moveElementDown,
    updatePerformanceInfo,
    resetPoster
  } = usePosterState();

  const handleAddText = (customText?: string, isPerformanceInfo?: boolean) => {
    const id = addElement({
      type: 'text',
      content: customText || '새 텍스트',
      position: isPerformanceInfo ? { x: 250, y: 400 } : { x: 200, y: 100 },
      style: {
        fontSize: isPerformanceInfo ? 24 : 36,
        color: '#ffffff',
        direction: 'horizontal',
        fontFamily: 'Do Hyeon'
      }
    });
    selectElement(id);
    toast({
      title: "텍스트 추가됨",
      description: "텍스트가 포스터에 추가되었습니다.",
    });
  };

  const handleAddEmoji = (emoji: string = '⭐') => {
    const id = addElement({
      type: 'emoji',
      content: emoji,
      position: { x: 300, y: 200 },
      style: {}
    });
    selectElement(id);
    toast({
      title: "이모지 추가됨",
      description: `${emoji} 이모지가 포스터에 추가되었습니다.`,
    });
  };

  const handleAddImage = (imageData: string) => {
    const id = addElement({
      type: 'image',
      content: imageData,
      position: { x: 200, y: 200 },
      style: { fontSize: 100 }
    });
    selectElement(id);
    toast({
      title: "이미지 추가됨",
      description: "이미지가 포스터에 추가되었습니다.",
    });
  };



  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                <i className="fas fa-theater-masks text-white text-xl"></i>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-do-hyeon text-gray-800">뮤지컬 포스터 실험실</h1>
                <p className="text-sm text-gray-600 font-do-hyeon">Musical Poster Studio</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Steps */}
        <ProgressSteps 
          currentStep={currentStep} 
          onStepChange={updateCurrentStep}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tool Sidebar */}
          <div className="lg:col-span-1">
            <ToolSidebar
              currentStep={currentStep}
              background={background}
              onBackgroundChange={updateBackground}
              onAddText={handleAddText}
              onAddEmoji={() => handleAddEmoji()}
              onAddImage={handleAddImage}
            />
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <PosterCanvas
              elements={elements}
              background={background}
              selectedElementId={selectedElementId}
              onSelectElement={selectElement}
              onUpdateElement={updateElement}
            />
          </div>

          {/* Properties Panel */}
          <div className="lg:col-span-1">
            <PropertiesPanel
              currentStep={currentStep}
              selectedElement={selectedElement || null}
              onUpdateElement={(updates) => {
                if (selectedElementId) {
                  updateElement(selectedElementId, updates);
                }
              }}
              onAddEmoji={handleAddEmoji}
              onAddText={handleAddText}
              onRemoveElement={removeElement}
              canvasRef={canvasRef}
              performanceInfo={performanceInfo}
              onUpdatePerformanceInfo={updatePerformanceInfo}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t-2 border-yellow-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <a 
              href="https://litt.ly/chichiboo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 font-do-hyeon transition-colors"
            >
              created by. 교육뮤지컬 꿈꾸는 치수쌤
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
