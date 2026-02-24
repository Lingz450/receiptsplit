# ReceiptSplit — P2P Bill Splitting on Trac Network

A **full-featured** peer-to-peer bill splitting app built on [Trac Network](https://github.com/Trac-Systems/intercom)'s **Intercom** stack. Create shared bills, add participants, add or remove line items, attach notes, lock bills, and track who has settled — with optional settlement proof. All state is deterministic and replicated; no central server.

Participants are identified by peer address (`tx.address`). When all participants are settled, the contract logs **"Bill fully settled!"**.

---

## Trac Address (for payouts)

trac1ey2t8yahmxqf6zfhgrfnd82pth7lxcve4zxrq3eqhufhgyky5jeqmg6raw

---

## Features (17 commands)

| Command | Description |
|--------|-------------|
| **bill_create** | Create a bill (title, currency, creator name, optional tags). |
| **bill_join** | Join a bill as participant (id, name). Rejected if bill is closed. |
| **bill_add_item** | Add a line item (id, description, amount). Per-person split recalculates. |
| **bill_remove_item** | Remove a line item by index (id, item_index). Creator/participants; bill must be open. |
| **bill_assign_item** | Assign an item to specific participants (id, item_index, assignees). Used for itemized splits. |
| **bill_set_payer** | Set who paid for an item (id, item_index, payer_address). |
| **bill_set_split_mode** | Set split mode: `equal`, `weights`, or `itemized` (creator only). |
| **bill_set_weight** | Set your own weight for weighted splits (id, weight). |
| **bill_settle** | Mark yourself as paid (id, optional proof e.g. txid or "paid cash"). |
| **bill_close** | Creator locks the bill: no more joins or item add/remove. |
| **bill_leave** | Leave a bill (id). Only if you haven’t settled; creator cannot leave. |
| **bill_note** | Add a note to a bill (id, text). Up to 10 notes per bill. |
| **bill_get** | Full bill details: items, participants, notes, tags, total, perPerson, settled, closed. |
| **bill_balances** | Show paid/owed/net per participant for the current split mode. |
| **bill_export** | Export bill as JSON string (for backup or sharing). |
| **bill_list** | List bills with optional filters: limit, currency, tag, creator_address. |
| **bill_stats** | Global stats: total bills, participants, items, amount, closed/settled counts, by currency. |
| **bill_update** | Creator updates a bill’s title, currency, and/or tags (bill must be open). |
| **bill_unsettle** | Reverse your own settlement (bill must not be fully settled yet). |
| **bill_reopen** | Creator reopens a closed bill (allows joins and item changes again). |
| **bill_tip** | Add a tip to the bill — flat amount or percentage of current total. |

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

## Usage (all 17 commands)

Trigger transactions with `/tx --command '...'`. Use `--sim 1` to dry-run before broadcasting.

### Create a bill (with optional tags)
```bash
/tx --command '{ "op": "bill_create", "title": "Team Dinner", "currency": "USD", "creator_name": "Alice", "tags": "food,team" }'
```

### Join a bill
```bash
/tx --command '{ "op": "bill_join", "id": 1, "name": "Bob" }'
/tx --command '{ "op": "bill_join", "id": 1, "name": "Carol" }'
```

### Add line items
```bash
/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Pizza", "amount": 36 }'
/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Drinks", "amount": 12 }'
```

### Remove a line item (by index, 0-based)
```bash
/tx --command '{ "op": "bill_remove_item", "id": 1, "item_index": 0 }'
```

### Advanced split mode (creator) + weights (each participant)

Set split mode:
```bash
/tx --command '{ "op": "bill_set_split_mode", "id": 1, "mode": "weights" }'
```

Each participant sets their own weight:
```bash
/tx --command '{ "op": "bill_set_weight", "id": 1, "weight": 2 }'
```

### Itemized splitting (assign items to specific people)

Switch to itemized:
```bash
/tx --command '{ "op": "bill_set_split_mode", "id": 1, "mode": "itemized" }'
```

Assign item index 0 to specific participants (comma-separated peer addresses):
```bash
/tx --command '{ "op": "bill_assign_item", "id": 1, "item_index": 0, "assignees": "trac1...,trac1..." }'
```

Set who paid for item index 0:
```bash
/tx --command '{ "op": "bill_set_payer", "id": 1, "item_index": 0, "payer_address": "trac1..." }'
```

### Get bill (full details)
```bash
/tx --command '{ "op": "bill_get", "id": 1 }'
```

### Show balances (paid/owed/net)
```bash
/tx --command '{ "op": "bill_balances", "id": 1 }'
```

### Settle with optional proof
```bash
/tx --command '{ "op": "bill_settle", "id": 1 }'
/tx --command '{ "op": "bill_settle", "id": 1, "proof": "txid-abc123" }'
```

### Close a bill (creator only)
```bash
/tx --command '{ "op": "bill_close", "id": 1 }'
```

### Leave a bill (non-creator, only if not settled)
```bash
/tx --command '{ "op": "bill_leave", "id": 1 }'
```

### Add a note
```bash
/tx --command '{ "op": "bill_note", "id": 1, "text": "Paid in cash at the table." }'
```

### Export bill as JSON
```bash
/tx --command '{ "op": "bill_export", "id": 1 }'
```

### List bills (with optional filters)
```bash
/tx --command '{ "op": "bill_list", "limit": 10 }'
/tx --command '{ "op": "bill_list", "limit": 20, "currency": "USD" }'
/tx --command '{ "op": "bill_list", "limit": 20, "tag": "food" }'
/tx --command '{ "op": "bill_list", "limit": 20, "creator_address": "trac1..." }'
```

### Global stats
```bash
/tx --command '{ "op": "bill_stats" }'
```

### Update a bill (creator only, while open)

```bash
/tx --command '{ "op": "bill_update", "id": 1, "title": "Team Lunch", "currency": "EUR" }'
/tx --command '{ "op": "bill_update", "id": 1, "tags": "lunch,team" }'
```

### Reverse your own settlement

```bash
/tx --command '{ "op": "bill_unsettle", "id": 1 }'
```

### Reopen a closed bill (creator only)

```bash
/tx --command '{ "op": "bill_reopen", "id": 1 }'
```

### Add a tip (flat amount or percentage of total)

```bash
/tx --command '{ "op": "bill_tip", "id": 1, "amount": 10 }'
/tx --command '{ "op": "bill_tip", "id": 1, "percent": 18 }'
```

---

## Example session: Alice, Bob, Carol

- **Alice** creates the bill with tags and adds items:
  - `/tx --command '{ "op": "bill_create", "title": "Weekend BBQ", "currency": "USD", "creator_name": "Alice", "tags": "food,weekend" }'`
  - `/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Grill", "amount": 45 }'`
  - `/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Sides", "amount": 21 }'`

- **Bob** and **Carol** join:
  - Bob: `/tx --command '{ "op": "bill_join", "id": 1, "name": "Bob" }'`
  - Carol: `/tx --command '{ "op": "bill_join", "id": 1, "name": "Carol" }'`

- **Alice** adds a note and checks the split:
  - `/tx --command '{ "op": "bill_note", "id": 1, "text": "Split evenly between the three of us." }'`
  - `/tx --command '{ "op": "bill_get", "id": 1 }'` → Total 66, 3 participants → **22 per person**.

- All three settle (optional proof):
  - Alice: `/tx --command '{ "op": "bill_settle", "id": 1, "proof": "cash" }'`
  - Bob: `/tx --command '{ "op": "bill_settle", "id": 1 }'`
  - Carol: `/tx --command '{ "op": "bill_settle", "id": 1 }'`

- **Alice** closes the bill and exports:
  - `/tx --command '{ "op": "bill_close", "id": 1 }'`
  - `/tx --command '{ "op": "bill_export", "id": 1 }'`

- After the last settle, the contract logs: **Bill fully settled!**

---

## Competition links

- Intercom (template): [https://github.com/Trac-Systems/intercom](https://github.com/Trac-Systems/intercom)
- Awesome Intercom (accepted apps): [https://github.com/Trac-Systems/awesome-intercom](https://github.com/Trac-Systems/awesome-intercom)

---

## What this repo is

- A **fork** of Trac-Systems/intercom with the default contract/protocol replaced by **ReceiptSplit**: 12 commands (create, join, add_item, remove_item, settle, close, leave, note, get, export, list, stats), with tags, notes, settlement proof, and list filters.
- Uses the same **Pear** runtime, subnet, and sidechannel stack; only `contract/contract.js` and `contract/protocol.js` are app-specific.
- For agent and operational details, see **`SKILL.md`** in this repo.
