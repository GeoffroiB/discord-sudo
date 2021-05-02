import random from "../random";

export const up = [
  "̍",
  "̎",
  "̄",
  "̅",
  "̿",
  "̑",
  "̆",
  "̐",
  "͒",
  "͗",
  "͑",
  "̇",
  "̈",
  "̊",
  "͂",
  "̓",
  "̈́",
  "͊",
  "͋",
  "͌",
  "̃",
  "̂",
  "̌",
  "͐",
  "̀",
  "́",
  "̋",
  "̏",
  "̒",
  "̓",
  "̔",
  "̽",
  "̉",
  "ͣ",
  "ͤ",
  "ͥ",
  "ͦ",
  "ͧ",
  "ͨ",
  "ͩ",
  "ͪ",
  "ͫ",
  "ͬ",
  "ͭ",
  "ͮ",
  "ͯ",
  "̾",
  "͛",
  "͆",
  "̚",
];

export const middle = [
  "̕",
  "̛",
  "̀",
  "́",
  "͘",
  "̡",
  "̢",
  "̧",
  "̨",
  "̴",
  "̵",
  "̶",
  "͏",
  "͜",
  "͝",
  "͞",
  "͟",
  "͠",
  "͢",
  "̸",
  "̷",
  "͡",
  "҉",
];

export const down = [
  "̖",
  "̗",
  "̘",
  "̙",
  "̜",
  "̝",
  "̞",
  "̟",
  "̠",
  "̤",
  "̥",
  "̦",
  "̩",
  "̪",
  "̫",
  "̬",
  "̭",
  "̮",
  "̯",
  "̰",
  "̱",
  "̲",
  "̳",
  "̹",
  "̺",
  "̻",
  "̼",
  "ͅ",
  "͇",
  "͈",
  "͉",
  "͍",
  "͎",
  "͓",
  "͔",
  "͕",
  "͖",
  "͙",
  "͚",
  "̣",
];

export const all = [...up, ...middle, ...down];
export const pattern = RegExp("(" + all.join("|") + ")", "g");

export const randChar = (type: "all" | "up" | "middle" | "down") => {
  switch (type) {
    case "all":
      return random.pick(all);
    case "up":
      return random.pick(up);
    case "middle":
      return random.pick(middle);
    case "down":
      return random.pick(down);
  }
};
