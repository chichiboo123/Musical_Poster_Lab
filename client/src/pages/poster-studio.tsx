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
  const [showOrientationSelect, setShowOrientationSelect] = useState(true);
  
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
    // Calculate y position based on existing performance info texts
    let yPosition = isPerformanceInfo ? 420 : 100;
    if (isPerformanceInfo) {
      const performanceTexts = elements.filter(el => 
        el.type === 'text' && 
        el.style?.fontFamily === 'Noto Sans KR'
      );
      yPosition = 420 + (performanceTexts.length * 30); // Space texts 30px apart vertically
    }
    
    const id = addElement({
      type: 'text',
      content: customText || '새 텍스트',
      position: { x: 30, y: yPosition },
      style: {
        fontSize: isPerformanceInfo ? 16 : 36,
        color: '#000000',
        direction: 'horizontal',
        fontFamily: isPerformanceInfo ? 'Noto Sans KR' : 'Do Hyeon'
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
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "성공",
        description: "PNG 파일이 다운로드되었습니다.",
      });
    } catch (error) {
      console.error('PNG export error:', error);
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
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && navigator.clipboard.write) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          toast({
            title: "성공",
            description: "클립보드에 복사되었습니다.",
          });
        } else {
          throw new Error('클립보드 API를 사용할 수 없습니다.');
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Clipboard copy error:', error);
      toast({
        title: "오류",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };



  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 5;

  // Orientation Selection Screen
  if (showOrientationSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-yellow-200 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🖼️</div>
            <h1 className="text-2xl font-do-hyeon text-gray-800 mb-2">뮤지컬 포스터 실험실</h1>
            <p className="text-gray-600 font-do-hyeon">포스터 방향을 선택해주세요</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setOrientation('portrait');
                setShowOrientationSelect(false);
              }}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-16 bg-gray-300 rounded-lg flex items-center justify-center group-hover:bg-blue-400">
                  <i className="fas fa-mobile-alt text-white text-xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-do-hyeon text-gray-800">세로형 포스터</h3>
                  <p className="text-sm text-gray-600">세로 방향 포스터 제작</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setOrientation('landscape');
                setShowOrientationSelect(false);
              }}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-gray-300 rounded-lg flex items-center justify-center group-hover:bg-green-400">
                  <i className="fas fa-tablet-alt text-white text-xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-do-hyeon text-gray-800">가로형 포스터</h3>
                  <p className="text-sm text-gray-600">가로 방향 포스터 제작</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div className="flex items-center justify-center flex-1">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">🖼️</div>
                <div className="text-center">
                  <h1 className="text-3xl font-do-hyeon text-gray-800">뮤지컬 포스터 실험실</h1>
                  <p className="text-sm text-gray-600 font-do-hyeon">Musical Poster Studio</p>
                </div>
              </div>
            </div>
            <div className="absolute right-4">
              <Button
                onClick={() => {
                  if (window.confirm('모든 작업물이 사라집니다. 그래도 누르시겠습니까?')) {
                    resetPoster();
                    setShowOrientationSelect(true);
                    toast({
                      title: "초기화 완료",
                      description: "모든 작업이 초기화되었습니다.",
                    });
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
              >
                <i className="fas fa-home mr-2"></i>처음으로
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
        ) : currentStep === 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Performance Info Panel */}
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

            {/* Text Properties Panel */}
            <div className="lg:col-span-1">
              {selectedElement && selectedElement.type === 'text' && (
                <PropertiesPanel
                  currentStep={99} // Force text properties display
                  selectedElement={selectedElement}
                  onUpdateElement={(updates) => {
                    updateElement(selectedElement.id, updates);
                  }}
                  onAddEmoji={handleAddEmoji}
                  onAddText={handleAddText}
                  onAddImage={handleAddImage}
                  onRemoveElement={removeElement}
                  canvasRef={canvasRef}
                  performanceInfo={performanceInfo}
                  onUpdatePerformanceInfo={updatePerformanceInfo}
                  onBackgroundChange={updateBackground}
                />
              )}
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
