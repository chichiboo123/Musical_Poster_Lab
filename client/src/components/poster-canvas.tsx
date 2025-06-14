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
}

export default function PosterCanvas({
  elements,
  background,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement
}: PosterCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  const backgroundStyle = getBackgroundStyle(background);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-do-hyeon text-gray-800 flex items-center">
          <i className="fas fa-eye mr-2 text-blue-500"></i>
          포스터 미리보기
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
            <i className="fas fa-search-minus"></i>
          </button>
          <span className="text-sm text-gray-600">100%</span>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
            <i className="fas fa-search-plus"></i>
          </button>
        </div>
      </div>
      
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '141.42%' }}>
        <div
          ref={canvasRef}
          className="absolute inset-4 rounded-lg shadow-lg overflow-hidden cursor-default"
          style={backgroundStyle}
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
