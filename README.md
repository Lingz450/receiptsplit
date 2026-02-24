# ReceiptSplit — P2P Bill Splitting on Trac Network

A peer-to-peer bill splitting app built on [Trac Network](https://github.com/Trac-Systems/intercom)'s **Intercom** stack. Create shared bills, add participants, add line items, and track who has settled — all over deterministic replicated contract state. No central server.

**Features:**
- **bill_create** — Create a new bill (title, currency, creator name).
- **bill_join** — Join an existing bill as a participant (by bill id and your name).
- **bill_add_item** — Add a line item (description, amount); per-person split recalculates automatically.
- **bill_settle** — Mark yourself as paid/settled on a bill.
- **bill_get** — Fetch full bill details including total, per-person amount, and settled status.
- **bill_list** — List recent bills (optional limit, max 50).

Participants are identified by peer address (`tx.address`). When all participants are settled, the contract logs **"Bill fully settled!"**.

---

## Trac Address (for payouts)

trac1ey2t8yahmxqf6zfhgrfnd82pth7lxcve4zxrq3eqhufhgyky5jeqmg6raw

---

## Quick start (Pear runtime only)

Use **Pear runtime only** (never native Node). See `SKILL.md` in this repo for full setup (Node 22+, Pear, subnet channel, admin/joiner).

**Admin (create subnet):**
```bash
npm install
pear run . --peer-store-name admin --msb-store-name admin-msb --subnet-channel receiptsplit-v1
```

**Joiner:** Copy the admin **Peer Writer** key (hex) from the admin banner, then:
```bash
pear run . --peer-store-name joiner --msb-store-name joiner-msb \
  --subnet-channel receiptsplit-v1 \
  --subnet-bootstrap <admin-writer-key-hex>
```

---

## Usage (all 6 commands)

Trigger transactions with `/tx --command '...'`. Use `--sim 1` to dry-run before broadcasting.

### 1. Create a bill
```bash
/tx --command '{ "op": "bill_create", "title": "Team Dinner", "currency": "USD", "creator_name": "Alice" }'
```

### 2. Join a bill
```bash
/tx --command '{ "op": "bill_join", "id": 1, "name": "Bob" }'
/tx --command '{ "op": "bill_join", "id": 1, "name": "Carol" }'
```

### 3. Add line items
```bash
/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Pizza", "amount": 36 }'
/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Drinks", "amount": 12 }'
```

### 4. Get bill (total, per-person split, settled status)
```bash
/tx --command '{ "op": "bill_get", "id": 1 }'
```

### 5. Mark yourself as settled
```bash
/tx --command '{ "op": "bill_settle", "id": 1 }'
```

### 6. List recent bills
```bash
/tx --command '{ "op": "bill_list", "limit": 10 }'
```

---

## Example session: Alice, Bob, Carol

- **Alice** creates the bill and adds items:
  - `/tx --command '{ "op": "bill_create", "title": "Weekend BBQ", "currency": "USD", "creator_name": "Alice" }'`
  - `/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Grill", "amount": 45 }'`
  - `/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Sides", "amount": 21 }'`

- **Bob** and **Carol** join:
  - Bob: `/tx --command '{ "op": "bill_join", "id": 1, "name": "Bob" }'`
  - Carol: `/tx --command '{ "op": "bill_join", "id": 1, "name": "Carol" }'`

- **Alice** checks the split:
  - `/tx --command '{ "op": "bill_get", "id": 1 }'`
  - Total 66, 3 participants → **22 per person**. Each sees who has settled.

- All three settle one by one:
  - Alice: `/tx --command '{ "op": "bill_settle", "id": 1 }'`
  - Bob: `/tx --command '{ "op": "bill_settle", "id": 1 }'`
  - Carol: `/tx --command '{ "op": "bill_settle", "id": 1 }'`

- After the last settle, the contract logs: **Bill fully settled!**

---

## Competition links

- Intercom (template): [https://github.com/Trac-Systems/intercom](https://github.com/Trac-Systems/intercom)
- Awesome Intercom (accepted apps): [https://github.com/Trac-Systems/awesome-intercom](https://github.com/Trac-Systems/awesome-intercom)

---

## What this repo is

- A **fork** of Trac-Systems/intercom with the default contract/protocol replaced by **ReceiptSplit** (bill create/join/add_item/settle/get/list).
- Uses the same **Pear** runtime, subnet, and sidechannel stack; only `contract/contract.js` and `contract/protocol.js` are app-specific.
- For agent and operational details, see **`SKILL.md`** in this repo.
