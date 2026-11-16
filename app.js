(() => {
  const STORAGE_KEY = "splittrip.v2";
  const SESSION_KEY = "splittrip.session.v1";
  const LEGACY_KEY = "splittrip.v1";
  const LANG_KEY = "splittrip.lang";
  const CURRENCIES = ["EUR", "GBP", "USD", "IRT"];
  const SYMBOLS = { EUR: "€", GBP: "£", USD: "$", IRT: "تومان" };
  const MAX_PEOPLE = 10;
  const POLL_MS = 2000;

  const STRINGS = {
    en: {
      brandTag: "Personal & shared trip spending, with who paid",
      shareTitle: "Shared trip",
      shareLede:
        "Create a private trip and share the link or join code. Up to 10 people. Changes sync to everyone’s phones.",
      yourName: "Your name",
      tripName: "Trip name",
      tripNamePlaceholder: "Lisbon weekend",
      createTrip: "Create shared trip",
      joinCode: "Join code",
      joinTrip: "Join trip",
      localFallbackNote: "If the shared server is offline, you can still use local-only mode below.",
      useLocalMode: "Use local-only mode",
      shareWithFriends: "Share with friends",
      copyLink: "Copy link",
      resetTrip: "Reset trip",
      leaveTrip: "Leave trip",
      backToShare: "Back to shared trip",
      addPerson: "Add person",
      maxPeople: "Max 10 people",
      clearAll: "Clear all",
      clearAllTitle: "Clear all saved data",
      clearConfirm: "Clear all people and expenses saved in this browser?",
      resetConfirm:
        "Reset this trip for everyone? All participants and expenses will be deleted from the server. Downloaded reports on phones are kept.",
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
      footer: "Private trips sync through the server · reports stay on your device when downloaded",
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
      actionsTitle: "Save & export",
      actionsLede: "Save a backup of this trip, or download a PDF of all payments.",
      saveData: "Save",
      pdfReport: "PDF report",
      pdfLangTitle: "PDF language",
      pdfLangLede: "Which language should the PDF report use?",
      cancel: "Cancel",
      savedToast: "Trip data saved to your device.",
      pdfEmpty: "Add at least one expense before creating a PDF.",
      pdfPayments: "All payments",
      pdfGenerated: "Generated",
      pdfHint: "Use your browser’s print dialog and choose “Save as PDF”.",
      syncOnline: "Synced · live with other phones",
      syncOffline: "Shared server unavailable · local-only mode",
      syncSaving: "Saving to shared trip…",
      syncError: "Could not reach the shared trip server.",
      needName: "Enter your name first.",
      needTripName: "Enter a trip name first.",
      needJoinCode: "Enter a join code.",
      tripFull: "This trip already has 10 people.",
      tripMissing: "Trip not found. It may have been reset.",
      copied: "Link copied.",
      creatorOnlyReset: "Only the trip creator can reset the trip.",
    },
    fa: {
      brandTag: "هزینه‌های شخصی و مشترک سفر، با مشخص بودن پرداخت‌کننده",
      shareTitle: "سفر مشترک",
      shareLede:
        "یک سفر خصوصی بسازید و لینک یا کد دعوت را بفرستید. حداکثر ۱۰ نفر. تغییرات روی گوشی همه همگام می‌شود.",
      yourName: "نام شما",
      tripName: "نام سفر",
      tripNamePlaceholder: "مثلاً آخر هفته لیسبون",
      createTrip: "ساخت سفر مشترک",
      joinCode: "کد ورود",
      joinTrip: "پیوستن به سفر",
      localFallbackNote: "اگر سرور مشترک در دسترس نباشد، می‌توانید حالت فقط‌محلی را استفاده کنید.",
      useLocalMode: "حالت فقط‌محلی",
      shareWithFriends: "اشتراک با دوستان",
      copyLink: "کپی لینک",
      resetTrip: "ریست سفر",
      leaveTrip: "ترک سفر",
      backToShare: "بازگشت به سفر مشترک",
      addPerson: "افزودن نفر",
      maxPeople: "حداکثر ۱۰ نفر",
      clearAll: "پاک کردن همه",
      clearAllTitle: "پاک کردن همه داده‌های ذخیره‌شده",
      clearConfirm: "همه افراد و هزینه‌های ذخیره‌شده در این مرورگر پاک شوند؟",
      resetConfirm:
        "این سفر برای همه ریست شود؟ همه شرکت‌کنندگان و هزینه‌ها از سرور حذف می‌شوند. گزارش‌های دانلودشده روی گوشی‌ها می‌مانند.",
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
      footer: "سفرهای خصوصی از طریق سرور همگام می‌شوند · گزارش دانلودشده روی دستگاه شما می‌ماند",
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
      actionsTitle: "ذخیره و خروجی",
      actionsLede: "از این سفر نسخه پشتیبان بگیرید یا گزارش PDF همه پرداخت‌ها را دانلود کنید.",
      saveData: "ذخیره",
      pdfReport: "گزارش PDF",
      pdfLangTitle: "زبان PDF",
      pdfLangLede: "گزارش PDF به کدام زبان باشد؟",
      cancel: "انصراف",
      savedToast: "اطلاعات سفر روی دستگاه شما ذخیره شد.",
      pdfEmpty: "قبل از ساخت PDF حداقل یک هزینه اضافه کنید.",
      pdfPayments: "همه پرداخت‌ها",
      pdfGenerated: "تاریخ تهیه",
      pdfHint: "در پنجره چاپ مرورگر، گزینه «Save as PDF» یا «ذخیره به‌صورت PDF» را انتخاب کنید.",
      syncOnline: "همگام · زنده با گوشی‌های دیگر",
      syncOffline: "سرور مشترک در دسترس نیست · حالت فقط‌محلی",
      syncSaving: "در حال ذخیره روی سفر مشترک…",
      syncError: "ارتباط با سرور مشترک برقرار نشد.",
      needName: "ابتدا نام خود را وارد کنید.",
      needTripName: "ابتدا نام سفر را وارد کنید.",
      needJoinCode: "کد ورود را وارد کنید.",
      tripFull: "این سفر از قبل ۱۰ نفر دارد.",
      tripMissing: "سفر پیدا نشد. ممکن است ریست شده باشد.",
      copied: "لینک کپی شد.",
      creatorOnlyReset: "فقط سازنده سفر می‌تواند سفر را ریست کند.",
    },
  };

  let lang = loadLang();
  let session = loadSession();
  let pollTimer = null;
  let pushTimer = null;
  let pushing = false;
  let apiAvailable = null;

  const state = {
    tripName: "",
    people: [defaultPersonName(1), defaultPersonName(2)],
    expenses: [],
    version: 0,
  };

  const localState = loadLocal() || {
    tripName: "",
    people: [defaultPersonName(1), defaultPersonName(2)],
    expenses: [],
  };

  const els = {
    creatorName: document.getElementById("creatorName"),
    newTripName: document.getElementById("newTripName"),
    createTripBtn: document.getElementById("createTripBtn"),
    joinCodeInput: document.getElementById("joinCodeInput"),
    joinTripBtn: document.getElementById("joinTripBtn"),
    localModeBtn: document.getElementById("localModeBtn"),
    shareIdle: document.getElementById("shareIdle"),
    shareActive: document.getElementById("shareActive"),
    localActive: document.getElementById("localActive"),
    syncBanner: document.getElementById("syncBanner"),
    tripName: document.getElementById("tripName"),
    joinCodeDisplay: document.getElementById("joinCodeDisplay"),
    shareLinkInput: document.getElementById("shareLinkInput"),
    copyShareBtn: document.getElementById("copyShareBtn"),
    resetTripBtn: document.getElementById("resetTripBtn"),
    leaveTripBtn: document.getElementById("leaveTripBtn"),
    peopleInputs: document.getElementById("peopleInputs"),
    addPersonBtn: document.getElementById("addPersonBtn"),
    localTripName: document.getElementById("localTripName"),
    localPeopleInputs: document.getElementById("localPeopleInputs"),
    localAddPersonBtn: document.getElementById("localAddPersonBtn"),
    clearDataBtn: document.getElementById("clearDataBtn"),
    backToShareBtn: document.getElementById("backToShareBtn"),
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
    saveBtn: document.getElementById("saveBtn"),
    pdfBtn: document.getElementById("pdfBtn"),
    pdfModal: document.getElementById("pdfModal"),
    pdfEnBtn: document.getElementById("pdfEnBtn"),
    pdfFaBtn: document.getElementById("pdfFaBtn"),
  };

  function loadLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "fa" || saved === "en") return saved;
    } catch {}
    return "en";
  }

  function saveLang() {
    localStorage.setItem(LANG_KEY, lang);
  }

  function loadSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function saveSession() {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  }

  function loadLocal() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) raw = localStorage.getItem(LEGACY_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.people) || !Array.isArray(data.expenses)) return null;
      data.expenses = data.expenses.map(migrateExpense);
      return data;
    } catch {
      return null;
    }
  }

  function saveLocal() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tripName: localState.tripName,
        people: localState.people,
        expenses: localState.expenses,
      })
    );
  }

  function tLang(useLang, key, vars = {}) {
    const table = STRINGS[useLang] || STRINGS.en;
    let text = table[key] ?? STRINGS.en[key] ?? key;
    for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v));
    return text;
  }
  function t(key, vars = {}) {
    return tLang(lang, key, vars);
  }
  function defaultPersonName(n) {
    return t("personN", { n });
  }
  function localeTag(useLang = lang) {
    return useLang === "fa" ? "fa-IR" : undefined;
  }
  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function migrateExpense(exp) {
    const personIds = Array.isArray(exp.personIds) ? exp.personIds : [];
    const paidBy = Number.isInteger(exp.paidBy) ? exp.paidBy : personIds[0] || 0;
    let date = exp.date;
    if (!date && exp.createdAt) {
      const d = new Date(exp.createdAt);
      if (!Number.isNaN(d.getTime())) date = d.toISOString().slice(0, 10);
    }
    return { ...exp, paidBy, date: date || todayISO() };
  }
  function uid() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
  function money(amount, currency, useLang = lang) {
    const n = Number(amount);
    const formatted = n.toLocaleString(localeTag(useLang), {
      minimumFractionDigits: n % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });
    return `${SYMBOLS[currency] || ""}${formatted} ${currency}`;
  }
  function formatDate(iso, useLang = lang) {
    if (!iso) return "";
    const d = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(localeTag(useLang), { year: "numeric", month: "short", day: "numeric" });
  }
  function formatNum(n, useLang = lang) {
    return Number(n).toLocaleString(localeTag(useLang), {
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

  function activeData() {
    return session?.mode === "shared" ? state : localState;
  }

  function activePeople() {
    const data = activeData();
    return data.people.map((name, index) => ({
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

  async function api(path, options = {}) {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (session?.token) headers.Authorization = `Bearer ${session.token}`;
    const res = await fetch(path, { ...options, headers });
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    if (!res.ok) {
      const err = new Error(body?.error || `http_${res.status}`);
      err.status = res.status;
      err.body = body;
      throw err;
    }
    return body;
  }

  async function probeApi() {
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      apiAvailable = res.ok;
    } catch {
      apiAvailable = false;
    }
    return apiAvailable;
  }

  function setBanner(text, kind = "info") {
    els.syncBanner.hidden = !text;
    els.syncBanner.textContent = text || "";
    els.syncBanner.dataset.kind = kind;
  }

  function applyTripPayload(trip, meta = {}) {
    state.tripName = trip.tripName || "";
    state.people = Array.isArray(trip.people) && trip.people.length ? trip.people.slice(0, MAX_PEOPLE) : [defaultPersonName(1)];
    state.expenses = Array.isArray(trip.expenses) ? trip.expenses.map(migrateExpense) : [];
    state.version = trip.version || 0;
    if (meta.isCreator !== undefined) session.isCreator = meta.isCreator;
    if (meta.personIndex !== undefined) session.personIndex = meta.personIndex;
    session.code = trip.code;
    saveSession();
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
  }

  function setLang(next) {
    if (next !== "en" && next !== "fa") return;
    lang = next;
    saveLang();
    applyStaticI18n();
    renderAll();
  }

  function renderModeChrome() {
    const shared = session?.mode === "shared";
    const local = session?.mode === "local";
    els.shareIdle.hidden = shared || local;
    els.shareActive.hidden = !shared;
    els.localActive.hidden = !local;
    els.resetTripBtn.hidden = !(shared && session?.isCreator);
    if (shared) {
      els.joinCodeDisplay.textContent = session.code || "—";
      const url = `${location.origin}${location.pathname}?code=${encodeURIComponent(session.code || "")}`;
      els.shareLinkInput.value = url;
      setBanner(t("syncOnline"), "ok");
    } else if (local) {
      setBanner(apiAvailable === false ? t("syncOffline") : "", apiAvailable === false ? "warn" : "info");
    } else {
      setBanner(apiAvailable === false ? t("syncOffline") : "", apiAvailable === false ? "warn" : "info");
    }
  }

  function renderPeopleInputs() {
    const shared = session?.mode === "shared";
    const target = shared ? els.peopleInputs : els.localPeopleInputs;
    const addBtn = shared ? els.addPersonBtn : els.localAddPersonBtn;
    const data = activeData();
    if (!target) return;
    target.innerHTML = "";
    data.people.forEach((name, index) => {
      const row = document.createElement("div");
      row.className = "person-row";
      row.innerHTML = `
        <span class="person-index">${index + 1}</span>
        <input type="text" maxlength="40" data-person-index="${index}" value="${escapeAttr(name)}" placeholder="${escapeAttr(t("namePlaceholder"))}" autocomplete="off" />`;
      target.appendChild(row);
    });
    if (addBtn) {
      if (shared) {
        addBtn.hidden = true;
      } else {
        addBtn.hidden = false;
        addBtn.disabled = data.people.length >= MAX_PEOPLE;
        addBtn.textContent = data.people.length >= MAX_PEOPLE ? t("maxPeople") : t("addPerson");
      }
    }
  }

  function renderPaidBy() {
    const people = activePeople();
    const previous = els.paidBy.value;
    els.paidBy.innerHTML = people
      .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
      .join("");
    if (previous !== "" && people.some((p) => String(p.id) === previous)) els.paidBy.value = previous;
  }

  function renderPicks() {
    const people = activePeople();
    els.personalPick.innerHTML = people
      .map(
        (p, i) => `<label class="pick"><input type="radio" name="personalPerson" value="${p.id}" ${i === 0 ? "checked" : ""} /><span>${escapeHtml(p.name)}</span></label>`
      )
      .join("");
    els.sharedPick.innerHTML = people
      .map(
        (p) => `<label class="pick"><input type="checkbox" name="sharedPeople" value="${p.id}" checked /><span>${escapeHtml(p.name)}</span></label>`
      )
      .join("");
    renderPaidBy();
  }

  function getMode() {
    return document.querySelector('input[name="mode"]:checked')?.value || "personal";
  }
  function syncModeUI() {
    const mode = getMode();
    els.personalPick.hidden = mode !== "personal";
    els.sharedPick.hidden = mode !== "shared";
  }

  function forWhomLabel(exp, people, useLang = lang) {
    if (exp.mode === "personal") return personName(exp.personIds[0], people);
    return tLang(useLang, "sharedWith", {
      names: exp.personIds.map((id) => personName(id, people)).join(useLang === "fa" ? "، " : ", "),
    });
  }

  function renderExpenses() {
    const people = activePeople();
    const data = activeData();
    els.expenseCount.textContent = String(data.expenses.length);
    if (!data.expenses.length) {
      els.expenseList.innerHTML = `<p class="empty">${escapeHtml(t("noExpenses"))}</p>`;
      return;
    }
    const sorted = [...data.expenses].sort((a, b) => {
      if ((a.date || "") !== (b.date || "")) return String(b.date || "").localeCompare(String(a.date || ""));
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
    els.expenseList.innerHTML = sorted
      .map((exp) => {
        const forWhom = forWhomLabel(exp, people);
        const paid = personName(exp.paidBy, people);
        return `<article class="expense-item" data-id="${exp.id}">
          <div><div class="reason">${escapeHtml(exp.reason)}</div>
          <div class="meta">${escapeHtml(forWhom)} · ${escapeHtml(t("paidBy"))} ${escapeHtml(paid)} · ${escapeHtml(formatDate(exp.date))}</div></div>
          <div class="amount">${money(exp.amount, exp.currency)}</div>
          <div class="actions"><button type="button" class="btn ghost tiny danger" data-remove="${exp.id}">${escapeHtml(t("remove"))}</button></div>
        </article>`;
      })
      .join("");
  }

  function computeReport() {
    const people = activePeople();
    const data = activeData();
    const perPerson = people.map((p) => ({
      id: p.id,
      name: p.name,
      share: emptyCurrencyMap(),
      paid: emptyCurrencyMap(),
      net: emptyCurrencyMap(),
      lines: [],
    }));
    const tripTotals = emptyCurrencyMap();
    for (const exp of data.expenses) {
      const amount = Number(exp.amount) || 0;
      const currency = exp.currency;
      tripTotals[currency] = (tripTotals[currency] || 0) + amount;
      const involved = exp.personIds.map((id) => perPerson.find((p) => p.id === id)).filter(Boolean);
      if (!involved.length) continue;
      const share = amount / involved.length;
      const payer = perPerson.find((p) => p.id === exp.paidBy);
      if (payer) payer.paid[currency] += amount;
      for (const person of involved) {
        person.share[currency] += share;
        person.lines.push({
          reason: exp.reason,
          currency,
          share,
          original: amount,
          shared: exp.mode === "shared",
          splitBy: involved.length,
          paidByName: personName(exp.paidBy, people),
          date: exp.date,
          isPayer: payer ? person.id === payer.id : false,
        });
      }
    }
    for (const person of perPerson) {
      for (const c of CURRENCIES) person.net[c] = person.paid[c] - person.share[c];
    }
    return { perPerson, tripTotals };
  }

  function settlementHints(perPerson) {
    const hints = [];
    for (const currency of CURRENCIES) {
      const creditors = perPerson.filter((p) => p.net[currency] > 0.005).map((p) => ({ ...p, left: p.net[currency] })).sort((a, b) => b.left - a.left);
      const debtors = perPerson.filter((p) => p.net[currency] < -0.005).map((p) => ({ ...p, left: -p.net[currency] })).sort((a, b) => b.left - a.left);
      let i = 0;
      let j = 0;
      while (i < debtors.length && j < creditors.length) {
        const pay = Math.min(debtors[i].left, creditors[j].left);
        if (pay > 0.005) hints.push({ from: debtors[i].name, to: creditors[j].name, amount: pay, currency });
        debtors[i].left -= pay;
        creditors[j].left -= pay;
        if (debtors[i].left <= 0.005) i += 1;
        if (creditors[j].left <= 0.005) j += 1;
      }
    }
    return hints;
  }

  function currencyPills(map) {
    return CURRENCIES.filter((c) => map[c] > 0)
      .map((c) => `<span class="total-pill"><span>${formatNum(map[c])}</span><span class="ccy">${c}</span></span>`)
      .join("");
  }

  function netPills(map) {
    const active = CURRENCIES.filter((c) => Math.abs(map[c]) > 0.005);
    if (!active.length) return `<span class="empty">${escapeHtml(t("settled"))}</span>`;
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
    const tripName = (activeData().tripName || "").trim();
    const people = activePeople();
    const hasAny = activeData().expenses.length > 0;
    const hints = settlementHints(perPerson);
    const arrow = lang === "fa" ? "←" : "→";
    const dash = " — ";

    const peopleHtml = perPerson
      .map((person) => {
        const lines = person.lines.length
          ? `<ul class="breakdown">${person.lines
              .map((line) => {
                const kind = line.shared
                  ? t("shareOf", { amount: money(line.original, line.currency), n: line.splitBy })
                  : t("personalTag");
                const payerNote = line.isPayer
                  ? ` · ${t("paidAmount", { name: person.name, amount: money(line.original, line.currency) })}`
                  : ` · ${t("paidBy")} ${line.paidByName}`;
                return `<li><span>${escapeHtml(line.reason)} <span class="share-tag">${escapeHtml(kind)}${escapeHtml(payerNote)} · ${escapeHtml(formatDate(line.date))}</span></span><span>${money(line.share, line.currency)}</span></li>`;
              })
              .join("")}</ul>`
          : `<p class="empty">${escapeHtml(t("noAmounts"))}</p>`;
        return `<article class="person-card"><h3>${escapeHtml(person.name)}</h3>
          <div class="stat-row">
            <div><div class="stat-label">${escapeHtml(t("share"))}</div><div class="totals">${currencyPills(person.share) || `<span class="empty">0</span>`}</div></div>
            <div><div class="stat-label">${escapeHtml(t("paid"))}</div><div class="totals">${currencyPills(person.paid) || `<span class="empty">0</span>`}</div></div>
            <div><div class="stat-label">${escapeHtml(t("net"))}</div><div class="totals">${netPills(person.net)}</div></div>
          </div>${lines}</article>`;
      })
      .join("");

    const settleHtml = hints.length
      ? `<article class="person-card settle-card"><h3>${escapeHtml(t("settleUp"))}</h3><p class="trip-totals-note">${escapeHtml(t("settleNote"))}</p>
          <ul class="breakdown">${hints.map((h) => `<li><span>${escapeHtml(h.from)} ${arrow} ${escapeHtml(h.to)}</span><span>${money(h.amount, h.currency)}</span></li>`).join("")}</ul></article>`
      : hasAny
        ? `<article class="person-card settle-card"><h3>${escapeHtml(t("settleUp"))}</h3><p class="empty">${escapeHtml(t("settleEven"))}</p></article>`
        : "";

    const currencyBlocks = CURRENCIES.map((currency) => {
      const total = tripTotals[currency] || 0;
      const lines = activeData().expenses.filter((exp) => exp.currency === currency);
      if (!total && !lines.length) return "";
      const items = lines
        .map((exp) => `<li><span>${escapeHtml(exp.reason)} <span class="share-tag">${escapeHtml(forWhomLabel(exp, people))} · ${escapeHtml(t("paidBy"))} ${escapeHtml(personName(exp.paidBy, people))} · ${escapeHtml(formatDate(exp.date))}</span></span><span>${money(exp.amount, currency)}</span></li>`)
        .join("");
      return `<div class="currency-total"><div class="currency-total-head"><h4>${currency}</h4><span class="total-pill large"><span>${formatNum(total)}</span><span class="ccy">${currency}</span></span></div><ul class="breakdown">${items}</ul></div>`;
    }).join("");

    const activeTotals = CURRENCIES.filter((c) => (tripTotals[c] || 0) > 0);
    const combinedSummary = activeTotals.length ? activeTotals.map((c) => money(tripTotals[c], c)).join(" + ") : t("nothingYet");
    const tripHtml = hasAny
      ? `<article class="person-card trip-totals"><h3>${tripName ? escapeHtml(tripName) + dash : ""}${escapeHtml(t("tripTotals"))}</h3>
          <p class="trip-totals-note">${escapeHtml(t("tripTotalsNote"))}</p>
          <div class="totals trip-total-pills">${activeTotals.map((c) => `<span class="total-pill large"><span>${formatNum(tripTotals[c])}</span><span class="ccy">${c}</span></span>`).join("")}</div>
          <p class="combined-line"><span class="label">${escapeHtml(t("total"))}</span> ${escapeHtml(combinedSummary)}</p>${currencyBlocks}</article>`
      : "";

    els.reportBody.innerHTML = `<div class="report-block"><h3 class="report-subhead">${escapeHtml(t("byPerson"))}</h3>${peopleHtml}${settleHtml}</div>${
      tripHtml ? `<div class="report-block"><h3 class="report-subhead">${escapeHtml(t("byCurrency"))}</h3>${tripHtml}</div>` : ""
    }`;
  }

  function schedulePush() {
    if (session?.mode !== "shared") return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushShared, 400);
  }

  async function pushShared() {
    if (session?.mode !== "shared" || pushing) return;
    pushing = true;
    setBanner(t("syncSaving"), "info");
    try {
      const body = await api(`/api/trips/${encodeURIComponent(session.code)}`, {
        method: "PUT",
        body: JSON.stringify({
          version: state.version,
          tripName: state.tripName,
          people: state.people,
          expenses: state.expenses,
        }),
      });
      applyTripPayload(body.trip, body);
      setBanner(t("syncOnline"), "ok");
      renderAll(false);
    } catch (err) {
      if (err.status === 409 && err.body?.trip) {
        applyTripPayload(err.body.trip);
        setBanner(t("syncOnline"), "ok");
        renderAll(false);
      } else if (err.status === 404) {
        handleTripGone();
      } else {
        setBanner(t("syncError"), "warn");
      }
    } finally {
      pushing = false;
    }
  }

  async function pollShared() {
    if (session?.mode !== "shared" || !session.code || !session.token) return;
    try {
      const body = await api(`/api/trips/${encodeURIComponent(session.code)}/sync?since=${state.version}`);
      if (body.changed && body.trip) {
        applyTripPayload(body.trip, body);
        renderAll(false);
      }
      setBanner(t("syncOnline"), "ok");
    } catch (err) {
      if (err.status === 404 || err.status === 401) handleTripGone();
      else setBanner(t("syncError"), "warn");
    }
  }

  function startPolling() {
    stopPolling();
    if (session?.mode === "shared") pollTimer = setInterval(pollShared, POLL_MS);
  }
  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  function handleTripGone() {
    stopPolling();
    session = null;
    saveSession();
    state.tripName = "";
    state.people = [defaultPersonName(1), defaultPersonName(2)];
    state.expenses = [];
    state.version = 0;
    alert(t("tripMissing"));
    renderAll();
  }

  async function createSharedTrip() {
    const creatorName = (els.creatorName.value || "").trim();
    const tripName = (els.newTripName.value || "").trim();
    if (!creatorName) return alert(t("needName"));
    if (!tripName) return alert(t("needTripName"));
    if (!(await probeApi())) return alert(t("syncError"));
    try {
      const body = await api("/api/trips", {
        method: "POST",
        body: JSON.stringify({ tripName, creatorName }),
      });
      session = { mode: "shared", code: body.joinCode, token: body.token, isCreator: true };
      saveSession();
      applyTripPayload(body.trip, body);
      history.replaceState({}, "", `?code=${encodeURIComponent(body.joinCode)}`);
      startPolling();
      renderAll();
    } catch {
      alert(t("syncError"));
    }
  }

  async function joinSharedTrip(codeOverride, nameOverride) {
    const code = String(codeOverride || els.joinCodeInput.value || "").trim().toUpperCase();
    const name = String(nameOverride || els.creatorName.value || "").trim();
    if (!code) return alert(t("needJoinCode"));
    if (!name) return alert(t("needName"));
    if (!(await probeApi())) return alert(t("syncError"));
    try {
      const body = await api("/api/trips/join", {
        method: "POST",
        body: JSON.stringify({ code, name }),
      });
      session = { mode: "shared", code: body.joinCode, token: body.token, isCreator: false };
      saveSession();
      applyTripPayload(body.trip, body);
      history.replaceState({}, "", `?code=${encodeURIComponent(body.joinCode)}`);
      startPolling();
      renderAll();
    } catch (err) {
      if (err.body?.error === "trip_full") alert(t("tripFull"));
      else if (err.status === 404) alert(t("tripMissing"));
      else alert(t("syncError"));
    }
  }

  async function resumeShared() {
    if (!(await probeApi())) {
      setBanner(t("syncOffline"), "warn");
      return false;
    }
    try {
      const body = await api(`/api/trips/${encodeURIComponent(session.code)}`);
      applyTripPayload(body.trip, body);
      startPolling();
      return true;
    } catch (err) {
      if (err.status === 404 || err.status === 401) {
        session = null;
        saveSession();
      }
      return false;
    }
  }

  function enterLocalMode() {
    stopPolling();
    session = { mode: "local" };
    saveSession();
    renderAll();
  }

  function leaveShared() {
    stopPolling();
    session = null;
    saveSession();
    history.replaceState({}, "", location.pathname);
    renderAll();
  }

  async function resetTrip() {
    if (!session?.isCreator) return alert(t("creatorOnlyReset"));
    if (!confirm(t("resetConfirm"))) return;
    try {
      await api(`/api/trips/${encodeURIComponent(session.code)}/reset`, { method: "POST", body: "{}" });
      handleTripGone();
    } catch (err) {
      if (err.status === 404) handleTripGone();
      else alert(t("syncError"));
    }
  }

  function downloadSaveFile() {
    const data = activeData();
    const payload = {
      tripName: data.tripName,
      people: data.people,
      expenses: data.expenses,
      savedAt: new Date().toISOString(),
      mode: session?.mode || "local",
      code: session?.code || null,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const base = (data.tripName || "splittrip").trim().replace(/\s+/g, "-") || "splittrip";
    a.href = url;
    a.download = `${base}-${todayISO()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    alert(t("savedToast"));
  }

  function openPdfModal() {
    if (!activeData().expenses.length) return alert(t("pdfEmpty"));
    els.pdfModal.hidden = false;
  }
  function closePdfModal() {
    els.pdfModal.hidden = true;
  }

  function buildPdfHtml(reportLang) {
    const people = activePeople();
    const { perPerson, tripTotals } = computeReport();
    const hints = settlementHints(perPerson);
    const data = activeData();
    const tripName = (data.tripName || "").trim() || "SplitTrip";
    const dir = reportLang === "fa" ? "rtl" : "ltr";
    const arrow = reportLang === "fa" ? "←" : "→";
    const sep = reportLang === "fa" ? "، " : ", ";
    const paymentRows = [...data.expenses]
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
      .map(
        (exp) => `<tr><td>${escapeHtml(formatDate(exp.date, reportLang))}</td><td>${escapeHtml(exp.reason)}</td><td>${escapeHtml(money(exp.amount, exp.currency, reportLang))}</td><td>${escapeHtml(personName(exp.paidBy, people))}</td><td>${escapeHtml(forWhomLabel(exp, people, reportLang))}</td></tr>`
      )
      .join("");
    const personBlocks = perPerson
      .map((person) => {
        const shareBits = CURRENCIES.filter((c) => person.share[c] > 0).map((c) => money(person.share[c], c, reportLang)).join(sep);
        const paidBits = CURRENCIES.filter((c) => person.paid[c] > 0).map((c) => money(person.paid[c], c, reportLang)).join(sep);
        const netBits = CURRENCIES.filter((c) => Math.abs(person.net[c]) > 0.005)
          .map((c) => `${money(Math.abs(person.net[c]), c, reportLang)} ${person.net[c] > 0 ? tLang(reportLang, "owed") : tLang(reportLang, "owes")}`)
          .join(sep);
        return `<section class="block"><h3>${escapeHtml(person.name)}</h3><p><strong>${escapeHtml(tLang(reportLang, "share"))}:</strong> ${escapeHtml(shareBits || "0")}</p><p><strong>${escapeHtml(tLang(reportLang, "paid"))}:</strong> ${escapeHtml(paidBits || "0")}</p><p><strong>${escapeHtml(tLang(reportLang, "net"))}:</strong> ${escapeHtml(netBits || tLang(reportLang, "settled"))}</p></section>`;
      })
      .join("");
    const settleRows = hints.length
      ? hints.map((h) => `<tr><td>${escapeHtml(h.from)} ${arrow} ${escapeHtml(h.to)}</td><td>${escapeHtml(money(h.amount, h.currency, reportLang))}</td></tr>`).join("")
      : `<tr><td colspan="2">${escapeHtml(tLang(reportLang, "settleEven"))}</td></tr>`;
    const tripBits = CURRENCIES.filter((c) => (tripTotals[c] || 0) > 0).map((c) => money(tripTotals[c], c, reportLang)).join(" + ");
    return `<!DOCTYPE html><html lang="${reportLang === "fa" ? "fa" : "en"}" dir="${dir}"><head><meta charset="UTF-8" /><title>${escapeHtml(tripName)} — SplitTrip</title>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&family=Vazirmatn:wght@400;600;700&display=swap" rel="stylesheet" />
<style>body{font-family:${reportLang === "fa" ? '"Vazirmatn",' : ""}Figtree,system-ui,sans-serif;color:#10221c;margin:24px;line-height:1.45}h1{margin:0 0 .25rem;font-size:1.6rem}h2{margin:1.4rem 0 .5rem;font-size:1.15rem;border-bottom:1px solid #d7e0db;padding-bottom:.3rem}table{width:100%;border-collapse:collapse;margin:.5rem 0 1rem;font-size:.92rem}th,td{border:1px solid #d7e0db;padding:.45rem .55rem;text-align:start}th{background:#eef5f1}.block{margin-bottom:.85rem;padding:.65rem .75rem;border:1px solid #d7e0db;border-radius:8px}.hint{color:#3a5248;font-size:.85rem;margin-top:1.25rem}@media print{.hint{display:none}}</style></head><body>
<h1>SplitTrip — ${escapeHtml(tripName)}</h1>
<p>${escapeHtml(tLang(reportLang, "pdfGenerated"))}: ${escapeHtml(formatDate(todayISO(), reportLang))}</p>
<h2>${escapeHtml(tLang(reportLang, "pdfPayments"))}</h2>
<table><thead><tr><th>${escapeHtml(tLang(reportLang, "date"))}</th><th>${escapeHtml(tLang(reportLang, "purpose"))}</th><th>${escapeHtml(tLang(reportLang, "amount"))}</th><th>${escapeHtml(tLang(reportLang, "whoPaid"))}</th><th>${escapeHtml(tLang(reportLang, "whoFor"))}</th></tr></thead><tbody>${paymentRows}</tbody></table>
<h2>${escapeHtml(tLang(reportLang, "byPerson"))}</h2>${personBlocks}
<h2>${escapeHtml(tLang(reportLang, "settleUp"))}</h2><table><tbody>${settleRows}</tbody></table>
<h2>${escapeHtml(tLang(reportLang, "tripTotals"))}</h2><p><strong>${escapeHtml(tLang(reportLang, "total"))}:</strong> ${escapeHtml(tripBits || tLang(reportLang, "nothingYet"))}</p>
<p class="hint">${escapeHtml(tLang(reportLang, "pdfHint"))}</p>
<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),350));<\/script></body></html>`;
  }

  function generatePdf(reportLang) {
    closePdfModal();
    if (!activeData().expenses.length) return alert(t("pdfEmpty"));
    const w = window.open("", "_blank");
    if (!w) return alert(t("pdfHint"));
    w.document.open();
    w.document.write(buildPdfHtml(reportLang));
    w.document.close();
  }

  function renderAll(persistLocal = true) {
    renderModeChrome();
    if (session?.mode === "shared") {
      els.tripName.value = state.tripName;
    } else if (session?.mode === "local") {
      els.localTripName.value = localState.tripName;
      if (persistLocal) saveLocal();
    }
    renderPeopleInputs();
    renderPicks();
    syncModeUI();
    renderExpenses();
    renderReport();
  }

  // Events
  els.langEn.addEventListener("click", () => setLang("en"));
  els.langFa.addEventListener("click", () => setLang("fa"));
  els.createTripBtn.addEventListener("click", createSharedTrip);
  els.joinTripBtn.addEventListener("click", () => joinSharedTrip());
  els.localModeBtn.addEventListener("click", enterLocalMode);
  els.backToShareBtn.addEventListener("click", leaveShared);
  els.leaveTripBtn.addEventListener("click", leaveShared);
  els.resetTripBtn.addEventListener("click", resetTrip);
  els.copyShareBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.shareLinkInput.value);
      alert(t("copied"));
    } catch {
      els.shareLinkInput.select();
    }
  });

  els.tripName.addEventListener("input", () => {
    state.tripName = els.tripName.value;
    schedulePush();
    renderReport();
  });
  els.localTripName.addEventListener("input", () => {
    localState.tripName = els.localTripName.value;
    saveLocal();
    renderReport();
  });

  function onPeopleInput(e, shared) {
    const input = e.target.closest("input[data-person-index]");
    if (!input) return;
    const index = Number(input.dataset.personIndex);
    const data = shared ? state : localState;
    data.people[index] = input.value;
    if (shared) schedulePush();
    else saveLocal();
    renderPicks();
    renderExpenses();
    renderReport();
  }
  els.peopleInputs.addEventListener("input", (e) => onPeopleInput(e, true));
  els.localPeopleInputs.addEventListener("input", (e) => onPeopleInput(e, false));

  els.addPersonBtn.addEventListener("click", () => {
    if (state.people.length >= MAX_PEOPLE) return;
    state.people.push(defaultPersonName(state.people.length + 1));
    schedulePush();
    renderAll();
  });
  els.localAddPersonBtn.addEventListener("click", () => {
    if (localState.people.length >= MAX_PEOPLE) return;
    localState.people.push(defaultPersonName(localState.people.length + 1));
    renderAll();
  });
  els.clearDataBtn.addEventListener("click", () => {
    if (!confirm(t("clearConfirm"))) return;
    localState.tripName = "";
    localState.people = [defaultPersonName(1), defaultPersonName(2)];
    localState.expenses = [];
    renderAll();
  });

  document.querySelectorAll('input[name="mode"]').forEach((radio) => radio.addEventListener("change", syncModeUI));

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
      personIds = [...document.querySelectorAll('input[name="sharedPeople"]:checked')].map((el) => Number(el.value));
      if (!personIds.length) return alert(t("pickShared"));
    }
    const data = activeData();
    data.expenses.unshift({ id: uid(), amount, currency, reason, mode, personIds, paidBy, date, createdAt: Date.now() });
    els.expenseForm.reset();
    document.querySelector('input[name="mode"][value="personal"]').checked = true;
    els.expenseDate.value = todayISO();
    if (session?.mode === "shared") schedulePush();
    else saveLocal();
    renderPicks();
    syncModeUI();
    renderExpenses();
    renderReport();
    els.amount.focus();
  });

  els.expenseList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    const id = btn.getAttribute("data-remove");
    const data = activeData();
    data.expenses = data.expenses.filter((exp) => exp.id !== id);
    if (session?.mode === "shared") schedulePush();
    else saveLocal();
    renderExpenses();
    renderReport();
  });

  els.saveBtn.addEventListener("click", downloadSaveFile);
  els.pdfBtn.addEventListener("click", openPdfModal);
  els.pdfEnBtn.addEventListener("click", () => generatePdf("en"));
  els.pdfFaBtn.addEventListener("click", () => generatePdf("fa"));
  els.pdfModal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closePdfModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.pdfModal.hidden) closePdfModal();
  });

  async function boot() {
    els.expenseDate.value = todayISO();
    applyStaticI18n();
    await probeApi();
    const params = new URLSearchParams(location.search);
    const codeFromUrl = (params.get("code") || "").trim().toUpperCase();
    if (codeFromUrl) els.joinCodeInput.value = codeFromUrl;

    if (session?.mode === "shared" && session.code && session.token) {
      const ok = await resumeShared();
      if (!ok && codeFromUrl) {
        // keep join form prefilled
      }
    } else if (codeFromUrl && apiAvailable) {
      // wait for user name + join
      session = null;
    } else if (session?.mode === "local") {
      // keep local
    } else {
      session = null;
    }
    renderAll();
  }

  boot();
})();
