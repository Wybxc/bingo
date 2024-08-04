const freqency: [string, number][] = [
  ["经常", 2],
  ["曾经", 2],
  ["很少", 2],
  ["从不", 2],
  ["喜欢", 1],
  ["讨厌", 1],
];

const how: [string, number][] = [
  ["在家里", 2],
  ["在公司", 2],
  ["在学校", 2],
  ["在公共场所", 1],
  ["在外地", 1],
  ["在国外", 1],
  ["放学后", 1],
  ["暑假里", 1],
  ["在情人节", 1],
  ["偷偷", 1],
  ["", 5],
];

const partner: [string, number][] = [
  ["一个人", 2],
  ["和朋友", 2],
  ["和同事", 1],
  ["和同学", 1],
  ["和家人", 1],
  ["", 5],
];

const action: [string, number][] = [
  ["赶DDL", 1],
  ["学数学", 1],
  ["吃东西", 1],
  ["睡觉", 1],
  ["玩游戏", 1],
  ["听术力口", 1],
  ["追新番", 1],
  ["读书", 1],
  ["看电影", 1],
  ["上台表演", 1],
  ["拍视频", 1],
  ["写代码", 1],
  ["写作业", 1],
  ["写论文", 1],
  ["写日记", 1],
  ["诅咒世界", 1],
  ["自习", 1],
  ["旅游", 1],
  ["跳舞", 1],
  ["游泳", 1],
  ["健身", 1],
  ["露营", 1],
  ["唱歌", 1],
  ["自拍", 1],
  ["开窗", 1],
  ["吃辣", 1],
  ["组乐队", 1],
  ["听摇滚", 1],
  ["翘课", 1],
  ["说相声", 1],
  ["远足", 1],
  ["做实验", 1],
  ["开会", 1],
  ["去演唱会", 1],
  ["学习摄影", 1],
  ["喝酒", 1],
  ["作诗", 1],
  ["直播", 1],
  ["喝奶茶", 1],
  ["发空间", 1],
  ["熬夜", 1],
  ["晒太阳", 1],
  ["发呆", 1],
  ["独来独往", 1],
  ["打麻将", 1],
  ["玩桌游", 1],
  ["磕CP", 1],
  ["摸鱼", 1],
];

const have: [string, number][] = [
  ["有", 2],
  ["有很多", 1],
  ["有一个", 1],
  ["没有", 2],
];

const feature: [string, number][] = [
  ["可爱的", 1],
  ["珍贵的", 1],
  ["有趣的", 1],
  ["品味独特的", 1],
  ["令人自豪的", 1],
  ["不愿提起的", 1],
  ["沾沾自喜的", 1],
  ["奇怪的", 1],
  ["不愿放手的", 1],
  ["抽象的", 1],
  ["", 2],
];

const object: [string, number][] = [
  ["对象", 1],
  ["恋人", 1],
  ["同事", 1],
  ["朋友", 1],
  ["家人", 1],
  ["同学", 1],
  ["哥哥", 1],
  ["姐姐", 1],
  ["妹妹", 1],
  ["弟弟", 1],
  ["知心朋友", 1],
  ["秘密基地", 1],
  ["秘密", 1],
  ["单推偶像", 1],
  ["玩具", 1],
  ["宠物", 1],
  ["笔记本", 1],
  ["毕业证书", 1],
  ["二次元周边", 1],
  ["小号", 1],
];

function sample(from: [string, number][]): string {
  const sum = from.reduce((a, b) => a + b[1], 0);

  let random = Math.random() * sum;
  for (const [item, weight] of from) {
    if (random < weight) {
      return item;
    }
    random -= weight;
  }

  return "";
}

function randomBingo(): [string, string] {
  const actionOrObject = action.length / (action.length + object.length);
  if (Math.random() < actionOrObject) {
    const freqcencyPart = sample(freqency);
    const howPart = sample(how);
    const partnerPart = sample(partner);
    const actionPart = sample(action);
    return [
      `${freqcencyPart}${howPart}${partnerPart}${actionPart}`,
      actionPart,
    ];
  }
  const havePart = sample(have);
  const featurePart = sample(feature);
  const objectPart = sample(object);
  return [`${havePart}${featurePart}${objectPart}`, objectPart];
}

export function randomBingos(count: number): string[] {
  const generated = new Set<string>();
  const result = [];

  while (generated.size < count) {
    const [bingo, subject] = randomBingo();
    if (!generated.has(subject)) {
      generated.add(subject);
      result.push(bingo);
    }
  }

  return result;
}
