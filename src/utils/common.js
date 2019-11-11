export function randInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function mobileWidth(defaultWidth = 768) {
  return window.innerWidth < defaultWidth;
}

export function screenHeightRatio(defaultHeight = 947) {
  return window.innerHeight / parseFloat(defaultHeight);
}

export async function randActions(floor = 0.6) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ ratio: Math.random() * (1.0 - floor) + floor }]);
    }, 0);
  });
}
