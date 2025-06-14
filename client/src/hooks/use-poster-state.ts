import { useState, useCallback } from 'react';
import { type PosterElement, type Background, type PerformanceInfo } from '@shared/schema';
import { initialPosterState, type PosterState, generateElementId, moveElementToFront, moveElementToBack } from '@/lib/poster-utils';

export function usePosterState() {
  const [state, setState] = useState<PosterState>(initialPosterState);

  const updateCurrentStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const updateBackground = useCallback((background: Background) => {
    setState(prev => ({ ...prev, background }));
  }, []);

  const addElement = useCallback((element: Omit<PosterElement, 'id' | 'zIndex'>) => {
    const newElement: PosterElement = {
      ...element,
      id: generateElementId(),
      zIndex: state.elements.length
    };
    
    setState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    
    return newElement.id;
  }, [state.elements.length]);

  const updateElement = useCallback((elementId: string, updates: Partial<PosterElement>) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  }, []);

  const removeElement = useCallback((elementId: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId),
      selectedElementId: prev.selectedElementId === elementId ? null : prev.selectedElementId
    }));
  }, []);

  const selectElement = useCallback((elementId: string | null) => {
    setState(prev => ({ ...prev, selectedElementId: elementId }));
  }, []);

  const moveElementUp = useCallback((elementId: string) => {
    setState(prev => ({
      ...prev,
      elements: moveElementToFront(prev.elements, elementId)
    }));
  }, []);

  const moveElementDown = useCallback((elementId: string) => {
    setState(prev => ({
      ...prev,
      elements: moveElementToBack(prev.elements, elementId)
    }));
  }, []);

  const updatePerformanceInfo = useCallback((info: PerformanceInfo) => {
    setState(prev => ({ ...prev, performanceInfo: info }));
  }, []);

  const resetPoster = useCallback(() => {
    setState(initialPosterState);
  }, []);

  const selectedElement = state.selectedElementId 
    ? state.elements.find(el => el.id === state.selectedElementId)
    : null;

  return {
    ...state,
    selectedElement,
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
  };
}
