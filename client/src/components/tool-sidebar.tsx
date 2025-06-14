import { type Background } from '@shared/schema';
import { pastelColors } from '@/lib/emoji-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ToolSidebarProps {
  currentStep: number;
  background: Background;
  onBackgroundChange: (background: Background) => void;
  onAddText: (text?: string, isPerformanceInfo?: boolean) => void;
  onAddEmoji: () => void;
  onAddImage: (imageData: string) => void;
}

export default function ToolSidebar({
  currentStep,
  background,
  onBackgroundChange,
  onAddText,
  onAddEmoji,
  onAddImage
}: ToolSidebarProps) {

  const handleBackgroundTypeChange = (type: 'solid' | 'gradient') => {
    onBackgroundChange({ ...background, type });
  };

  const gradientPresets = [
    { start: '#FFE5E5', end: '#FFB3BA' }, // 연핑크
    { start: '#E5F3FF', end: '#B3D9FF' }, // 연파랑
    { start: '#E5FFE5', end: '#B3FFB3' }, // 연초록
    { start: '#FFF5E5', end: '#FFE5B3' }, // 연노랑
    { start: '#F0E5FF', end: '#D9B3FF' }, // 연보라
    { start: '#FFE5F0', end: '#FFB3D9' }, // 연자주
    { start: '#E5FFF5', end: '#B3FFD9' }, // 연민트
    { start: '#FFF0E5', end: '#FFD9B3' }, // 연오렌지
    { start: '#FF6B6B', end: '#4ECDC4' }, // 코랄-터쿠아즈
    { start: '#A8E6CF', end: '#FFD3A5' }, // 민트-피치
    { start: '#FD79A8', end: '#FDCB6E' }, // 핑크-골드
    { start: '#6C5CE7', end: '#A29BFE' }, // 보라-라벤더
    { start: '#FD79A8', end: '#FDCB6E' }, // 핑크-골드
    { start: '#00B894', end: '#55A3FF' }, // 에메랄드-블루
    { start: '#E17055', end: '#FDCB6E' }, // 테라코타-골드
    { start: '#74B9FF', end: '#0984E3' }, // 라이트블루-딥블루
  ];

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

  const handleGradientPreset = (preset: { start: string; end: string }) => {
    onBackgroundChange({
      ...background,
      type: 'gradient',
      colors: [preset.start, preset.end]
    });
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

            {background.type === 'solid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">추천 색상</label>
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
            )}

            {background.type === 'gradient' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">추천 색상</label>
                  <div className="grid grid-cols-4 gap-2">
                    {gradientPresets.map((preset, index) => (
                      <button
                        key={index}
                        className="w-full h-8 rounded-lg border-2 border-white shadow-md hover:scale-105 transition-transform"
                        style={{
                          background: `linear-gradient(to right, ${preset.start}, ${preset.end})`
                        }}
                        onClick={() => handleGradientPreset(preset)}
                      />
                    ))}
                  </div>
                </div>
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
                onClick={() => onAddText()}
                className="w-full little-prince-rose text-gray-700 hover:bg-pink-300"
              >
                <i className="fas fa-plus mr-2"></i>텍스트 추가
              </Button>
              <div className="text-sm text-gray-600 p-3 bg-yellow-50 rounded-lg">
                <p>• 뮤지컬 작품의 제목</p>
                <p>• 뮤지컬 작품의 부제목</p>
                <p>• 뮤지컬 작품을 한문장으로 설명</p>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">사용자 이미지 업로드</Label>
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

              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">이모지 선택</Label>
                <p className="text-xs text-gray-500 mb-3">아래에서 이모지를 선택하거나 속성 패널에서 더 많은 옵션을 확인하세요</p>
              </div>

              <div className="text-sm text-gray-600 p-3 bg-yellow-50 rounded-lg">
                <p>• 뮤지컬 작품을 잘 표현하는 이미지를 생각해보세요.</p>
                <p>• 이모지를 선택하거나 내가 원하는 이미지를 업로드하세요.</p>
                <p>• 업로드된 이미지는 크기 조절이 가능합니다.</p>
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
              <p>• 공연 상세정보를 입력하세요</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 5: Final Check
  if (currentStep === 5) {
    return (
      <div className="space-y-6">
        {/* Left Column - Background Settings */}
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-palette mr-2 text-purple-500"></i>
              배경 설정
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>배경 유형</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button
                    onClick={() => onBackgroundChange({ type: 'solid', colors: ['#FFFFFF'] })}
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center"
                  >
                    단색
                  </Button>
                  <Button
                    onClick={() => onBackgroundChange({ type: 'gradient', colors: ['#FFE4E1', '#F0F8FF'], gradientDirection: 'to-br' })}
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center"
                  >
                    그라데이션
                  </Button>
                </div>
              </div>

              <div>
                <Label>추천 색상</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {['#FFFFFF', '#FFE4E1', '#F0F8FF', '#F5F5DC', '#E6E6FA', '#FFF8DC', '#F0FFF0', '#FFE4B5', '#D3D3D3', '#F0E68C'].map(color => (
                    <button
                      key={color}
                      className="w-full h-8 rounded-lg border-2 hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => onBackgroundChange({ type: 'solid', colors: [color] })}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>사용자 지정 색상</Label>
                <input
                  type="color"
                  className="w-full h-10 mt-2 rounded-lg border border-gray-300 cursor-pointer"
                  onChange={(e) => onBackgroundChange({ type: 'solid', colors: [e.target.value] })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-do-hyeon text-gray-800 flex items-center">
              <i className="fas fa-plus mr-2 text-blue-500"></i>
              텍스트 추가
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onAddText()}
              className="w-full little-prince-rose text-gray-700 hover:bg-pink-300"
            >
              <i className="fas fa-plus mr-2"></i>새 텍스트 추가
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}