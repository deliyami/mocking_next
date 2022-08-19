import axios from "@src/helper/defaultAxios";
import Char from "@src/type/char";

const bubbleSort = (chars: Char[]) => {
  for (let i = 0; i < chars.length; i++) {
    let swap;
    for (let j = 0; j < chars.length - 1 - i; j++) {
      if (
        chars[j].like - chars[j].hate < chars[j + 1].like - chars[j + 1].hate ||
        (chars[j].like - chars[j].hate ===
          chars[j + 1].like - chars[j + 1].hate &&
          (chars[j].like < chars[j + 1].like || chars[j].id > chars[j + 1].id))
      ) {
        swap = chars[j];
        chars[j] = chars[j + 1];
        chars[j + 1] = swap;
      }
    }
    if (!swap) {
      break;
    }
  }
  return chars;
};

export const getCharacter = async (params: {}) => {
  const result = await axios("character", "get", {}, params);
  if (result && result.data) {
    const sortData = bubbleSort(result.data);
    return sortData;
  }
};
