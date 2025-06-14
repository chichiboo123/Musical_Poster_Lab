export interface EmojiCategory {
  name: string;
  korean: string;
  emojis: { emoji: string; keywords: string[] }[];
}

export const emojiCategories: EmojiCategory[] = [
  {
    name: "nature",
    korean: "자연",
    emojis: [
      { emoji: "⭐", keywords: ["별", "스타", "반짝", "밤하늘"] },
      { emoji: "🌟", keywords: ["반짝이는 별", "빛나는", "특별한"] },
      { emoji: "💫", keywords: ["유성", "떨어지는 별", "소원"] },
      { emoji: "🌙", keywords: ["달", "밤", "초승달", "월"] },
      { emoji: "☀️", keywords: ["태양", "해", "밝은", "따뜻한"] },
      { emoji: "🌸", keywords: ["벚꽃", "꽃", "봄", "분홍"] },
      { emoji: "🌹", keywords: ["장미", "사랑", "빨간꽃", "어린왕자"] },
      { emoji: "🌺", keywords: ["히비스커스", "열대꽃", "하와이"] },
      { emoji: "🌻", keywords: ["해바라기", "노란꽃", "여름"] },
      { emoji: "🌷", keywords: ["튤립", "봄꽃", "네덜란드"] },
      { emoji: "🦋", keywords: ["나비", "변화", "아름다운", "날개"] },
      { emoji: "🌈", keywords: ["무지개", "색깔", "희망", "비"] },
      { emoji: "🌱", keywords: ["새싹", "성장", "생명", "희망"] },
      { emoji: "🌿", keywords: ["잎", "허브", "자연", "초록"] },
      { emoji: "🍀", keywords: ["네잎클로버", "행운", "운", "희망"] },
      { emoji: "🌾", keywords: ["벼", "곡식", "가을", "추수"] },
      { emoji: "🌵", keywords: ["선인장", "사막", "생존", "강인함"] },
      { emoji: "🌴", keywords: ["야자수", "여름", "바다", "휴가"] },
      { emoji: "🌲", keywords: ["소나무", "침엽수", "숲", "자연"] },
      { emoji: "🌳", keywords: ["나무", "활엽수", "그늘", "환경"] },
      { emoji: "🔥", keywords: ["불", "열정", "에너지", "따뜻함"] },
      { emoji: "⚡", keywords: ["번개", "전기", "에너지", "빠름"] },
      { emoji: "❄️", keywords: ["눈송이", "겨울", "차가움", "순수"] },
      { emoji: "☔", keywords: ["비", "우산", "장마", "날씨"] },
      { emoji: "🌊", keywords: ["파도", "바다", "물", "시원함"] },
    ]
  },
  {
    name: "emotions",
    korean: "감정",
    emojis: [
      { emoji: "❤️", keywords: ["사랑", "마음", "하트", "빨간"] },
      { emoji: "💖", keywords: ["반짝이는 하트", "특별한 사랑"] },
      { emoji: "💕", keywords: ["두 하트", "연인", "로맨스"] },
      { emoji: "💗", keywords: ["커지는 하트", "설렘", "두근"] },
      { emoji: "💓", keywords: ["두근거리는 하트", "설렘", "감동"] },
      { emoji: "💝", keywords: ["선물 하트", "사랑의 선물"] },
      { emoji: "💘", keywords: ["화살 맞은 하트", "사랑에 빠짐"] },
      { emoji: "💞", keywords: ["회전하는 하트", "끝없는 사랑"] },
      { emoji: "💟", keywords: ["하트 장식", "사랑", "애정"] },
      { emoji: "❣️", keywords: ["하트 느낌표", "강한 사랑"] },
      { emoji: "💔", keywords: ["깨진 하트", "이별", "슬픔"] },
      { emoji: "🧡", keywords: ["주황 하트", "따뜻한 사랑"] },
      { emoji: "💛", keywords: ["노란 하트", "우정", "행복"] },
      { emoji: "💚", keywords: ["초록 하트", "자연", "평화"] },
      { emoji: "💙", keywords: ["파란 하트", "차분한 사랑"] },
      { emoji: "💜", keywords: ["보라 하트", "로맨틱", "신비"] },
      { emoji: "🖤", keywords: ["검은 하트", "강렬함", "멋스러움"] },
      { emoji: "🤍", keywords: ["흰 하트", "순수", "깨끗함"] },
      { emoji: "😍", keywords: ["하트눈", "반한", "좋아", "사랑"] },
      { emoji: "🥰", keywords: ["행복", "미소", "따뜻한"] },
      { emoji: "😘", keywords: ["키스", "뽀뽀", "사랑", "애정"] },
      { emoji: "🤗", keywords: ["포옹", "안아주기", "따뜻함"] },
      { emoji: "😊", keywords: ["미소", "행복", "기쁨", "만족"] },
      { emoji: "😄", keywords: ["웃음", "즐거움", "기쁨", "활기"] },
      { emoji: "😁", keywords: ["활짝 웃음", "즐거움", "신남"] },
    ]
  },
  {
    name: "music",
    korean: "음악",
    emojis: [
      { emoji: "🎭", keywords: ["연극", "극장", "마스크", "뮤지컬"] },
      { emoji: "🎪", keywords: ["서커스", "텐트", "공연"] },
      { emoji: "🎨", keywords: ["예술", "그림", "창작", "팔레트"] },
      { emoji: "🎵", keywords: ["음표", "음악", "멜로디"] },
      { emoji: "🎶", keywords: ["음악", "노래", "리듬"] },
      { emoji: "🎤", keywords: ["마이크", "노래", "가수"] },
      { emoji: "🎹", keywords: ["피아노", "키보드", "연주"] },
      { emoji: "🎸", keywords: ["기타", "악기", "록"] },
      { emoji: "🎺", keywords: ["트럼펫", "관악기", "재즈"] },
      { emoji: "🥁", keywords: ["드럼", "타악기", "리듬"] },
      { emoji: "🎻", keywords: ["바이올린", "현악기", "클래식"] },
      { emoji: "🪕", keywords: ["밴조", "컨트리", "포크"] },
      { emoji: "🎷", keywords: ["색소폰", "재즈", "블루스"] },
      { emoji: "🪗", keywords: ["아코디언", "폴카", "민속"] },
      { emoji: "🎼", keywords: ["악보", "작곡", "음악"] },
      { emoji: "🎧", keywords: ["헤드폰", "음악감상", "오디오"] },
      { emoji: "📻", keywords: ["라디오", "방송", "뉴스"] },
      { emoji: "🎬", keywords: ["영화", "촬영", "액션"] },
      { emoji: "🎯", keywords: ["다트", "목표", "정확성"] },
      { emoji: "🎲", keywords: ["주사위", "게임", "운"] },
      { emoji: "🎰", keywords: ["슬롯머신", "도박", "행운"] },
      { emoji: "🎳", keywords: ["볼링", "스포츠", "스트라이크"] },
      { emoji: "🎮", keywords: ["게임", "비디오게임", "조이스틱"] },
      { emoji: "🕹️", keywords: ["조이스틱", "아케이드", "게임"] },
      { emoji: "🎯", keywords: ["타겟", "목표", "집중"] },
    ]
  },
  {
    name: "objects",
    korean: "사물",
    emojis: [
      { emoji: "👑", keywords: ["왕관", "왕", "왕자", "공주"] },
      { emoji: "💎", keywords: ["다이아몬드", "보석", "값진"] },
      { emoji: "🌍", keywords: ["지구", "세계", "행성", "어린왕자"] },
      { emoji: "✨", keywords: ["반짝임", "마법", "특별한"] },
      { emoji: "🎁", keywords: ["선물", "프레젠트", "상자"] },
      { emoji: "🎀", keywords: ["리본", "장식", "예쁜"] },
      { emoji: "🏰", keywords: ["성", "궁전", "동화"] },
      { emoji: "🗝️", keywords: ["열쇠", "비밀", "문"] },
      { emoji: "💝", keywords: ["선물상자", "깜짝선물", "사랑"] },
      { emoji: "🎈", keywords: ["풍선", "파티", "축하"] },
      { emoji: "🎉", keywords: ["축하", "파티", "기념"] },
      { emoji: "🎊", keywords: ["색종이", "축제", "즐거움"] },
      { emoji: "🪩", keywords: ["미러볼", "댄스", "파티"] },
      { emoji: "🔮", keywords: ["수정구슬", "점술", "미래"] },
      { emoji: "🧿", keywords: ["부적", "보호", "행운"] },
      { emoji: "📿", keywords: ["염주", "명상", "평화"] },
      { emoji: "💍", keywords: ["반지", "결혼", "약속"] },
      { emoji: "💄", keywords: ["립스틱", "화장", "아름다움"] },
      { emoji: "🌹", keywords: ["장미", "사랑", "로맨스"] },
      { emoji: "🕯️", keywords: ["촛불", "로맨틱", "따뜻함"] },
      { emoji: "🔥", keywords: ["불꽃", "열정", "에너지"] },
      { emoji: "⚡", keywords: ["번개", "전기", "힘"] },
      { emoji: "💫", keywords: ["유성", "소원", "꿈"] },
      { emoji: "🌠", keywords: ["별똥별", "소원", "운명"] },
      { emoji: "🎪", keywords: ["서커스", "재미", "마술"] },
    ]
  },
  {
    name: "animals",
    korean: "동물",
    emojis: [
      { emoji: "🦊", keywords: ["여우", "어린왕자", "친구", "영리한"] },
      { emoji: "🐍", keywords: ["뱀", "어린왕자", "지혜", "신비"] },
      { emoji: "🐘", keywords: ["코끼리", "어린왕자", "큰", "기억"] },
      { emoji: "🐑", keywords: ["양", "어린왕자", "순수", "평화"] },
      { emoji: "🌹", keywords: ["장미", "어린왕자", "사랑", "특별함"] },
      { emoji: "🦋", keywords: ["나비", "변화", "아름다움", "자유"] },
      { emoji: "🐝", keywords: ["벌", "부지런함", "달콤함", "협력"] },
      { emoji: "🐞", keywords: ["무당벌레", "행운", "귀여움", "자연"] },
      { emoji: "🦅", keywords: ["독수리", "자유", "높음", "힘"] },
      { emoji: "🕊️", keywords: ["비둘기", "평화", "순수", "희망"] },
      { emoji: "🦜", keywords: ["앵무새", "말하기", "색깔", "이국적"] },
      { emoji: "🦢", keywords: ["백조", "우아함", "아름다움", "순수"] },
      { emoji: "🐧", keywords: ["펭귄", "귀여움", "추위", "가족"] },
      { emoji: "🐳", keywords: ["고래", "바다", "거대함", "신비"] },
      { emoji: "🐬", keywords: ["돌고래", "지능", "친근함", "바다"] },
      { emoji: "🐠", keywords: ["물고기", "바다", "자유", "생명"] },
      { emoji: "🐙", keywords: ["문어", "바다", "지능", "유연함"] },
      { emoji: "🦄", keywords: ["유니콘", "마법", "꿈", "순수"] },
      { emoji: "🐲", keywords: ["용", "힘", "전설", "마법"] },
      { emoji: "🦁", keywords: ["사자", "용기", "왕", "힘"] },
      { emoji: "🐯", keywords: ["호랑이", "용기", "강함", "야생"] },
      { emoji: "🐻", keywords: ["곰", "포근함", "강함", "보호"] },
      { emoji: "🐼", keywords: ["판다", "귀여움", "평화", "희귀함"] },
      { emoji: "🐨", keywords: ["코알라", "귀여움", "평화", "나무"] },
      { emoji: "🐰", keywords: ["토끼", "귀여움", "빠름", "순수"] },
    ]
  },
  {
    name: "food",
    korean: "음식",
    emojis: [
      { emoji: "🍎", keywords: ["사과", "건강", "빨간", "과일"] },
      { emoji: "🍊", keywords: ["오렌지", "비타민", "상큼", "주황"] },
      { emoji: "🍋", keywords: ["레몬", "신선", "노란", "상큼"] },
      { emoji: "🍌", keywords: ["바나나", "달콤", "노란", "에너지"] },
      { emoji: "🍉", keywords: ["수박", "여름", "시원", "달콤"] },
      { emoji: "🍇", keywords: ["포도", "달콤", "보라", "풍성"] },
      { emoji: "🍓", keywords: ["딸기", "달콤", "빨간", "사랑"] },
      { emoji: "🥝", keywords: ["키위", "상큼", "초록", "비타민"] },
      { emoji: "🍑", keywords: ["체리", "달콤", "빨간", "귀여움"] },
      { emoji: "🍒", keywords: ["버찌", "달콤", "빨간", "여름"] },
      { emoji: "🥭", keywords: ["망고", "달콤", "열대", "노란"] },
      { emoji: "🍍", keywords: ["파인애플", "달콤", "열대", "황금"] },
      { emoji: "🥥", keywords: ["코코넛", "열대", "하얀", "달콤"] },
      { emoji: "🍯", keywords: ["꿀", "달콤", "황금", "자연"] },
      { emoji: "🍰", keywords: ["케이크", "축하", "달콤", "파티"] },
      { emoji: "🧁", keywords: ["컵케이크", "달콤", "예쁜", "디저트"] },
      { emoji: "🍭", keywords: ["막대사탕", "달콤", "어린이", "색깔"] },
      { emoji: "🍬", keywords: ["사탕", "달콤", "행복", "어린이"] },
      { emoji: "🍫", keywords: ["초콜릿", "달콤", "사랑", "행복"] },
      { emoji: "🍪", keywords: ["쿠키", "달콤", "따뜻함", "집"] },
      { emoji: "🍩", keywords: ["도넛", "달콤", "둥근", "간식"] },
      { emoji: "🍨", keywords: ["아이스크림", "시원", "달콤", "여름"] },
      { emoji: "🍧", keywords: ["빙수", "시원", "달콤", "여름"] },
      { emoji: "🥤", keywords: ["음료", "시원", "상쾌", "갈증"] },
      { emoji: "☕", keywords: ["커피", "따뜻함", "에너지", "아침"] },
    ]
  },
  {
    name: "celebration",
    korean: "축하",
    emojis: [
      { emoji: "🎉", keywords: ["축하", "파티", "기쁨", "성공"] },
      { emoji: "🎊", keywords: ["색종이", "축제", "기쁨", "파티"] },
      { emoji: "🎈", keywords: ["풍선", "파티", "축하", "기쁨"] },
      { emoji: "🎂", keywords: ["생일케이크", "생일", "축하", "소원"] },
      { emoji: "🕯️", keywords: ["촛불", "소원", "기원", "따뜻함"] },
      { emoji: "🎁", keywords: ["선물", "놀라움", "사랑", "기쁨"] },
      { emoji: "🎀", keywords: ["리본", "예쁜", "장식", "선물"] },
      { emoji: "🏆", keywords: ["트로피", "우승", "성공", "자랑"] },
      { emoji: "🥇", keywords: ["금메달", "1등", "최고", "성취"] },
      { emoji: "🥈", keywords: ["은메달", "2등", "노력", "성취"] },
      { emoji: "🥉", keywords: ["동메달", "3등", "참여", "성취"] },
      { emoji: "🎖️", keywords: ["훈장", "명예", "인정", "자랑"] },
      { emoji: "🏅", keywords: ["메달", "성취", "노력", "인정"] },
      { emoji: "⭐", keywords: ["별", "특별함", "밝음", "희망"] },
      { emoji: "🌟", keywords: ["빛나는별", "특별함", "성공", "희망"] },
      { emoji: "✨", keywords: ["반짝임", "마법", "특별함", "기쁨"] },
      { emoji: "🎪", keywords: ["서커스", "재미", "즐거움", "마술"] },
      { emoji: "🎭", keywords: ["연극", "예술", "감정", "표현"] },
      { emoji: "🎨", keywords: ["예술", "창작", "색깔", "표현"] },
      { emoji: "🎯", keywords: ["목표", "성공", "정확함", "집중"] },
      { emoji: "🎲", keywords: ["주사위", "운", "게임", "재미"] },
      { emoji: "🎳", keywords: ["볼링", "스포츠", "성공", "즐거움"] },
      { emoji: "🎮", keywords: ["게임", "재미", "놀이", "즐거움"] },
      { emoji: "🧸", keywords: ["테디베어", "귀여움", "사랑", "포근함"] },
      { emoji: "🪅", keywords: ["피냐타", "파티", "놀라움", "기쁨"] },
    ]
  },
  {
    name: "travel",
    korean: "여행",
    emojis: [
      { emoji: "✈️", keywords: ["비행기", "여행", "하늘", "모험"] },
      { emoji: "🚀", keywords: ["로켓", "우주", "꿈", "미래"] },
      { emoji: "🎈", keywords: ["열기구", "하늘", "자유", "모험"] },
      { emoji: "🏔️", keywords: ["산", "높음", "도전", "자연"] },
      { emoji: "🏝️", keywords: ["섬", "바다", "휴식", "평화"] },
      { emoji: "🏖️", keywords: ["해변", "휴가", "햇빛", "즐거움"] },
      { emoji: "🌊", keywords: ["파도", "바다", "자유", "역동"] },
      { emoji: "🏕️", keywords: ["캠핑", "자연", "모험", "휴식"] },
      { emoji: "🗻", keywords: ["후지산", "높음", "아름다움", "일본"] },
      { emoji: "🌋", keywords: ["화산", "힘", "자연", "뜨거움"] },
      { emoji: "🏞️", keywords: ["국립공원", "자연", "아름다움", "평화"] },
      { emoji: "🏟️", keywords: ["경기장", "스포츠", "응원", "열정"] },
      { emoji: "🏛️", keywords: ["고대건물", "역사", "문화", "웅장함"] },
      { emoji: "🕌", keywords: ["모스크", "종교", "평화", "아름다움"] },
      { emoji: "⛪", keywords: ["교회", "종교", "평화", "희망"] },
      { emoji: "🏰", keywords: ["성", "동화", "꿈", "로맨스"] },
      { emoji: "🗼", keywords: ["타워", "높음", "전망", "도시"] },
      { emoji: "🌉", keywords: ["다리", "연결", "아름다움", "도시"] },
      { emoji: "🎡", keywords: ["관람차", "놀이공원", "즐거움", "높음"] },
      { emoji: "🎢", keywords: ["롤러코스터", "스릴", "재미", "모험"] },
      { emoji: "🎠", keywords: ["회전목마", "어린시절", "꿈", "즐거움"] },
      { emoji: "🏖️", keywords: ["해변", "휴가", "태양", "휴식"] },
      { emoji: "🗺️", keywords: ["지도", "여행", "모험", "탐험"] },
      { emoji: "🧳", keywords: ["여행가방", "여행", "모험", "준비"] },
      { emoji: "🎒", keywords: ["배낭", "여행", "모험", "자유"] },
    ]
  }
];

export function searchEmojis(query: string): { emoji: string; keywords: string[] }[] {
  if (!query.trim()) return [];
  
  const results: { emoji: string; keywords: string[] }[] = [];
  const lowerQuery = query.toLowerCase();
  
  emojiCategories.forEach(category => {
    category.emojis.forEach(item => {
      const matchesKeyword = item.keywords.some(keyword => 
        keyword.toLowerCase().includes(lowerQuery)
      );
      
      if (matchesKeyword) {
        results.push(item);
      }
    });
  });
  
  return results;
}

export const pastelColors = [
  "#FFB6C1", // Light Pink
  "#E6E6FA", // Lavender
  "#F0FFF0", // Honeydew
  "#FFCBA4", // Peach
  "#FFE4E1", // Misty Rose
  "#F0F8FF", // Alice Blue
  "#FAFAD2", // Light Goldenrod Yellow
  "#E0FFFF", // Light Cyan
  "#FFF0F5", // Lavender Blush
  "#F5FFFA", // Mint Cream
  "#FFE4B5", // Moccasin
  "#DCDCDC", // Gainsboro
  "#F8F8FF", // Ghost White
  "#FDF5E6", // Old Lace
  "#F0FFFF", // Azure
  "#FFFACD", // Lemon Chiffon
  "#E6F3FF", // Light Blue
  "#FFF5EE", // Seashell
  "#F5F5DC", // Beige
  "#FFEFD5", // Papaya Whip
  "#FFE4CD", // Blanched Almond
  "#FFEBCD", // Blanched Almond
  "#FFF8DC", // Cornsilk
  "#FFFAF0", // Floral White
];
