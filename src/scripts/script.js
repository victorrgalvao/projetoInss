// Função para calcular o INSS
function calcularINSS(salarioBruto) {
    const faixasINSS = [
        { faixaInicial: 0, faixaFinal: 1320.0, aliquota: 0.075 },
        { faixaInicial: 1320.01, faixaFinal: 2571.29, aliquota: 0.09 },
        { faixaInicial: 2571.30, faixaFinal: 3856.94, aliquota: 0.12 },
        { faixaInicial: 3856.95, faixaFinal: 7507.49, aliquota: 0.14 }
    ];

    let inss = 0;

    for (const faixa of faixasINSS) {
        if (salarioBruto <= faixa.faixaFinal) {
            inss += (salarioBruto - faixa.faixaInicial) * faixa.aliquota;
            break;
        } else {
            inss += (faixa.faixaFinal - faixa.faixaInicial) * faixa.aliquota;
        }
    }

    return inss;
}

// Função para calcular o IRPF
function calcularIRPF(salarioBruto, nDependentes) {
    // Tabela IRRF válida até 30/04/2023
    const faixasIRPF = [
      { faixaInicial: 0, faixaFinal: 1903.98, aliquota: 0 },
      { faixaInicial: 1903.99, faixaFinal: 2826.65, aliquota: 0.075 },
      { faixaInicial: 2826.66, faixaFinal: 3751.05, aliquota: 0.15 },
      { faixaInicial: 3751.06, faixaFinal: 4664.68, aliquota: 0.225 },
      { faixaInicial: 4664.69, faixaFinal: Infinity, aliquota: 0.275 },
    ];
  
    // Dedução por dependente (valor fixo por dependente)
    const deducaoPorDependente = 189.59; // Valor válido até minha data de conhecimento
    const deducaoTotal = deducaoPorDependente * nDependentes;
  
    // Aplica a dedução antes de calcular o imposto
    salarioBruto -= deducaoTotal;
  
    // Calcula o imposto devido com base no salário bruto mensal
    let irpf = 0;
    for (const faixa of faixasIRPF) {
      if (salarioBruto <= faixa.faixaFinal) {
        irpf += (salarioBruto - faixa.faixaInicial) * faixa.aliquota;
        break;
      } else {
        irpf += (faixa.faixaFinal - faixa.faixaInicial) * faixa.aliquota;
      }
    }
  
    return irpf;
  }
  


  

// Função para calcular o salário líquido
function calcularSalarioLiquido(salarioBruto, inss, irpf) {
    return salarioBruto - inss - irpf;
}

// Função para exibir os resultados de INSS na página
function exibirResultadoINSS() {
    const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
    const resultadoINSS = document.getElementById("resultadoINSS");
    
    // Verifica se o campo de salário bruto está vazio
    if (isNaN(salarioBruto)) {
        resultadoINSS.textContent = "Preencha o campo de salário bruto.";
        resultadoINSS.classList.remove("sucess");
        resultadoINSS.classList.add("error")
        return;
    }
    
    const inss = calcularINSS(salarioBruto);
    resultadoINSS.classList.remove("error");
    resultadoINSS.classList.add("sucess")
    resultadoINSS.textContent = `R$ ${inss.toFixed(2)}`;
}

// Função para exibir os resultados de IRPF na página
function exibirResultadoIRPF() {
    const nDependentes = parseInt(document.getElementById("nDependentes").value);
    const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
    const resultadoIRPF = document.getElementById("resultadoIRPF");

    // Verifica se o campo de salário bruto está vazio
    if (isNaN(salarioBruto)) {
        resultadoIRPF.classList.remove("sucess");
        resultadoIRPF.classList.add("error")
        resultadoIRPF.textContent = "Preencha o campo de salário bruto.";
        return;
    }

    // Verifica se o campo de número de dependentes está vazio ou não é um número
    if (isNaN(nDependentes)) {
        resultadoIRPF.classList.remove("sucess");
        resultadoIRPF.classList.add("error")
        resultadoIRPF.textContent = "Preencha o campo de número de dependentes com um valor válido.";
        return;
    }

    // Verifique se o salário é maior ou igual a 5000 e o número de dependentes é menor que 2
    if (nDependentes < 2) {
        resultadoIRPF.classList.remove("error");
        resultadoIRPF.classList.add("sucess")
        resultadoIRPF.textContent = "Isento"; // Mostra que o IRPF está isento
    } else {
        const irpf = calcularIRPF(salarioBruto, nDependentes);
        resultadoIRPF.classList.remove("error");
        resultadoIRPF.classList.add("sucess")
        resultadoIRPF.textContent = `R$ ${irpf.toFixed(2)}`;
    }
}

// Função para exibir os resultados de Salário Líquido na página
function exibirResultadoSalarioLiquido() {
    const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
    const resultadoSalarioLiquido = document.getElementById("resultadoSalarioLiquido");

    // Verifica se o campo de salário bruto está vazio
    if (isNaN(salarioBruto)) {
        resultadoSalarioLiquido.classList.remove("sucess");
        resultadoSalarioLiquido.classList.add("error")
        resultadoSalarioLiquido.textContent = "Preencha o campo de salário bruto.";
        return;
    }

    const nDependentes = parseInt(document.getElementById("nDependentes").value);

    // Verifica se o campo de número de dependentes está vazio ou não é um número
    if (isNaN(nDependentes)) {
        resultadoSalarioLiquido.classList.remove("sucess");
        resultadoSalarioLiquido.classList.add("error")
        resultadoSalarioLiquido.textContent = "Preencha o campo de número de dependentes com um valor válido.";
        return;
    }

    const inss = calcularINSS(salarioBruto);
    const irpf = calcularIRPF(salarioBruto, nDependentes);

    const salarioLiquido = calcularSalarioLiquido(salarioBruto, inss, irpf);
    resultadoSalarioLiquido.classList.remove("error");
    resultadoSalarioLiquido.classList.add("sucess")
    resultadoSalarioLiquido.textContent = `R$ ${salarioLiquido.toFixed(2)}`;
}



// module.exports = {
//     calcularINSS,
//     calcularIRPF,
//     calcularSalarioLiquido
// };

//   os ouvintes de eventos aos botões lembra de descomentar
document.getElementById("calcularINSS").addEventListener("click", exibirResultadoINSS);
document.getElementById("calcularIRPF").addEventListener("click", exibirResultadoIRPF);
document.getElementById("calcularSalarioLiquido").addEventListener("click", exibirResultadoSalarioLiquido);//


