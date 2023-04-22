"use strict";var Semanas = /** @class */ (function () {
    function Semanas() {
    }
    Semanas.getWeekNumOfMonthOfDate = function (d) {
        var onejan = new Date(d.getFullYear(), 0, 1);
        var year = d.getFullYear();
        var week = Math.ceil((((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
        if (week === 22) {
            return week;
        }
        return week + 1;
    };
    Semanas.pegarDataAtual = function () {
        var today = new Date();
        var yy = today.getFullYear();
        var mm = today.getMonth();
        var dd = today.getDate();
        this.weekNumOfDate = this.getWeekNumOfMonthOfDate(new Date(yy, mm, dd));
        this.semana = this.verificaSeaSemanaEimpar(this.weekNumOfDate);
        return this.semana;
    };
    Semanas.verificaSeaSemanaEimpar = function (data) {
        if (data % 2 === 0) {
            return 0;
        }
        if (data % 2 === 1) {
            return 1;
        }
        return new Error('[ERROR]');
    };
    return Semanas;
}());
module.exports = Semanas;
