import { useRef, useState } from 'react';
import { usePosterState } from '@/hooks/use-poster-state';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ProgressSteps from '@/components/progress-steps';
import ToolSidebar from '@/components/tool-sidebar';
import PosterCanvas from '@/components/poster-canvas';
import PropertiesPanel from '@/components/properties-panel';

export default function PosterStudio() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
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
      position: isPerformanceInfo ? { x: 150, y: 480 } : { x: 200, y: 100 },
      style: {
        fontSize: isPerformanceInfo ? 16 : 36,
        color: isPerformanceInfo ? '#000000' : '#ffffff',
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

  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    
    try {
      const { exportToPNG } = await import('@/lib/poster-utils');
      await exportToPNG(canvasRef.current);
      toast({
        title: "성공",
        description: "PNG 파일이 다운로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "PNG 내보내기에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = async () => {
    if (!canvasRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: orientation === 'landscape' ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = orientation === 'landscape' ? 297 : 210;
      const imgHeight = orientation === 'landscape' ? 210 : 297;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('poster.pdf');
      
      toast({
        title: "성공",
        description: "PDF 파일이 다운로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "PDF 내보내기에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    
    try {
      const { copyToClipboard } = await import('@/lib/poster-utils');
      await copyToClipboard(canvasRef.current);
      toast({
        title: "성공",
        description: "클립보드에 복사되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };



  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                <i className="fas fa-theater-masks text-white text-xl"></i>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-do-hyeon text-gray-800">뮤지컬 포스터 실험실</h1>
                <p className="text-sm text-gray-600 font-do-hyeon">Musical Poster Studio</p>
              </div>
            </div>
            <Button
              onClick={() => {
                if (window.confirm('모든 작업물이 사라집니다. 그래도 누르시겠습니까?')) {
                  resetPoster();
                  toast({
                    title: "초기화 완료",
                    description: "모든 작업이 초기화되었습니다.",
                  });
                }
              }}
              variant="outline"
              className="little-prince-sunset text-white hover:bg-orange-500"
            >
              <i className="fas fa-home mr-2"></i>처음으로
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Steps */}
        <ProgressSteps 
          currentStep={currentStep} 
          onStepChange={updateCurrentStep}
        />

        {currentStep === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Canvas Area with Orientation Controls */}
            <div className="lg:col-span-3">
              <PosterCanvas
                elements={elements}
                background={background}
                selectedElementId={selectedElementId}
                onSelectElement={selectElement}
                onUpdateElement={updateElement}
                onDeleteElement={removeElement}
                onDuplicateElement={(elementId) => {
                  const element = elements.find(el => el.id === elementId);
                  if (element) {
                    const newElement = {
                      ...element,
                      position: { x: element.position.x + 20, y: element.position.y + 20 }
                    };
                    delete (newElement as any).id;
                    addElement(newElement);
                  }
                }}
                orientation={orientation}
                onOrientationChange={setOrientation}
              />
            </div>

            {/* Background Settings Panel */}
            <div className="lg:col-span-1">
              <ToolSidebar
                currentStep={currentStep}
                background={background}
                onBackgroundChange={updateBackground}
                onAddText={(text, isPerformanceInfo) => handleAddText(text, isPerformanceInfo)}
                onAddEmoji={() => handleAddEmoji()}
                onAddImage={handleAddImage}
              />
            </div>
          </div>
        ) : currentStep === 5 ? (
          <div className="space-y-6">
            {/* Export Canvas Area */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <PosterCanvas
                  elements={elements}
                  background={background}
                  selectedElementId={null}
                  onSelectElement={() => {}}
                  onUpdateElement={() => {}}
                  onDeleteElement={() => {}}
                  onDuplicateElement={() => {}}
                  orientation={orientation}
                />
              </div>
            </div>
            
            {/* Export Buttons */}
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handleExportPNG}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <i className="fas fa-download mr-2"></i>
                PNG 다운로드
              </Button>
              <Button 
                onClick={handleExportPDF}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <i className="fas fa-file-pdf mr-2"></i>
                PDF 다운로드
              </Button>
              <Button 
                onClick={handleCopyToClipboard}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <i className="fas fa-clipboard mr-2"></i>
                클립보드 복사
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tool Sidebar */}
            <div className="lg:col-span-1">
              <ToolSidebar
                currentStep={currentStep}
                background={background}
                onBackgroundChange={updateBackground}
                onAddText={(text, isPerformanceInfo) => handleAddText(text, isPerformanceInfo)}
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
                onDeleteElement={removeElement}
                onDuplicateElement={(elementId) => {
                  const element = elements.find(el => el.id === elementId);
                  if (element) {
                    const newElement = {
                      ...element,
                      position: { x: element.position.x + 20, y: element.position.y + 20 }
                    };
                    delete (newElement as any).id;
                    addElement(newElement);
                  }
                }}
                orientation={orientation}
                onOrientationChange={setOrientation}
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
                onAddText={(text, isPerformanceInfo) => handleAddText(text, isPerformanceInfo)}
                onAddImage={handleAddImage}
                onRemoveElement={removeElement}
                canvasRef={canvasRef}
                performanceInfo={performanceInfo}
                onUpdatePerformanceInfo={updatePerformanceInfo}
                onBackgroundChange={updateBackground}
              />
            </div>
          </div>
        )}
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
