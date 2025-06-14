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
      { emoji: "😍", keywords: ["하트눈", "반한", "좋아", "사랑"] },
      { emoji: "🥰", keywords: ["행복", "미소", "따뜻한"] },
      { emoji: "😘", keywords: ["키스", "뽀뽀", "사랑", "애정"] },
      { emoji: "🤗", keywords: ["포옹", "안아주기", "따뜻함"] },
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
