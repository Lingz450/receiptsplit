# ReceiptSplit - P2P Bill Splitting on Trac Network

ReceiptSplit is a peer-to-peer bill splitting app built on the Trac Network Intercom stack.
State is deterministic and replicated across peers with no central server.

Participants are identified by `tx.address`. When every participant has paid their share, the contract logs `Bill fully settled!`.

---

## Trac Address (for payouts)

`trac1ey2t8yahmxqf6zfhgrfnd82pth7lxcve4zxrq3eqhufhgyky5jeqmg6raw`

---

## Features (41 commands)

| Command | Description |
|---|---|
| `bill_create` | Create bill with title, currency, creator name, optional tags. |
| `bill_join` | Join a bill as participant. |
| `bill_add_item` | Add item with amount and optional `split_between` addresses. |
| `bill_remove_item` | Remove item by index. |
| `bill_edit_item` | Edit an existing item in-place (description, amount, and/or split_between). |
| `bill_settle` | Pay your full remaining balance, optional proof. |
| `bill_pay` | Add partial payment amount, optional proof. |
| `bill_close` | Creator closes bill for edits/joins. |
| `bill_reopen` | Creator reopens a closed bill. |
| `bill_leave` | Participant leaves bill (with safety checks). |
| `bill_note` | Add note to bill (up to 25). |
| `bill_rename` | Update your own display name on a bill. |
| `bill_add_editor` | Creator grants an editor permission (edit items). |
| `bill_remove_editor` | Creator revokes an editor permission. |
| `bill_list_editors` | List editors on a bill. |
| `bill_anchor_receipt` | Anchor a receipt hash + optional note in contract state. |
| `bill_set_invite` | Creator sets an invite code (optional ttl). |
| `bill_join_code` | Join a bill using an invite code + your name. |
| `bill_get` | Full bill details including weighted ledger and breakdown. |
| `bill_balance` | Per-participant due/paid/remaining summary. |
| `bill_debt` | Optimal debt simplification — minimal transfers to settle all balances. |
| `bill_activity` | Recent bill activity log entries. |
| `bill_export` | Export full bill data as JSON string. |
| `bill_copy` | Copy a bill's items into a new bill (great for recurring expenses). |
| `template_save` | Save a bill’s metadata as a reusable template. |
| `template_list` | List recent templates. |
| `template_get` | Get template details. |
| `template_create` | Create a new bill from a template. |
| `group_create` | Create a group to collect multiple bills (trip, project, household). |
| `group_add_bill` | Add a bill to a group. |
| `group_get` | Fetch a group with its bill summaries. |
| `group_list` | List recent groups. |
| `bill_list` | List bills with filters (`currency`, `tag`, `creator_address`, `closed`, `settled`, `include_archived`). |
| `bill_stats` | Global stats including paid/outstanding totals and tag/currency counts. |
| `bill_update` | Creator updates title, currency, tags (open bills). |
| `bill_unsettle` | Remove your payment/settled state (unless fully settled). |
| `bill_tip` | Add flat or percent tip, optional `split_between`. |
| `bill_set_weights` | Creator sets weighted split map (`addr=2,addr2=1`). |
| `bill_deadline` | Creator sets (or clears) a payment deadline string on a bill. |
| `bill_archive` | Creator archives a bill (also closes it). |
| `bill_unarchive` | Creator unarchives a bill. |

---

## Quick Start (Pear Runtime Only)

Use Pear runtime (not native Node process invocation).

Admin:
```bash
npm install
pear run . --peer-store-name admin --msb-store-name admin-msb --subnet-channel receiptsplit-v1
```

Joiner:
```bash
pear run . --peer-store-name joiner --msb-store-name joiner-msb \
  --subnet-channel receiptsplit-v1 \
  --subnet-bootstrap <admin-writer-key-hex>
```

---

## Usage Examples

Create:
```bash
/tx --command '{ "op": "bill_create", "title": "Team Dinner", "currency": "USD", "creator_name": "Alice", "tags": "food,team" }'
```

Join:
```bash
/tx --command '{ "op": "bill_join", "id": 1, "name": "Bob" }'
```

Add items (global and targeted):
```bash
/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Pizza", "amount": 36 }'
/tx --command '{ "op": "bill_add_item", "id": 1, "description": "Wine", "amount": 30, "split_between": "trac1bob...,trac1carol..." }'
```

Set weighted split (creator):
```bash
/tx --command '{ "op": "bill_set_weights", "id": 1, "weights": "trac1alice...=2,trac1bob...=1,trac1carol...=1" }'
```

Partial payment and full settle:
```bash
/tx --command '{ "op": "bill_pay", "id": 1, "amount": 10, "proof": "cash" }'
/tx --command '{ "op": "bill_settle", "id": 1, "proof": "txid-abc123" }'
```

Inspect:
```bash
/tx --command '{ "op": "bill_get", "id": 1 }'
/tx --command '{ "op": "bill_balance", "id": 1 }'
/tx --command '{ "op": "bill_activity", "id": 1, "limit": 30 }'
```

Tip:
```bash
/tx --command '{ "op": "bill_tip", "id": 1, "percent": 18 }'
/tx --command '{ "op": "bill_tip", "id": 1, "amount": 5, "split_between": "trac1bob..." }'
```

List / stats:
```bash
/tx --command '{ "op": "bill_list", "limit": 20, "currency": "USD", "closed": false, "settled": false }'
/tx --command '{ "op": "bill_stats" }'
```

Archive lifecycle:
```bash
/tx --command '{ "op": "bill_archive", "id": 1 }'
/tx --command '{ "op": "bill_unarchive", "id": 1 }'
```

Edit an item in-place:
```bash
/tx --command '{ "op": "bill_edit_item", "id": 1, "item_index": 0, "description": "Salad", "amount": 15 }'
/tx --command '{ "op": "bill_edit_item", "id": 1, "item_index": 1, "split_between": "trac1bob..." }'
```

Debt simplification (who owes whom):
```bash
/tx --command '{ "op": "bill_debt", "id": 1 }'
```

Copy a bill's items to a new bill:
```bash
/tx --command '{ "op": "bill_copy", "id": 1, "title": "March Dinner", "creator_name": "Alice" }'
/tx --command '{ "op": "bill_copy", "id": 1, "title": "Repeat Trip", "creator_name": "Alice", "currency": "EUR" }'
```

Set or clear a payment deadline:
```bash
/tx --command '{ "op": "bill_deadline", "id": 1, "deadline": "2026-03-01" }'
/tx --command '{ "op": "bill_deadline", "id": 1 }'
```

Rename yourself on a bill:

```bash
/tx --command '{ "op": "bill_rename", "id": 1, "name": "Alexandra" }'
```

Editors (permissions):
```bash
/tx --command '{ "op": "bill_add_editor", "id": 1, "editor_address": "trac1..." }'
/tx --command '{ "op": "bill_remove_editor", "id": 1, "editor_address": "trac1..." }'
/tx --command '{ "op": "bill_list_editors", "id": 1 }'
```

Receipt hash anchoring:
```bash
/tx --command '{ "op": "bill_anchor_receipt", "id": 1, "hash": "abcd1234...", "note": "receipt photo" }'
```

Invite codes (join without knowing bill id):
```bash
/tx --command '{ "op": "bill_set_invite", "id": 1, "code": "DINNER-2026", "ttl_sec": 86400 }'
/tx --command '{ "op": "bill_join_code", "code": "DINNER-2026", "name": "Bob" }'
```

Templates (recurring):
```bash
/tx --command '{ "op": "template_save", "id": 1, "name": "Monthly dinner" }'
/tx --command '{ "op": "template_list", "limit": 10 }'
/tx --command '{ "op": "template_get", "template_id": 1 }'
/tx --command '{ "op": "template_create", "template_id": 1, "creator_name": "Alice", "title": "April dinner" }'
```

Groups (collections of bills):
```bash
/tx --command '{ "op": "group_create", "name": "NYC Trip" }'
/tx --command '{ "op": "group_add_bill", "group_id": 1, "bill_id": 3 }'
/tx --command '{ "op": "group_get", "group_id": 1 }'
/tx --command '{ "op": "group_list", "limit": 10 }'
```

---

## What Is App-Specific

- `contract/contract.js`: ReceiptSplit business logic
- `contract/protocol.js`: command mapping and CLI command help
- runtime/network stack remains Intercom/Pear-based
