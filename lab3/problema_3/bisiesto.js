document.getElementById("checkButton"),addEventListener("click",function(){ 
    var yearInput = document.getElementById("numberInput").value;
    var resultContainer = document.getElementById("result");
    
    function itsLeap(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function showResult(year) {
        if (itsLeap(year)) {
            resultContainer.innerHTML = `${year} es un año bisiesto.`;
        } else {
            resultContainer.innerHTML = `${year} no es un año bisiesto.`;
        }
    }

    var year = parseInt(yearInput);
    if (!isNaN(year)) {
        showResult(year);
    } else {
        resultContainer.innerHTML = 'Por favor, ingrese un año válido.';
    }
  
});