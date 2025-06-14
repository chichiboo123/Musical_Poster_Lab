import html2canvas from 'html2canvas';
import { type PosterElement, type Background, type PerformanceInfo } from '@shared/schema';

export interface PosterState {
  currentStep: number;
  elements: PosterElement[];
  background: Background;
  performanceInfo: PerformanceInfo;
  selectedElementId: string | null;
}

export const initialPosterState: PosterState = {
  currentStep: 1,
  elements: [],
  background: {
    type: 'solid',
    colors: ['#FFB6C1']
  },
  performanceInfo: {},
  selectedElementId: null
};

export function generateElementId(): string {
  return `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function moveElementToFront(elements: PosterElement[], elementId: string): PosterElement[] {
  const maxZIndex = Math.max(...elements.map(el => el.zIndex), 0);
  return elements.map(el => 
    el.id === elementId 
      ? { ...el, zIndex: maxZIndex + 1 }
      : el
  );
}

export function moveElementToBack(elements: PosterElement[], elementId: string): PosterElement[] {
  const minZIndex = Math.min(...elements.map(el => el.zIndex), 0);
  return elements.map(el => 
    el.id === elementId 
      ? { ...el, zIndex: minZIndex - 1 }
      : el
  );
}

export async function exportToPNG(canvasElement: HTMLElement, filename: string = 'poster.png'): Promise<void> {
  try {
    const canvas = await html2canvas(canvasElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Failed to export PNG:', error);
    throw new Error('PNG 내보내기에 실패했습니다.');
  }
}

export async function copyToClipboard(canvasElement: HTMLElement): Promise<void> {
  try {
    const canvas = await html2canvas(canvasElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    canvas.toBlob(async (blob) => {
      if (blob) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
      }
    }, 'image/png');
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    throw new Error('클립보드 복사에 실패했습니다.');
  }
}

export function getBackgroundStyle(background: Background): React.CSSProperties {
  if (background.type === 'solid') {
    return { backgroundColor: background.colors[0] };
  } else {
    const gradient = background.colors.length > 1 
      ? `linear-gradient(135deg, ${background.colors.join(', ')})`
      : `linear-gradient(135deg, ${background.colors[0]}, ${background.colors[0]}80)`;
    return { background: gradient };
  }
}
