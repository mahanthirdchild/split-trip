# SplitTrip

Local trip expense tracker for up to 5 people across **EUR**, **GBP**, and **USD**.

- Enter **personal** amounts for one person, or **shared** amounts split evenly among the people you select
- Every line needs **purpose**, **who paid**, and a **date** (defaults to today, editable)
- The **report** shows each person’s share, amount paid, and **net** (paid − share), plus settle-up hints and trip totals by currency

## Run locally

From this folder:

```bash
cd trip-expenses
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [http://127.0.0.1:8765](http://127.0.0.1:8765) in your browser.

Or open `index.html` directly in a browser — no install required. Data is saved in that browser’s local storage.

## On your phone (no install)

Use the single file **`SplitTrip-mobile.html`**:

1. Download it to your phone (Files / Downloads)
2. Open it in Safari or Chrome
3. Optional: Share → **Add to Home Screen**

Everything is in that one file. Data stays in that browser’s storage on the phone.

## Your example

| Expense | Amount | Type |
| --- | --- | --- |
| Hotels | 1000 EUR | Shared (2 people) → 500 each |
| Taxi | 150 EUR | Shared (2 people) → 75 each |
| Clothes | 45 GBP | Person 1 personal |
| Shoes | 36 EUR | Person 2 personal |

If Person 1 paid hotels (1000) and taxi (150), and each paid their own personal items:

**Per person (EUR example)**

- Person 1 share **575**, paid **1,150**, net **+575 owed**
- Person 2 share **611**, paid **36**, net **−575 owes**
- Settle up: Person 2 → Person 1 **575 EUR**

**Trip totals (regardless of person)**

- **1,186 EUR** + **45 GBP**
