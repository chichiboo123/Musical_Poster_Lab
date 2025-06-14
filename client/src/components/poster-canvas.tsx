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

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsSelecting(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const startPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setSelectionStart(startPos);
      setSelectionEnd(startPos);
      onSelectElement(null);
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
    
    // 선택 영역 계산
    const selectionRect = {
      left: Math.min(selectionStart.x, selectionEnd.x),
      top: Math.min(selectionStart.y, selectionEnd.y),
      right: Math.max(selectionStart.x, selectionEnd.x),
      bottom: Math.max(selectionStart.y, selectionEnd.y)
    };
    
    // 선택 영역 내의 요소들 찾기
    const selectedIds = elements.filter(element => {
      const elementRect = {
        left: element.position.x,
        top: element.position.y,
        right: element.position.x + 100, // 대략적인 크기
        bottom: element.position.y + 50
      };
      
      return (
        elementRect.left < selectionRect.right &&
        elementRect.right > selectionRect.left &&
        elementRect.top < selectionRect.bottom &&
        elementRect.bottom > selectionRect.top
      );
    }).map(el => el.id);
    
    setSelectedElements(selectedIds);
    if (selectedIds.length === 1) {
      onSelectElement(selectedIds[0]);
    } else if (selectedIds.length === 0) {
      onSelectElement(null);
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
                onSelect={() => onSelectElement(element.id)}
                onUpdate={(updates) => {
                  if ((updates as any).shouldDelete) {
                    onDeleteElement(element.id);
                  } else if ((updates as any).shouldDuplicate) {
                    onDuplicateElement(element.id);
                  } else {
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