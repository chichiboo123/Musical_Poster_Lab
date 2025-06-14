import { useState, useRef, useEffect } from 'react';
import { type PosterElement } from '@shared/schema';

interface DraggableElementProps {
  element: PosterElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<PosterElement>) => void;
  canvasRef: React.RefObject<HTMLElement>;
}

export default function DraggableElement({
  element,
  isSelected,
  onSelect,
  onUpdate,
  canvasRef
}: DraggableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSelect();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.position.x,
      y: e.clientY - element.position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Constrain to canvas bounds
    const maxX = canvasRect.width - (elementRef.current?.offsetWidth || 0);
    const maxY = canvasRect.height - (elementRef.current?.offsetHeight || 0);

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    onUpdate({
      position: { x: constrainedX, y: constrainedY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const elementStyle: React.CSSProperties = {
    position: 'absolute',
    left: element.position.x,
    top: element.position.y,
    zIndex: element.zIndex,
    fontSize: element.style.fontSize || (element.type === 'text' ? 36 : 32),
    color: element.style.color || '#000000',
    transform: `rotate(${element.style.rotation || 0}deg)`,
    writingMode: element.style.direction === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    textShadow: element.type === 'text' ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
    filter: element.type === 'emoji' ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' : 'none'
  };

  return (
    <div
      ref={elementRef}
      style={elementStyle}
      onMouseDown={handleMouseDown}
      className={`group ${isSelected ? 'selected' : ''}`}
    >
      <div className="relative">
        {element.type === 'text' ? (
          <span style={{ fontFamily: element.style.fontFamily || 'Do Hyeon' }}>{element.content}</span>
        ) : element.type === 'image' ? (
          <img 
            src={element.content} 
            alt="Uploaded" 
            style={{ 
              width: element.style.fontSize || 100, 
              height: 'auto',
              maxWidth: '300px',
              maxHeight: '300px'
            }} 
          />
        ) : (
          <span>{element.content}</span>
        )}
        
        {isSelected && (
          <div className="absolute -inset-2 border-2 border-dashed border-white/50 rounded pointer-events-none">
            <div className="absolute -top-2 -right-2 w-4 h-4 little-prince-blue rounded-full border-2 border-white cursor-nw-resize"></div>
          </div>
        )}
      </div>
    </div>
  );
}
