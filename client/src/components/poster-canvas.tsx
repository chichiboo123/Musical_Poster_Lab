import { useRef } from 'react';
import { type PosterElement, type Background } from '@shared/schema';
import { getBackgroundStyle } from '@/lib/poster-utils';
import DraggableElement from './draggable-element';

interface PosterCanvasProps {
  elements: PosterElement[];
  background: Background;
  selectedElementId: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<PosterElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (elementId: string) => void;
  orientation?: 'portrait' | 'landscape';
  onOrientationChange?: (orientation: 'portrait' | 'landscape') => void;
}

export default function PosterCanvas({
  elements,
  background,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  orientation = 'portrait',
  onOrientationChange
}: PosterCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  const backgroundStyle = getBackgroundStyle(background);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200 poster-container">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {onOrientationChange && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOrientationChange('portrait')}
                className={`p-2 rounded-lg transition-colors ${
                  orientation === 'portrait' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="세로"
              >
                <i className="fas fa-mobile-alt"></i>
              </button>
              <button
                onClick={() => onOrientationChange('landscape')}
                className={`p-2 rounded-lg transition-colors ${
                  orientation === 'landscape' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="가로"
              >
                <i className="fas fa-tablet-alt"></i>
              </button>
            </div>
          )}
          <h3 className="text-lg font-do-hyeon text-gray-800">
            포스터 미리보기
          </h3>
        </div>
      </div>
      
      <div 
        className="relative bg-gray-100 rounded-lg overflow-hidden" 
        style={{ 
          paddingBottom: orientation === 'landscape' ? '70.71%' : '141.42%' 
        }}
      >
        <div
          ref={canvasRef}
          className="absolute inset-4 rounded-lg shadow-lg overflow-hidden cursor-default transform-gpu transition-transform"
          style={{
            ...backgroundStyle,
            transform: 'scale(var(--poster-scale, 1))',
            transformOrigin: 'top left'
          }}
          onClick={handleCanvasClick}
        >
          
          {/* Render Elements */}
          {elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map(element => (
              <DraggableElement
                key={element.id}
                element={element}
                isSelected={selectedElementId === element.id}
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
        </div>
      </div>
    </div>
  );
}
