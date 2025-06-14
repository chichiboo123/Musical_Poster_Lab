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
}

export default function PosterCanvas({
  elements,
  background,
  selectedElementId,
  onSelectElement,
  onUpdateElement
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
          style={{
            ...backgroundStyle,
            backgroundImage: background.type === 'solid' ? 
              `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNMNTAuMTY5IDEzLjMzOTRMMzYgMTVMMzEuNjYgMzMuMTY5NEwyMCAzN0w4LjMzOTM3IDMzLjE2OTRMNCAzNUw4LjMzOTM3IDEzLjMzOTRMMjAgM1oiIGZpbGw9IiNmZmQ3MDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo='), ${backgroundStyle.background}` : 
              backgroundStyle.background,
            backgroundSize: background.type === 'solid' ? '60px 60px, cover' : 'cover'
          }}
          onClick={handleCanvasClick}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNMNTAuMTY5IDEzLjMzOTRMMzYgMTVMMzEuNjYgMzMuMTY5NEwyMCAzN0w4LjMzOTM3IDMzLjE2OTRMNCAzNUw4LjMzOTM3IDEzLjMzOTRMMjAgM1oiIGZpbGw9IiNmZmQ3MDAiLz4KPC9zdmc+Cg==')`,
            backgroundSize: '60px 60px'
          }} />
          
          {/* Render Elements */}
          {elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map(element => (
              <DraggableElement
                key={element.id}
                element={element}
                isSelected={selectedElementId === element.id}
                onSelect={() => onSelectElement(element.id)}
                onUpdate={(updates) => onUpdateElement(element.id, updates)}
                canvasRef={canvasRef}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
