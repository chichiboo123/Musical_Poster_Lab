import { useState } from 'react';
import { type PosterElement, type Background } from '@shared/schema';
import { emojiCategories, searchEmojis, googleFonts, textColors } from '@/lib/emoji-data';
import { exportToPNG, copyToClipboard } from '@/lib/poster-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface PropertiesPanelProps {
  currentStep: number;
  selectedElement: PosterElement | null;
  onUpdateElement: (updates: Partial<PosterElement>) => void;
  onAddEmoji: (emoji: string) => void;
  onAddText: (text?: string, isPerformanceInfo?: boolean) => void;
  onAddImage: (imageData: string) => void;
  onRemoveElement: (elementId: string) => void;
  canvasRef: React.RefObject<HTMLElement>;
  performanceInfo: any;
  onUpdatePerformanceInfo: (info: any) => void;
  onBackgroundChange: (background: Background) => void;
}

export default function PropertiesPanel({
  currentStep,
  selectedElement,
  onUpdateElement,
  onAddEmoji,
  onAddText,
  onAddImage,
  onRemoveElement,
  canvasRef,
  performanceInfo,
  onUpdatePerformanceInfo,
  onBackgroundChange
}: PropertiesPanelProps) {
  const [emojiSearch, setEmojiSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Expression');
  const [emojiPage, setEmojiPage] = useState(0);
  const { toast } = useToast();

  const searchResults = emojiSearch ? searchEmojis(emojiSearch) : [];
  const categoryEmojis = emojiCategories.find(cat => cat.name === selectedCategory)?.emojis || [];
  const displayEmojis = searchResults.length > 0 ? searchResults : categoryEmojis;
  const emojisPerPage = 18;
  const totalPages = Math.ceil(displayEmojis.length / emojisPerPage);
  const paginatedEmojis = displayEmojis.slice(emojiPage * emojisPerPage, (emojiPage + 1) * emojisPerPage);

  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    
    try {
      await exportToPNG(canvasRef.current);
      toast({
        title: "성공",
        description: "PNG 파일이 다운로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "PNG 내보내기에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    
    try {
      await copyToClipboard(canvasRef.current);
      toast({
        title: "성공",
        description: "클립보드에 복사되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = async () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>포스터 인쇄</title>
              <style>
                body { margin: 0; padding: 20px; text-align: center; }
                img { max-width: 100%; height: auto; }
                @media print { body { padding: 0; } img { max-width: 100%; height: auto; } }
              </style>
            </head>
            <body>
              <img src="${canvas.toDataURL('image/png')}" alt="포스터" />
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "인쇄 준비에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  // Step 2: Text Properties
  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-font mr-2 text-blue-500"></i>
              텍스트 속성
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedElement?.type === 'text' ? (
              <>
                <div>
                  <Label htmlFor="text-content">텍스트 내용</Label>
                  <Input
                    id="text-content"
                    value={selectedElement.content}
                    onChange={(e) => onUpdateElement({ content: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>폰트 선택</Label>
                  <Select
                    value={selectedElement.style.fontFamily || 'Do Hyeon'}
                    onValueChange={(value) => onUpdateElement({ 
                      style: { ...selectedElement.style, fontFamily: value }
                    })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="폰트를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {googleFonts.map(font => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.korean} ({font.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>글꼴 크기: {selectedElement.style.fontSize || 36}px</Label>
                  <Slider
                    value={[selectedElement.style.fontSize || 36]}
                    onValueChange={([value]) => onUpdateElement({ 
                      style: { ...selectedElement.style, fontSize: value }
                    })}
                    min={12}
                    max={120}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>추천 색상</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {textColors.map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded border-2 ${
                          selectedElement.style.color === color 
                            ? 'border-gray-400 ring-2 ring-blue-300' 
                            : 'border-white'
                        } shadow-sm`}
                        style={{ backgroundColor: color }}
                        onClick={() => onUpdateElement({ 
                          style: { ...selectedElement.style, color }
                        })}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>사용자 지정 색상</Label>
                  <input
                    type="color"
                    value={selectedElement.style.color || '#000000'}
                    onChange={(e) => onUpdateElement({ 
                      style: { ...selectedElement.style, color: e.target.value }
                    })}
                    className="w-full h-10 mt-2 rounded-lg border border-gray-300 cursor-pointer"
                  />
                </div>
                
                <div>
                  <Label>텍스트 방향</Label>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    <Button
                      variant={selectedElement.style.direction !== 'vertical' && selectedElement.style.rotation === 0 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onUpdateElement({ 
                        style: { ...selectedElement.style, direction: 'horizontal', rotation: 0 }
                      })}
                      className={selectedElement.style.direction !== 'vertical' && selectedElement.style.rotation === 0 ? 'little-prince-gold text-gray-700' : ''}
                    >
                      가로
                    </Button>
                    <Button
                      variant={selectedElement.style.direction === 'vertical' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onUpdateElement({ 
                        style: { ...selectedElement.style, direction: 'vertical', rotation: 0 }
                      })}
                      className={selectedElement.style.direction === 'vertical' ? 'little-prince-gold text-gray-700' : ''}
                    >
                      세로
                    </Button>
                    <Button
                      variant={selectedElement.style.rotation === 45 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onUpdateElement({ 
                        style: { ...selectedElement.style, direction: 'horizontal', rotation: 45 }
                      })}
                      className={selectedElement.style.rotation === 45 ? 'little-prince-gold text-gray-700' : ''}
                    >
                      대각선
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>정렬</Label>
                  <Button
                    onClick={() => {
                      if (canvasRef.current) {
                        const canvasRect = canvasRef.current.getBoundingClientRect();
                        const centerX = canvasRect.width / 2 - 50;
                        onUpdateElement({
                          position: { ...selectedElement.position, x: centerX }
                        });
                      }
                    }}
                    size="sm"
                    variant="outline"
                    className="w-full mt-2"
                  >
                    <i className="fas fa-align-center mr-2"></i>가운데 정렬
                  </Button>
                </div>
                
                <div>
                  <Button
                    onClick={() => {
                      onRemoveElement(selectedElement.id);
                      toast({
                        title: "삭제 완료",
                        description: "텍스트가 삭제되었습니다.",
                      });
                    }}
                    variant="destructive"
                    size="sm"
                    className="w-full"
                  >
                    <i className="fas fa-trash mr-2"></i>텍스트 삭제
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                텍스트 요소를 선택해주세요
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: Emoji Selection
  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-smile mr-2 text-orange-500"></i>
              이모지 선택
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="이모지 검색 (예: 별, 꽃, 하트)"
                value={emojiSearch}
                onChange={(e) => {
                  setEmojiSearch(e.target.value);
                  setEmojiPage(0);
                }}
              />
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1 mb-2">
                {emojiCategories.map(category => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setEmojiPage(0);
                      setEmojiSearch('');
                    }}
                    className={`text-xs ${selectedCategory === category.name ? 'little-prince-gold text-gray-700' : ''}`}
                  >
                    {category.korean}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="h-64 overflow-hidden">
              <div className="grid grid-cols-6 gap-2 h-48">
                {paginatedEmojis.map((item, index) => (
                  <button
                    key={index}
                    className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors flex items-center justify-center"
                    onClick={() => onAddEmoji(item.emoji)}
                    title={item.keywords.join(', ')}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmojiPage(Math.max(0, emojiPage - 1))}
                    disabled={emojiPage === 0}
                  >
                    <i className="fas fa-chevron-left mr-1"></i>이전
                  </Button>
                  <span className="text-sm text-gray-600">
                    {emojiPage + 1} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmojiPage(Math.min(totalPages - 1, emojiPage + 1))}
                    disabled={emojiPage === totalPages - 1}
                  >
                    다음<i className="fas fa-chevron-right ml-1"></i>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedElement?.type === 'emoji' && (
          <Card className="border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
                <i className="fas fa-cog mr-2 text-orange-500"></i>
                이모지 속성
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>이모지 크기: {selectedElement.style.fontSize || 48}px</Label>
                <Slider
                  value={[selectedElement.style.fontSize || 48]}
                  onValueChange={([value]) => onUpdateElement({ 
                    style: { ...selectedElement.style, fontSize: value }
                  })}
                  min={20}
                  max={200}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>정렬</Label>
                <Button
                  onClick={() => {
                    if (canvasRef.current) {
                      const canvasRect = canvasRef.current.getBoundingClientRect();
                      const centerX = canvasRect.width / 2 - 25;
                      onUpdateElement({
                        position: { ...selectedElement.position, x: centerX }
                      });
                    }
                  }}
                  size="sm"
                  variant="outline"
                  className="w-full mt-2"
                >
                  <i className="fas fa-align-center mr-2"></i>가운데 정렬
                </Button>
              </div>
              
              <div>
                <Button
                  onClick={() => {
                    onRemoveElement(selectedElement.id);
                    toast({
                      title: "삭제 완료",
                      description: "이모지가 삭제되었습니다.",
                    });
                  }}
                  variant="destructive"
                  size="sm"
                  className="w-full"
                >
                  <i className="fas fa-trash mr-2"></i>이모지 삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Step 4: Performance Info
  if (currentStep === 4) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-info-circle mr-2 text-blue-500"></i>
              공연 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="performance-date">공연 일시</Label>
              <div className="flex gap-2">
                <Input
                  id="performance-date"
                  placeholder="0000년 0월 0일"
                  value={performanceInfo.date || ''}
                  onChange={(e) => onUpdatePerformanceInfo({ ...performanceInfo, date: e.target.value })}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (performanceInfo.date) {
                      onAddText(performanceInfo.date, true);
                      toast({
                        title: "공연 일시 추가됨",
                        description: "공연 일시가 포스터에 추가되었습니다.",
                      });
                    }
                  }}
                  size="sm"
                  disabled={!performanceInfo.date}
                  className="little-prince-sunset text-white hover:bg-orange-500"
                >
                  삽입
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="performance-venue">공연 장소</Label>
              <div className="flex gap-2">
                <Input
                  id="performance-venue"
                  placeholder="어린왕자 소극장"
                  value={performanceInfo.venue || ''}
                  onChange={(e) => onUpdatePerformanceInfo({ ...performanceInfo, venue: e.target.value })}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (performanceInfo.venue) {
                      onAddText(performanceInfo.venue, true);
                      toast({
                        title: "공연 장소 추가됨",
                        description: "공연 장소가 포스터에 추가되었습니다.",
                      });
                    }
                  }}
                  size="sm"
                  disabled={!performanceInfo.venue}
                  className="little-prince-sunset text-white hover:bg-orange-500"
                >
                  삽입
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="performance-cast">출연진</Label>
              <div className="flex gap-2">
                <Input
                  id="performance-cast"
                  placeholder="000, 000, 000"
                  value={performanceInfo.cast || ''}
                  onChange={(e) => onUpdatePerformanceInfo({ ...performanceInfo, cast: e.target.value })}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (performanceInfo.cast) {
                      onAddText(performanceInfo.cast, true);
                      toast({
                        title: "출연진 추가됨",
                        description: "출연진이 포스터에 추가되었습니다.",
                      });
                    }
                  }}
                  size="sm"
                  disabled={!performanceInfo.cast}
                  className="little-prince-sunset text-white hover:bg-orange-500"
                >
                  삽입
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="performance-crew">창작진</Label>
              <div className="flex gap-2">
                <Input
                  id="performance-crew"
                  placeholder="프로듀서 000, 연출 000, 작곡 000 등"
                  value={performanceInfo.crew || ''}
                  onChange={(e) => onUpdatePerformanceInfo({ ...performanceInfo, crew: e.target.value })}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (performanceInfo.crew) {
                      onAddText(performanceInfo.crew, true);
                      toast({
                        title: "창작진 추가됨",
                        description: "창작진이 포스터에 추가되었습니다.",
                      });
                    }
                  }}
                  size="sm"
                  disabled={!performanceInfo.crew}
                  className="little-prince-sunset text-white hover:bg-orange-500"
                >
                  삽입
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="performance-production">제작사</Label>
              <div className="flex gap-2">
                <Input
                  id="performance-production"
                  placeholder="교육뮤지컬 꿈꾸는 치수쌤"
                  value={performanceInfo.production || ''}
                  onChange={(e) => onUpdatePerformanceInfo({ ...performanceInfo, production: e.target.value })}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (performanceInfo.production) {
                      onAddText(performanceInfo.production, true);
                      toast({
                        title: "제작사 추가됨",
                        description: "제작사가 포스터에 추가되었습니다.",
                      });
                    }
                  }}
                  size="sm"
                  disabled={!performanceInfo.production}
                  className="little-prince-sunset text-white hover:bg-orange-500"
                >
                  삽입
                </Button>
              </div>
            </div>

            {/* Bulk Insert Button */}
            <div className="pt-4 border-t">
              <Button
                onClick={() => {
                  const allInfo = [
                    performanceInfo.date,
                    performanceInfo.time,
                    performanceInfo.venue,
                    performanceInfo.cast,
                    performanceInfo.crew,
                    performanceInfo.production
                  ].filter(Boolean);
                  
                  if (allInfo.length > 0) {
                    allInfo.forEach((info, index) => {
                      setTimeout(() => {
                        onAddText(info, true);
                      }, index * 100);
                    });
                    toast({
                      title: "모든 공연정보 추가됨",
                      description: `${allInfo.length}개의 공연정보가 포스터에 추가되었습니다.`,
                    });
                  }
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="lg"
                disabled={!performanceInfo.date && !performanceInfo.time && !performanceInfo.venue && !performanceInfo.cast && !performanceInfo.crew && !performanceInfo.production}
              >
                <i className="fas fa-plus-circle mr-2"></i>
                한 번에 삽입
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    );
  }

  // Step 5: Final Check - Right sidebar for image upload and emoji selection
  if (currentStep === 5) {
    return (
      <div className="space-y-6">
        {/* Text Properties */}
        {selectedElement && selectedElement.type === 'text' && (
          <Card className="border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
                <i className="fas fa-font mr-2 text-blue-500"></i>
                텍스트 속성
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>텍스트 내용</Label>
                <Input
                  value={String(selectedElement.content)}
                  onChange={(e) => onUpdateElement({ content: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>정렬</Label>
                <Button
                  onClick={() => {
                    if (canvasRef.current) {
                      const canvasWidth = canvasRef.current.offsetWidth;
                      const centerX = (canvasWidth - 100) / 2; // Center with element width offset
                      onUpdateElement({
                        position: { ...selectedElement.position, x: centerX }
                      });
                    }
                  }}
                  size="sm"
                  variant="outline"
                  className="w-full mt-2"
                >
                  <i className="fas fa-align-center mr-2"></i>가운데 정렬
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Image Upload */}
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-upload mr-2 text-green-500"></i>
              사용자 이미지 업로드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const imageUrl = event.target?.result as string;
                      onAddImage(imageUrl);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <p className="text-xs text-gray-500">JPG, PNG, GIF 파일을 업로드하세요</p>
            </div>
          </CardContent>
        </Card>

        {/* Emoji Selection */}
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-smile mr-2 text-orange-500"></i>
              이모지 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Input
                  placeholder="이모지 검색..."
                  value={emojiSearch}
                  onChange={(e) => {
                    setEmojiSearch(e.target.value);
                    setEmojiPage(0);
                  }}
                  className="mb-2"
                />
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {emojiCategories.slice(0, 3).map(category => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setEmojiPage(0);
                      setEmojiSearch('');
                    }}
                    className={`text-xs ${selectedCategory === category.name ? 'little-prince-gold text-gray-700' : ''}`}
                  >
                    {category.korean}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-6 gap-1 h-32 overflow-y-auto">
                {paginatedEmojis.slice(0, 18).map((item, index) => (
                  <button
                    key={index}
                    className="text-lg hover:bg-gray-100 rounded p-1 transition-colors flex items-center justify-center"
                    onClick={() => onAddEmoji(item.emoji)}
                    title={item.keywords.join(', ')}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
