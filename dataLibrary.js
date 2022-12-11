function addDeleteButton(rootElement, fieldElement, attachTargetElement, key) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "x";

  deleteButton.addEventListener("click", function () {
    if (!window.confirm("Delete field?")) return;
    console.log("will remove key", key);
    rootElement.removeChild(fieldElement);
  });

  attachTargetElement.appendChild(deleteButton);
}

function addAddButton(fieldElement, key) {
  
  const addButtonLine = document.createElement("div");
  const addButton = document.createElement("button");
  addButtonLine.classList.add("add-button-line");
  addButton.textContent = "+";

  addButton.addEventListener("click", function () {
    const newKey = window.prompt("New field key:");
    const newValue = window.prompt("New field value:");
  });
  addButtonLine.appendChild(addButton);

  fieldElement.appendChild(addButtonLine);
}

function getVisibleKey(key) {
  const splitKey = key.split(".");
  const visibleKey = splitKey[splitKey.length - 1] || "";
  return visibleKey;
}

function render(rootElement, key, value, disableDisplayingKey) {
  if (typeof value === "number" || typeof value === "string") {
    const fieldElement = document.createElement("div");
    fieldElement.classList.add("text-field");

    if (!disableDisplayingKey) {
      const labelElement = document.createElement("span");
      labelElement.classList.add("field-label");
      labelElement.textContent = getVisibleKey(key);
      fieldElement.appendChild(labelElement);
    }

    const valueElement = document.createElement("span");
    valueElement.classList.add("field-value");
    valueElement.textContent = value;
    valueElement.addEventListener("click", function () {
      const newValue = window.prompt("Enter new field value:");
      valueElement.textContent = newValue;
    });
    fieldElement.appendChild(valueElement);

    addDeleteButton(rootElement, fieldElement, fieldElement, key);

    rootElement.appendChild(fieldElement);
  } else if (Array.isArray(value)) {

    const fieldElement = document.createElement("details");
    const labelElement = document.createElement("summary");
    labelElement.textContent = getVisibleKey(key);
    addDeleteButton(rootElement, fieldElement, labelElement, key);
    fieldElement.appendChild(labelElement);

    value.forEach(function (arrayValue, index) {
      render(fieldElement, key + "." + index, arrayValue, true);
    });

    addAddButton(fieldElement, key);

    rootElement.appendChild(fieldElement);
  } else {

    const fieldElement = document.createElement("details");
    const labelElement = document.createElement("summary");
    labelElement.textContent = getVisibleKey(key);
    addDeleteButton(rootElement, fieldElement, labelElement, key);
    fieldElement.appendChild(labelElement);

    Object.keys(value).forEach(function (innerKey) {
      render(fieldElement, key + "." + innerKey, value[innerKey]);
    });

    addAddButton(fieldElement, key);

    rootElement.appendChild(fieldElement);
  }
}

function renderDataLibrary(rootElement, rootJSON) {
  Object.keys(rootJSON).forEach(function (key) {
    render(rootElement, key, rootJSON[key]);
  });
}

window.renderDataLibrary = renderDataLibrary;
