(() => {
    const App = {
      htmlElements: {
        form: document.getElementById("form"),
        res: document.getElementById("res"),
      },
      init() {
        App.bindEvents();
      },
      bindEvents() {
        App.htmlElements.form.addEventListener(
          "submit",
          App.handlers.handleSubmit
        );
        App.htmlElements.res.addEventListener(
          "click",
          App.handlers.handleCardClick
        );
      },
      handlers: {
        handleSubmit(e) {
          e.preventDefault();
          const num = parseInt(e.target.lnum.value);
          const fib = App.methods.fibo(num);
          App.render(fib);
        },
        handleCardClick(e) {
          if (e.target.classList.contains("card")) {
            if (confirm("¿Desea eliminar esta tarjeta?")) {
              e.target.remove();
            }
          }
        },
      },
      methods: {
        fibo(num) {
          const result = [0, 1];
          for (let i = 2; i < num; i++) {
            result.push(result[i - 1] + result[i - 2]);
          }
          return result;
        },
      },
      render(fib) {
        const resDiv = App.htmlElements.res;
        resDiv.innerHTML = "";
        fib.forEach((num) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.textContent = num;
          resDiv.appendChild(card);
        });
      },
    };
    App.init();
  })();


