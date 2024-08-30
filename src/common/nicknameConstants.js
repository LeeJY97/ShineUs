const nickname = {
  "determiners": [
    "예쁜",
    "화난",
    "귀여운",
    "배고픈",
    "철학적인",
    "현학적인",
    "슬픈",
    "푸른",
    "비싼",
    "밝은"
  ],
  "animals": [
    "호랑이",
    "비버",
    "강아지",
    "부엉이",
    "여우",
    "치타",
    "문어",
    "고양이",
    "미어캣",
    "다람쥐"
  ]
}

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 랜덤 닉네임 생성 함수
const generateRandomNickname = () => {
  const randomDeterminer = getRandomElement(nickname.determiners);
  const randomAnimal = getRandomElement(nickname.animals);
  return `${randomDeterminer}${randomAnimal}`;
};

export default generateRandomNickname;