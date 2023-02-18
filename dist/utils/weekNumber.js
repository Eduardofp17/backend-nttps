"use strict";class Semanas {
  static getWeekNumOfMonthOfDate(d) {
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
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
