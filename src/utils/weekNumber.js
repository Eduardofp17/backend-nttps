class Semanas {
  static getWeekNumOfMonthOfDate(d) {
    const onejan = new Date(d.getFullYear(), 0, 1);
    const year = d.getFullYear();
    const week = Math.ceil(
      (((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7,
    );
    if (week === 22) {
      return week;
    }
    return week + 1;
  }

  static pegarDataAtual() {
    const today = new Date();
    const yy = today.getFullYear();
    const mm = today.getMonth();
    const dd = today.getDate();
    this.weekNumOfDate = this.getWeekNumOfMonthOfDate(new Date(yy, mm, dd));
    this.semana = this.verificaSeaSemanaEimpar(this.weekNumOfDate);
    return this.semana;
  }

  static verificaSeaSemanaEimpar(data) {
    if (data % 2 === 0) {
      return 0;
    } if (data % 2 === 1) {
      return 1;
    }
    return new Error('[ERROR]');
  }
}
module.exports = Semanas;
