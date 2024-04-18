document.getElementById("checkButton").addEventListener("click", function() {
    var number = document.getElementById("numberInput").value;
    var result = document.getElementById("result");
    var numb10 = number.toString();
    var numb2 = number.toString(2);

    if (numb10 === numb10.split('').reverse().join('')) {
        result.innerHTML = `<p>${number} en decimal es ${numb10}</p><p>Es palíndromo en base 10</p>`;
    } else {
        result.innerHTML = `<p>No es un número palíndromo en base 10</p>`;
    }

    if (numb2 === numb2.split('').reverse().join('')) {
        result.innerHTML += `<p>${number} en binario es ${numb2}</p><p>Es palíndromo en base 2</p>`;
    } else {
        result.innerHTML += `<p>No es un número palíndromo en base 2</p>`;
    }
});