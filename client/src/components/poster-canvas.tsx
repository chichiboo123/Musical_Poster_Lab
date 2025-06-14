import { useRef, useState } from 'react';
import { type PosterElement, type Background } from '@shared/schema';
import { getBackgroundStyle } from '@/lib/poster-utils';
import DraggableElement from './draggable-element';
import React from 'react';

interface PosterCanvasProps {
  elements: PosterElement[];
  background: Background;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<PosterElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (elementId: string) => void;
  orientation?: 'portrait' | 'landscape';
  onOrientationChange?: (orientation: 'portrait' | 'landscape') => void;
}

const PosterCanvas = React.forwardRef<HTMLDivElement, PosterCanvasProps>((
  {
    elements,
    background,
    selectedElementId,
    onSelectElement,
    onUpdateElement,
    onDeleteElement,
    onDuplicateElement,
    orientation = 'portrait',
    onOrientationChange
  },
  ref
) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  // 키보드 이벤트 리스너 추가
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setIsMultiSelectMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setIsMultiSelectMode(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (!isMultiSelectMode) {
        setSelectedElements([]);
        onSelectElement(null);
      }
      
      setIsSelecting(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const startPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setSelectionStart(startPos);
      setSelectionEnd(startPos);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectionEnd({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCanvasMouseUp = () => {
    if (!isSelecting) return;
    
    setIsSelecting(false);
    
    // 드래그 거리 계산
    const dragDistance = Math.abs(selectionEnd.x - selectionStart.x) + Math.abs(selectionEnd.y - selectionStart.y);
    
    // 최소 드래그 거리보다 클 때만 선택 영역으로 처리
    if (dragDistance > 10) {
      // 선택 영역 계산
      const selectionRect = {
        left: Math.min(selectionStart.x, selectionEnd.x),
        top: Math.min(selectionStart.y, selectionEnd.y),
        right: Math.max(selectionStart.x, selectionEnd.x),
        bottom: Math.max(selectionStart.y, selectionEnd.y)
      };
      
      // 선택 영역 내의 요소들 찾기
      const selectedIds = elements.filter(element => {
        // 더 정확한 요소 크기 계산
        let elementWidth = 100;
        let elementHeight = 50;
        
        if (element.type === 'text') {
          elementWidth = (element.content.length * (element.style.fontSize || 36)) * 0.6;
          elementHeight = element.style.fontSize || 36;
        } else if (element.type === 'emoji') {
          elementWidth = element.style.fontSize || 48;
          elementHeight = element.style.fontSize || 48;
        } else if (element.type === 'image') {
          elementWidth = element.style.fontSize || 100;
          elementHeight = element.style.fontSize || 100;
        }
        
        const elementRect = {
          left: element.position.x,
          top: element.position.y,
          right: element.position.x + elementWidth,
          bottom: element.position.y + elementHeight
        };
        
        return (
          elementRect.left < selectionRect.right &&
          elementRect.right > selectionRect.left &&
          elementRect.top < selectionRect.bottom &&
          elementRect.bottom > selectionRect.top
        );
      }).map(el => el.id);
      
      if (isMultiSelectMode) {
        // Ctrl 모드에서는 기존 선택에 추가/제거
        const newSelection = [...selectedElements];
        selectedIds.forEach(id => {
          if (newSelection.includes(id)) {
            newSelection.splice(newSelection.indexOf(id), 1);
          } else {
            newSelection.push(id);
          }
        });
        setSelectedElements(newSelection);
        
        if (newSelection.length === 1) {
          onSelectElement(newSelection[0]);
        } else {
          onSelectElement(null);
        }
      } else {
        // 일반 모드에서는 새로운 선택
        setSelectedElements(selectedIds);
        if (selectedIds.length === 1) {
          onSelectElement(selectedIds[0]);
        } else if (selectedIds.length === 0) {
          onSelectElement(null);
        }
      }
    }
  };

  const backgroundStyle = getBackgroundStyle(background);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200 poster-container">
      

      <div 
        ref={ref}
        data-poster-canvas="true"
        className="relative bg-gray-100 rounded-lg overflow-hidden" 
        style={{ 
          width: '100%',
          maxWidth: orientation === 'landscape' ? '600px' : '400px',
          aspectRatio: orientation === 'landscape' ? '1.414/1' : '1/1.414',
          margin: '0 auto',
          ...backgroundStyle
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
      >
        <div
          ref={canvasRef}
          className="absolute inset-4 rounded-lg shadow-lg overflow-hidden cursor-default transform-gpu transition-transform"
          style={{
            transform: 'scale(var(--poster-scale, 1))',
            transformOrigin: 'top left'
          }}
        >

          {/* Render Elements */}
          {elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map(element => (
              <DraggableElement
                key={element.id}
                element={element}
                isSelected={selectedElementId === element.id || selectedElements.includes(element.id)}
                onSelect={(e?: React.MouseEvent) => {
                  if (e && e.ctrlKey) {
                    // Ctrl+클릭: 다중 선택 모드
                    const newSelection = [...selectedElements];
                    if (newSelection.includes(element.id)) {
                      newSelection.splice(newSelection.indexOf(element.id), 1);
                    } else {
                      newSelection.push(element.id);
                    }
                    setSelectedElements(newSelection);
                    
                    if (newSelection.length === 1) {
                      onSelectElement(newSelection[0]);
                    } else {
                      onSelectElement(null);
                    }
                  } else {
                    // 일반 클릭: 단일 선택
                    setSelectedElements([]);
                    onSelectElement(element.id);
                  }
                }}
                onUpdate={(updates) => {
                  if ((updates as any).shouldDelete) {
                    onDeleteElement(element.id);
                    // 다중 선택에서 제거
                    setSelectedElements(prev => prev.filter(id => id !== element.id));
                  } else if ((updates as any).shouldDuplicate) {
                    onDuplicateElement(element.id);
                  } else {
                    // 다중 선택된 요소들도 함께 업데이트
                    if (selectedElements.length > 1 && selectedElements.includes(element.id)) {
                      selectedElements.forEach(id => {
                        if (id !== element.id) {
                          onUpdateElement(id, updates);
                        }
                      });
                    }
                    onUpdateElement(element.id, updates);
                  }
                }}
                canvasRef={canvasRef}
              />
            ))}

          {/* Selection Rectangle */}
          {isSelecting && (
            <div
              className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-20 pointer-events-none"
              style={{
                left: Math.min(selectionStart.x, selectionEnd.x),
                top: Math.min(selectionStart.y, selectionEnd.y),
                width: Math.abs(selectionEnd.x - selectionStart.x),
                height: Math.abs(selectionEnd.y - selectionStart.y)
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default PosterCanvas;