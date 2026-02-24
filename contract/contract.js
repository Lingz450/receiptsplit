import {Contract} from 'trac-peer'

class SampleContract extends Contract {
  /**
   * ReceiptSplit — P2P Bill Splitting on Trac Network.
   * Contract + protocol pair. See protocol.js for mapTxCommand and CLI.
   */
  constructor(protocol, options = {}) {
    super(protocol, options);

    this.addSchema('billCreate', {
      value: {
        $$strict: true,
        $$type: 'object',
        title: { type: 'string', min: 1, max: 200 },
        currency: { type: 'string', min: 1, max: 10 },
        creator_name: { type: 'string', min: 1, max: 128 }
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
        amount: { type: 'number', min: 0 }
      }
    });

    this.addSchema('billSettle', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    });

    this.addSchema('billGet', {
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
        limit: { type: 'number', integer: true, min: 1, max: 50, optional: true }
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

  async billCreate() {
    const counter = (await this.get('bill_counter')) ?? 0;
    const nextId = counter + 1;
    const currentTime = await this.get('currentTime');

    const bill = {
      id: nextId,
      title: this.value.title,
      currency: this.value.currency,
      creator_name: this.value.creator_name,
      creator_address: this.address ?? null,
      participants: [{ address: this.address ?? null, name: this.value.creator_name }],
      items: [],
      settled: {}
    };

    await this.put(`bill:${nextId}`, bill);
    await this.put('bill_counter', nextId);

    let ids = (await this.get('bill_ids')) ?? [];
    ids = [nextId].concat(Array.isArray(ids) ? ids : []).slice(0, 50);
    await this.put('bill_ids', ids);

    console.log('bill_created:', { id: nextId, title: bill.title, currency: bill.currency });
  }

  async billJoin() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

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
    cloned.participants.push({ address: addr, name });

    await this.put(`bill:${id}`, cloned);
    console.log('bill_joined:', { id, name, address: addr });
  }

  async billAddItem() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    this.assert(bill !== null, new Error('Bill not found'));

    const cloned = this.protocol.safeClone(bill);
    this.assert(cloned !== null, new Error('Clone failed'));
    cloned.items = Array.isArray(cloned.items) ? cloned.items.slice() : [];
    cloned.items.push({
      description: this.value.description,
      amount: Number(this.value.amount)
    });

    await this.put(`bill:${id}`, cloned);
    console.log('bill_item_added:', { id, description: this.value.description, amount: this.value.amount });
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
    cloned.settled[addr] = true;

    await this.put(`bill:${id}`, cloned);
    console.log('bill_settled:', { id, address: addr });
  }

  async billGet() {
    const id = this.value.id;
    const bill = await this.get(`bill:${id}`);
    if (bill === null) {
      console.log('bill_get: not found', id);
      return;
    }

    const total = Array.isArray(bill.items)
      ? bill.items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0)
      : 0;
    const count = Array.isArray(bill.participants) ? Math.max(1, bill.participants.length) : 1;
    const perPerson = total / count;
    const settled = bill.settled && typeof bill.settled === 'object' ? bill.settled : {};
    const allSettled =
      Array.isArray(bill.participants) &&
      bill.participants.length > 0 &&
      bill.participants.every(p => p && p.address && settled[p.address]);

    const out = {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      creator_name: bill.creator_name,
      creator_address: bill.creator_address,
      participants: bill.participants,
      items: bill.items,
      total,
      perPerson,
      settled: settled,
      allSettled
    };
    console.log('bill_get:', out);
    if (allSettled) console.log('Bill fully settled!');
  }

  async billList() {
    const limit = this.value?.limit ?? 10;
    const ids = (await this.get('bill_ids')) ?? [];
    const list = Array.isArray(ids) ? ids.slice(0, limit) : [];
    const bills = [];
    for (const id of list) {
      const bill = await this.get(`bill:${id}`);
      if (bill !== null) bills.push({ id: bill.id, title: bill.title, currency: bill.currency });
    }
    console.log('bill_list:', bills);
  }
}

export default SampleContract;
