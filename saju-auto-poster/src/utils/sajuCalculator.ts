// 사주 계산 및 해석 생성 유틸리티

export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "M" | "F";
  name?: string;
}

export interface SajuData {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  elements: string[];
  luckyElements: string[];
  personality: string[];
  fortune: string[];
}

// 천간 (10개)
const HEAVENLY_STEMS = [
  "갑",
  "을",
  "병",
  "정",
  "무",
  "기",
  "경",
  "신",
  "임",
  "계",
];

// 지지 (12개)
const EARTHLY_BRANCHES = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
];

// 오행
const FIVE_ELEMENTS = {
  갑: "목",
  을: "목",
  병: "화",
  정: "화",
  무: "토",
  기: "토",
  경: "금",
  신: "금",
  임: "수",
  계: "수",
};

// 지지 오행
const BRANCH_ELEMENTS = {
  자: "수",
  축: "토",
  인: "목",
  묘: "목",
  진: "토",
  사: "화",
  오: "화",
  미: "토",
  신: "금",
  유: "금",
  술: "토",
  해: "수",
};

// 사주 계산 함수
export const calculateSaju = (birthInfo: BirthInfo): SajuData => {
  const { year, month, day, hour } = birthInfo;

  // 간단한 사주 계산 (실제로는 더 복잡한 계산이 필요)
  const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
  const yearBranch = EARTHLY_BRANCHES[(year - 4) % 12];

  const monthStem = HEAVENLY_STEMS[(month - 1) % 10];
  const monthBranch = EARTHLY_BRANCHES[(month - 1) % 12];

  const dayStem = HEAVENLY_STEMS[(day - 1) % 10];
  const dayBranch = EARTHLY_BRANCHES[(day - 1) % 12];

  const hourStem = HEAVENLY_STEMS[Math.floor(hour / 2) % 10];
  const hourBranch = EARTHLY_BRANCHES[Math.floor(hour / 2) % 12];

  const yearPillar = `${yearStem}${yearBranch}`;
  const monthPillar = `${monthStem}${monthBranch}`;
  const dayPillar = `${dayStem}${dayBranch}`;
  const hourPillar = `${hourStem}${hourBranch}`;

  // 오행 분석
  const elements = [
    FIVE_ELEMENTS[yearStem as keyof typeof FIVE_ELEMENTS],
    BRANCH_ELEMENTS[yearBranch as keyof typeof BRANCH_ELEMENTS],
    FIVE_ELEMENTS[monthStem as keyof typeof FIVE_ELEMENTS],
    BRANCH_ELEMENTS[monthBranch as keyof typeof BRANCH_ELEMENTS],
    FIVE_ELEMENTS[dayStem as keyof typeof FIVE_ELEMENTS],
    BRANCH_ELEMENTS[dayBranch as keyof typeof BRANCH_ELEMENTS],
    FIVE_ELEMENTS[hourStem as keyof typeof FIVE_ELEMENTS],
    BRANCH_ELEMENTS[hourBranch as keyof typeof BRANCH_ELEMENTS],
  ];

  // 부족한 오행 찾기 (간단한 로직)
  const elementCount = elements.reduce(
    (acc, element) => {
      acc[element] = (acc[element] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const luckyElements = ["목", "화", "토", "금", "수"].filter(
    (element) => (elementCount[element] || 0) < 2
  );

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elements,
    luckyElements,
    personality: generatePersonality(dayStem),
    fortune: generateFortune(yearPillar, dayPillar),
  };
};

// 성격 분석 생성
const generatePersonality = (dayStem: string): string[] => {
  const personalities: Record<string, string[]> = {
    갑: [
      "리더십이 강함",
      "직선적이고 솔직함",
      "추진력이 뛰어남",
      "때로는 고집이 셈",
    ],
    을: [
      "섬세하고 배려심이 많음",
      "적응력이 뛰어남",
      "예술적 감각이 있음",
      "우유부단할 수 있음",
    ],
    병: [
      "밝고 활발한 성격",
      "사교성이 뛰어남",
      "열정적이고 적극적",
      "때로는 성급함",
    ],
    정: [
      "온화하고 따뜻한 성격",
      "예의바르고 정중함",
      "세심하고 꼼꼼함",
      "소심할 수 있음",
    ],
    무: [
      "믿음직스럽고 안정적",
      "책임감이 강함",
      "현실적이고 실용적",
      "변화를 싫어할 수 있음",
    ],
    기: [
      "부드럽고 포용력이 있음",
      "협조적이고 화합을 중시",
      "인내심이 강함",
      "결단력이 부족할 수 있음",
    ],
    경: [
      "의지가 강하고 결단력 있음",
      "정의감이 강함",
      "원칙을 중시함",
      "융통성이 부족할 수 있음",
    ],
    신: [
      "깔끔하고 정리정돈을 좋아함",
      "분석력이 뛰어남",
      "완벽주의 성향",
      "비판적일 수 있음",
    ],
    임: [
      "지혜롭고 통찰력이 있음",
      "포용력이 크고 너그러움",
      "적응력이 뛰어남",
      "우유부단할 수 있음",
    ],
    계: [
      "순수하고 깨끗한 마음",
      "감수성이 풍부함",
      "창의력이 뛰어남",
      "감정 기복이 클 수 있음",
    ],
  };

  return personalities[dayStem] || ["독특한 개성을 가진 분"];
};

// 운세 분석 생성
const generateFortune = (yearPillar: string, dayPillar: string): string[] => {
  const fortunes = [
    "올해는 새로운 기회가 많이 찾아올 것입니다",
    "인간관계에서 좋은 인연을 만날 수 있습니다",
    "건강에 주의하시고 규칙적인 생활을 하세요",
    "재물운이 점진적으로 상승할 것입니다",
    "학업이나 업무에서 성과를 거둘 수 있습니다",
    "가족과의 화합이 중요한 시기입니다",
    "새로운 도전을 시작하기에 좋은 때입니다",
    "감정적인 안정을 찾을 수 있을 것입니다",
  ];

  // 간단한 로직으로 운세 선택 (실제로는 더 복잡한 계산 필요)
  const selectedFortunes = [];
  const yearHash = yearPillar.charCodeAt(0) + yearPillar.charCodeAt(1);
  const dayHash = dayPillar.charCodeAt(0) + dayPillar.charCodeAt(1);

  for (let i = 0; i < 4; i++) {
    const index = (yearHash + dayHash + i) % fortunes.length;
    if (!selectedFortunes.includes(fortunes[index])) {
      selectedFortunes.push(fortunes[index]);
    }
  }

  return selectedFortunes;
};

// 사주 해석 텍스트 생성
export const generateSajuInterpretation = (
  birthInfo: BirthInfo,
  sajuData: SajuData
): string => {
  const { name, year, gender } = birthInfo;
  const {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elements,
    luckyElements,
    personality,
    fortune,
  } = sajuData;

  const genderText = gender === "M" ? "남성" : "여성";
  const nameText = name ? `${name}님` : `${year}년생 ${genderText}분`;

  return `# 🔮 ${nameText}의 사주 해석

## 📅 사주 정보
- **년주**: ${yearPillar}
- **월주**: ${monthPillar}  
- **일주**: ${dayPillar}
- **시주**: ${hourPillar}

## 🌟 오행 분석
**보유 오행**: ${[...new Set(elements)].join(", ")}
**부족한 오행**: ${luckyElements.join(", ") || "균형잡힘"}

${
  luckyElements.length > 0
    ? `
💡 **조언**: ${luckyElements.join(", ")} 기운을 보충하면 좋습니다.
- 색깔: ${getLuckyColors(luckyElements).join(", ")}
- 방향: ${getLuckyDirections(luckyElements).join(", ")}
`
    : ""
}

## 🎭 성격 분석
${personality.map((trait) => `- ${trait}`).join("\n")}

## 🔮 운세 전망
${fortune.map((prediction) => `- ${prediction}`).join("\n")}

## 💎 개운법
- 규칙적인 생활과 긍정적인 마음가짐을 유지하세요
- 감사하는 마음을 잊지 마세요
- 주변 사람들과의 관계를 소중히 하세요
- 자신의 장점을 살려 꾸준히 노력하세요

---
> 💫 *사주는 참고용이며, 본인의 노력과 의지가 가장 중요합니다.*
> 
> **작성일**: ${new Date().toLocaleDateString()}  
> **카테고리**: 사주운세  
> **태그**: #사주 #운세 #${year}년생 #${genderText}`;
};

// 행운의 색깔
const getLuckyColors = (elements: string[]): string[] => {
  const colorMap: Record<string, string[]> = {
    목: ["초록색", "연두색"],
    화: ["빨간색", "주황색"],
    토: ["노란색", "갈색"],
    금: ["흰색", "회색"],
    수: ["검은색", "파란색"],
  };

  return elements.flatMap((element) => colorMap[element] || []);
};

// 행운의 방향
const getLuckyDirections = (elements: string[]): string[] => {
  const directionMap: Record<string, string> = {
    목: "동쪽",
    화: "남쪽",
    토: "중앙",
    금: "서쪽",
    수: "북쪽",
  };

  return elements.map((element) => directionMap[element]).filter(Boolean);
};
