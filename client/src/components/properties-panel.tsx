import { useState } from 'react';
import { type PosterElement } from '@shared/schema';
import { emojiCategories, searchEmojis } from '@/lib/emoji-data';
import { exportToPNG, copyToClipboard } from '@/lib/poster-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface PropertiesPanelProps {
  selectedElement: PosterElement | null;
  onUpdateElement: (updates: Partial<PosterElement>) => void;
  onAddEmoji: (emoji: string) => void;
  canvasRef: React.RefObject<HTMLElement>;
}

export default function PropertiesPanel({
  selectedElement,
  onUpdateElement,
  onAddEmoji,
  canvasRef
}: PropertiesPanelProps) {
  const [emojiSearch, setEmojiSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('nature');
  const { toast } = useToast();

  const searchResults = emojiSearch ? searchEmojis(emojiSearch) : [];
  const categoryEmojis = emojiCategories.find(cat => cat.name === selectedCategory)?.emojis || [];
  const displayEmojis = searchResults.length > 0 ? searchResults : categoryEmojis;

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Text Properties */}
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
                <Label>글꼴 크기: {selectedElement.style.fontSize || 36}px</Label>
                <Slider
                  value={[selectedElement.style.fontSize || 36]}
                  onValueChange={([value]) => onUpdateElement({ 
                    style: { ...selectedElement.style, fontSize: value }
                  })}
                  min={12}
                  max={72}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>텍스트 색상</Label>
                <div className="flex space-x-2 mt-2">
                  <input
                    type="color"
                    value={selectedElement.style.color || '#ffffff'}
                    onChange={(e) => onUpdateElement({ 
                      style: { ...selectedElement.style, color: e.target.value }
                    })}
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <div className="flex-1 grid grid-cols-4 gap-1">
                    {['#ffffff', '#000000', '#ff6b6b', '#4ecdc4'].map(color => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                        onClick={() => onUpdateElement({ 
                          style: { ...selectedElement.style, color }
                        })}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <Label>텍스트 방향</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button
                    variant={selectedElement.style.direction !== 'vertical' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateElement({ 
                      style: { ...selectedElement.style, direction: 'horizontal' }
                    })}
                    className={selectedElement.style.direction !== 'vertical' ? 'little-prince-gold text-gray-700' : ''}
                  >
                    가로
                  </Button>
                  <Button
                    variant={selectedElement.style.direction === 'vertical' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateElement({ 
                      style: { ...selectedElement.style, direction: 'vertical' }
                    })}
                    className={selectedElement.style.direction === 'vertical' ? 'little-prince-gold text-gray-700' : ''}
                  >
                    세로
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              텍스트 요소를 선택해주세요
            </p>
          )}
        </CardContent>
      </Card>

      {/* Emoji Search */}
      <Card className="border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
            <i className="fas fa-smile mr-2 text-orange-500"></i>
            이모지 검색
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="이모지 검색 (예: 별, 꽃, 하트)"
              value={emojiSearch}
              onChange={(e) => setEmojiSearch(e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex flex-wrap gap-1 mb-2">
              {emojiCategories.map(category => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`text-xs ${selectedCategory === category.name ? 'little-prince-gold' : ''}`}
                >
                  {category.korean}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
            {displayEmojis.map((item, index) => (
              <button
                key={index}
                className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                onClick={() => onAddEmoji(item.emoji)}
                title={item.keywords.join(', ')}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
            <i className="fas fa-download mr-2 text-blue-500"></i>
            내보내기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              onClick={handleExportPNG}
              className="w-full little-prince-blue text-white hover:bg-sky-600"
            >
              <i className="fas fa-file-image mr-2"></i>PNG 다운로드
            </Button>
            <Button
              onClick={handleCopyToClipboard}
              className="w-full little-prince-lavender text-gray-700 hover:bg-purple-300"
            >
              <i className="fas fa-clipboard mr-2"></i>클립보드 복사
            </Button>
            <Button
              onClick={handlePrint}
              className="w-full little-prince-mint text-gray-700 hover:bg-green-300"
            >
              <i className="fas fa-print mr-2"></i>인쇄하기
            </Button>
          </div>
          
          <div className="mt-4 p-3 little-prince-cream rounded-lg">
            <p className="text-xs text-gray-600">
              <i className="fas fa-info-circle mr-1"></i>
              고해상도 PNG 파일로 저장됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
