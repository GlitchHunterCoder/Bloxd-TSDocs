(() => {
  // =========================
  // STATE
  // =========================
  let ROOT = null;
  let SELECTED = null;
  let OUTPUT = {};

  // =========================
  // UI ROOT
  // =========================
  const app = document.createElement("div");
  app.style.display = "flex";
  app.style.gap = "20px";
  app.style.fontFamily = "monospace";

  const left = document.createElement("div");
  const right = document.createElement("pre");

  right.style.whiteSpace = "pre";
  right.style.background = "#111";
  right.style.color = "#0f0";
  right.style.padding = "10px";
  right.style.minWidth = "300px";

  app.appendChild(left);
  app.appendChild(right);
  document.body.appendChild(app);

  // =========================
  // UTIL
  // =========================
  function updateOutput() {
    right.textContent = JSON.stringify(OUTPUT, null, 2);
  }

  function setPath(obj, path, value) {
    let cur = obj;
    for (let i = 0; i < path.length - 1; i++) {
      const k = path[i];
      if (!(k in cur)) cur[k] = {};
      cur = cur[k];
    }
    cur[path[path.length - 1]] = value;
  }

  // =========================
  // RENDER NODE
  // =========================
  function renderNode(node, path = []) {
    const wrap = document.createElement("div");
    wrap.style.marginLeft = "12px";

    // -------------------------
    // UNION
    // -------------------------
    if (node.kind === "union") {
      const label = document.createElement("div");
      label.textContent = "union";
      wrap.appendChild(label);

      node.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = `option ${i}`;
        btn.onclick = () => {
          OUTPUT = {};
          setPath(OUTPUT, path, {});
          const container = wrap.querySelector(".child");
          container.innerHTML = "";
          container.appendChild(renderNode(opt, path));
          updateOutput();
        };
        wrap.appendChild(btn);
      });

      const child = document.createElement("div");
      child.className = "child";
      wrap.appendChild(child);

      return wrap;
    }

    // -------------------------
    // OBJECT
    // -------------------------
    if (node.kind === "object") {
      node.props.forEach(p => {
        const row = document.createElement("div");

        const label = document.createElement("span");
        label.textContent = p.name + " ";

        row.appendChild(label);

        const child = renderNode(p.type, [...path, p.name]);

        row.appendChild(child);
        wrap.appendChild(row);
      });

      return wrap;
    }

    // -------------------------
    // RECORD
    // -------------------------
    if (node.kind === "record") {
      const inputKey = document.createElement("input");
      inputKey.placeholder = "key";

      const container = document.createElement("div");

      const addBtn = document.createElement("button");
      addBtn.textContent = "add";

      addBtn.onclick = () => {
        const key = inputKey.value;
        const child = renderNode(node.value, [...path, key]);
        container.appendChild(child);
      };

      wrap.appendChild(inputKey);
      wrap.appendChild(addBtn);
      wrap.appendChild(container);

      return wrap;
    }

    // -------------------------
    // ARRAY
    // -------------------------
    if (node.kind === "array") {
      const btn = document.createElement("button");
      btn.textContent = "add item";

      const container = document.createElement("div");

      btn.onclick = () => {
        const idx = container.children.length;
        const child = renderNode(node.element, [...path, idx]);
        container.appendChild(child);
      };

      wrap.appendChild(btn);
      wrap.appendChild(container);

      return wrap;
    }

    // -------------------------
    // PRIMITIVE
    // -------------------------
    if (node.kind === "primitive") {
      const input = document.createElement("input");
      input.placeholder = node.name;
      input.style.marginLeft = "6px";

      input.onchange = () => {
        let val = input.value;

        if (node.name === "number") val = Number(val);
        if (node.name === "boolean") val = val === "true";

        setPath(OUTPUT, path, val);
        updateOutput();
      };

      wrap.appendChild(input);
      return wrap;
    }

    return wrap;
  }

  // =========================
  // LOAD TYPE TREE
  // =========================
  async function load() {
    const res = await fetch("/type"); // your endpoint
    ROOT = await res.json();

    left.innerHTML = "";
    left.appendChild(renderNode(ROOT));
    updateOutput();
  }

  load();
})();
