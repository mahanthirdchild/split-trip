(() => {
  const STORAGE_KEY = "splittrip.v2";
  const LEGACY_KEY = "splittrip.v1";
  const LANG_KEY = "splittrip.lang";
  const CURRENCIES = ["EUR", "GBP", "USD"];
  const SYMBOLS = { EUR: "€", GBP: "£", USD: "$" };
  const MAX_PEOPLE = 5;

  const STRINGS = {
    en: {
      brandTag: "Personal & shared trip spending, with who paid",
      setupTitle: "Who’s on the trip?",
      setupLede:
        "Add up to 5 people. Shared costs split evenly; whoever paid gets credit in the settlement.",
      tripName: "Trip name",
      tripNamePlaceholder: "Lisbon weekend",
      addPerson: "Add person",
      maxPeople: "Max 5 people",
      clearAll: "Clear all",
      clearAllTitle: "Clear all saved data",
      clearConfirm: "Clear all people and expenses saved in this browser?",
      entryTitle: "Add an expense",
      entryLede:
        "Amount, currency, purpose, who paid, and date. Mark it personal or shared for the people it covers.",
      amount: "Amount",
      currency: "Currency",
      purpose: "Purpose",
      purposePlaceholder: "Hotels, taxi, shoes…",
      whoPaid: "Who paid",
      date: "Date",
      whoFor: "Who is this for?",
      personal: "Personal",
      shared: "Shared",
      addExpense: "Add expense",
      expensesTitle: "Expenses",
      reportTitle: "Report",
      reportLede:
        "Each person’s share, what they paid, and net balance (paid minus share). Then trip totals by currency.",
      footer: "Saved in this browser · run locally anytime",
      namePlaceholder: "Name",
      personN: "Person {n}",
      noExpenses: "No expenses yet. Add a personal or shared amount above.",
      paidBy: "paid by",
      remove: "Remove",
      sharedWith: "Shared · {names}",
      pickShared: "Pick at least one person for a shared expense.",
      share: "Share",
      paid: "Paid",
      net: "Net (paid − share)",
      settled: "Settled in all currencies",
      owed: "owed",
      owes: "owes",
      noAmounts: "No amounts yet.",
      personalTag: "personal",
      shareOf: "share of {amount} ÷ {n}",
      paidAmount: "{name} paid {amount}",
      settleUp: "Settle up",
      settleNote: "Suggested transfers so everyone matches their share after who paid.",
      settleEven: "Everyone is even for the amounts entered.",
      byPerson: "By person",
      byCurrency: "By currency (whole trip)",
      tripTotals: "Trip totals",
      tripTotalsNote:
        "All expenses combined, regardless of person. Currencies stay separate (no FX conversion).",
      total: "Total",
      nothingYet: "Nothing yet",
      docTitle: "SplitTrip — trip expenses",
    },
    fa: {
      brandTag: "هزینه‌های شخصی و مشترک سفر، با مشخص بودن پرداخت‌کننده",
      setupTitle: "چه کسانی در سفر هستند؟",
      setupLede:
        "تا ۵ نفر اضافه کنید. هزینه‌های مشترک به‌صورت مساوی تقسیم می‌شود؛ کسی که پرداخت کرده در تسویه اعتبار می‌گیرد.",
      tripName: "نام سفر",
      tripNamePlaceholder: "مثلاً آخر هفته لیسبون",
      addPerson: "افزودن نفر",
      maxPeople: "حداکثر ۵ نفر",
      clearAll: "پاک کردن همه",
      clearAllTitle: "پاک کردن همه داده‌های ذخیره‌شده",
      clearConfirm: "همه افراد و هزینه‌های ذخیره‌شده در این مرورگر پاک شوند؟",
      entryTitle: "افزودن هزینه",
      entryLede:
        "مبلغ، ارز، بابت، پرداخت‌کننده و تاریخ را وارد کنید. شخصی یا مشترک بودن را مشخص کنید.",
      amount: "مبلغ",
      currency: "ارز",
      purpose: "بابت",
      purposePlaceholder: "هتل، تاکسی، کفش…",
      whoPaid: "چه کسی پرداخت کرد؟",
      date: "تاریخ",
      whoFor: "این هزینه برای کیست؟",
      personal: "شخصی",
      shared: "مشترک",
      addExpense: "ثبت هزینه",
      expensesTitle: "هزینه‌ها",
      reportTitle: "گزارش",
      reportLede:
        "سهم هر نفر، مبلغ پرداختی، و مانده (پرداختی منهای سهم). سپس جمع کل سفر بر اساس ارز.",
      footer: "در همین مرورگر ذخیره می‌شود · هر زمان روی گوشی یا کامپیوتر باز کنید",
      namePlaceholder: "نام",
      personN: "نفر {n}",
      noExpenses: "هنوز هزینه‌ای نیست. یک مبلغ شخصی یا مشترک اضافه کنید.",
      paidBy: "پرداخت‌کننده",
      remove: "حذف",
      sharedWith: "مشترک · {names}",
      pickShared: "برای هزینه مشترک حداقل یک نفر را انتخاب کنید.",
      share: "سهم",
      paid: "پرداختی",
      net: "مانده (پرداختی − سهم)",
      settled: "در همه ارزها تسویه شده",
      owed: "طلبکار",
      owes: "بدهکار",
      noAmounts: "هنوز مبلغی نیست.",
      personalTag: "شخصی",
      shareOf: "سهم از {amount} ÷ {n}",
      paidAmount: "{name} مبلغ {amount} را پرداخت کرد",
      settleUp: "تسویه حساب",
      settleNote: "پیشنهاد انتقال وجه تا سهم و پرداخت هر نفر برابر شود.",
      settleEven: "برای مبالغ واردشده همه تسویه هستند.",
      byPerson: "بر اساس نفر",
      byCurrency: "بر اساس ارز (کل سفر)",
      tripTotals: "جمع کل سفر",
      tripTotalsNote:
        "همه هزینه‌ها بدون توجه به نفر. ارزها جدا نگه داشته می‌شوند (بدون تبدیل نرخ).",
      total: "جمع",
      nothingYet: "هنوز چیزی نیست",
      docTitle: "SplitTrip — هزینه‌های سفر",
    },
  };

  let lang = loadLang();
  const state = load() || {
    tripName: "",
    people: [defaultPersonName(1), defaultPersonName(2)],
    expenses: [],
  };

  const els = {
    tripName: document.getElementById("tripName"),
    peopleInputs: document.getElementById("peopleInputs"),
    addPersonBtn: document.getElementById("addPersonBtn"),
    clearDataBtn: document.getElementById("clearDataBtn"),
    expenseForm: document.getElementById("expenseForm"),
    amount: document.getElementById("amount"),
    currency: document.getElementById("currency"),
    reason: document.getElementById("reason"),
    paidBy: document.getElementById("paidBy"),
    expenseDate: document.getElementById("expenseDate"),
    personalPick: document.getElementById("personalPick"),
    sharedPick: document.getElementById("sharedPick"),
    expenseList: document.getElementById("expenseList"),
    expenseCount: document.getElementById("expenseCount"),
    reportBody: document.getElementById("reportBody"),
    langEn: document.getElementById("langEn"),
    langFa: document.getElementById("langFa"),
  };

  function loadLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "fa" || saved === "en") return saved;
    } catch {
      /* ignore */
    }
    return "en";
  }

  function saveLang() {
    localStorage.setItem(LANG_KEY, lang);
  }

  function t(key, vars = {}) {
    const table = STRINGS[lang] || STRINGS.en;
    let text = table[key] ?? STRINGS.en[key] ?? key;
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
    return text;
  }

  function defaultPersonName(n) {
    return t("personN", { n });
  }

  function localeTag() {
    return lang === "fa" ? "fa-IR" : undefined;
  }

  function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function migrateExpense(exp) {
    const personIds = Array.isArray(exp.personIds) ? exp.personIds : [];
    const paidBy =
      Number.isInteger(exp.paidBy) ? exp.paidBy : personIds.length ? personIds[0] : 0;
    let date = exp.date;
    if (!date && exp.createdAt) {
      const d = new Date(exp.createdAt);
      if (!Number.isNaN(d.getTime())) {
        date = d.toISOString().slice(0, 10);
      }
    }
    if (!date) date = todayISO();
    return { ...exp, paidBy, date };
  }

  function load() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      let fromLegacy = false;
      if (!raw) {
        raw = localStorage.getItem(LEGACY_KEY);
        fromLegacy = Boolean(raw);
      }
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.people) || !Array.isArray(data.expenses)) return null;
      data.expenses = data.expenses.map(migrateExpense);
      if (fromLegacy) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      return data;
    } catch {
      return null;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function money(amount, currency) {
    const n = Number(amount);
    const formatted = n.toLocaleString(localeTag(), {
      minimumFractionDigits: n % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });
    return `${SYMBOLS[currency] || ""}${formatted} ${currency}`;
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(localeTag(), {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function activePeople() {
    return state.people.map((name, index) => ({
      id: index,
      name: (name || "").trim() || defaultPersonName(index + 1),
    }));
  }

  function personName(id, people = activePeople()) {
    return people.find((p) => p.id === id)?.name || defaultPersonName(id + 1);
  }

  function emptyCurrencyMap() {
    return Object.fromEntries(CURRENCIES.map((c) => [c, 0]));
  }

  function applyStaticI18n() {
    document.documentElement.lang = lang === "fa" ? "fa" : "en";
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.title = t("docTitle");
    document.body.classList.toggle("lang-fa", lang === "fa");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });

    els.langEn.classList.toggle("is-active", lang === "en");
    els.langFa.classList.toggle("is-active", lang === "fa");
    els.langEn.setAttribute("aria-pressed", String(lang === "en"));
    els.langFa.setAttribute("aria-pressed", String(lang === "fa"));
  }

  function setLang(next) {
    if (next !== "en" && next !== "fa") return;
    lang = next;
    saveLang();
    applyStaticI18n();
    renderAll();
  }

  function renderPeopleInputs() {
    els.peopleInputs.innerHTML = "";
    state.people.forEach((name, index) => {
      const row = document.createElement("div");
      row.className = "person-row";
      row.innerHTML = `
        <span class="person-index">${index + 1}</span>
        <input type="text" maxlength="40" data-person-index="${index}" value="${escapeAttr(name)}" placeholder="${escapeAttr(t("namePlaceholder"))}" autocomplete="off" />
      `;
      els.peopleInputs.appendChild(row);
    });
    els.addPersonBtn.disabled = state.people.length >= MAX_PEOPLE;
    els.addPersonBtn.textContent =
      state.people.length >= MAX_PEOPLE ? t("maxPeople") : t("addPerson");
  }

  function renderPaidBy() {
    const people = activePeople();
    const previous = els.paidBy.value;
    els.paidBy.innerHTML = people
      .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
      .join("");
    if (previous !== "" && people.some((p) => String(p.id) === previous)) {
      els.paidBy.value = previous;
    }
  }

  function renderPicks() {
    const people = activePeople();
    els.personalPick.innerHTML = people
      .map(
        (p, i) => `
        <label class="pick">
          <input type="radio" name="personalPerson" value="${p.id}" ${i === 0 ? "checked" : ""} />
          <span>${escapeHtml(p.name)}</span>
        </label>`
      )
      .join("");

    els.sharedPick.innerHTML = people
      .map(
        (p) => `
        <label class="pick">
          <input type="checkbox" name="sharedPeople" value="${p.id}" checked />
          <span>${escapeHtml(p.name)}</span>
        </label>`
      )
      .join("");

    renderPaidBy();
  }

  function getMode() {
    const checked = document.querySelector('input[name="mode"]:checked');
    return checked ? checked.value : "personal";
  }

  function syncModeUI() {
    const mode = getMode();
    els.personalPick.hidden = mode !== "personal";
    els.sharedPick.hidden = mode !== "shared";
  }

  function resetFormDefaults() {
    els.expenseForm.reset();
    document.querySelector('input[name="mode"][value="personal"]').checked = true;
    els.expenseDate.value = todayISO();
    renderPicks();
    syncModeUI();
  }

  function forWhomLabel(exp, people) {
    if (exp.mode === "personal") return personName(exp.personIds[0], people);
    return t("sharedWith", {
      names: exp.personIds.map((id) => personName(id, people)).join(lang === "fa" ? "، " : ", "),
    });
  }

  function renderExpenses() {
    const people = activePeople();
    els.expenseCount.textContent = String(state.expenses.length);

    if (!state.expenses.length) {
      els.expenseList.innerHTML = `<p class="empty">${escapeHtml(t("noExpenses"))}</p>`;
      return;
    }

    const sorted = [...state.expenses].sort((a, b) => {
      const da = a.date || "";
      const db = b.date || "";
      if (da !== db) return db.localeCompare(da);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    els.expenseList.innerHTML = sorted
      .map((exp) => {
        const forWhom = forWhomLabel(exp, people);
        const paid = personName(exp.paidBy, people);
        const sep = lang === "fa" ? " · " : " · ";
        return `
          <article class="expense-item" data-id="${exp.id}">
            <div>
              <div class="reason">${escapeHtml(exp.reason)}</div>
              <div class="meta">${escapeHtml(forWhom)}${sep}${escapeHtml(t("paidBy"))} ${escapeHtml(paid)}${sep}${escapeHtml(formatDate(exp.date))}</div>
            </div>
            <div class="amount">${money(exp.amount, exp.currency)}</div>
            <div class="actions">
              <button type="button" class="btn ghost tiny danger" data-remove="${exp.id}">${escapeHtml(t("remove"))}</button>
            </div>
          </article>`;
      })
      .join("");
  }

  function computeReport() {
    const people = activePeople();
    const perPerson = people.map((p) => ({
      id: p.id,
      name: p.name,
      share: emptyCurrencyMap(),
      paid: emptyCurrencyMap(),
      net: emptyCurrencyMap(),
      lines: [],
    }));

    const tripTotals = emptyCurrencyMap();

    for (const exp of state.expenses) {
      const amount = Number(exp.amount) || 0;
      const currency = exp.currency;
      tripTotals[currency] = (tripTotals[currency] || 0) + amount;

      const involved = exp.personIds
        .map((id) => perPerson.find((p) => p.id === id))
        .filter(Boolean);
      if (!involved.length) continue;

      const share = amount / involved.length;
      const payer = perPerson.find((p) => p.id === exp.paidBy);

      if (payer) {
        payer.paid[currency] += amount;
      }

      for (const person of involved) {
        person.share[currency] += share;
        person.lines.push({
          reason: exp.reason,
          currency,
          share,
          original: amount,
          shared: exp.mode === "shared",
          splitBy: involved.length,
          paidBy: exp.paidBy,
          paidByName: personName(exp.paidBy, people),
          date: exp.date,
          isPayer: payer ? person.id === payer.id : false,
        });
      }
    }

    for (const person of perPerson) {
      for (const c of CURRENCIES) {
        person.net[c] = person.paid[c] - person.share[c];
      }
    }

    return { perPerson, tripTotals };
  }

  function settlementHints(perPerson) {
    const hints = [];
    for (const currency of CURRENCIES) {
      const creditors = perPerson
        .filter((p) => p.net[currency] > 0.005)
        .map((p) => ({ ...p, left: p.net[currency] }))
        .sort((a, b) => b.left - a.left);
      const debtors = perPerson
        .filter((p) => p.net[currency] < -0.005)
        .map((p) => ({ ...p, left: -p.net[currency] }))
        .sort((a, b) => b.left - a.left);

      let i = 0;
      let j = 0;
      while (i < debtors.length && j < creditors.length) {
        const pay = Math.min(debtors[i].left, creditors[j].left);
        if (pay > 0.005) {
          hints.push({
            from: debtors[i].name,
            to: creditors[j].name,
            amount: pay,
            currency,
          });
        }
        debtors[i].left -= pay;
        creditors[j].left -= pay;
        if (debtors[i].left <= 0.005) i += 1;
        if (creditors[j].left <= 0.005) j += 1;
      }
    }
    return hints;
  }

  function currencyPills(map, predicate = (v) => v > 0) {
    const active = CURRENCIES.filter((c) => predicate(map[c]));
    if (!active.length) return "";
    return active
      .map(
        (c) =>
          `<span class="total-pill"><span>${formatNum(map[c])}</span><span class="ccy">${c}</span></span>`
      )
      .join("");
  }

  function netPills(map) {
    const active = CURRENCIES.filter((c) => Math.abs(map[c]) > 0.005);
    if (!active.length) {
      return `<span class="empty">${escapeHtml(t("settled"))}</span>`;
    }
    return active
      .map((c) => {
        const value = map[c];
        const cls = value > 0 ? "credit" : "debit";
        const label = value > 0 ? t("owed") : t("owes");
        return `<span class="total-pill ${cls}"><span>${formatNum(Math.abs(value))}</span><span class="ccy">${c} ${escapeHtml(label)}</span></span>`;
      })
      .join("");
  }

  function renderReport() {
    const { perPerson, tripTotals } = computeReport();
    const tripName = (state.tripName || "").trim();
    const people = activePeople();
    const hasAny = state.expenses.length > 0;
    const hints = settlementHints(perPerson);
    const arrow = lang === "fa" ? "←" : "→";
    const dash = lang === "fa" ? " — " : " — ";

    const peopleHtml = perPerson
      .map((person) => {
        const shareZero = !CURRENCIES.some((c) => person.share[c] > 0);
        const paidZero = !CURRENCIES.some((c) => person.paid[c] > 0);
        const lines = person.lines.length
          ? `<ul class="breakdown">${person.lines
              .map((line) => {
                const kind = line.shared
                  ? t("shareOf", {
                      amount: money(line.original, line.currency),
                      n: line.splitBy,
                    })
                  : t("personalTag");
                const payerNote = line.isPayer
                  ? ` · ${t("paidAmount", {
                      name: person.name,
                      amount: money(line.original, line.currency),
                    })}`
                  : ` · ${t("paidBy")} ${line.paidByName}`;
                return `<li>
                  <span>${escapeHtml(line.reason)} <span class="share-tag">${escapeHtml(kind)}${escapeHtml(payerNote)} · ${escapeHtml(formatDate(line.date))}</span></span>
                  <span>${money(line.share, line.currency)}</span>
                </li>`;
              })
              .join("")}</ul>`
          : `<p class="empty">${escapeHtml(t("noAmounts"))}</p>`;

        return `
          <article class="person-card">
            <h3>${escapeHtml(person.name)}</h3>
            <div class="stat-row">
              <div>
                <div class="stat-label">${escapeHtml(t("share"))}</div>
                <div class="totals">${shareZero ? `<span class="empty">0</span>` : currencyPills(person.share)}</div>
              </div>
              <div>
                <div class="stat-label">${escapeHtml(t("paid"))}</div>
                <div class="totals">${paidZero ? `<span class="empty">0</span>` : currencyPills(person.paid)}</div>
              </div>
              <div>
                <div class="stat-label">${escapeHtml(t("net"))}</div>
                <div class="totals">${netPills(person.net)}</div>
              </div>
            </div>
            ${lines}
          </article>`;
      })
      .join("");

    const settleHtml = hints.length
      ? `<article class="person-card settle-card">
          <h3>${escapeHtml(t("settleUp"))}</h3>
          <p class="trip-totals-note">${escapeHtml(t("settleNote"))}</p>
          <ul class="breakdown">
            ${hints
              .map(
                (h) =>
                  `<li><span>${escapeHtml(h.from)} ${arrow} ${escapeHtml(h.to)}</span><span>${money(h.amount, h.currency)}</span></li>`
              )
              .join("")}
          </ul>
        </article>`
      : hasAny
        ? `<article class="person-card settle-card">
            <h3>${escapeHtml(t("settleUp"))}</h3>
            <p class="empty">${escapeHtml(t("settleEven"))}</p>
          </article>`
        : "";

    const currencyBlocks = CURRENCIES.map((currency) => {
      const total = tripTotals[currency] || 0;
      const lines = state.expenses.filter((exp) => exp.currency === currency);
      if (!total && !lines.length) return "";

      const items = lines
        .map((exp) => {
          const forWhom = forWhomLabel(exp, people);
          return `<li><span>${escapeHtml(exp.reason)} <span class="share-tag">${escapeHtml(forWhom)} · ${escapeHtml(t("paidBy"))} ${escapeHtml(personName(exp.paidBy, people))} · ${escapeHtml(formatDate(exp.date))}</span></span><span>${money(exp.amount, currency)}</span></li>`;
        })
        .join("");

      return `
        <div class="currency-total">
          <div class="currency-total-head">
            <h4>${currency}</h4>
            <span class="total-pill large"><span>${formatNum(total)}</span><span class="ccy">${currency}</span></span>
          </div>
          <ul class="breakdown">${items}</ul>
        </div>`;
    }).join("");

    const activeTotals = CURRENCIES.filter((c) => (tripTotals[c] || 0) > 0);
    const combinedSummary = activeTotals.length
      ? activeTotals.map((c) => money(tripTotals[c], c)).join(" + ")
      : t("nothingYet");

    const tripHtml = hasAny
      ? `<article class="person-card trip-totals">
          <h3>${tripName ? escapeHtml(tripName) + dash : ""}${escapeHtml(t("tripTotals"))}</h3>
          <p class="trip-totals-note">${escapeHtml(t("tripTotalsNote"))}</p>
          <div class="totals trip-total-pills">
            ${activeTotals
              .map(
                (c) =>
                  `<span class="total-pill large"><span>${formatNum(tripTotals[c])}</span><span class="ccy">${c}</span></span>`
              )
              .join("")}
          </div>
          <p class="combined-line"><span class="label">${escapeHtml(t("total"))}</span> ${escapeHtml(combinedSummary)}</p>
          ${currencyBlocks}
        </article>`
      : "";

    els.reportBody.innerHTML = `
      <div class="report-block">
        <h3 class="report-subhead">${escapeHtml(t("byPerson"))}</h3>
        ${peopleHtml}
        ${settleHtml}
      </div>
      ${
        tripHtml
          ? `<div class="report-block">
              <h3 class="report-subhead">${escapeHtml(t("byCurrency"))}</h3>
              ${tripHtml}
            </div>`
          : ""
      }
    `;
  }

  function formatNum(n) {
    return Number(n).toLocaleString(localeTag(), {
      minimumFractionDigits: Number(n) % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replaceAll("'", "&#39;");
  }

  function renderAll() {
    els.tripName.value = state.tripName;
    if (!els.expenseDate.value) els.expenseDate.value = todayISO();
    renderPeopleInputs();
    renderPicks();
    syncModeUI();
    renderExpenses();
    renderReport();
    save();
  }

  els.langEn.addEventListener("click", () => setLang("en"));
  els.langFa.addEventListener("click", () => setLang("fa"));

  els.tripName.addEventListener("input", () => {
    state.tripName = els.tripName.value;
    save();
    renderReport();
  });

  els.peopleInputs.addEventListener("input", (e) => {
    const input = e.target.closest("input[data-person-index]");
    if (!input) return;
    const index = Number(input.dataset.personIndex);
    state.people[index] = input.value;
    save();
    renderPicks();
    renderExpenses();
    renderReport();
  });

  els.addPersonBtn.addEventListener("click", () => {
    if (state.people.length >= MAX_PEOPLE) return;
    state.people.push(defaultPersonName(state.people.length + 1));
    renderAll();
  });

  els.clearDataBtn.addEventListener("click", () => {
    if (!confirm(t("clearConfirm"))) return;
    state.tripName = "";
    state.people = [defaultPersonName(1), defaultPersonName(2)];
    state.expenses = [];
    resetFormDefaults();
    renderAll();
  });

  document.querySelectorAll('input[name="mode"]').forEach((radio) => {
    radio.addEventListener("change", syncModeUI);
  });

  els.expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = Number(els.amount.value);
    const currency = els.currency.value;
    const reason = els.reason.value.trim();
    const paidBy = Number(els.paidBy.value);
    const date = els.expenseDate.value || todayISO();
    const mode = getMode();

    if (!(amount > 0) || !reason || Number.isNaN(paidBy)) return;

    let personIds = [];
    if (mode === "personal") {
      const picked = document.querySelector('input[name="personalPerson"]:checked');
      if (!picked) return;
      personIds = [Number(picked.value)];
    } else {
      personIds = [...document.querySelectorAll('input[name="sharedPeople"]:checked')].map((el) =>
        Number(el.value)
      );
      if (!personIds.length) {
        alert(t("pickShared"));
        return;
      }
    }

    state.expenses.unshift({
      id: uid(),
      amount,
      currency,
      reason,
      mode,
      personIds,
      paidBy,
      date,
      createdAt: Date.now(),
    });

    resetFormDefaults();
    renderExpenses();
    renderReport();
    save();
    els.amount.focus();
  });

  els.expenseList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    const id = btn.getAttribute("data-remove");
    state.expenses = state.expenses.filter((exp) => exp.id !== id);
    renderExpenses();
    renderReport();
    save();
  });

  els.expenseDate.value = todayISO();
  applyStaticI18n();
  renderAll();
})();
