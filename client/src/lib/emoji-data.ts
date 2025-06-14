export interface EmojiCategory {
  name: string;
  korean: string;
  emojis: { emoji: string; keywords: string[] }[];
}

export const emojiCategories: EmojiCategory[] = [
  {
    name: 'Expression',
    korean: '표정',
    emojis: [
      { emoji: '😀', keywords: ['웃음', '행복', '기쁨', '즐거움'] },
      { emoji: '😃', keywords: ['웃음', '기쁨', '활기'] },
      { emoji: '😄', keywords: ['웃음', '즐거움', '행복'] },
      { emoji: '😁', keywords: ['웃음', '기쁨', '활기찬'] },
      { emoji: '😆', keywords: ['웃음', '재미', '즐거움'] },
      { emoji: '😂', keywords: ['웃음', '눈물', '재미'] },
      { emoji: '🤣', keywords: ['웃음', '폭소', '재미'] },
      { emoji: '😊', keywords: ['행복', '부끄러움', '미소'] },
      { emoji: '😇', keywords: ['천사', '착함', '순수'] },
      { emoji: '🙂', keywords: ['미소', '만족', '평온'] },
      { emoji: '🙃', keywords: ['거꾸로', '장난', '혼란'] },
      { emoji: '😋', keywords: ['맛있음', '혀', '즐거움'] },
      { emoji: '😜', keywords: ['윙크', '장난', '재미'] },
      { emoji: '🤪', keywords: ['미친', '재미', '이상함'] },
      { emoji: '😍', keywords: ['사랑', '하트', '좋아함'] },
      { emoji: '😘', keywords: ['키스', '사랑', '애정'] },
      { emoji: '😎', keywords: ['선글라스', '멋짐', '쿨'] },
      { emoji: '😤', keywords: ['화남', '분노', '코방귀'] },
      { emoji: '😢', keywords: ['슬픔', '눈물', '울음'] },
      { emoji: '😭', keywords: ['울음', '슬픔', '눈물'] },
      { emoji: '😠', keywords: ['화남', '분노', '짜증'] },
      { emoji: '😡', keywords: ['화남', '분노', '빨강'] },
      { emoji: '😱', keywords: ['놀람', '무서움', '충격'] },
      { emoji: '😳', keywords: ['당황', '부끄러움', '놀람'] },
      { emoji: '😵‍💫', keywords: ['어지러움', '혼란', '정신없음'] },
      { emoji: '🥱', keywords: ['하품', '졸림', '피곤'] },
      { emoji: '😴', keywords: ['잠', '졸림', '수면'] },
      { emoji: '🤒', keywords: ['아픔', '열', '감기'] },
      { emoji: '🤕', keywords: ['다침', '붕대', '상처'] },
      { emoji: '😷', keywords: ['마스크', '아픔', '감기'] },
      { emoji: '🤧', keywords: ['재채기', '감기', '아픔'] },
      { emoji: '🤢', keywords: ['메스꺼움', '아픔', '토할것같음'] },
      { emoji: '🤮', keywords: ['토함', '아픔', '메스꺼움'] },
      { emoji: '🥶', keywords: ['추위', '감기', '춥다'] },
      { emoji: '🥵', keywords: ['더위', '뜨거움', '덥다'] },
      { emoji: '😶‍🌫️', keywords: ['흐림', '안개', '모호함'] },
      { emoji: '🥹', keywords: ['눈물', '감동', '고마움'] },
      { emoji: '🥲', keywords: ['눈물', '행복', '감동'] }
    ]
  },
  {
    name: 'Hand Gestures',
    korean: '손동작',
    emojis: [
      { emoji: '👋', keywords: ['인사', '안녕', '손흔들기'] },
      { emoji: '🤚', keywords: ['손', '정지', '멈춤'] },
      { emoji: '✋', keywords: ['손', '정지', '하이파이브'] },
      { emoji: '🖐️', keywords: ['손', '다섯', '펼침'] },
      { emoji: '👌', keywords: ['좋아', '오케이', '완벽'] },
      { emoji: '👍', keywords: ['좋아요', '찬성', '엄지'] },
      { emoji: '👎', keywords: ['싫어요', '반대', '엄지'] },
      { emoji: '🤞', keywords: ['행운', '소원', '교차'] },
      { emoji: '🤙', keywords: ['전화', '연락', '서핑'] },
      { emoji: '🤟', keywords: ['사랑', '락', '손가락'] },
      { emoji: '🤘', keywords: ['락', '음악', '뿔'] },
      { emoji: '🙌', keywords: ['만세', '축하', '환호'] },
      { emoji: '👏', keywords: ['박수', '축하', '칭찬'] },
      { emoji: '🙏', keywords: ['기도', '감사', '부탁'] },
      { emoji: '🫶', keywords: ['하트', '사랑', '마음'] },
      { emoji: '🫰', keywords: ['하트', '사랑', '핑거'] },
      { emoji: '🤝', keywords: ['악수', '협력', '합의'] }
    ]
  },
  {
    name: 'Hearts',
    korean: '마음',
    emojis: [
      { emoji: '❤️', keywords: ['사랑', '마음', '빨강'] },
      { emoji: '🧡', keywords: ['사랑', '마음', '주황'] },
      { emoji: '💛', keywords: ['사랑', '마음', '노랑'] },
      { emoji: '💚', keywords: ['사랑', '마음', '초록'] },
      { emoji: '💙', keywords: ['사랑', '마음', '파랑'] },
      { emoji: '💜', keywords: ['사랑', '마음', '보라'] },
      { emoji: '🖤', keywords: ['사랑', '마음', '검정'] },
      { emoji: '🤍', keywords: ['사랑', '마음', '하양'] },
      { emoji: '💖', keywords: ['사랑', '반짝', '설렘'] },
      { emoji: '💗', keywords: ['사랑', '커짐', '두근'] },
      { emoji: '💘', keywords: ['사랑', '화살', '큐피드'] },
      { emoji: '💝', keywords: ['사랑', '선물', '리본'] },
      { emoji: '💞', keywords: ['사랑', '회전', '돌아가는'] },
      { emoji: '💓', keywords: ['사랑', '두근', '심장박동'] },
      { emoji: '💟', keywords: ['사랑', '장식', '하트'] },
      { emoji: '💌', keywords: ['사랑', '편지', '연애'] },
      { emoji: '🫂', keywords: ['포옹', '안아줌', '위로'] }
    ]
  },
  {
    name: 'Celebration',
    korean: '축하',
    emojis: [
      { emoji: '🎉', keywords: ['축하', '파티', '폭죽'] },
      { emoji: '🎊', keywords: ['축하', '색종이', '파티'] },
      { emoji: '🎁', keywords: ['선물', '포장', '생일'] },
      { emoji: '🎂', keywords: ['케이크', '생일', '축하'] },
      { emoji: '🥳', keywords: ['파티', '축하', '생일'] },
      { emoji: '🎈', keywords: ['풍선', '파티', '축하'] },
      { emoji: '🍰', keywords: ['케이크', '디저트', '달콤'] },
      { emoji: '🧁', keywords: ['컵케이크', '디저트', '달콤'] },
      { emoji: '🍭', keywords: ['사탕', '막대사탕', '달콤'] },
      { emoji: '🍬', keywords: ['사탕', '캔디', '달콤'] },
      { emoji: '🍫', keywords: ['초콜릿', '달콤', '디저트'] },
      { emoji: '🧸', keywords: ['곰인형', '장난감', '귀여움'] },
      { emoji: '🎀', keywords: ['리본', '예쁨', '장식'] }
    ]
  },
  {
    name: 'Food',
    korean: '음식',
    emojis: [
      { emoji: '🍎', keywords: ['사과', '과일', '빨강'] },
      { emoji: '🍌', keywords: ['바나나', '과일', '노랑'] },
      { emoji: '🍇', keywords: ['포도', '과일', '보라'] },
      { emoji: '🍓', keywords: ['딸기', '과일', '빨강'] },
      { emoji: '🍒', keywords: ['체리', '과일', '빨강'] },
      { emoji: '🍉', keywords: ['수박', '과일', '여름'] },
      { emoji: '🍊', keywords: ['오렌지', '과일', '주황'] },
      { emoji: '🍍', keywords: ['파인애플', '과일', '열대'] },
      { emoji: '🥝', keywords: ['키위', '과일', '초록'] },
      { emoji: '🍕', keywords: ['피자', '음식', '이탈리아'] },
      { emoji: '🍔', keywords: ['햄버거', '음식', '패스트푸드'] },
      { emoji: '🍟', keywords: ['감자튀김', '음식', '패스트푸드'] },
      { emoji: '🌭', keywords: ['핫도그', '음식', '소시지'] },
      { emoji: '🍿', keywords: ['팝콘', '영화', '간식'] },
      { emoji: '🍜', keywords: ['라면', '국수', '아시아'] },
      { emoji: '🍣', keywords: ['초밥', '일본', '생선'] },
      { emoji: '🍱', keywords: ['도시락', '일본', '음식'] },
      { emoji: '🥪', keywords: ['샌드위치', '음식', '빵'] },
      { emoji: '🍩', keywords: ['도넛', '디저트', '달콤'] },
      { emoji: '🍪', keywords: ['쿠키', '디저트', '달콤'] },
      { emoji: '🍰', keywords: ['케이크', '디저트', '달콤'] },
      { emoji: '🧁', keywords: ['컵케이크', '디저트', '달콤'] },
      { emoji: '🍫', keywords: ['초콜릿', '달콤', '디저트'] },
      { emoji: '🥤', keywords: ['음료', '컵', '빨대'] },
      { emoji: '🧃', keywords: ['주스', '음료', '상자'] },
      { emoji: '🍼', keywords: ['우유병', '아기', '음료'] },
      { emoji: '☕', keywords: ['커피', '음료', '카페'] },
      { emoji: '🧋', keywords: ['버블티', '음료', '타피오카'] },
      { emoji: '🍵', keywords: ['차', '음료', '따뜻함'] },
      { emoji: '🍺', keywords: ['맥주', '음료', '알코올'] },
      { emoji: '🍹', keywords: ['칵테일', '음료', '열대'] }
    ]
  },
  {
    name: 'Weather & Time',
    korean: '날씨와 시간',
    emojis: [
      { emoji: '☀️', keywords: ['태양', '맑음', '화창'] },
      { emoji: '🌤️', keywords: ['구름', '맑음', '부분적'] },
      { emoji: '🌧️', keywords: ['비', '날씨', '우산'] },
      { emoji: '⛈️', keywords: ['천둥', '번개', '폭풍'] },
      { emoji: '🌩️', keywords: ['번개', '천둥', '구름'] },
      { emoji: '❄️', keywords: ['눈', '겨울', '추위'] },
      { emoji: '🌈', keywords: ['무지개', '색깔', '아름다움'] },
      { emoji: '☁️', keywords: ['구름', '흐림', '회색'] },
      { emoji: '🌙', keywords: ['달', '밤', '초승달'] },
      { emoji: '🌛', keywords: ['달', '밤', '얼굴'] },
      { emoji: '⏰', keywords: ['시계', '알람', '시간'] },
      { emoji: '⏳', keywords: ['모래시계', '시간', '기다림'] },
      { emoji: '🕰️', keywords: ['시계', '시간', '멘틀'] },
      { emoji: '📅', keywords: ['달력', '날짜', '일정'] },
      { emoji: '📆', keywords: ['달력', '날짜', '스케줄'] },
      { emoji: '🗓️', keywords: ['달력', '일정', '계획'] }
    ]
  },
  {
    name: 'School & Home',
    korean: '학교와 집',
    emojis: [
      { emoji: '🏠', keywords: ['집', '가정', '홈'] },
      { emoji: '🏡', keywords: ['집', '가족', '마당'] },
      { emoji: '🏫', keywords: ['학교', '교육', '건물'] },
      { emoji: '🛏️', keywords: ['침대', '잠', '휴식'] },
      { emoji: '🪑', keywords: ['의자', '앉기', '가구'] },
      { emoji: '🖍️', keywords: ['크레용', '그림', '색칠'] },
      { emoji: '✏️', keywords: ['연필', '쓰기', '학습'] },
      { emoji: '🖊️', keywords: ['펜', '쓰기', '잉크'] },
      { emoji: '📚', keywords: ['책', '학습', '지식'] },
      { emoji: '📖', keywords: ['책', '읽기', '공부'] },
      { emoji: '📒', keywords: ['노트', '필기', '학습'] },
      { emoji: '📓', keywords: ['노트북', '필기', '메모'] },
      { emoji: '📔', keywords: ['노트', '책', '기록'] },
      { emoji: '📎', keywords: ['클립', '종이', '첨부'] },
      { emoji: '📌', keywords: ['압정', '고정', '표시'] },
      { emoji: '🧽', keywords: ['스펀지', '청소', '설거지'] },
      { emoji: '🧼', keywords: ['비누', '청소', '씻기'] }
    ]
  },
  {
    name: 'Objects & Tools',
    korean: '물건과 도구',
    emojis: [
      { emoji: '💻', keywords: ['노트북', '컴퓨터', '기술'] },
      { emoji: '🖥️', keywords: ['데스크톱', '컴퓨터', '모니터'] },
      { emoji: '📱', keywords: ['휴대폰', '스마트폰', '연락'] },
      { emoji: '📷', keywords: ['카메라', '사진', '촬영'] },
      { emoji: '🎥', keywords: ['비디오', '영화', '촬영'] },
      { emoji: '🎮', keywords: ['게임', '콘솔', '오락'] },
      { emoji: '🕹️', keywords: ['조이스틱', '게임', '아케이드'] },
      { emoji: '🧸', keywords: ['곰인형', '장난감', '귀여움'] },
      { emoji: '🪀', keywords: ['요요', '장난감', '놀이'] },
      { emoji: '🧩', keywords: ['퍼즐', '게임', '맞추기'] },
      { emoji: '🛍️', keywords: ['쇼핑백', '구매', '쇼핑'] },
      { emoji: '🎒', keywords: ['가방', '학교', '여행'] }
    ]
  },
  {
    name: 'Transportation',
    korean: '교통수단',
    emojis: [
      { emoji: '🚗', keywords: ['자동차', '차', '운전'] },
      { emoji: '🚕', keywords: ['택시', '노랑차', '운송'] },
      { emoji: '🚙', keywords: ['SUV', '차', '큰차'] },
      { emoji: '🚌', keywords: ['버스', '대중교통', '승객'] },
      { emoji: '🚎', keywords: ['트롤리', '전차', '대중교통'] },
      { emoji: '🚓', keywords: ['경찰차', '순찰차', '치안'] },
      { emoji: '🚑', keywords: ['구급차', '응급', '병원'] },
      { emoji: '🚒', keywords: ['소방차', '화재', '소방'] },
      { emoji: '🚐', keywords: ['밴', '승합차', '가족'] },
      { emoji: '✈️', keywords: ['비행기', '여행', '하늘'] },
      { emoji: '🚀', keywords: ['로켓', '우주', '발사'] },
      { emoji: '🚢', keywords: ['배', '선박', '바다'] },
      { emoji: '🚲', keywords: ['자전거', '운동', '친환경'] },
      { emoji: '🛴', keywords: ['킥보드', '스쿠터', '이동'] },
      { emoji: '🚦', keywords: ['신호등', '교통', '규칙'] },
      { emoji: '🛫', keywords: ['이륙', '비행기', '출발'] }
    ]
  },
  {
    name: 'Nature',
    korean: '자연',
    emojis: [
      { emoji: '🐶', keywords: ['강아지', '개', '펫'] },
      { emoji: '🐱', keywords: ['고양이', '냥이', '펫'] },
      { emoji: '🐭', keywords: ['쥐', '작음', '동물'] },
      { emoji: '🐰', keywords: ['토끼', '귀여움', '동물'] },
      { emoji: '🦊', keywords: ['여우', '영리함', '동물'] },
      { emoji: '🐻', keywords: ['곰', '큼', '동물'] },
      { emoji: '🐼', keywords: ['판다', '흑백', '중국'] },
      { emoji: '🐨', keywords: ['코알라', '호주', '나무'] },
      { emoji: '🐯', keywords: ['호랑이', '강함', '줄무늬'] },
      { emoji: '🦁', keywords: ['사자', '왕', '갈기'] },
      { emoji: '🐷', keywords: ['돼지', '분홍', '동물'] },
      { emoji: '🐮', keywords: ['소', '농장', '우유'] },
      { emoji: '🐸', keywords: ['개구리', '연못', '점프'] },
      { emoji: '🐤', keywords: ['병아리', '노랑', '아기'] },
      { emoji: '🐧', keywords: ['펭귄', '남극', '추위'] },
      { emoji: '🐥', keywords: ['병아리', '귀여움', '작음'] },
      { emoji: '🦋', keywords: ['나비', '아름다움', '변화'] },
      { emoji: '🐌', keywords: ['달팽이', '느림', '집'] },
      { emoji: '🐞', keywords: ['무당벌레', '빨강', '점'] },
      { emoji: '🐜', keywords: ['개미', '일꾼', '작음'] },
      { emoji: '🐝', keywords: ['꿀벌', '꿀', '일꾼'] },
      { emoji: '🌲', keywords: ['나무', '소나무', '자연'] },
      { emoji: '🌴', keywords: ['야자수', '열대', '해변'] },
      { emoji: '🌳', keywords: ['나무', '잎', '그늘'] },
      { emoji: '🌵', keywords: ['선인장', '사막', '가시'] },
      { emoji: '🌷', keywords: ['튤립', '꽃', '봄'] },
      { emoji: '🌼', keywords: ['데이지', '꽃', '하얀'] },
      { emoji: '🌸', keywords: ['벚꽃', '핑크', '봄'] },
      { emoji: '🌺', keywords: ['히비스커스', '꽃', '열대'] },
      { emoji: '💐', keywords: ['꽃다발', '선물', '예쁨'] },
      { emoji: '🍀', keywords: ['클로버', '행운', '네잎'] }
    ]
  },
  {
    name: 'Hobbies',
    korean: '취미',
    emojis: [
      { emoji: '⚽', keywords: ['축구', '공', '스포츠'] },
      { emoji: '🏀', keywords: ['농구', '공', '스포츠'] },
      { emoji: '🏈', keywords: ['미식축구', '공', '미국'] },
      { emoji: '🎾', keywords: ['테니스', '공', '라켓'] },
      { emoji: '🏐', keywords: ['배구', '공', '네트'] },
      { emoji: '🏓', keywords: ['탁구', '공', '패들'] },
      { emoji: '🏸', keywords: ['배드민턴', '셔틀콕', '라켓'] },
      { emoji: '🏊‍♂️', keywords: ['수영', '물', '운동'] },
      { emoji: '🚴‍♀️', keywords: ['자전거', '운동', '사이클'] },
      { emoji: '🤸‍♂️', keywords: ['체조', '운동', '유연성'] },
      { emoji: '🤾', keywords: ['핸드볼', '공', '던지기'] },
      { emoji: '🎮', keywords: ['게임', '콘솔', '오락'] },
      { emoji: '🎲', keywords: ['주사위', '게임', '보드게임'] },
      { emoji: '🧩', keywords: ['퍼즐', '맞추기', '게임'] },
      { emoji: '🎤', keywords: ['마이크', '노래', '음악'] },
      { emoji: '🎧', keywords: ['헤드폰', '음악', '듣기'] },
      { emoji: '🎸', keywords: ['기타', '음악', '현악기'] },
      { emoji: '🎹', keywords: ['피아노', '음악', '건반'] },
      { emoji: '🎺', keywords: ['트럼펫', '음악', '관악기'] },
      { emoji: '🎻', keywords: ['바이올린', '음악', '현악기'] },
      { emoji: '🎬', keywords: ['영화', '클래퍼', '촬영'] },
      { emoji: '🎨', keywords: ['팔레트', '그림', '예술'] }
    ]
  },
  {
    name: 'Symbols & Signs',
    korean: '기호와 표시',
    emojis: [
      { emoji: '✅', keywords: ['체크', '완료', '맞음'] },
      { emoji: '❌', keywords: ['엑스', '틀림', '취소'] },
      { emoji: '✔️', keywords: ['체크', '확인', '동의'] },
      { emoji: '⛔', keywords: ['금지', '막음', '정지'] },
      { emoji: '🚫', keywords: ['금지', '안됨', '차단'] },
      { emoji: '⚠️', keywords: ['경고', '주의', '위험'] },
      { emoji: '🔴', keywords: ['빨강', '원', '색깔'] },
      { emoji: '🟠', keywords: ['주황', '원', '색깔'] },
      { emoji: '🟡', keywords: ['노랑', '원', '색깔'] },
      { emoji: '🟢', keywords: ['초록', '원', '색깔'] },
      { emoji: '🔵', keywords: ['파랑', '원', '색깔'] },
      { emoji: '🟣', keywords: ['보라', '원', '색깔'] },
      { emoji: '🟤', keywords: ['갈색', '원', '색깔'] },
      { emoji: '🆗', keywords: ['오케이', '좋음', '동의'] },
      { emoji: '🆒', keywords: ['쿨', '멋짐', '좋음'] },
      { emoji: '💯', keywords: ['백점', '완벽', '최고'] },
      { emoji: '🔔', keywords: ['벨', '알림', '소리'] },
      { emoji: '🔕', keywords: ['벨', '무음', '조용'] },
      { emoji: '🔒', keywords: ['자물쇠', '잠김', '보안'] },
      { emoji: '🔓', keywords: ['자물쇠', '열림', '해제'] },
      { emoji: '📢', keywords: ['확성기', '알림', '공지'] },
      { emoji: '📣', keywords: ['메가폰', '소리', '외침'] }
    ]
  }
];

export function searchEmojis(query: string): { emoji: string; keywords: string[] }[] {
  if (!query.trim()) return [];
  
  const results: { emoji: string; keywords: string[] }[] = [];
  const lowerQuery = query.toLowerCase();
  
  emojiCategories.forEach(category => {
    category.emojis.forEach(emojiItem => {
      if (emojiItem.keywords.some(keyword => keyword.includes(lowerQuery))) {
        results.push(emojiItem);
      }
    });
  });
  
  return results;
}

export const pastelColors = [
  '#FFB6C1', // Light Pink
  '#FFE4E1', // Misty Rose
  '#E6E6FA', // Lavender
  '#F0F8FF', // Alice Blue
  '#F0FFF0', // Honeydew
  '#FFFACD', // Lemon Chiffon
  '#FFE4B5', // Moccasin
  '#FFEFD5', // Papaya Whip
  '#F5F5DC', // Beige
  '#E1E1E1', // Light Gray
  '#D3D3D3', // Light Gray
  '#F8F8FF', // Ghost White
  '#FFF0F5', // Lavender Blush
  '#F5FFFA', // Mint Cream
  '#FFFAF0', // Floral White
  '#F0FFFF', // Azure
  '#FDF5E6', // Old Lace
  '#FAF0E6', // Linen
  '#FAEBD7', // Antique White
  '#FFF8DC', // Cornsilk
];

// Font list with CSS classes
export const googleFonts = [
  { name: 'Do Hyeon', korean: '도현체', value: 'Do Hyeon', className: 'do-hyeon-regular' },
  { name: 'Black Han Sans', korean: '검은고딕', value: 'Black Han Sans', className: 'black-han-sans-regular' },
  { name: 'Grandiflora One', korean: '그랜디플로라 원', value: 'Grandiflora One', className: 'grandiflora-one-regular' },
  { name: 'Jua', korean: '주아체', value: 'Jua', className: 'jua-regular' },
  { name: 'Dongle', korean: '동글체', value: 'Dongle', className: 'dongle-regular' },
  { name: 'Gugi', korean: '구기체', value: 'Gugi', className: 'gugi-regular' },
  { name: 'Black And White Picture', korean: '흑백사진체', value: 'Black And White Picture', className: 'black-and-white-picture-regular' },
  { name: 'Gasoek One', korean: '가속 원', value: 'Gasoek One', className: 'gasoek-one-regular' },
  { name: 'Yeon Sung', korean: '연성체', value: 'Yeon Sung', className: 'yeon-sung-regular' },
  { name: 'Diphylleia', korean: '디필레아', value: 'Diphylleia', className: 'diphylleia-regular' },
  { name: 'Kirang Haerang', korean: '키랑해랑', value: 'Kirang Haerang', className: 'kirang-haerang-regular' },
  { name: 'Gaegu', korean: '개구체', value: 'Gaegu', className: 'gaegu-regular' },
  { name: 'Noto Sans KR', korean: '노토산스 한국어', value: 'Noto Sans KR', className: 'noto-sans-kr-regular' },
  { name: 'Chiron Sung HK', korean: '키론성 홍콩', value: 'Chiron Sung HK', className: 'chiron-sung-hk-regular' },
];

// Text color presets
export const textColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#0265e8', // Blue
  '#fd9376', // Orange
  '#87f79f'  // Green
];