import { useRef, useState } from 'react';
import { usePosterState } from '@/hooks/use-poster-state';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProgressSteps from '@/components/progress-steps';
import ToolSidebar from '@/components/tool-sidebar';
import PosterCanvas from '@/components/poster-canvas';
import PropertiesPanel from '@/components/properties-panel';

export default function PosterStudio() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();
  
  const {
    currentStep,
    elements,
    background,
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
    resetPoster
  } = usePosterState();

  const handleAddText = () => {
    const id = addElement({
      type: 'text',
      content: '새 텍스트',
      position: { x: 200, y: 100 },
      style: {
        fontSize: 36,
        color: '#ffffff',
        direction: 'horizontal'
      }
    });
    selectElement(id);
    toast({
      title: "텍스트 추가됨",
      description: "새 텍스트가 포스터에 추가되었습니다.",
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

  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    resetPoster();
    setShowResetDialog(false);
    toast({
      title: "초기화 완료",
      description: "포스터가 초기화되었습니다.",
    });
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    toast({
      title: "저장됨",
      description: "포스터가 저장되었습니다.",
    });
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                <i className="fas fa-theater-masks text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-do-hyeon text-gray-800">뮤지컬 포스터 실험실</h1>
                <p className="text-sm text-gray-600">Musical Poster Studio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleSave}
                className="little-prince-sunset text-white hover:bg-orange-500"
              >
                <i className="fas fa-save mr-2"></i>저장
              </Button>
              <Button
                onClick={() => {
                  if (canvasRef.current) {
                    // This will be handled by the PropertiesPanel export function
                  }
                }}
                className="little-prince-blue text-white hover:bg-sky-600"
              >
                <i className="fas fa-download mr-2"></i>다운로드
              </Button>
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
              background={background}
              onBackgroundChange={updateBackground}
              onAddText={handleAddText}
              onAddEmoji={() => handleAddEmoji()}
              onReset={handleReset}
              elements={elements}
              onMoveUp={moveElementUp}
              onMoveDown={moveElementDown}
              onRemoveElement={removeElement}
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
              selectedElement={selectedElement}
              onUpdateElement={(updates) => {
                if (selectedElementId) {
                  updateElement(selectedElementId, updates);
                }
              }}
              onAddEmoji={handleAddEmoji}
              canvasRef={canvasRef}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg border-2 border-yellow-200 p-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            disabled={isFirstStep}
            onClick={() => updateCurrentStep(currentStep - 1)}
            className={isFirstStep ? 'cursor-not-allowed' : ''}
          >
            <i className="fas fa-chevron-left mr-1"></i>이전
          </Button>
          <div className="px-4 py-2 text-sm text-gray-600">
            {currentStep} / 5 단계
          </div>
          <Button
            disabled={isLastStep}
            onClick={() => updateCurrentStep(currentStep + 1)}
            className={isLastStep ? 'cursor-not-allowed' : 'little-prince-sunset text-white hover:bg-orange-500'}
          >
            다음<i className="fas fa-chevron-right ml-1"></i>
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
              </div>
              <div>
                <AlertDialogTitle className="font-do-hyeon">작업 초기화</AlertDialogTitle>
                <AlertDialogDescription>
                  정말로 모든 작업을 초기화하시겠습니까?
                </AlertDialogDescription>
              </div>
            </div>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 현재까지의 모든 변경사항이 사라집니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReset}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              초기화
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
