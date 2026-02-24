import {Contract} from 'trac-peer'

class SampleContract extends Contract {
  /**
   * ReceiptSplit — P2P Bill Splitting on Trac Network.
   *
   * Massive upgrade pack:
   * - Split modes: equal, weights, itemized
   * - Participant weights
   * - Items track payer + assignees
   * - bill_balances: compute paid/owed/net per participant
   *
   * Still includes: tags, notes, close/leave, settlement proof, export, list filters, stats.
   */
  constructor(protocol, options = {}) {
    super(protocol, options);

    this.addSchema('billCreate', {
      value: {
        $$strict: true,
        $$type: 'object',
        title: { type: 'string', min: 1, max: 200 },
        currency: { type: 'string', min: 1, max: 10 },
        creator_name: { type: 'string', min: 1, max: 128 },
        tags: { type: 'string', optional: true, max: 100 }
      }
    });

    this.addSchema('billJoin', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        name: { type: 'string', min: 1, max: 128 }
      }
    });

    this.addSchema('billAddItem', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        description: { type: 'string', min: 1, max: 200 },
        amount: { type: 'number', min: 0 },
        payer_address: { type: 'string', optional: true, max: 128 },
        assignees: { type: 'string', optional: true, max: 500 }
      }
    });

    this.addSchema('billAssignItem', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        item_index: { type: 'number', integer: true, min: 0 },
        assignees: { type: 'string', min: 1, max: 500 }
      }
    });

    this.addSchema('billSetPayer', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        item_index: { type: 'number', integer: true, min: 0 },
        payer_address: { type: 'string', optional: true, max: 128 }
      }
    });

    this.addSchema('billSetSplitMode', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        mode: { type: 'string', min: 1, max: 16 }
      }
    });

    this.addSchema('billSetWeight', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        weight: { type: 'number', min: 0.1, max: 100 }
      }
    });

    this.addSchema('billRemoveItem', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        item_index: { type: 'number', integer: true, min: 0 }
      }
    });

    this.addSchema('billSettle', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        proof: { type: 'string', optional: true, max: 200 }
      }
    });

    this.addSchema('billClose', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billLeave', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billNote', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        text: { type: 'string', min: 1, max: 300 }
      }
    });

    this.addSchema('billGet', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billBalances', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billExport', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billList', {
      value: {
        $$strict: true,
        $$type: 'object',
        limit: { type: 'number', integer: true, min: 1, max: 50, optional: true },
        currency: { type: 'string', optional: true, max: 10 },
        tag: { type: 'string', optional: true, max: 50 },
        creator_address: { type: 'string', optional: true, max: 128 }
      }
    });

    this.addSchema('billStats', {
      value: {
        $$strict: true,
        $$type: 'object'
      }
    });

    this.addSchema('billUpdate', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        title: { type: 'string', optional: true, min: 1, max: 200 },
        currency: { type: 'string', optional: true, min: 1, max: 10 },
        tags: { type: 'string', optional: true, max: 100 }
      }
    });

    this.addSchema('billUnsettle', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billReopen', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billTip', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        amount: { type: 'number', optional: true, min: 0 },
        percent: { type: 'number', optional: true, min: 0, max: 100 }
      }
    });

    this.addSchema('feature_entry', {
      key: { type: 'string', min: 1, max: 256 },
      value: { type: 'any' }
    });

    const _this = this;
    this.addFeature('timer_feature', async function () {
      if (false === _this.check.validateSchema('feature_entry', _this.op)) return;
      if (_this.op.key === 'currentTime') {
        if (null === await _this.get('currentTime')) console.log('timer started at', _this.op.value);
        await _this.put(_this.op.key, _this.op.value);
      }
    });
  }

  _parseTags(tagsStr) {
    if (!tagsStr || typeof tagsStr !== 'string') return [];
    return tagsStr.split(',').map(t => t.trim()).filter(t => t.length > 0).slice(0, 5);
  }

  _parseAssignees(assigneesStr) {
    if (!assigneesStr || typeof assigneesStr !== 'string') return [];
    const raw = assigneesStr.split(',').map(a => a.trim()).filter(a => a.length > 0);
    const unique = [];
    for (const a of raw) {
      if (!unique.includes(a)) unique.push(a);
      if (unique.length >= 20) break;
    }
    return unique;
  }

  _participantsByAddress(bill) {
    const map = {};
    for (const p of Array.isArray(bill.participants) ? bill.participants : []) {
      if (p && p.address) map[p.address] = p;
    }
    return map;
  }

  _isCreator(bill) {
    return (bill && bill.creator_address) && (this.address === bill.creator_address);
  }

  _computeBalances(bill) {
    const participants = Array.isArray(bill.participants) ? bill.participants : [];
    const items = Array.isArray(bill.items) ? bill.items : [];
    const mode = String(bill.split_mode || 'equal');
    const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};

    const total = items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);

    const paidBy = {};
    for (const p of participants) {
      if (p && p.address) paidBy[p.address] = 0;
    }
    for (const it of items) {
      const payer = it?.payer_address || null;
      if (payer && paidBy[payer] !== undefined) paidBy[payer] += (Number(it.amount) || 0);
    }

    const owedBy = {};
    for (const p of participants) {
      if (p && p.address) owedBy[p.address] = 0;
    }

    if (mode === 'weights') {
      const weights = participants.map(p => ({ address: p?.address, w: Number(p?.weight) || 1 })).filter(x => x.address);
      const sumW = weights.reduce((s, x) => s + (x.w > 0 ? x.w : 0), 0) || 1;
      for (const x of weights) {
        owedBy[x.address] = total * ((x.w > 0 ? x.w : 0) / sumW);
      }
    } else if (mode === 'itemized') {
      const allAddrs = participants.map(p => p?.address).filter(Boolean);
      for (const it of items) {
        const amt = Number(it.amount) || 0;
        let ass = Array.isArray(it.assignees) ? it.assignees.filter(Boolean) : [];
        if (ass.length === 0) ass = allAddrs;
        const per = ass.length > 0 ? (amt / ass.length) : 0;
        for (const a of ass) {
          if (owedBy[a] !== undefined) owedBy[a] += per;
        }
      }
    } else {
      const count = Math.max(1, participants.length);
      const per = total / count;
      for (const p of participants) {
        if (p && p.address) owedBy[p.address] = per;
      }
    }

    const balances = participants.map(p => {
      const addr = p?.address ?? null;
      const paid = addr && paidBy[addr] !== undefined ? paidBy[addr] : 0;
      const owed = addr && owedBy[addr] !== undefined ? owedBy[addr] : 0;
      const net = paid - owed;
      return {
        address: addr,
        name: p?.name ?? null,
        weight: Number(p?.weight) || 1,
        paid,
        owed,
        net,
        settled: !!(addr && settled[addr])
      };
    });

    return { mode, total, balances };
  }

  async billCreate() {
    const counter = (await this.get('bill_counter')) ?? 0;
    const nextId = counter + 1;
    const tags = this._parseTags(this.value.tags);

    const bill = {
      id: nextId,
      title: this.value.title,
      currency: this.value.currency,
      creator_name: this.value.creator_name,
      creator_address: this.address ?? null,
      participants: [{ address: this.address ?? null, name: this.value.creator_name, weight: 1 }],
      items: [],
      settled: {},
      notes: [],
      closed: false,
      tags,
      split_mode: 'equal'
    };

    await this.put(`bill:${nextId}`, bill);
    await this.put('bill_counter', nextId);

    let ids = (await this.get('bill_ids')) ?? [];
    ids = [nextId].concat(Array.isArray(ids) ? ids : []).slice(0, 50);
    await this.put('bill_ids', ids);

    console.log('bill_created:', { id: nextId, title: bill.title, currency: bill.currency, tags, split_mode: bill.split_mode });
  }

  async billJoin() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));

    const addr = this.address ?? null;
    const name = String(this.value.name ?? '').trim();
    this.assert(name.length > 0, new Error('Name required'));

    const exists = Array.isArray(bill.participants) && bill.participants.some(p => p && p.address === addr);
    if (exists) {
      console.log('bill_join: already a participant');
      return;
    }

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.participants = Array.isArray(cloned.participants) ? cloned.participants.slice() : [];
    cloned.participants.push({ address: addr, name, weight: 1 });

    await this.put(`bill:${id}`, cloned);
    console.log('bill_joined:', { id, name, address: addr });
  }

  async billAddItem() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.items = Array.isArray(cloned.items) ? cloned.items.slice() : [];
    const participantsBy = this._participantsByAddress(bill);
    const payer = (this.value.payer_address && String(this.value.payer_address).trim()) || (this.address ?? null);
    this.assert(payer && participantsBy[payer], new Error('Invalid payer (must be a participant)'));
    const assignees = this._parseAssignees(this.value.assignees);
    for (const a of assignees) this.assert(!!participantsBy[a], new Error('Invalid assignee (must be a participant)'));
    cloned.items.push({
      description: this.value.description,
      amount: Number(this.value.amount),
      payer_address: payer,
      assignees
    });

    await this.put(`bill:${id}`, cloned);
    console.log('bill_item_added:', { id, description: this.value.description, amount: this.value.amount, payer_address: payer, assignees });
  }

  async billRemoveItem() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));

    const idx = this.value.item_index;
    const items = Array.isArray(bill.items) ? bill.items : [];
    this.assert(idx >= 0 && idx < items.length, new Error('Invalid item index'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.items = items.slice();
    cloned.items.splice(idx, 1);

    await this.put(`bill:${id}`, cloned);
    console.log('bill_item_removed:', { id, item_index: idx });
  }

  async billAssignItem() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));
    this.assert(this._isCreator(bill), new Error('Only creator can assign items'));

    const idx = this.value.item_index;
    const items = Array.isArray(bill.items) ? bill.items : [];
    this.assert(idx >= 0 && idx < items.length, new Error('Invalid item index'));

    const participantsBy = this._participantsByAddress(bill);
    const assignees = this._parseAssignees(this.value.assignees);
    this.assert(assignees.length > 0, new Error('Assignees required'));
    for (const a of assignees) this.assert(!!participantsBy[a], new Error('Invalid assignee (must be a participant)'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.items = items.map(it => this.protocol.safeClone(it) || it);
    if (!cloned.items[idx]) cloned.items[idx] = {};
    cloned.items[idx].assignees = assignees;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_item_assigned:', { id, item_index: idx, assignees });
  }

  async billSetPayer() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));
    this.assert(this._isCreator(bill), new Error('Only creator can set payer'));

    const idx = this.value.item_index;
    const items = Array.isArray(bill.items) ? bill.items : [];
    this.assert(idx >= 0 && idx < items.length, new Error('Invalid item index'));

    const participantsBy = this._participantsByAddress(bill);
    const payer = (this.value.payer_address && String(this.value.payer_address).trim()) || (this.address ?? null);
    this.assert(payer && participantsBy[payer], new Error('Invalid payer (must be a participant)'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.items = items.map(it => this.protocol.safeClone(it) || it);
    if (!cloned.items[idx]) cloned.items[idx] = {};
    cloned.items[idx].payer_address = payer;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_item_payer_set:', { id, item_index: idx, payer_address: payer });
  }

  async billSetSplitMode() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(this._isCreator(bill), new Error('Only creator can set split mode'));

    const mode = String(this.value.mode || '').trim();
    this.assert(mode === 'equal' || mode === 'weights' || mode === 'itemized', new Error('Invalid mode: equal|weights|itemized'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.split_mode = mode;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_split_mode_set:', { id, mode });
  }

  async billSetWeight() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const addr = this.address ?? null;
    const participants = Array.isArray(bill.participants) ? bill.participants : [];
    const idx = participants.findIndex(p => p && p.address === addr);
    this.assert(idx >= 0, new Error('Not a participant'));

    const weight = Number(this.value.weight);
    this.assert(Number.isFinite(weight) && weight > 0, new Error('Invalid weight'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.participants = participants.map(p => this.protocol.safeClone(p) || p);
    if (!cloned.participants[idx]) cloned.participants[idx] = {};
    cloned.participants[idx].weight = weight;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_weight_set:', { id, address: addr, weight });
  }

  async billSettle() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const addr = this.address ?? null;
    const isParticipant = Array.isArray(bill.participants) && bill.participants.some(p => p && p.address === addr);
    this.assert(isParticipant, new Error('Not a participant'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.settled = cloned.settled && typeof cloned.settled === 'object' ? this.protocol.safeClone(cloned.settled) : {};
    if (!cloned.settled) cloned.settled = {};
    cloned.settled[addr] = (this.value.proof && String(this.value.proof).trim()) || true;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_settled:', { id, address: addr, proof: this.value.proof || null });
  }

  async billClose() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const addr = this.address ?? null;
    this.assert(bill.creator_address === addr, new Error('Only creator can close'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.closed = true;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_closed:', { id });
  }

  async billLeave() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const addr = this.address ?? null;
    this.assert(bill.creator_address !== addr, new Error('Creator cannot leave'));

    const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};
    this.assert(!settled[addr], new Error('Cannot leave after settling'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.participants = (Array.isArray(cloned.participants) ? cloned.participants : []).filter(p => p && p.address !== addr);

    this.assert(cloned.participants.length > 0, new Error('Cannot leave: at least one participant required'));

    await this.put(`bill:${id}`, cloned);
    console.log('bill_left:', { id, address: addr });
  }

  async billNote() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.notes = Array.isArray(cloned.notes) ? cloned.notes.slice() : [];
    if (cloned.notes.length >= 10) cloned.notes.shift();
    cloned.notes.push({
      by: this.address ?? null,
      text: String(this.value.text ?? '').trim(),
      at: await this.get('currentTime') ?? null
    });

    await this.put(`bill:${id}`, cloned);
    console.log('bill_note_added:', { id });
  }

  async billGet() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    if (bill === null) {
      console.log('bill_get: not found', id);
      return;
    }

    const computed = this._computeBalances(bill);
    const total = computed.total;
    const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};
    const allSettled =
      Array.isArray(bill.participants) &&
      bill.participants.length > 0 &&
      bill.participants.every(p => p && p.address && settled[p.address]);
    const perPerson = computed.mode === 'equal'
      ? (Array.isArray(bill.participants) && bill.participants.length > 0 ? total / bill.participants.length : total)
      : null;

    const out = {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      creator_name: bill.creator_name,
      creator_address: bill.creator_address,
      participants: bill.participants,
      items: bill.items,
      notes: bill.notes ?? [],
      tags: bill.tags ?? [],
      closed: !!bill.closed,
      split_mode: computed.mode,
      total,
      perPerson,
      balances: computed.balances,
      settled: settled,
      allSettled
    };
    console.log('bill_get:', out);
    if (allSettled) console.log('Bill fully settled!');
  }

  async billBalances() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    if (bill === null) {
      console.log('bill_balances: not found', id);
      return;
    }
    const computed = this._computeBalances(bill);
    console.log('bill_balances:', {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      split_mode: computed.mode,
      total: computed.total,
      balances: computed.balances
    });
  }

  async billExport() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    if (bill === null) {
      console.log('bill_export: not found', id);
      return;
    }
    const computed = this._computeBalances(bill);
    const total = computed.total;
    const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};
    const allSettled =
      Array.isArray(bill.participants) &&
      bill.participants.length > 0 &&
      bill.participants.every(p => p && p.address && settled[p.address]);
    const perPerson = computed.mode === 'equal'
      ? (Array.isArray(bill.participants) && bill.participants.length > 0 ? total / bill.participants.length : total)
      : null;

    const exportData = {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      creator_name: bill.creator_name,
      creator_address: bill.creator_address,
      participants: bill.participants,
      items: bill.items,
      notes: bill.notes ?? [],
      tags: bill.tags ?? [],
      closed: !!bill.closed,
      split_mode: computed.mode,
      total,
      perPerson,
      balances: computed.balances,
      settled,
      allSettled,
      exported_at: await this.get('currentTime') ?? null
    };
    const str = this.protocol.safeJsonStringify(exportData);
    this.assert(str !== null, new Error('Export serialize failed'));
    console.log('bill_export:', str);
  }

  async billList() {
    const limit = this.value?.limit ?? 10;
    const filterCurrency = (this.value?.currency && String(this.value.currency).trim()) || null;
    const filterTag = (this.value?.tag && String(this.value.tag).trim()) || null;
    const filterCreator = (this.value?.creator_address && String(this.value.creator_address).trim()) || null;

    const ids = (await this.get('bill_ids')) ?? [];
    const list = Array.isArray(ids) ? ids : [];
    const bills = [];
    for (const id of list) {
      if (bills.length >= limit) break;
      const bill = await this.get(`bill:${id}`);
      if (bill === null) continue;
      if (filterCurrency && bill.currency !== filterCurrency) continue;
      if (filterCreator && bill.creator_address !== filterCreator) continue;
      if (filterTag) {
        const tags = Array.isArray(bill.tags) ? bill.tags : [];
        if (!tags.some(t => String(t).toLowerCase().includes(filterTag.toLowerCase()))) continue;
      }
      bills.push({
        id: bill.id,
        title: bill.title,
        currency: bill.currency,
        closed: !!bill.closed,
        tags: bill.tags ?? []
      });
    }
    console.log('bill_list:', bills);
  }

  async billUpdate() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));

    const addr = this.address ?? null;
    this.assert(bill.creator_address === addr, new Error('Only creator can update'));

    const hasUpdate = this.value.title !== undefined || this.value.currency !== undefined || this.value.tags !== undefined;
    this.assert(hasUpdate, new Error('At least one field (title, currency, tags) required'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));

    if (this.value.title !== undefined) cloned.title = String(this.value.title).trim();
    if (this.value.currency !== undefined) cloned.currency = String(this.value.currency).trim();
    if (this.value.tags !== undefined) cloned.tags = this._parseTags(this.value.tags);

    await this.put(`bill:${id}`, cloned);
    console.log('bill_updated:', { id, title: cloned.title, currency: cloned.currency, tags: cloned.tags });
  }

  async billUnsettle() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const addr = this.address ?? null;
    const isParticipant = Array.isArray(bill.participants) && bill.participants.some(p => p && p.address === addr);
    this.assert(isParticipant, new Error('Not a participant'));

    const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};
    this.assert(!!settled[addr], new Error('Not settled'));

    const allSettled =
      Array.isArray(bill.participants) &&
      bill.participants.length > 0 &&
      bill.participants.every(p => p && p.address && settled[p.address]);
    this.assert(!allSettled, new Error('Bill is fully settled; cannot unsettle'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.settled = cloned.settled && typeof cloned.settled === 'object' ? this.protocol.safeClone(cloned.settled) : {};
    if (!cloned.settled) cloned.settled = {};
    delete cloned.settled[addr];

    await this.put(`bill:${id}`, cloned);
    console.log('bill_unsettled:', { id, address: addr });
  }

  async billReopen() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const addr = this.address ?? null;
    this.assert(bill.creator_address === addr, new Error('Only creator can reopen'));
    this.assert(!!bill.closed, new Error('Bill is not closed'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.closed = false;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_reopened:', { id });
  }

  async billTip() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));
    this.assert(!bill.closed, new Error('Bill is closed'));

    const hasAmount = this.value.amount !== undefined;
    const hasPercent = this.value.percent !== undefined;
    this.assert(hasAmount || hasPercent, new Error('Provide amount or percent'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.items = Array.isArray(cloned.items) ? cloned.items.slice() : [];

    let tipAmount;
    let description;
    if (hasAmount) {
      tipAmount = Number(this.value.amount);
      description = 'Tip';
    } else {
      const pct = Number(this.value.percent);
      const subtotal = cloned.items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
      tipAmount = Math.round(subtotal * pct * 100) / 10000;
      description = `Tip (${pct}%)`;
    }
    this.assert(tipAmount >= 0, new Error('Tip amount must be non-negative'));

    cloned.items.push({ description, amount: tipAmount });
    await this.put(`bill:${id}`, cloned);
    console.log('bill_tip_added:', { id, description, amount: tipAmount });
  }

  async billStats() {
    const counter = (await this.get('bill_counter')) ?? 0;
    const ids = (await this.get('bill_ids')) ?? [];
    let totalParticipants = 0;
    let totalItems = 0;
    let totalAmount = 0;
    let closedCount = 0;
    let settledCount = 0;
    const currencyCounts = {};

    for (const id of Array.isArray(ids) ? ids : []) {
      const bill = await this.get(`bill:${id}`);
      if (bill === null) continue;
      const pCount = Array.isArray(bill.participants) ? bill.participants.length : 0;
      totalParticipants += pCount;
      const items = Array.isArray(bill.items) ? bill.items : [];
      totalItems += items.length;
      const sum = items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
      totalAmount += sum;
      if (bill.closed) closedCount++;
      const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};
      const allSettled = pCount > 0 && (bill.participants || []).every(p => p && p.address && settled[p.address]);
      if (allSettled) settledCount++;
      const cur = bill.currency || '?';
      currencyCounts[cur] = (currencyCounts[cur] || 0) + 1;
    }

    const stats = {
      total_bills: counter,
      listed_bills: Array.isArray(ids) ? ids.length : 0,
      total_participants: totalParticipants,
      total_items: totalItems,
      total_amount: totalAmount,
      closed_bills: closedCount,
      fully_settled_bills: settledCount,
      by_currency: currencyCounts
    };
    console.log('bill_stats:', stats);
  }
}

export default SampleContract;
