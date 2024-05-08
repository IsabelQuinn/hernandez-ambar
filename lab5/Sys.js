const App = {
    candidates: [],

    htmlElements: {
      form: document.getElementById("form"),
      candidateList: document.getElementById("candidateList"),
      chart: document.getElementById("chart"),
    },

    init() {
      this.bindEvents(); 
    },

    bindEvents() {
      this.htmlElements.form.addEventListener(
        "submit",
        this.handlers.handleSubmit.bind(this) 
      );
      this.htmlElements.candidateList.addEventListener(
        "click",
        this.handlers.handleCandidateClick.bind(this) 
      );
    },

    handlers: {
      handleSubmit(event) {
        event.preventDefault();
        const candidateName = document
          .getElementById("candidateName")
          .value.trim();
        const candidateImage =
          document.getElementById("candidateImage").value.trim() || null;
        if (!candidateName) {
          alert("Por favor ingrese un nombre para el candidato.");
          return;
        }
        const color = this.Methods.getRandomColor(); 
        const candidate = {
          name: candidateName,
          color: color,
          votes: 0,
          image: candidateImage,
        };
        this.candidates.push(candidate); 
        this.renderCandidates(); 
        this.renderChart();
        document.getElementById("candidateName").value = "";
        document.getElementById("candidateImage").value = "";
      },

      handleCandidateClick(event) {
        const target = event.target;
        if (target.classList.contains("vote-button")) {
          const index = parseInt(target.dataset.index);
          this.candidates[index].votes++;
          this.renderCandidates();
          this.renderChart(); 
        } else if (target.classList.contains("remove-button")) {
          const index = parseInt(target.dataset.index);
          this.candidates.splice(index, 1); 
          this.renderCandidates(); 
          this.renderChart(); 
        }
      },
    },

    Methods: {
      getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    },

    renderCandidates() {
      this.htmlElements.candidateList.innerHTML = "";
      this.candidates.forEach((candidate, index) => {
        const candidateCard = document.createElement("div");
        candidateCard.classList.add("candidate-card");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        if (candidate.image) {
          const candidateImage = document.createElement("img");
          candidateImage.src = candidate.image;
          cardBody.appendChild(candidateImage);
        } else {
          const colorBlock = document.createElement("div");
          colorBlock.classList.add("color-block");
          colorBlock.style.backgroundColor = candidate.color;
          cardBody.appendChild(colorBlock);
        }
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = candidate.name;

        const colorDot = document.createElement("div");
        colorDot.classList.add("color");
        colorDot.style.backgroundColor = candidate.color;

        const voteButton = document.createElement("button");
        voteButton.classList.add("vote-button");
        voteButton.textContent = "Votar";
        voteButton.dataset.index = index;

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Eliminar";
        removeButton.dataset.index = index;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(voteButton);
        buttonContainer.appendChild(removeButton);

        cardBody.appendChild(name);
        cardBody.appendChild(colorDot);
        candidateCard.appendChild(cardBody);
        candidateCard.appendChild(buttonContainer);
        this.htmlElements.candidateList.appendChild(candidateCard);
      });
    },

    renderChart() {
      this.htmlElements.chart.innerHTML = "";
      const totalVotes = this.candidates.reduce(
        (total, candidate) => total + candidate.votes,
        0
      );
      this.candidates.forEach((candidate) => {
        const percentage =
          totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
        const chartBar = document.createElement("div");
        chartBar.classList.add("chart-bar");
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.width = `${percentage}%`;
        bar.style.backgroundColor = candidate.color;
        const label = document.createElement("span");
        label.textContent = `${candidate.name}: ${percentage.toFixed(2)}%`;
        chartBar.appendChild(bar);
        chartBar.appendChild(label);
        this.htmlElements.chart.appendChild(chartBar);
      });
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
