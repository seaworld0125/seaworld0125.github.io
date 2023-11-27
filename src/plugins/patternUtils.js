export const fileNamePatternList = [
  ".gitignore",
  ".png",
  ".jpg",
]
export const hasInvalidPatterns = (target) => {
  for (let pattern of fileNamePatternList) {
    if(target.includes(pattern)) {
      return true;
    }
  }
  return false;
}