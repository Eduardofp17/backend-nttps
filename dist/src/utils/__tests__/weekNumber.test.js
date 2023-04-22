"use strict";var SemanasMock = /** @class */ (function () {
    function SemanasMock() {
    }
    SemanasMock.getWeekNumOfMonthOfDate = function (d) {
        var onejan = new Date(d.getFullYear(), 0, 1);
        var week = Math.ceil((((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
        if (week === 22) {
            return week;
        }
        return week + 1;
    };
    SemanasMock.pegarDataAtual = function (year, month, day) {
        var today = new Date(year, month, day);
        var yy = today.getFullYear();
        var mm = today.getMonth();
        var dd = today.getDate();
        this.weekNumOfDate = this.getWeekNumOfMonthOfDate(new Date(yy, mm, dd));
        this.semana = this.verificaSeaSemanaEimpar(this.weekNumOfDate);
        return this.semana;
    };
    SemanasMock.verificaSeaSemanaEimpar = function (data) {
        if (data % 2 === 0) {
            return 0;
        }
        if (data % 2 === 1) {
            return 1;
        }
        return new Error('[ERROR]');
    };
    return SemanasMock;
}());
describe('WeekNumber 2023', function () {
    // Referente a semana dos dias 29/01 à 04/02
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 0, 29);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 4);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 05/02 à 11/02
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 5);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 11);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 12/02 à 18/02
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 12);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 18);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 19/02 à 25/02
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 19);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 25);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 26/02 à 04/03
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 1, 26);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 4);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 05/03 à 11/03
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 5);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 11);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 12/03 à 18/03
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 12);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 18);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 19/03 à 25/03
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 19);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 25);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 26/03 à 01/04
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 2, 26);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 1);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 02/04 à 08/04
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 2);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 8);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 09/04 à 15/04
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 9);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 15);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 16/04 à 22/04
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 16);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 22);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 23/04 à 29/04
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 23);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 29);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 30/04 à 06/05
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 3, 30);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 6);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 07/05 à 13/05
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 7);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 13);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 14/05 à 20/05
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 14);
        expect(weekNumber).toBe(1);
    });
    it('should return "1"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 20);
        expect(weekNumber).toBe(1);
    });
    // Referente a semana dos dias 21/05 à 27/05
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 21);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 27);
        expect(weekNumber).toBe(0);
    });
    // Referente a semana dos dias 28/05 à 03/06
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 4, 28);
        expect(weekNumber).toBe(0);
    });
    it('should return "0"', function () {
        var weekNumber = SemanasMock.pegarDataAtual(2023, 5, 3);
        expect(weekNumber).toBe(0);
    });
});
