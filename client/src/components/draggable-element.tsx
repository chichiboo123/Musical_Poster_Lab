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
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ size: 0, x: 0, y: 0 });
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const contextMenu = document.createElement('div');
    contextMenu.className = 'fixed bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2 min-w-32';
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'block w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600 rounded';
    deleteButton.textContent = '삭제';
    deleteButton.onclick = () => {
      // Signal parent to delete this element
      onUpdate({ shouldDelete: true } as any);
      document.body.removeChild(contextMenu);
    };
    
    const copyButton = document.createElement('button');
    copyButton.className = 'block w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded';
    copyButton.textContent = '복제';
    copyButton.onclick = () => {
      // Signal parent to duplicate this element
      onUpdate({ shouldDuplicate: true } as any);
      document.body.removeChild(contextMenu);
    };
    
    contextMenu.appendChild(deleteButton);
    contextMenu.appendChild(copyButton);
    document.body.appendChild(contextMenu);
    
    const removeMenu = () => {
      if (document.body.contains(contextMenu)) {
        document.body.removeChild(contextMenu);
      }
      document.removeEventListener('click', removeMenu);
    };
    
    setTimeout(() => document.addEventListener('click', removeMenu), 0);
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
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeStart({
      size: element.style.fontSize || (element.type === 'text' ? 36 : 48),
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const direction = deltaX + deltaY > 0 ? 1 : -1;
    
    const newSize = Math.max(12, resizeStart.size + (delta * direction * 0.5));
    
    onUpdate({
      style: { ...element.style, fontSize: newSize }
    });
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

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, resizeStart]);

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
      onContextMenu={handleContextMenu}
      className={`group ${isSelected ? 'selected' : ''}`}
    >
      <div className="relative">
{(() => {
          if (element.type === 'text') {
            const getFontClass = (fontFamily: string) => {
              const fontMap: { [key: string]: string } = {
                'Do Hyeon': 'do-hyeon-regular',
                'Black Han Sans': 'black-han-sans-regular',
                'Grandiflora One': 'grandiflora-one-regular',
                'Jua': 'jua-regular',
                'Dongle': 'dongle-regular',
                'Gugi': 'gugi-regular',
                'Black And White Picture': 'black-and-white-picture-regular',
                'Gasoek One': 'gasoek-one-regular',
                'Yeon Sung': 'yeon-sung-regular',
                'Diphylleia': 'diphylleia-regular',
                'Kirang Haerang': 'kirang-haerang-regular',
                'Gaegu': 'gaegu-regular',
                'Noto Sans KR': 'noto-sans-kr-regular',
                'Chiron Sung HK': 'chiron-sung-hk-regular'
              };
              return fontMap[fontFamily] || 'do-hyeon-regular';
            };
            
            return (
              <span className={getFontClass(element.style.fontFamily || 'Do Hyeon')}>
                {String(element.content)}
              </span>
            );
          } else if (element.type === 'image') {
            return (
              <img 
                src={String(element.content)} 
                alt="Uploaded" 
                style={{ 
                  width: element.style.fontSize || 100, 
                  height: 'auto',
                  maxWidth: '300px',
                  maxHeight: '300px'
                }} 
              />
            );
          } else {
            return <span>{String(element.content)}</span>;
          }
        })()}
        
        {isSelected && (
          <div className="absolute -inset-2 border-2 border-dashed border-white/50 rounded pointer-events-none">
            <div 
              className="absolute -top-2 -right-2 w-4 h-4 little-prince-blue rounded-full border-2 border-white cursor-nw-resize pointer-events-auto"
              onMouseDown={handleResizeStart}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
