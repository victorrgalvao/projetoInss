describe('Calculadora de Salário', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/index.html');
    });
  
    it('Calcula INSS para salário de 1000', () => {
      cy.get('#salarioBruto').type('1000');
      cy.get('#calcularINSS').click();
      cy.get('#resultadoINSS').should('contain', '75.00');
    });
  
    it('Calcula INSS para salário de 2000', () => {
      cy.get('#salarioBruto').type('2000');
      cy.get('#calcularINSS').click();
      cy.get('#resultadoINSS').should('contain', '160.20');
    });
  
    it('Calcula INSS para salário de 3000', () => {
      cy.get('#salarioBruto').type('3000');
      cy.get('#calcularINSS').click();
      cy.get('#resultadoINSS').should('contain', '263.06');
    });
  
    it('Calcula IRPF para salário de 1500 com 0 dependentes', () => {
      cy.get('#salarioBruto').type('1500');
      cy.get('#nDependentes').type('0');
      cy.get('#calcularIRPF').click();
      cy.get('#resultadoIRPF').should('have.text', 'Isento');
    });
  
    it('Calcula IRPF para salário de 3000 com 1 dependente', () => {
      cy.get('#salarioBruto').type('3000');
      cy.get('#nDependentes').type('1');
      cy.get('#calcularIRPF').click();
      cy.get('#resultadoIRPF').should('have.text', 'Isento');
    });
  
    it('Calcula IRPF para salário de 4000 com 2 dependentes', () => {
      cy.get('#salarioBruto').type('4000');
      cy.get('#nDependentes').type('2');
      cy.get('#calcularIRPF').click();
      cy.get('#resultadoIRPF').should('contain', '188.32');
    });
  
    it('Calcula Salário Líquido para salário de 3000, 150 de INSS e 250 de IRPF', () => {
      cy.get('#salarioBruto').type('3000');
      cy.get('#nDependentes').type('2');
      cy.get('#calcularSalarioLiquido').click();
      cy.get('#resultadoSalarioLiquido').should('contain', '2683.18');
    });
  
    it('Calcula Salário Líquido para salário de 2000, 100 de INSS e 0 de IRPF', () => {
      cy.get('#salarioBruto').type('2000');
      cy.get('#nDependentes').type('1');
      cy.get('#calcularSalarioLiquido').click();
      cy.get('#resultadoSalarioLiquido').should('contain', '1839.80');
    });
  
    it('Calcula Salário Líquido para salário de 1000, sem descontos', () => {
      cy.get('#salarioBruto').type('1000');
      cy.get('#nDependentes').type('0');
      cy.get('#calcularSalarioLiquido').click();
      cy.get('#resultadoSalarioLiquido').should('contain', '925.00');
    });



    // -------------------------------------------------------------------------
    it('Exibe mensagem de erro para salário bruto inválido', () => {
        cy.get('#salarioBruto').type('abc'); // Entrada inválida (não é um número)
        cy.get('#nDependentes').type('2');
        cy.get('#calcularIRPF').click();
        cy.get('#resultadoIRPF').should('have.class', 'error');
        cy.get('#resultadoIRPF').should('have.text', 'Preencha o campo de salário bruto.');
      });
    
      it('Exibe mensagem de erro para número de dependentes inválido', () => {
        cy.get('#salarioBruto').type('2000');
        cy.get('#nDependentes').type('xyz'); // Entrada inválida (não é um número)
        cy.get('#calcularIRPF').click();
        cy.get('#resultadoIRPF').should('have.class', 'error');
        cy.get('#resultadoIRPF').should('have.text', 'Preencha o campo de número de dependentes com um valor válido.');
      });
  
  });
  