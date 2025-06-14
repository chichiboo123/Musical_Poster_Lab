import { type Background } from '@shared/schema';
import { pastelColors } from '@/lib/emoji-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolSidebarProps {
  currentStep: number;
  background: Background;
  onBackgroundChange: (background: Background) => void;
  onAddText: () => void;
  onAddEmoji: () => void;
}

export default function ToolSidebar({
  currentStep,
  background,
  onBackgroundChange,
  onAddText,
  onAddEmoji
}: ToolSidebarProps) {
  
  const handleBackgroundTypeChange = (type: 'solid' | 'gradient') => {
    onBackgroundChange({ ...background, type });
  };

  const handleColorSelect = (color: string, isSecondColor = false) => {
    if (background.type === 'solid') {
      onBackgroundChange({ ...background, colors: [color] });
    } else {
      if (isSecondColor) {
        onBackgroundChange({ 
          ...background, 
          colors: [background.colors[0] || color, color] 
        });
      } else {
        onBackgroundChange({ 
          ...background, 
          colors: [color, background.colors[1] || color] 
        });
      }
    }
  };

  const handleGradientDirectionChange = (direction: string) => {
    onBackgroundChange({ ...background, gradientDirection: direction as any });
  };

  // Step 1: Background
  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-palette mr-2 text-orange-500"></i>
              배경 설정
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

            {background.type === 'gradient' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">그라데이션 시작색</label>
                  <input
                    type="color"
                    className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    value={background.colors[0] || '#FFB6C1'}
                    onChange={(e) => handleColorSelect(e.target.value, false)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">그라데이션 끝색</label>
                  <input
                    type="color"
                    className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    value={background.colors[1] || background.colors[0] || '#FFB6C1'}
                    onChange={(e) => handleColorSelect(e.target.value, true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">그라데이션 방향</label>
                  <div className="grid grid-cols-4 gap-1 text-xs">
                    {[
                      { key: 'to-t', label: '↑' },
                      { key: 'to-tr', label: '↗' },
                      { key: 'to-r', label: '→' },
                      { key: 'to-br', label: '↘' },
                      { key: 'to-b', label: '↓' },
                      { key: 'to-bl', label: '↙' },
                      { key: 'to-l', label: '←' },
                      { key: 'to-tl', label: '↖' },
                    ].map((dir) => (
                      <Button
                        key={dir.key}
                        variant={background.gradientDirection === dir.key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleGradientDirectionChange(dir.key)}
                        className={`p-1 h-8 ${background.gradientDirection === dir.key ? 'little-prince-gold text-gray-700' : ''}`}
                      >
                        {dir.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {background.type === 'solid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">사용자 지정 색상</label>
                <input
                  type="color"
                  className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                  value={background.colors[0] || '#FFB6C1'}
                  onChange={(e) => handleColorSelect(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Text
  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-font mr-2 text-blue-500"></i>
              텍스트 추가
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
              <div className="text-sm text-gray-600 p-3 bg-yellow-50 rounded-lg">
                <p>• 캔버스를 클릭하여 텍스트를 추가하세요</p>
                <p>• 텍스트를 드래그하여 위치를 조정하세요</p>
                <p>• 오른쪽 패널에서 텍스트 속성을 변경하세요</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: Main Image (Emoji)
  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-smile mr-2 text-orange-500"></i>
              주요이미지 추가
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                onClick={onAddEmoji}
                className="w-full little-prince-lavender text-gray-700 hover:bg-purple-300"
              >
                <i className="fas fa-smile mr-2"></i>이모지 추가
              </Button>
              <div className="text-sm text-gray-600 p-3 bg-yellow-50 rounded-lg">
                <p>• 오른쪽 패널에서 이모지를 검색하세요</p>
                <p>• 카테고리별로 이모지를 찾을 수 있습니다</p>
                <p>• 한국어 키워드로 검색 가능합니다</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              공연정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 p-3 bg-yellow-50 rounded-lg">
              <p>• 오른쪽 패널에서 공연 상세정보를 입력하세요</p>
              <p>• 일시, 장소, 출연진 등을 추가할 수 있습니다</p>
              <p>• 모든 정보 입력 후 포스터를 다운로드하세요</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
