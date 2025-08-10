// 연예인 사주 전용 유틸리티

export interface CelebrityInfo {
  name: string;
  year: number;
  month: number;
  day: number;
  hour?: number;
  gender: "M" | "F";
  profession: string; // 가수, 배우, 아이돌 등
  group?: string; // 그룹명 (해당시)
  agency?: string; // 소속사
  debutYear?: number;
}

export interface CelebritySajuData {
  basicSaju: {
    yearPillar: string;
    monthPillar: string;
    dayPillar: string;
    hourPillar?: string;
  };
  starQuality: string[]; // 스타성 분석
  loveStyle: string[]; // 연애 스타일
  careerFortune: string[]; // 커리어 운세
  compatibility: string[]; // 궁합 분석
  scandalPotential: string[]; // 스캔들 가능성 (자극적)
  futurePredict: string[]; // 미래 예측
  fanService: string[]; // 팬서비스 관련
  personalitySecrets: string[]; // 숨겨진 성격
}

// 연예인 전용 사주 계산
export const calculateCelebritySaju = (
  info: CelebrityInfo
): CelebritySajuData => {
  const { year, month, day, hour = 12, gender, profession } = info;

  // 기본 사주 계산 (간단화)
  const stems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const branches = [
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

  const yearStem = stems[(year - 4) % 10];
  const yearBranch = branches[(year - 4) % 12];
  const monthStem = stems[(month - 1) % 10];
  const monthBranch = branches[(month - 1) % 12];
  const dayStem = stems[(day - 1) % 10];
  const dayBranch = branches[(day - 1) % 12];
  const hourStem = stems[Math.floor(hour / 2) % 10];
  const hourBranch = branches[Math.floor(hour / 2) % 12];

  return {
    basicSaju: {
      yearPillar: `${yearStem}${yearBranch}`,
      monthPillar: `${monthStem}${monthBranch}`,
      dayPillar: `${dayStem}${dayBranch}`,
      hourPillar: `${hourStem}${hourBranch}`,
    },
    starQuality: generateStarQuality(dayStem, profession),
    loveStyle: generateLoveStyle(dayStem, gender),
    careerFortune: generateCareerFortune(yearStem, monthStem, profession),
    compatibility: generateCompatibility(dayStem, gender),
    scandalPotential: generateScandalPotential(dayStem, monthStem),
    futurePredict: generateFuturePredict(yearStem, dayStem, year),
    fanService: generateFanService(dayStem, profession),
    personalitySecrets: generatePersonalitySecrets(dayStem, monthStem),
  };
};

// 스타성 분석
const generateStarQuality = (dayStem: string, profession: string): string[] => {
  const starQualities: Record<string, string[]> = {
    갑: [
      "🌟 타고난 리더십으로 무대를 장악하는 카리스마",
      "💫 강렬한 존재감으로 한 번 보면 잊을 수 없는 매력",
      "🔥 직진하는 성격으로 팬들에게 진정성 있게 다가감",
      "⭐ 고집스러운 면이 있지만 그것이 오히려 독특한 개성이 됨",
    ],
    을: [
      "🌸 섬세하고 우아한 매력으로 팬들의 마음을 사로잡음",
      "💖 배려심 넘치는 성격으로 동료들에게 인기가 많음",
      "🎭 뛰어난 적응력으로 다양한 컨셉을 완벽하게 소화",
      "🌙 때로는 우유부단해 보이지만 그것이 신비로운 매력",
    ],
    병: [
      "☀️ 밝고 에너지 넘치는 성격으로 분위기 메이커 역할",
      "🎉 사교성이 뛰어나 예능에서 큰 활약을 보일 것",
      "🔥 열정적이고 적극적인 모습으로 팬들에게 희망을 줌",
      "⚡ 가끔 성급한 면이 있지만 그 솔직함이 매력 포인트",
    ],
    정: [
      "🕯️ 온화하고 따뜻한 성격으로 힐링 아이콘이 될 운명",
      "💝 예의바르고 정중한 모습으로 어른들에게도 사랑받음",
      "🎨 세심하고 꼼꼼한 성격으로 완벽한 퍼포먼스를 선보임",
      "🌺 소심해 보이지만 내면의 강인함을 가진 반전 매력",
    ],
    무: [
      "🏔️ 믿음직스럽고 든든한 이미지로 팬들에게 안정감을 줌",
      "💪 강한 책임감으로 그룹의 든든한 버팀목 역할",
      "🎯 현실적이고 실용적인 사고로 사업 감각도 뛰어날 것",
      "🗿 변화를 싫어하는 면이 있지만 그 일관성이 신뢰를 줌",
    ],
    기: [
      "🤗 부드럽고 포용력 있는 성격으로 팬들의 엄마같은 존재",
      "🕊️ 화합을 중시하는 성격으로 그룹 내 분위기 조율사",
      "🌿 인내심이 강해 어려운 시기도 잘 버텨낼 것",
      "💭 결단력이 부족해 보이지만 신중함이 장점",
    ],
    경: [
      "⚔️ 강한 의지력과 결단력으로 어떤 역경도 극복",
      "🏆 정의감이 강해 사회적 이슈에 목소리를 낼 가능성",
      "💎 원칙을 중시하는 성격으로 팬들에게 존경받을 것",
      "🔒 융통성이 부족해 보이지만 그 진정성이 매력",
    ],
    신: [
      "✨ 깔끔하고 완벽주의 성향으로 무대 매너가 완벽",
      "🔍 뛰어난 분석력으로 자신만의 독특한 스타일 창조",
      "💫 세련된 감각으로 패션 아이콘이 될 가능성",
      "🎭 비판적인 면이 있지만 그 날카로움이 개성",
    ],
    임: [
      "🌊 지혜롭고 통찰력 있는 모습으로 팬들의 멘토 역할",
      "🤲 포용력이 커서 후배들에게도 좋은 선배가 될 것",
      "🌀 뛰어난 적응력으로 다양한 분야에서 성공 가능",
      "💫 우유부단해 보이지만 그 신중함이 매력 포인트",
    ],
    계: [
      "💧 순수하고 깨끗한 이미지로 청순 콘셉트의 완성",
      "🎨 풍부한 감수성으로 예술적 재능이 뛰어남",
      "🌟 창의력이 뛰어나 새로운 트렌드를 만들어갈 것",
      "🎭 감정 기복이 있지만 그것이 오히려 인간적 매력",
    ],
  };

  return starQualities[dayStem] || ["독특한 개성을 가진 매력적인 스타"];
};

// 연애 스타일 (자극적)
const generateLoveStyle = (dayStem: string, gender: "M" | "F"): string[] => {
  const loveStyles: Record<string, string[]> = {
    갑: [
      "💘 연애할 때 주도권을 잡는 스타일, 상대방을 리드하는 것을 좋아함",
      "🔥 직진형 고백으로 상대방을 당황시킬 수 있음",
      "👑 연인에게 독점욕이 강하고 질투심도 많은 편",
      "💯 한 번 사랑하면 끝까지 책임지려는 의리 있는 스타일",
      "⚡ 밀당보다는 솔직한 감정 표현을 선호함",
    ],
    을: [
      "🌸 상대방에게 맞춰주는 스타일, 배려심이 넘침",
      "💕 로맨틱한 분위기를 좋아하고 기념일을 중요시함",
      "🎭 상대방의 기분에 민감하게 반응하는 편",
      "💫 우유부단해서 연애 결정을 내리기 어려워함",
      "🌙 은근한 스킨십을 좋아하고 애정표현이 섬세함",
    ],
    병: [
      "☀️ 밝고 활발한 연애 스타일, 함께 있으면 즐거움",
      "🎉 데이트 코스를 다양하게 계획하는 것을 좋아함",
      "💃 몸짓으로 애정을 표현하는 것을 좋아함",
      "🔥 열정적이지만 가끔 성급하게 관계를 진전시키려 함",
      "🎪 연인과 함께 모험적인 일을 즐기는 스타일",
    ],
    정: [
      "🕯️ 조용하고 깊이 있는 연애를 추구함",
      "💝 상대방을 세심하게 챙기고 배려하는 스타일",
      "📚 지적인 대화를 나누는 것을 좋아함",
      "🌺 수줍음이 많아 적극적인 어프로치가 어려움",
      "💌 편지나 메시지로 마음을 전하는 것을 선호함",
    ],
    무: [
      "🏔️ 안정적이고 든든한 연애 스타일",
      "💪 연인을 보호하려는 의지가 강함",
      "🎯 현실적인 미래를 함께 계획하는 것을 좋아함",
      "🗿 변화를 싫어해서 루틴한 데이트를 선호함",
      "💰 경제적 안정을 중요시하는 편",
    ],
    기: [
      "🤗 포근하고 따뜻한 연애 스타일",
      "🍯 상대방을 달래고 위로하는 것을 잘함",
      "🌿 오래 사귀면서 천천히 관계를 발전시키는 스타일",
      "💭 갈등을 피하려고 하지만 때로는 소통 부족 야기",
      "🏠 집에서 함께 시간 보내는 것을 좋아함",
    ],
    경: [
      "⚔️ 강렬하고 직선적인 연애 스타일",
      "🏆 연인에 대한 자부심이 강하고 과시욕이 있음",
      "💎 원칙을 중시해서 바람피우는 것을 절대 용납 안 함",
      "🔒 한 번 마음을 주면 변하지 않는 일편단심",
      "⚡ 감정 표현이 서툴러서 오해를 받을 수 있음",
    ],
    신: [
      "✨ 완벽한 연애를 추구하는 스타일",
      "🔍 상대방의 작은 것까지 신경 쓰고 분석함",
      "💫 깔끔하고 세련된 데이트를 선호함",
      "🎭 상대방의 단점을 지적하는 경우가 있음",
      "💎 품격 있는 연애를 중요시함",
    ],
    임: [
      "🌊 깊이 있고 철학적인 연애관을 가짐",
      "🤲 상대방을 있는 그대로 받아들이는 포용력",
      "🌀 상황에 따라 연애 스타일이 변하는 편",
      "💫 감정의 깊이가 있어서 진짜 사랑을 할 때 강렬함",
      "🌙 신비로운 매력으로 상대방을 끌어들임",
    ],
    계: [
      "💧 순수하고 맑은 연애를 추구함",
      "🎨 감성적이고 로맨틱한 것을 좋아함",
      "🌟 상대방에게 영감을 주는 뮤즈 같은 존재",
      "🎭 감정 기복이 있어서 때로는 예측하기 어려움",
      "💕 첫사랑 같은 설렘을 계속 유지하려 함",
    ],
  };

  return loveStyles[dayStem] || ["독특한 연애 스타일을 가진 분"];
};

// 스캔들 가능성 (자극적 내용)
const generateScandalPotential = (
  dayStem: string,
  monthStem: string
): string[] => {
  const scandalTypes = [
    "💘 연애 스캔들: 열애설이 불거질 가능성이 높은 시기가 있을 것",
    "🎭 이미지 반전: 평소 이미지와 다른 모습이 포착될 수 있음",
    "💬 말실수 주의: SNS나 방송에서의 발언이 논란이 될 수 있음",
    "🤝 인간관계 갈등: 동료나 스태프와의 갈등이 표면화될 가능성",
    "💰 금전 관련: 계약이나 수익 배분 문제로 이슈가 생길 수 있음",
    "📱 사생활 노출: 개인적인 일상이 의도치 않게 공개될 위험",
    "🎪 과도한 스킨십: 팬서비스 중 선을 넘는 행동으로 논란 가능",
    "🍺 사생활 방종: 음주나 파티 장면이 포착될 수 있음",
  ];

  // 사주에 따른 스캔들 성향 분석
  const riskLevel = (dayStem.charCodeAt(0) + monthStem.charCodeAt(0)) % 3;
  const selectedScandals = [];

  for (let i = 0; i < 3 + riskLevel; i++) {
    const index = (dayStem.charCodeAt(0) + i) % scandalTypes.length;
    if (!selectedScandals.includes(scandalTypes[index])) {
      selectedScandals.push(scandalTypes[index]);
    }
  }

  return selectedScandals;
};

// 미래 예측 (팬들이 궁금해할 내용)
const generateFuturePredict = (
  yearStem: string,
  dayStem: string,
  birthYear: number
): string[] => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  const predictions = [
    `📈 ${currentYear + 1}년: 새로운 프로젝트로 큰 화제를 모을 것`,
    `🏆 ${currentYear + 2}년: 연기/가창력 등 실력이 크게 인정받는 해`,
    `💕 ${currentYear + 3}년: 연애운이 절정에 달하는 시기, 열애설 주의`,
    `🌟 ${age + 5}세: 인생의 터닝포인트가 되는 중요한 선택의 시기`,
    `💰 ${age + 7}세: 경제적으로 큰 성공을 거두는 해`,
    `🎭 ${age + 10}세: 새로운 분야에 도전하여 제2의 전성기 맞이`,
    `👑 30대 중반: 진정한 톱스타로 자리매김하는 시기`,
    `🏠 30대 후반: 결혼과 가정에 대해 진지하게 고민하는 때`,
  ];

  return predictions.slice(0, 5);
};

// 팬서비스 스타일
const generateFanService = (dayStem: string, profession: string): string[] => {
  const fanServices: Record<string, string[]> = {
    갑: [
      "🎤 당당하고 카리스마 넘치는 무대 매너로 팬들을 압도",
      "👑 리더십을 발휘해서 팬미팅에서 분위기를 주도함",
      "💪 팬들에게 힘이 되는 메시지를 자주 전달",
      "🔥 직진하는 성격으로 팬들의 요청에 솔직하게 반응",
    ],
    을: [
      "🌸 섬세하고 우아한 팬서비스로 팬들의 마음을 녹임",
      "💕 팬들 한 명 한 명에게 세심한 관심을 보임",
      "🎭 팬들의 기분에 맞춰서 다양한 모습을 보여줌",
      "🌙 은근한 애교와 스킨십으로 팬들을 설레게 함",
    ],
    병: [
      "☀️ 밝고 에너지 넘치는 모습으로 팬들에게 활력을 줌",
      "🎉 예능감 넘치는 팬서비스로 웃음을 선사",
      "💃 몸짓과 표정으로 풍부한 팬서비스 제공",
      "🎪 팬들과 함께 즐기는 인터랙티브한 소통",
    ],
    정: [
      "🕯️ 차분하고 따뜻한 팬서비스로 힐링을 제공",
      "💝 정중하고 예의바른 모습으로 팬들에게 감동을 줌",
      "📚 지적이고 깊이 있는 대화로 팬들과 소통",
      "🌺 수줍지만 진심이 담긴 팬서비스",
    ],
    무: [
      "🏔️ 든든하고 믿음직한 모습으로 팬들에게 안정감을 줌",
      "💪 팬들을 보호하려는 마음이 팬서비스에서도 드러남",
      "🎯 현실적이고 실용적인 조언을 팬들에게 제공",
      "🗿 일관된 모습으로 팬들에게 신뢰를 줌",
    ],
  };

  return fanServices[dayStem] || ["독특한 매력의 팬서비스"];
};

// 숨겨진 성격
const generatePersonalitySecrets = (
  dayStem: string,
  monthStem: string
): string[] => {
  const secrets = [
    "🎭 평소 이미지와 달리 의외로 내성적인 면이 있음",
    "🍫 달콤한 것을 좋아하는 숨겨진 취향",
    "🎮 게임이나 애니메이션을 좋아하는 덕후 기질",
    "😴 잠이 많아서 스케줄 사이사이 쪽잠을 자는 편",
    "🐱 동물을 무척 좋아하고 반려동물에 대한 애정이 깊음",
    "📚 의외로 독서를 좋아하고 지적 호기심이 많음",
    "🏃‍♀️ 운동을 좋아하지만 사람들 앞에서는 잘 드러내지 않음",
    "🎨 예술적 감각이 뛰어나고 창작 활동을 즐김",
    "🍜 의외로 소식가이거나 특별한 식성을 가지고 있음",
    "🌙 밤에 더 활발해지는 올빼미 타입",
  ];

  const selectedSecrets = [];
  for (let i = 0; i < 4; i++) {
    const index =
      (dayStem.charCodeAt(0) + monthStem.charCodeAt(0) + i) % secrets.length;
    if (!selectedSecrets.includes(secrets[index])) {
      selectedSecrets.push(secrets[index]);
    }
  }

  return selectedSecrets;
};

// 커리어 운세
const generateCareerFortune = (
  yearStem: string,
  monthStem: string,
  profession: string
): string[] => {
  const careerFortunes = [
    "🚀 새로운 장르나 분야에 도전할 기회가 생길 것",
    "🏆 실력을 인정받아 큰 상을 받을 가능성이 높음",
    "💫 해외 진출의 기회가 찾아올 것",
    "🎬 대형 프로젝트의 주역으로 발탁될 운",
    "📺 예능 프로그램에서 새로운 매력을 보여줄 것",
    "🎵 OST나 콜라보레이션으로 음악적 재능을 발휘",
    "👥 후배들의 롤모델이 되는 선배로 성장",
    "💼 연예계 외의 사업 분야에서도 성공할 가능성",
  ];

  return careerFortunes.slice(0, 4);
};

// 궁합 분석 (다른 연예인들과)
const generateCompatibility = (
  dayStem: string,
  gender: "M" | "F"
): string[] => {
  const compatibilities = [
    "💕 같은 그룹 멤버 중에서 특별한 케미를 보일 상대가 있음",
    "🎭 연기 파트너와 실제로도 좋은 관계를 유지할 것",
    "🎵 음악 작업을 함께 하는 아티스트와 좋은 시너지",
    "📺 예능에서 만난 연예인과 의외의 친분을 쌓을 것",
    "🌟 선배 연예인으로부터 큰 도움과 조언을 받을 것",
    "👫 동갑내기 연예인들과 끈끈한 우정을 쌓을 것",
    "💼 같은 소속사 아티스트들과 가족 같은 관계 형성",
    "🎪 서바이벌 프로그램에서 만난 인연이 계속 이어질 것",
  ];

  return compatibilities.slice(0, 3);
};

// 연예인 사주 해석 텍스트 생성 (매우 길고 자극적)
export const generateCelebritySajuInterpretation = (
  info: CelebrityInfo,
  sajuData: CelebritySajuData
): string => {
  const { name, year, gender, profession, group, agency, debutYear } = info;
  const {
    basicSaju,
    starQuality,
    loveStyle,
    careerFortune,
    compatibility,
    scandalPotential,
    futurePredict,
    fanService,
    personalitySecrets,
  } = sajuData;

  const genderText = gender === "M" ? "남성" : "여성";
  const groupText = group ? ` (${group})` : "";
  const agencyText = agency ? ` | ${agency} 소속` : "";
  const debutText = debutYear ? ` | ${debutYear}년 데뷔` : "";

  return `# 🔮✨ ${name}${groupText}의 완전 분석 사주 해석 ✨🔮

> 🎭 **${profession}** ${agencyText}${debutText}  
> 📅 **생년월일**: ${year}년 출생 ${genderText}  
> 🌟 **사주**: ${basicSaju.yearPillar} ${basicSaju.monthPillar} ${basicSaju.dayPillar} ${basicSaju.hourPillar || "??"}

---

## 🌟 타고난 스타성 분석

${name}님은 정말 특별한 사주를 가지고 계시네요! 😍

${starQuality.map((quality) => `### ${quality}\n`).join("\n")}

**💫 종합 분석**: ${name}님의 사주를 보면 정말 연예계에서 성공할 수밖에 없는 운명이에요! 특히 ${basicSaju.dayPillar} 일주는 ${profession} 분야에서 독특한 매력을 발산하는 사주입니다. 팬들이 ${name}님에게 빠져드는 이유가 사주에 다 나와 있어요! 🤩

---

## 💘 연애 스타일 대공개 (팬들 주목! 🔥)

팬분들이 가장 궁금해하는 ${name}님의 연애 스타일을 사주로 파헤쳐봤어요! 😱💕

${loveStyle.map((style, index) => `### ${index + 1}. ${style}\n`).join("\n")}

**🔥 특별 분석**: ${name}님은 연애할 때 정말 매력적일 것 같아요! 사주를 보면 ${gender === "M" ? "여자분들이" : "남자분들이"} ${name}님의 이런 모습에 완전히 빠질 수밖에 없을 것 같은데요? 😍 팬분들은 어떻게 생각하시나요? ㅎㅎ

**💌 이상형 힌트**: ${basicSaju.dayPillar} 사주를 가진 분들은 보통 ${gender === "M" ? "차분하고 지적인 여성" : "든든하고 리더십 있는 남성"}을 좋아하는 경향이 있어요! 혹시 ${name}님의 이상형과 비슷한가요? 🤔

---

## 🎭 숨겨진 성격 대폭로! (충격 주의 😱)

무대 위의 ${name}님과 실제 ${name}님은 어떻게 다를까요? 사주가 알려주는 숨겨진 모습들을 공개합니다! 

${personalitySecrets.map((secret, index) => `### 🔍 비밀 ${index + 1}: ${secret}\n`).join("\n")}

**😮 반전 매력**: 와... 이런 모습의 ${name}님도 있다니! 팬분들은 이미 알고 계셨나요? 사주를 보면 ${name}님은 평소 보여주시는 이미지 외에도 정말 다양한 매력을 가지고 계신 것 같아요! 이런 반전 매력이 있으니까 더 빠져들 수밖에 없는 거 아닌가요? 💕

---

## 🚨 스캔들 가능성 분석 (관심 집중! 👀)

${name}님의 사주를 보면서 앞으로 어떤 이슈들이 있을 수 있는지 분석해봤어요. 팬분들은 미리 마음의 준비를 하세요! 😅

${scandalPotential.map((scandal, index) => `### ⚠️ 주의사항 ${index + 1}: ${scandal}\n`).join("\n")}

**🛡️ 팬들의 역할**: 하지만 걱정하지 마세요! ${name}님의 사주를 보면 팬분들의 사랑과 응원이 있으면 어떤 어려움도 잘 극복하실 수 있어요! 우리가 ${name}님을 더 많이 사랑하고 응원해주면 됩니다! 💪❤️

**🔒 조언**: 특히 SNS 사용이나 사생활 관리에 더 신경 쓰시면 좋을 것 같아요. ${name}님의 순수한 이미지를 지키기 위해서요! 😊

---

## 🎪 팬서비스 스타일 분석

${name}님이 팬분들을 대하는 방식도 사주에 나와 있어요! 

${fanService.map((service, index) => `### 💕 팬서비스 ${index + 1}: ${service}\n`).join("\n")}

**🥰 팬들과의 특별한 관계**: ${name}님의 사주를 보면 정말 팬분들을 진심으로 아끼고 사랑하는 마음이 느껴져요! 이런 진정성 있는 모습 때문에 팬분들이 더욱 ${name}님을 사랑하는 것 같아요! 💖

---

## 🔮 미래 운세 예측 (대박 예고! 🎉)

${name}님의 앞으로의 운세를 사주로 예측해봤어요! 팬분들 기대해도 좋을 것 같아요! 😍

${futurePredict.map((predict, index) => `### 🌟 예측 ${index + 1}: ${predict}\n`).join("\n")}

**🚀 특별 예언**: 사주를 종합해보면 ${name}님은 앞으로 3-5년 내에 정말 큰 성공을 거두실 것 같아요! 지금도 충분히 인기가 많지만, 진짜 전성기는 아직 오지 않았다는 뜻이에요! 팬분들은 더 큰 기대를 해도 좋을 것 같습니다! 🎊

**💎 조언**: 다만 성공할수록 더 겸손한 마음을 잃지 않는 것이 중요해요. ${name}님의 사주를 보면 겸손함을 유지할 때 더 큰 복이 따라올 것 같아요!

---

## 🏆 커리어 운세 (대박 행보 예상! 📈)

${name}님의 ${profession} 활동 관련 운세도 정말 좋아요!

${careerFortune.map((fortune, index) => `### 🎯 커리어 운세 ${index + 1}: ${fortune}\n`).join("\n")}

**🌟 특별 분석**: ${name}님의 사주를 보면 ${profession} 분야에서 정말 큰 성과를 거두실 운명이에요! 특히 ${basicSaju.monthPillar} 월주가 예술적 재능을 나타내는 좋은 사주라서, 앞으로 더 다양한 분야에서 활약하실 것 같아요!

---

## 💕 연예계 궁합 분석 (누구와 케미가 좋을까? 🤔)

${name}님과 잘 맞는 연예인들의 특징을 사주로 분석해봤어요!

${compatibility.map((compat, index) => `### 🤝 궁합 분석 ${index + 1}: ${compat}\n`).join("\n")}

**👫 특별 궁합**: ${name}님의 ${basicSaju.dayPillar} 일주와 가장 잘 맞는 사주는... (궁금하시죠? ㅎㅎ) 이건 다음 포스트에서 더 자세히 다뤄볼게요! 😉

---

## 🎊 총평 및 응원 메시지

${name}님의 사주를 종합적으로 분석해본 결과... **정말 대박 사주**예요! 😍✨

### 🌟 ${name}님의 최고 장점들:
- 타고난 스타성과 카리스마 💫
- 팬들을 진심으로 사랑하는 마음 ❤️
- 끊임없이 발전하려는 의지 🚀
- 어려움을 극복하는 강인함 💪

### 💖 팬분들에게 하고 싶은 말:
${name}님의 사주를 보면서 정말 감동받았어요. 이렇게 좋은 사주를 가진 분이 우리 곁에 있다는 게 얼마나 행운인지 몰라요! 앞으로도 ${name}님을 많이 사랑하고 응원해주세요! 

### 🔮 마지막 예언:
${name}님은 분명히 더 큰 스타가 되실 거예요! 지금 이 순간을 놓치지 마시고, ${name}님의 성장하는 모습을 지켜봐 주세요! 몇 년 후에는 "내가 ${name}님을 처음부터 응원했어!"라고 자랑할 수 있을 거예요! 😊

---

> 💫 **사주 해석 주의사항**  
> 사주는 참고용이며, 실제 미래는 본인의 노력과 의지에 따라 달라질 수 있습니다.  
> ${name}님의 밝은 미래를 위해 항상 응원하겠습니다! 💕
> 
> 📅 **작성일**: ${new Date().toLocaleDateString()}  
> 🏷️ **태그**: #${name} #사주 #연예인사주 #${profession} #운세 #팬덤 ${group ? `#${group}` : ""} ${agency ? `#${agency}` : ""}

---

**🔥 이 포스트가 도움이 되셨다면 좋아요와 공유 부탁드려요!**  
**💬 댓글로 다음에 분석해줬으면 하는 연예인도 알려주세요!**  
**🔔 팔로우하시면 더 많은 연예인 사주 분석을 받아보실 수 있어요!**`;
};

// 랜덤 연예인 정보 생성 (테스트용)
export const generateRandomCelebrity = (): CelebrityInfo => {
  const names = [
    "김민준",
    "이서연",
    "박지훈",
    "최유나",
    "정하늘",
    "강소희",
    "윤도현",
    "임채영",
  ];
  const professions = ["가수", "배우", "아이돌", "래퍼", "댄서"];
  const agencies = [
    "SM엔터테인먼트",
    "YG엔터테인먼트",
    "JYP엔터테인먼트",
    "HYBE",
    "스타쉽엔터테인먼트",
  ];

  return {
    name: names[Math.floor(Math.random() * names.length)],
    year: 1995 + Math.floor(Math.random() * 10),
    month: 1 + Math.floor(Math.random() * 12),
    day: 1 + Math.floor(Math.random() * 28),
    hour: Math.floor(Math.random() * 24),
    gender: Math.random() > 0.5 ? "M" : "F",
    profession: professions[Math.floor(Math.random() * professions.length)],
    agency: agencies[Math.floor(Math.random() * agencies.length)],
    debutYear: 2015 + Math.floor(Math.random() * 8),
  };
};
