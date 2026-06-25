const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("lakshita-theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "Dark theme";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  localStorage.setItem("lakshita-theme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "Dark theme" : "Light theme";
});

const filters = document.querySelectorAll(".filter");
const skills = document.querySelectorAll(".skill-chip");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const type = filter.dataset.filter;
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    skills.forEach((skill) => {
      const show = type === "all" || skill.dataset.type.split(" ").includes(type);
      skill.classList.toggle("hide", !show);
    });
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const oldText = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = oldText;
    }, 1200);
  });
});

const projectDetails = {
  sales: {
    title: "E-Commerce Sales Analysis Dashboard",
    intro: "A business intelligence dashboard project focused on revenue, products, and customer purchasing behaviour.",
    points: [
      "Analysed e-commerce sales data to identify revenue trends and top-performing products.",
      "Used Python, SQL, Power BI, Excel, Pandas, and Matplotlib.",
      "Created interactive dashboards and business reports to improve sales performance tracking and strategic decision-making."
    ]
  },
  welfare: {
    title: "Social Welfare Index Application",
    intro: "A welfare analytics application designed for analysis and reporting.",
    points: [
      "Developed a Social Welfare Index Application for welfare data analysis.",
      "Focused on turning structured welfare data into clearer reporting outputs.",
      "Strengthened practical data analysis and application-building experience."
    ]
  },
  markets: {
    title: "Financial Markets Study",
    intro: "A market analysis achievement built around chart patterns and trading strategies.",
    points: [
      "Analysed financial markets using chart patterns.",
      "Explored trading strategies as part of applied market research.",
      "Connected analytical thinking with business and decision-making contexts."
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalIntro = document.getElementById("modalIntro");
const modalList = document.getElementById("modalList");
const closeModal = document.getElementById("closeModal");

function openProject(key) {
  const detail = projectDetails[key];
  modalTitle.textContent = detail.title;
  modalIntro.textContent = detail.intro;
  modalList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  closeModal.focus();
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", closeProject);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProject();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProject();
});