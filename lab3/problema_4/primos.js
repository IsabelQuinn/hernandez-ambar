function sumNumPrimos(n) {
  let sum = 0;
  let primos = [];

  function calcular(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }
  for (let i = 2; i <= n; i++) {
    if (calcular(i)) {
      sum += i;
      primos.push(i);
    }
  }

  return { sum, primos };
}

document.getElementById("checkButton").addEventListener("click", function() {
    const numberInput = document.getElementById("numberInput").value;
    const resultContainer = document.getElementById("result");
    
    const number = parseInt(numberInput);

    if (!isNaN(number) && number > 0 && number < 1000000) {
        const { sum, primos } = sumNumPrimos(number);
        resultContainer.textContent = `La sumatoria de números primos debajo de ${number} es :${primos.join(', ')} = ${sum}`;
    } else {
        resultContainer.textContent = "Por favor, ingrese un número válido (0 < n < 1000000).";
    }
});
