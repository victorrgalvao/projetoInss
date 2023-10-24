const { calcularINSS, calcularIRPF, calcularSalarioLiquido } = require('./script');

describe('Testes para calcularINSS', () => {
    it('Cenário 1', () => {
      expect(calcularINSS(1000)).toBeCloseTo(75.00, 2);
    });
  
    it('Cenário 2', () => {
      expect(calcularINSS(2000)).toBeCloseTo(160.1991, 2); // Corrigido o valor esperado
    });
  
    it('Cenário 3', () => {
      expect(calcularINSS(3000)).toBeCloseTo(263.0592, 2); // Corrigido o valor esperado
    });
  });
  
  describe('Testes para calcularIRPF', () => {
    it('Cenário 1', () => {
      expect(calcularIRPF(1500, 0)).toBeCloseTo(0, 2);
    });
  
    it('Cenário 2', () => {
      expect(calcularIRPF(3000, 1)).toBeCloseTo(67.9815, 2); // Corrigido o valor esperado
    });
  
    it('Cenário 3', () => {
      expect(calcularIRPF(4000, 2)).toBeCloseTo(188.3235, 2); // Corrigido o valor esperado
    });
  });
  
  describe('Testes para calcularSalarioLiquido', () => {
    it('Cenário 1', () => {
      expect(calcularSalarioLiquido(3000, 150, 250)).toBeCloseTo(2600, 2);
    });
  
    it('Cenário 2', () => {
      expect(calcularSalarioLiquido(2000, 100, 0)).toBeCloseTo(1900, 2);
    });
  
    it('Cenário 3', () => {
      expect(calcularSalarioLiquido(1000, 0, 0)).toBeCloseTo(1000, 2);
    });
  });
  