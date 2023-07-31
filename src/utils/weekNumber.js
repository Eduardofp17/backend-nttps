class Semanas {
  static getWeekNumOfDate(d) {
    const onejan = new Date(d.getFullYear(), 0, 1);
    const daysInYear = Math.floor((d - onejan) / (24 * 60 * 60 * 1000));
    const weekNum = Math.ceil((daysInYear + onejan.getDay() + 1) / 7);
    return weekNum;
  }

  static isOdd(number) {
    return number % 2 !== 0;
  }

  static pegarDataAtual() {
    const today = new Date('2023-08-28');
    const weekNumOfDate = this.getWeekNumOfDate(today);
    const semana = this.isOdd(weekNumOfDate) ? 1 : 0;
    return semana;
  }
}

module.exports = Semanas;
