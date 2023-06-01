

const getRandomChineseCharacters = () => {
  const characters = []
  const base = 0x4e00 // 汉字编码的起始位置
  const range = 0x9fa5 - base + 1 // 汉字编码的范围

  for (let i = 0; i < 1000; i++) {
    const code = base + Math.floor(Math.random() * range)
    characters.push(String.fromCharCode(code))
  }

  return characters
}

const getRandomEnglishCharacters = () => {
  let characters = 'abcdefghijklmnopqrstuvwxyz';
  let res = [];

  for (let i = 0; i < 1000; i++) {
    res.push(characters[Math.floor(Math.random() * 26)] as string)
  }
  return res;
};

export default {
  english: getRandomEnglishCharacters(),
  chinese: getRandomChineseCharacters(),
};