class Batiments {
  constructor(batiments) {
    this.batiments = batiments;
  }

  bruteForceSolution() {
    let result = 0;
    this.batiments.forEach((current, index) => {
      let maxLeft = 0,
        maxRight = 0;
      for (let j = index; j >= 0; j--)
        maxLeft = Math.max(maxLeft, this.batiments[j]);
      for (let j = index; j < this.batiments.length; j++)
        maxRight = Math.max(maxRight, this.batiments[j]);
      result += Math.min(maxLeft, maxRight) - current;
    });
    return result;
  }

  optimalSolution() {
    let maxLeftEachElement = [];
    let maxRighEachElements = [];
    maxLeftEachElement[0] = this.batiments[0];
    maxRighEachElements[this.batiments.length - 1] =
      this.batiments[this.batiments.length - 1];
    for (
      let i = 1, j = this.batiments.length - 2;
      i < this.batiments.length, j >= 0;
      i++, j--
    ) {
      maxLeftEachElement[i] = Math.max(
        this.batiments[i],
        maxLeftEachElement[i - 1]
      );
      maxRighEachElements[j] = Math.max(
        this.batiments[j],
        maxRighEachElements[j + 1]
      );
    }

    return maxLeftEachElement.reduce(
      (prev, curr, index) =>
        prev +
        Math.min(curr, maxRighEachElements[index]) -
        this.batiments[index],
      0
    );
  }

  trappedWater() {
    if (this.batiments.length <= 2) return 0;
    return this.optimalSolution();
  }
}

module.exports = Batiments;
