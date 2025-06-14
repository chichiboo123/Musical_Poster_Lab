import { type Background } from '@shared/schema';
import { pastelColors } from '@/lib/emoji-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolSidebarProps {
  background: Background;
  onBackgroundChange: (background: Background) => void;
  onAddText: () => void;
  onAddEmoji: () => void;
  onReset: () => void;
  elements: any[];
  onMoveUp: (elementId: string) => void;
  onMoveDown: (elementId: string) => void;
  onRemoveElement: (elementId: string) => void;
}

export default function ToolSidebar({
  background,
  onBackgroundChange,
  onAddText,
  onAddEmoji,
  onReset,
  elements,
  onMoveUp,
  onMoveDown,
  onRemoveElement
}: ToolSidebarProps) {
  
  const handleBackgroundTypeChange = (type: 'solid' | 'gradient') => {
    onBackgroundChange({ ...background, type });
  };

  const handleColorSelect = (color: string) => {
    if (background.type === 'solid') {
      onBackgroundChange({ ...background, colors: [color] });
    } else {
      const newColors = background.colors.length > 0 
        ? [background.colors[0], color]
        : [color, color];
      onBackgroundChange({ ...background, colors: newColors });
    }
  };

  const handleCustomColorChange = (color: string) => {
    handleColorSelect(color);
  };

  return (
    <div className="space-y-6">
      {/* Background Selection */}
      <Card className="border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
            <i className="fas fa-palette mr-2 text-orange-500"></i>
            배경 선택
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">배경 유형</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={background.type === 'solid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleBackgroundTypeChange('solid')}
                className={background.type === 'solid' ? 'little-prince-gold text-gray-700' : ''}
              >
                단색
              </Button>
              <Button
                variant={background.type === 'gradient' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleBackgroundTypeChange('gradient')}
                className={background.type === 'gradient' ? 'little-prince-gold text-gray-700' : ''}
              >
                그라데이션
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">파스텔 색상</label>
            <div className="grid grid-cols-5 gap-2">
              {pastelColors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">커스텀 색상</label>
            <input
              type="color"
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              value={background.colors[0] || '#FFB6C1'}
              onChange={(e) => handleCustomColorChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Layer Management */}
      <Card className="border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
            <i className="fas fa-layer-group mr-2 text-blue-500"></i>
            레이어 관리
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {elements.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                아직 추가된 요소가 없습니다
              </p>
            ) : (
              elements
                .sort((a, b) => b.zIndex - a.zIndex)
                .map((element) => (
                  <div
                    key={element.id}
                    className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg"
                  >
                    <span className="text-sm font-medium truncate">
                      {element.type === 'text' ? element.content : `이모지: ${element.content}`}
                    </span>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onMoveUp(element.id)}
                        className="h-6 w-6 p-0"
                      >
                        <i className="fas fa-chevron-up text-xs"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onMoveDown(element.id)}
                        className="h-6 w-6 p-0"
                      >
                        <i className="fas fa-chevron-down text-xs"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemoveElement(element.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
            <i className="fas fa-bolt mr-2 text-orange-500"></i>
            빠른 작업
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              onClick={onAddText}
              className="w-full little-prince-rose text-gray-700 hover:bg-pink-300"
            >
              <i className="fas fa-plus mr-2"></i>텍스트 추가
            </Button>
            <Button
              onClick={onAddEmoji}
              className="w-full little-prince-lavender text-gray-700 hover:bg-purple-300"
            >
              <i className="fas fa-smile mr-2"></i>이모지 추가
            </Button>
            <Button
              onClick={onReset}
              variant="destructive"
              className="w-full bg-red-100 text-red-700 hover:bg-red-200"
            >
              <i className="fas fa-undo mr-2"></i>초기화
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
