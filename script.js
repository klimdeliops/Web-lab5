let loginform = document.querySelector(".loginform");
let signupform = document.querySelector(".signupform");
let deliveryform = document.querySelector(".deliveryform");
let nextToDataBtn = document.getElementById("nextToData");
let backToOrderBtn = document.getElementById("backToOrder");
let nextToDeliveryBtn = document.getElementById("nextToDelivery");
let backToDataBtn = document.getElementById("backToData");

function validateForm() {
  const requiredFields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("phone"),
    document.getElementById("address"),
  ];
  let isValid = true;
  for (let field of requiredFields) {
    if (!field.value.trim()) {
      field.style.borderColor = "red";
      isValid = false;
    } else {
      field.style.borderColor = "#ddd";
    }
  }
  if (!isValid) {
    const firstInvalidField = requiredFields.find(
      (field) => !field.value.trim()
    );
    if (firstInvalidField) firstInvalidField.focus();
  }
  return isValid;
}

function goToDataPage() {
  loginform.style.left = "-100%";
  signupform.style.left = "0";
  deliveryform.style.left = "100%";
}
function goToOrderPage() {
  loginform.style.left = "0";
  signupform.style.left = "100%";
  deliveryform.style.left = "200%";
}
function goToDeliveryPage() {
  loginform.style.left = "-100%";
  signupform.style.left = "-100%";
  deliveryform.style.left = "0";
}
function goBackToDataPage() {
  loginform.style.left = "-100%";
  signupform.style.left = "0";
  deliveryform.style.left = "100%";
}

document.querySelectorAll('input[name="deliveryTime"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("scheduledTime").style.display =
      this.value === "scheduled" ? "block" : "none";
  });
});

function formatPhone(input) {
  let cursorPos = input.selectionStart;
  let value = input.value.replace(/\D/g, "");
  if (value.startsWith("7")) {
    value = "8" + value.substring(1);
  } else if (!value.startsWith("8") && value.length > 0) {
    value = "8" + value;
  }
  if (value.length > 11) value = value.substring(0, 11);
  let formattedValue = "";
  for (let i = 0; i < value.length; i++) {
    if (i === 1) formattedValue += "-";
    if (i === 4) formattedValue += "-";
    if (i === 7) formattedValue += "-";
    if (i === 9) formattedValue += "-";
    formattedValue += value[i];
  }
  input.value = formattedValue;
  let addedChars = 0;
  if (cursorPos > 1) addedChars++;
  if (cursorPos > 4) addedChars++;
  if (cursorPos > 7) addedChars++;
  if (cursorPos > 9) addedChars++;
  input.setSelectionRange(cursorPos + addedChars, cursorPos + addedChars);
}

nextToDataBtn.addEventListener("click", goToDataPage);
backToOrderBtn.addEventListener("click", goToOrderPage);
nextToDeliveryBtn.addEventListener("click", goToDeliveryPage);
backToDataBtn.addEventListener("click", goBackToDataPage);

document.querySelector(".clear-btn").addEventListener("click", function () {
  setTimeout(() => {
    goToOrderPage();
    const costBlock = document.getElementById("order-cost");
    if (costBlock) {
      costBlock.innerHTML = "";
      costBlock.style.display = "none";
    }
    resetButtonsInAllCategories();
  }, 100);
});

document.getElementById("orderForm").addEventListener("reset", function () {
  setTimeout(() => {
    goToOrderPage();
    const costBlock = document.getElementById("order-cost");
    if (costBlock) {
      costBlock.innerHTML = "";
      costBlock.style.display = "none";
    }
    resetButtonsInAllCategories();
  }, 100);
});



function getCategoryName(key) {
  const map = {
    soup: "Суп",
    main: "Главное блюдо",
    salads_starters: "Салат или стартер",
    drink: "Напиток",
    desserts: "Десерт",
  };
  return map[key] || key;
}

function displayDishesForCategory(category, kind, container) {
  container.innerHTML = "";
  let filtered = dishes.filter((d) => d.category === category);
  if (kind) filtered = filtered.filter((d) => d.kind === kind);
  filtered.sort((a, b) => a.name.localeCompare(b.name));
  const sel = document.getElementById(category);
  const selected = sel ? sel.value : "";
  filtered.forEach((dish) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-dish", dish.keyword);
    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" />
      <div class="text_div">
        <p>${dish.price}₽</p>
        <p>${dish.name}</p>
        <br><br>
        <p>${dish.count}</p>
      </div>
      <button type="button" class="add-btn">Добавить</button>
    `;
    const btn = card.querySelector("button.add-btn");
    if (dish.keyword === selected) {
      btn.textContent = "Добавлено";
      btn.classList.add("added");
    }
    btn.addEventListener("click", function () {
      if (btn.classList.contains("added")) {
        btn.textContent = "Добавить";
        btn.classList.remove("added");
        if (sel) sel.value = "";
        updateOrderCost();
        return;
      }
      container.querySelectorAll("button.add-btn").forEach((b) => {
        b.textContent = "Добавить";
        b.classList.remove("added");
      });
      this.textContent = "Добавлено";
      this.classList.add("added");
      if (sel) sel.value = dish.keyword;
      updateOrderCost();
      showToast({
        message: `
    <div style="font-size:1.15em;line-height:1.3">
      <div>Блюдо из категории <b>"${getCategoryName(category)}"</b>:</div>
      <div><b>${dish.name}</b> успешно добавлено</div>
    </div>
  `,
        type: "success",
      });
    });
    container.appendChild(card);
  });
}

function setupFilters() {
  document.querySelectorAll(".filters").forEach((filterBlock) => {
    const category = filterBlock.getAttribute("data-category");
    const buttons = filterBlock.querySelectorAll(".filter-btn");
    const section = filterBlock.closest("section");
    const list = section.querySelector(".list");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          displayDishesForCategory(category, null, list);
          restoreActiveButtonBySelect(category, list);
          return;
        }
        buttons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        displayDishesForCategory(category, this.dataset.kind, list);
        restoreActiveButtonBySelect(category, list);
      });
    });
  });
}

function restoreActiveButtonBySelect(category, container) {
  const sel = document.getElementById(category);
  if (!sel) return;
  const val = sel.value;
  if (!val || val === "none") return;
  container.querySelectorAll(".card").forEach((card) => {
    const dishKey = card.getAttribute("data-dish");
    const btn = card.querySelector("button.add-btn");
    if (dishKey === val) {
      btn.textContent = "Добавлено";
      btn.classList.add("added");
      btn.disabled = true;
    }
  });
}

function renderAllCategories() {
  document.querySelectorAll(".filters").forEach((filterBlock) => {
    const category = filterBlock.getAttribute("data-category");
    const section = filterBlock.closest("section");
    const list = section.querySelector(".list");
    displayDishesForCategory(category, null, list);
    restoreActiveButtonBySelect(category, list);
  });
}

function resetButtonsInAllCategories() {
  document.querySelectorAll(".list").forEach((container) => {
    container.querySelectorAll("button.add-btn").forEach((btn) => {
      btn.textContent = "Добавить";
      btn.classList.remove("added");
      btn.disabled = false;
    });
  });
}

function showToast({ message, type = "success", duration = 2500 }) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.innerHTML =
    message + '<button class="toast-close" title="Закрыть">&times;</button>';
  container.appendChild(toast);
  toast.querySelector(".toast-close").onclick = () => toast.remove();
  setTimeout(() => toast.remove(), duration);
}

function createCostBlock() {
  let commentArea = document.getElementById("comment");
  let costBlock = document.getElementById("order-cost");
  if (!costBlock) {
    costBlock = document.createElement("div");
    costBlock.id = "order-cost";
    costBlock.classList.add("sticky-cost");
    costBlock.style.marginTop = "20px";
    costBlock.style.fontWeight = "bold";
    costBlock.style.transition = "all 0.3s";
    commentArea.parentNode.insertBefore(costBlock, commentArea.nextSibling);
  }
  costBlock.textContent = "";
}

function updateOrderCost() {
  const selects = [
    document.getElementById("soup"),
    document.getElementById("main"),
    document.getElementById("salads_starters"),
    document.getElementById("drink"),
    document.getElementById("desserts"),
  ];
  let total = 0;
  selects.forEach((select) => {
    let keyword = select.value;
    let dish = dishes.find((d) => d.keyword === keyword);
    if (dish) total += dish.price;
  });
  let costBlock = document.getElementById("order-cost");
  costBlock.innerHTML = total > 0 ? `Стоимость заказа: ${total}₽` : "";
  costBlock.style.display = total > 0 ? "block" : "none";
  return total;
}

document.getElementById("submitOrder").addEventListener("click", function (e) {
  e.preventDefault();
  if (!validateForm()) {
    alert("Пожалуйста, заполните все обязательные поля");
    return;
  }

  const formData = {
    soup: document.getElementById("soup").selectedOptions[0].text,
    main: document.getElementById("main").selectedOptions[0].text,
    salads_starters: document.getElementById("salads_starters").selectedOptions[0].text,
    drink: document.getElementById("drink").selectedOptions[0].text,
    desserts: document.getElementById("desserts").selectedOptions[0].text,
    comment: document.getElementById("comment").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    marketing: document.getElementById("marketing").checked ? "Да" : "Нет",
    address: document.getElementById("address").value,
    deliveryTimeValue:
      document.querySelector('input[name="deliveryTime"]:checked').value ===
      "scheduled"
        ? document.getElementById("deliveryTime").value
        : "Как можно скорее",
    price: updateOrderCost(),
  };
  const webAppUrl =
    "https://script.google.com/macros/s/AKfycbyPD52pqw76fUxMnKUZ6ucXZIK1wiMowSwXFGO1ARb_lTwrDdRAPGC3rPcL6t2bmmoKeA/exec";
  const hiddenForm = document.createElement("form");
  hiddenForm.method = "POST";
  hiddenForm.action = webAppUrl;
  hiddenForm.target = "_blank";
  hiddenForm.style.display = "none";
  for (const key in formData) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = formData[key];
    hiddenForm.appendChild(input);
  }
  document.body.appendChild(hiddenForm);
  hiddenForm.submit();
  document.body.removeChild(hiddenForm);
  alert("✅ Заказ успешно оформлен! Данные отправлены в Google Таблицу.");
  document.getElementById("orderForm").reset();
  goToOrderPage();
  resetButtonsInAllCategories();
});

function selectDishByCard(category, keyword) {
  const sel = document.getElementById(category);
  if (sel) sel.value = keyword;
  updateOrderCost();
  renderAllCategories();
}

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  renderAllCategories();
  createCostBlock();
  updateOrderCost();
});

["soup", "main", "salads_starters", "drink", "desserts"].forEach((cat) => {
  document.getElementById(cat).addEventListener("change", () => {
    updateOrderCost();
    renderAllCategories();
  });
});
