import {Contract} from 'trac-peer'

class SampleContract extends Contract {
  /**
   * ReceiptSplit - P2P Bill Splitting on Trac Network.
   * Extended with weighted splits, partial payments, item targeting, activity logs, and archiving.
   */
  constructor(protocol, options = {}) {
    super(protocol, options)

    this.addSchema('billCreate', {
      value: {
        $$strict: true,
        $$type: 'object',
        title: { type: 'string', min: 1, max: 200 },
        currency: { type: 'string', min: 1, max: 10 },
        creator_name: { type: 'string', min: 1, max: 128 },
        tags: { type: 'string', optional: true, max: 100 }
      }
    })

    this.addSchema('billJoin', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        name: { type: 'string', min: 1, max: 128 }
      }
    })

    this.addSchema('billAddItem', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        description: { type: 'string', min: 1, max: 200 },
        amount: { type: 'number', min: 0 },
        split_between: { type: 'string', optional: true, max: 4096 }
      }
    })

    this.addSchema('billRemoveItem', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        item_index: { type: 'number', integer: true, min: 0 }
      }
    })

    this.addSchema('billSettle', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        proof: { type: 'string', optional: true, max: 200 }
      }
    })

    this.addSchema('billPay', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        amount: { type: 'number', min: 0.01 },
        proof: { type: 'string', optional: true, max: 200 }
      }
    })

    this.addSchema('billClose', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billLeave', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billNote', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        text: { type: 'string', min: 1, max: 300 }
      }
    })

    this.addSchema('billGet', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billExport', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billList', {
      value: {
        $$strict: true,
        $$type: 'object',
        limit: { type: 'number', integer: true, min: 1, max: 50, optional: true },
        currency: { type: 'string', optional: true, max: 10 },
        tag: { type: 'string', optional: true, max: 50 },
        creator_address: { type: 'string', optional: true, max: 128 },
        include_archived: { type: 'string', optional: true, max: 8 },
        closed: { type: 'string', optional: true, max: 8 },
        settled: { type: 'string', optional: true, max: 8 }
      }
    })

    this.addSchema('billStats', {
      value: {
        $$strict: true,
        $$type: 'object'
      }
    })

    this.addSchema('billUpdate', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        title: { type: 'string', optional: true, min: 1, max: 200 },
        currency: { type: 'string', optional: true, min: 1, max: 10 },
        tags: { type: 'string', optional: true, max: 100 }
      }
    })

    this.addSchema('billUnsettle', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billReopen', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billTip', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        amount: { type: 'number', optional: true, min: 0 },
        percent: { type: 'number', optional: true, min: 0, max: 100 },
        split_between: { type: 'string', optional: true, max: 4096 }
      }
    })

    this.addSchema('billSetWeights', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        weights: { type: 'string', min: 1, max: 4096 }
      }
    })

    this.addSchema('billBalance', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billActivity', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        limit: { type: 'number', integer: true, min: 1, max: 100, optional: true }
      }
    })

    this.addSchema('billArchive', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billUnarchive', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billEditItem', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        item_index: { type: 'number', integer: true, min: 0 },
        description: { type: 'string', optional: true, min: 1, max: 200 },
        amount: { type: 'number', optional: true, min: 0 },
        split_between: { type: 'string', optional: true, max: 4096 }
      }
    })

    this.addSchema('billDebt', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('billCopy', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        title: { type: 'string', min: 1, max: 200 },
        creator_name: { type: 'string', min: 1, max: 128 },
        currency: { type: 'string', optional: true, min: 1, max: 10 },
        tags: { type: 'string', optional: true, max: 100 }
      }
    })

    this.addSchema('billDeadline', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        deadline: { type: 'string', optional: true, max: 100 }
      }
    })

    this.addSchema('billRename', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        name: { type: 'string', min: 1, max: 128 }
      }
    })

    // Permissions / editors
    this.addSchema('billAddEditor', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        editor_address: { type: 'string', min: 1, max: 128 }
      }
    })

    this.addSchema('billRemoveEditor', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        editor_address: { type: 'string', min: 1, max: 128 }
      }
    })

    this.addSchema('billListEditors', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 }
      }
    })

    // Receipt anchoring (store hash + optional note)
    this.addSchema('billAnchorReceipt', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        hash: { type: 'string', min: 8, max: 128 },
        note: { type: 'string', optional: true, max: 200 }
      }
    })

    // Invite codes (deterministic; code is stored in state)
    this.addSchema('billSetInvite', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        code: { type: 'string', min: 3, max: 40 },
        ttl_sec: { type: 'number', integer: true, optional: true, min: 0, max: 31536000 }
      }
    })

    this.addSchema('billJoinCode', {
      value: {
        $$strict: true,
        $$type: 'object',
        code: { type: 'string', min: 3, max: 40 },
        name: { type: 'string', min: 1, max: 128 }
      }
    })

    // Templates (recurring bills)
    this.addSchema('templateSave', {
      value: {
        $$strict: true,
        $$type: 'object',
        id: { type: 'number', integer: true, min: 1 },
        name: { type: 'string', min: 1, max: 80 }
      }
    })

    this.addSchema('templateCreate', {
      value: {
        $$strict: true,
        $$type: 'object',
        template_id: { type: 'number', integer: true, min: 1 },
        creator_name: { type: 'string', min: 1, max: 128 },
        title: { type: 'string', optional: true, min: 1, max: 200 }
      }
    })

    this.addSchema('templateGet', {
      value: {
        $$strict: true,
        $$type: 'object',
        template_id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('templateList', {
      value: {
        $$strict: true,
        $$type: 'object',
        limit: { type: 'number', integer: true, min: 1, max: 50, optional: true }
      }
    })

    // Groups (multi-bill collections)
    this.addSchema('groupCreate', {
      value: {
        $$strict: true,
        $$type: 'object',
        name: { type: 'string', min: 1, max: 80 }
      }
    })

    this.addSchema('groupAddBill', {
      value: {
        $$strict: true,
        $$type: 'object',
        group_id: { type: 'number', integer: true, min: 1 },
        bill_id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('groupGet', {
      value: {
        $$strict: true,
        $$type: 'object',
        group_id: { type: 'number', integer: true, min: 1 }
      }
    })

    this.addSchema('groupList', {
      value: {
        $$strict: true,
        $$type: 'object',
        limit: { type: 'number', integer: true, min: 1, max: 50, optional: true }
      }
    })

    this.addSchema('feature_entry', {
      key: { type: 'string', min: 1, max: 256 },
      value: { type: 'any' }
    })

    const _this = this
    this.addFeature('timer_feature', async function () {
      if (false === _this.check.validateSchema('feature_entry', _this.op)) return
      if (_this.op.key === 'currentTime') {
        if (null === await _this.get('currentTime')) console.log('timer started at', _this.op.value)
        await _this.put(_this.op.key, _this.op.value)
      }
    })
  }

  _roundMoney(value) {
    const n = Number(value)
    if (!Number.isFinite(n)) return 0
    const rounded = Math.round(n * 100) / 100
    return Object.is(rounded, -0) ? 0 : rounded
  }

  _normalizeAddress(value) {
    if (value === null || value === undefined) return ''
    const out = String(value).trim()
    return out.length > 0 ? out : ''
  }

  _parseBoolLike(value, fallback = null) {
    if (value === null || value === undefined) return fallback
    const str = String(value).trim().toLowerCase()
    if (!str) return fallback
    if (str === 'true' || str === '1' || str === 'yes') return true
    if (str === 'false' || str === '0' || str === 'no') return false
    return fallback
  }

  _parseTags(tagsStr) {
    if (!tagsStr || typeof tagsStr !== 'string') return []
    return tagsStr.split(',').map((t) => t.trim()).filter((t) => t.length > 0).slice(0, 8)
  }

  _isEditorOrCreator(bill, addr) {
    const a = this._normalizeAddress(addr)
    if (!a) return false
    if (bill?.creator_address && this._normalizeAddress(bill.creator_address) === a) return true
    const editors = Array.isArray(bill?.editors) ? bill.editors : []
    return editors.some((e) => this._normalizeAddress(e) === a)
  }

  _parseAddressCsv(input) {
    if (!input || typeof input !== 'string') return []
    const seen = {}
    const out = []
    for (const part of input.split(',')) {
      const addr = this._normalizeAddress(part)
      if (!addr || seen[addr]) continue
      seen[addr] = true
      out.push(addr)
    }
    return out
  }

  _parseWeights(weightsStr) {
    const parsed = {}
    if (!weightsStr || typeof weightsStr !== 'string') return parsed

    for (const chunk of weightsStr.split(',')) {
      const seg = chunk.trim()
      if (!seg) continue
      const idx = seg.indexOf('=')
      if (idx <= 0) continue

      const addr = this._normalizeAddress(seg.slice(0, idx))
      const weightValue = Number(seg.slice(idx + 1).trim())
      if (!addr || !Number.isFinite(weightValue) || weightValue <= 0) continue

      parsed[addr] = weightValue
    }

    return parsed
  }

  _asObject(value) {
    return value && typeof value === 'object' ? value : {}
  }

  _cloneBillForWrite(bill) {
    const cloned = this.protocol.safeClone(bill)
    this.assert(cloned !== null, new Error('Clone failed'))
    return cloned
  }

  _getParticipantEntries(bill) {
    const source = Array.isArray(bill?.participants) ? bill.participants : []
    const seen = {}
    const list = []

    for (const participant of source) {
      const address = this._normalizeAddress(participant?.address)
      if (!address || seen[address]) continue
      seen[address] = true
      list.push({
        address,
        name: String(participant?.name ?? '')
      })
    }

    return list
  }

  _getParticipantAddresses(bill) {
    return this._getParticipantEntries(bill).map((entry) => entry.address)
  }

  _getParticipantNameMap(bill) {
    const map = {}
    for (const entry of this._getParticipantEntries(bill)) {
      map[entry.address] = entry.name
    }
    return map
  }

  _getNormalizedWeights(bill, participantAddresses) {
    const rawWeights = this._asObject(bill?.weights)
    const out = {}
    for (const address of participantAddresses) {
      const raw = Number(rawWeights[address])
      out[address] = Number.isFinite(raw) && raw > 0 ? raw : 1
    }
    return out
  }

  _getItemTargets(item, participantAddresses) {
    if (participantAddresses.length === 0) return []

    const allowed = {}
    for (const addr of participantAddresses) allowed[addr] = true

    const direct = Array.isArray(item?.split_between) ? item.split_between : []
    const seen = {}
    const targets = []

    for (const raw of direct) {
      const addr = this._normalizeAddress(raw)
      if (!addr || !allowed[addr] || seen[addr]) continue
      seen[addr] = true
      targets.push(addr)
    }

    if (targets.length > 0) return targets
    return participantAddresses.slice()
  }

  _getPaymentAmount(record) {
    if (record === null || record === undefined) return 0
    if (typeof record === 'number') {
      return Number.isFinite(record) && record > 0 ? record : 0
    }
    if (record && typeof record === 'object') {
      const amount = Number(record.amount)
      return Number.isFinite(amount) && amount > 0 ? amount : 0
    }
    return 0
  }

  _computeBillState(bill) {
    const participantAddresses = this._getParticipantAddresses(bill)
    const participantWeights = this._getNormalizedWeights(bill, participantAddresses)
    const dueRaw = {}
    const dueByAddress = {}
    const paidByAddress = {}
    const remainingByAddress = {}
    const overpaidByAddress = {}

    const items = Array.isArray(bill?.items) ? bill.items : []
    let total = 0
    const itemBreakdown = []

    for (const item of items) {
      const amount = Number(item?.amount)
      if (!Number.isFinite(amount) || amount < 0) continue

      total += amount
      const targets = this._getItemTargets(item, participantAddresses)
      if (targets.length === 0) continue

      let weightSum = targets.reduce((sum, addr) => sum + (participantWeights[addr] || 1), 0)
      if (!(weightSum > 0)) weightSum = targets.length

      const allocations = {}
      for (const addr of targets) {
        const share = amount * ((participantWeights[addr] || 1) / weightSum)
        dueRaw[addr] = (dueRaw[addr] || 0) + share
        allocations[addr] = this._roundMoney(share)
      }

      itemBreakdown.push({
        description: String(item?.description ?? ''),
        amount: this._roundMoney(amount),
        split_between: targets,
        allocations
      })
    }

    const payments = this._asObject(bill?.payments)

    for (const addr of participantAddresses) {
      const due = this._roundMoney(dueRaw[addr] || 0)
      const paid = this._roundMoney(this._getPaymentAmount(payments[addr]))
      const remaining = this._roundMoney(Math.max(0, due - paid))
      const overpaid = this._roundMoney(Math.max(0, paid - due))

      dueByAddress[addr] = due
      paidByAddress[addr] = paid
      remainingByAddress[addr] = remaining
      overpaidByAddress[addr] = overpaid
    }

    const allSettled = participantAddresses.length > 0 && participantAddresses.every((addr) => (remainingByAddress[addr] || 0) <= 0)
    const totalDue = this._roundMoney(participantAddresses.reduce((sum, addr) => sum + (dueByAddress[addr] || 0), 0))
    const totalPaid = this._roundMoney(participantAddresses.reduce((sum, addr) => sum + (paidByAddress[addr] || 0), 0))
    const outstanding = this._roundMoney(Math.max(0, totalDue - totalPaid))

    return {
      participantAddresses,
      participantWeights,
      itemBreakdown,
      total: this._roundMoney(total),
      totalDue,
      totalPaid,
      outstanding,
      dueByAddress,
      paidByAddress,
      remainingByAddress,
      overpaidByAddress,
      allSettled
    }
  }

  async _logActivity(bill, event, data = {}) {
    bill.activity = Array.isArray(bill.activity) ? bill.activity.slice() : []
    bill.activity.push({
      event: String(event || ''),
      by: this._normalizeAddress(this.address) || null,
      at: (await this.get('currentTime')) ?? null,
      data: this._asObject(data)
    })
    while (bill.activity.length > 200) bill.activity.shift()
  }

  async _applyPayment(bill, address, amount, proof) {
    const addr = this._normalizeAddress(address)
    this.assert(addr.length > 0, new Error('Address required'))

    const normalizedAmount = this._roundMoney(Number(amount))
    this.assert(Number.isFinite(normalizedAmount) && normalizedAmount > 0, new Error('Payment amount must be positive'))

    bill.payments = this._asObject(bill.payments)
    const record = this._asObject(bill.payments[addr])
    record.amount = this._roundMoney(this._getPaymentAmount(record) + normalizedAmount)

    const normalizedProof = typeof proof === 'string' ? proof.trim() : ''
    if (normalizedProof.length > 0) record.last_proof = normalizedProof

    record.updated_at = (await this.get('currentTime')) ?? null
    record.tx_count = (Number(record.tx_count) || 0) + 1
    bill.payments[addr] = record

    return normalizedAmount
  }

  _syncSettledMap(bill, state, onlyAddress = null, proof = null) {
    const settled = this._asObject(bill.settled)
    const payments = this._asObject(bill.payments)

    const applyOne = (addr) => {
      if ((state.remainingByAddress[addr] || 0) <= 0) {
        const paymentRecord = this._asObject(payments[addr])
        const providedProof = typeof proof === 'string' ? proof.trim() : ''
        settled[addr] = providedProof || paymentRecord.last_proof || settled[addr] || true
      } else {
        delete settled[addr]
      }
    }

    if (onlyAddress !== null) {
      const normalized = this._normalizeAddress(onlyAddress)
      if (normalized) applyOne(normalized)
      return settled
    }

    for (const addr of state.participantAddresses) applyOne(addr)
    return settled
  }

  _buildBillOutput(bill, state, options = {}) {
    const includeActivity = options.includeActivity === true
    const participantCount = state.participantAddresses.length > 0 ? state.participantAddresses.length : 1

    const out = {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      creator_name: bill.creator_name,
      creator_address: bill.creator_address,
      participants: Array.isArray(bill.participants) ? bill.participants : [],
      items: Array.isArray(bill.items) ? bill.items : [],
      notes: Array.isArray(bill.notes) ? bill.notes : [],
      tags: Array.isArray(bill.tags) ? bill.tags : [],
      weights: state.participantWeights,
      payments: this._asObject(bill.payments),
      closed: !!bill.closed,
      archived: !!bill.archived,
      deadline: bill.deadline ?? null,
      total: state.total,
      perPerson: this._roundMoney(state.total / participantCount),
      dueByAddress: state.dueByAddress,
      paidByAddress: state.paidByAddress,
      remainingByAddress: state.remainingByAddress,
      overpaidByAddress: state.overpaidByAddress,
      outstanding: state.outstanding,
      settled: this._asObject(bill.settled),
      allSettled: state.allSettled,
      itemBreakdown: state.itemBreakdown,
      activityCount: Array.isArray(bill.activity) ? bill.activity.length : 0
    }

    if (includeActivity) out.activity = Array.isArray(bill.activity) ? bill.activity : []
    return out
  }

  async billCreate() {
    const counter = (await this.get('bill_counter')) ?? 0
    const nextId = counter + 1
    const tags = this._parseTags(this.value.tags)
    const creatorAddress = this._normalizeAddress(this.address) || null

    const bill = {
      id: nextId,
      title: this.value.title,
      currency: this.value.currency,
      creator_name: this.value.creator_name,
      creator_address: creatorAddress,
      participants: [{ address: creatorAddress, name: this.value.creator_name }],
      items: [],
      settled: {},
      payments: {},
      notes: [],
      editors: [],
      receipts: [],
      invite_code: null,
      invite_expires_at: null,
      closed: false,
      archived: false,
      tags,
      weights: creatorAddress ? { [creatorAddress]: 1 } : {},
      activity: []
    }

    await this._logActivity(bill, 'bill_created', {
      id: nextId,
      title: bill.title,
      currency: bill.currency,
      tags
    })

    await this.put(`bill:${nextId}`, bill)
    await this.put('bill_counter', nextId)

    let ids = (await this.get('bill_ids')) ?? []
    ids = [nextId].concat(Array.isArray(ids) ? ids : []).slice(0, 50)
    await this.put('bill_ids', ids)

    console.log('bill_created:', { id: nextId, title: bill.title, currency: bill.currency, tags })
  }

  async billJoin() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    this.assert(addr.length > 0, new Error('Address required'))

    const name = String(this.value.name ?? '').trim()
    this.assert(name.length > 0, new Error('Name required'))

    const exists = Array.isArray(bill.participants) && bill.participants.some((p) => this._normalizeAddress(p?.address) === addr)
    if (exists) {
      console.log('bill_join: already a participant')
      return
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.participants = Array.isArray(cloned.participants) ? cloned.participants.slice() : []
    cloned.participants.push({ address: addr, name })

    cloned.weights = this._asObject(cloned.weights)
    if (!(Number(cloned.weights[addr]) > 0)) cloned.weights[addr] = 1

    await this._logActivity(cloned, 'bill_joined', { id, name, address: addr })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_joined:', { id, name, address: addr })
  }

  async billAddItem() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._isEditorOrCreator(bill, actor), new Error('Only creator/editor can modify items'))

    const amount = Number(this.value.amount)
    this.assert(Number.isFinite(amount) && amount >= 0, new Error('Amount must be non-negative'))

    const splitBetween = this._parseAddressCsv(this.value.split_between)
    const participants = this._getParticipantAddresses(bill)
    if (splitBetween.length > 0) {
      for (const addr of splitBetween) {
        this.assert(participants.includes(addr), new Error(`split_between contains non-participant address: ${addr}`))
      }
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.items = Array.isArray(cloned.items) ? cloned.items.slice() : []

    const nextItem = {
      description: this.value.description,
      amount: this._roundMoney(amount)
    }
    if (splitBetween.length > 0) nextItem.split_between = splitBetween

    cloned.items.push(nextItem)
    await this._logActivity(cloned, 'bill_item_added', {
      id,
      description: nextItem.description,
      amount: nextItem.amount,
      split_between_count: splitBetween.length
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_item_added:', { id, description: nextItem.description, amount: nextItem.amount, split_between: splitBetween })
  }

  async billRemoveItem() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._isEditorOrCreator(bill, actor), new Error('Only creator/editor can modify items'))

    const idx = this.value.item_index
    const items = Array.isArray(bill.items) ? bill.items : []
    this.assert(idx >= 0 && idx < items.length, new Error('Invalid item index'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.items = items.slice()
    const removed = cloned.items[idx]
    cloned.items.splice(idx, 1)

    await this._logActivity(cloned, 'bill_item_removed', {
      id,
      item_index: idx,
      description: removed?.description ?? null,
      amount: this._roundMoney(Number(removed?.amount) || 0)
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_item_removed:', { id, item_index: idx })
  }

  async billSettle() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    const isParticipant = this._getParticipantAddresses(bill).includes(addr)
    this.assert(isParticipant, new Error('Not a participant'))

    const before = this._computeBillState(bill)
    const remaining = this._roundMoney(before.remainingByAddress[addr] || 0)
    if (remaining <= 0) {
      console.log('bill_settle: already settled', { id, address: addr })
      return
    }

    const cloned = this._cloneBillForWrite(bill)
    const paidAmount = await this._applyPayment(cloned, addr, remaining, this.value.proof)

    const after = this._computeBillState(cloned)
    cloned.settled = this._syncSettledMap(cloned, after, addr, this.value.proof)

    await this._logActivity(cloned, 'bill_settled', {
      id,
      address: addr,
      paid_amount: paidAmount,
      proof: this.value.proof || null
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_settled:', { id, address: addr, paid_amount: paidAmount, allSettled: after.allSettled })
    if (after.allSettled) console.log('Bill fully settled!')
  }

  async billPay() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    const isParticipant = this._getParticipantAddresses(bill).includes(addr)
    this.assert(isParticipant, new Error('Not a participant'))

    const amount = Number(this.value.amount)
    this.assert(Number.isFinite(amount) && amount > 0, new Error('Amount must be positive'))

    const cloned = this._cloneBillForWrite(bill)
    const paidAmount = await this._applyPayment(cloned, addr, amount, this.value.proof)

    const after = this._computeBillState(cloned)
    cloned.settled = this._syncSettledMap(cloned, after, addr, this.value.proof)

    await this._logActivity(cloned, 'bill_payment_added', {
      id,
      address: addr,
      amount: paidAmount,
      remaining: after.remainingByAddress[addr] || 0,
      proof: this.value.proof || null
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_payment_added:', {
      id,
      address: addr,
      amount: paidAmount,
      remaining: after.remainingByAddress[addr] || 0,
      allSettled: after.allSettled
    })
    if (after.allSettled) console.log('Bill fully settled!')
  }

  async billClose() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can close'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    if (bill.closed) {
      console.log('bill_close: already closed', { id })
      return
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.closed = true

    await this._logActivity(cloned, 'bill_closed', { id })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_closed:', { id })
  }

  async billLeave() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    this.assert(addr.length > 0, new Error('Address required'))
    this.assert(bill.creator_address !== addr, new Error('Creator cannot leave'))

    const settled = this._asObject(bill.settled)
    this.assert(!settled[addr], new Error('Cannot leave after settling'))

    const payments = this._asObject(bill.payments)
    const paid = this._getPaymentAmount(payments[addr])
    this.assert(paid <= 0, new Error('Cannot leave after making payment'))

    const items = Array.isArray(bill.items) ? bill.items : []
    for (const item of items) {
      const targets = Array.isArray(item?.split_between) ? item.split_between : []
      if (targets.some((target) => this._normalizeAddress(target) === addr)) {
        this.assert(false, new Error('Cannot leave while assigned in split_between item'))
      }
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.participants = (Array.isArray(cloned.participants) ? cloned.participants : []).filter((p) => this._normalizeAddress(p?.address) !== addr)
    this.assert(cloned.participants.length > 0, new Error('Cannot leave: at least one participant required'))

    cloned.weights = this._asObject(cloned.weights)
    delete cloned.weights[addr]

    cloned.settled = this._asObject(cloned.settled)
    delete cloned.settled[addr]

    cloned.payments = this._asObject(cloned.payments)
    delete cloned.payments[addr]

    await this._logActivity(cloned, 'bill_left', { id, address: addr })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_left:', { id, address: addr })
  }

  async billNote() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const text = String(this.value.text ?? '').trim()
    this.assert(text.length > 0, new Error('Note text required'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.notes = Array.isArray(cloned.notes) ? cloned.notes.slice() : []
    if (cloned.notes.length >= 25) cloned.notes.shift()

    cloned.notes.push({
      by: this._normalizeAddress(this.address) || null,
      text,
      at: (await this.get('currentTime')) ?? null
    })

    await this._logActivity(cloned, 'bill_note_added', { id, text })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_note_added:', { id })
  }

  async billGet() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    if (bill === null) {
      console.log('bill_get: not found', id)
      return
    }

    const state = this._computeBillState(bill)
    const out = this._buildBillOutput(bill, state, { includeActivity: false })

    console.log('bill_get:', out)
    if (state.allSettled) console.log('Bill fully settled!')
  }

  async billExport() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    if (bill === null) {
      console.log('bill_export: not found', id)
      return
    }

    const state = this._computeBillState(bill)
    const exportData = this._buildBillOutput(bill, state, { includeActivity: true })
    exportData.exported_at = (await this.get('currentTime')) ?? null

    const str = this.protocol.safeJsonStringify(exportData)
    this.assert(str !== null, new Error('Export serialize failed'))
    console.log('bill_export:', str)
  }

  async billList() {
    const limit = this.value?.limit ?? 10
    const filterCurrency = this._normalizeAddress(this.value?.currency) || null
    const filterTag = this._normalizeAddress(this.value?.tag) || null
    const filterCreator = this._normalizeAddress(this.value?.creator_address) || null
    const includeArchived = this._parseBoolLike(this.value?.include_archived, false)
    const filterClosed = this._parseBoolLike(this.value?.closed, null)
    const filterSettled = this._parseBoolLike(this.value?.settled, null)

    const ids = (await this.get('bill_ids')) ?? []
    const list = Array.isArray(ids) ? ids : []
    const bills = []

    for (const id of list) {
      if (bills.length >= limit) break

      const bill = await this.get(`bill:${id}`)
      if (bill === null) continue

      if (!includeArchived && bill.archived) continue
      if (filterCurrency && bill.currency !== filterCurrency) continue
      if (filterCreator && bill.creator_address !== filterCreator) continue

      if (filterTag) {
        const tags = Array.isArray(bill.tags) ? bill.tags : []
        if (!tags.some((t) => String(t).toLowerCase().includes(filterTag.toLowerCase()))) continue
      }

      if (filterClosed !== null && !!bill.closed !== filterClosed) continue

      const state = this._computeBillState(bill)
      if (filterSettled !== null && state.allSettled !== filterSettled) continue

      bills.push({
        id: bill.id,
        title: bill.title,
        currency: bill.currency,
        closed: !!bill.closed,
        archived: !!bill.archived,
        tags: Array.isArray(bill.tags) ? bill.tags : [],
        total: state.total,
        outstanding: state.outstanding,
        allSettled: state.allSettled
      })
    }

    console.log('bill_list:', bills)
  }

  async billUpdate() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can update'))

    const hasUpdate = this.value.title !== undefined || this.value.currency !== undefined || this.value.tags !== undefined
    this.assert(hasUpdate, new Error('At least one field (title, currency, tags) required'))

    const cloned = this._cloneBillForWrite(bill)

    if (this.value.title !== undefined) {
      const title = String(this.value.title).trim()
      this.assert(title.length > 0, new Error('Title required'))
      cloned.title = title
    }

    if (this.value.currency !== undefined) {
      const currency = String(this.value.currency).trim()
      this.assert(currency.length > 0, new Error('Currency required'))
      cloned.currency = currency
    }

    if (this.value.tags !== undefined) cloned.tags = this._parseTags(this.value.tags)

    await this._logActivity(cloned, 'bill_updated', {
      id,
      title: cloned.title,
      currency: cloned.currency,
      tags: cloned.tags
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_updated:', { id, title: cloned.title, currency: cloned.currency, tags: cloned.tags })
  }

  async billUnsettle() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const addr = this._normalizeAddress(this.address)
    const isParticipant = this._getParticipantAddresses(bill).includes(addr)
    this.assert(isParticipant, new Error('Not a participant'))

    const stateBefore = this._computeBillState(bill)
    this.assert(!stateBefore.allSettled, new Error('Bill is fully settled; cannot unsettle'))

    const paidAmount = stateBefore.paidByAddress[addr] || 0
    const settledMap = this._asObject(bill.settled)
    this.assert(paidAmount > 0 || !!settledMap[addr], new Error('Nothing to unsettle'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.payments = this._asObject(cloned.payments)
    delete cloned.payments[addr]

    cloned.settled = this._asObject(cloned.settled)
    delete cloned.settled[addr]

    const stateAfter = this._computeBillState(cloned)
    cloned.settled = this._syncSettledMap(cloned, stateAfter)

    await this._logActivity(cloned, 'bill_unsettled', {
      id,
      address: addr,
      removed_payment: paidAmount
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_unsettled:', { id, address: addr, removed_payment: paidAmount })
  }

  async billReopen() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can reopen'))
    this.assert(!!bill.closed, new Error('Bill is not closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.closed = false

    await this._logActivity(cloned, 'bill_reopened', { id })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_reopened:', { id })
  }

  async billTip() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const hasAmount = this.value.amount !== undefined
    const hasPercent = this.value.percent !== undefined
    this.assert(hasAmount || hasPercent, new Error('Provide amount or percent'))

    const splitBetween = this._parseAddressCsv(this.value.split_between)
    const participants = this._getParticipantAddresses(bill)
    if (splitBetween.length > 0) {
      for (const addr of splitBetween) {
        this.assert(participants.includes(addr), new Error(`split_between contains non-participant address: ${addr}`))
      }
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.items = Array.isArray(cloned.items) ? cloned.items.slice() : []

    let tipAmount
    let description

    if (hasAmount) {
      tipAmount = this._roundMoney(Number(this.value.amount))
      description = 'Tip'
    } else {
      const pct = Number(this.value.percent)
      this.assert(Number.isFinite(pct) && pct >= 0 && pct <= 100, new Error('Invalid percent'))
      const subtotal = cloned.items.reduce((sum, it) => sum + (Number(it?.amount) || 0), 0)
      tipAmount = this._roundMoney(subtotal * (pct / 100))
      description = `Tip (${pct}%)`
    }

    this.assert(Number.isFinite(tipAmount) && tipAmount >= 0, new Error('Tip amount must be non-negative'))

    const tipItem = { description, amount: tipAmount }
    if (splitBetween.length > 0) tipItem.split_between = splitBetween

    cloned.items.push(tipItem)

    await this._logActivity(cloned, 'bill_tip_added', {
      id,
      description,
      amount: tipAmount,
      split_between_count: splitBetween.length
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_tip_added:', { id, description, amount: tipAmount, split_between: splitBetween })
  }

  async billStats() {
    const counter = (await this.get('bill_counter')) ?? 0
    const ids = (await this.get('bill_ids')) ?? []

    let totalParticipants = 0
    let totalItems = 0
    let totalAmount = 0
    let totalPaid = 0
    let outstandingTotal = 0
    let closedCount = 0
    let archivedCount = 0
    let settledCount = 0

    const currencyCounts = {}
    const tagCounts = {}

    for (const id of Array.isArray(ids) ? ids : []) {
      const bill = await this.get(`bill:${id}`)
      if (bill === null) continue

      if (bill.closed) closedCount++
      if (bill.archived) archivedCount++

      const state = this._computeBillState(bill)
      if (state.allSettled) settledCount++

      totalParticipants += state.participantAddresses.length
      totalItems += Array.isArray(bill.items) ? bill.items.length : 0
      totalAmount = this._roundMoney(totalAmount + state.total)
      totalPaid = this._roundMoney(totalPaid + state.totalPaid)
      outstandingTotal = this._roundMoney(outstandingTotal + state.outstanding)

      const currency = bill.currency || '?'
      currencyCounts[currency] = (currencyCounts[currency] || 0) + 1

      const tags = Array.isArray(bill.tags) ? bill.tags : []
      for (const tag of tags) {
        const key = String(tag).trim().toLowerCase()
        if (!key) continue
        tagCounts[key] = (tagCounts[key] || 0) + 1
      }
    }

    const stats = {
      total_bills: counter,
      listed_bills: Array.isArray(ids) ? ids.length : 0,
      total_participants: totalParticipants,
      total_items: totalItems,
      total_amount: totalAmount,
      total_paid: totalPaid,
      outstanding_total: outstandingTotal,
      closed_bills: closedCount,
      archived_bills: archivedCount,
      fully_settled_bills: settledCount,
      by_currency: currencyCounts,
      by_tag: tagCounts
    }

    console.log('bill_stats:', stats)
  }

  async billSetWeights() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can set weights'))

    const participantAddresses = this._getParticipantAddresses(bill)
    this.assert(participantAddresses.length > 0, new Error('No participants'))

    const parsed = this._parseWeights(this.value.weights)
    const providedAddresses = Object.keys(parsed)
    this.assert(providedAddresses.length > 0, new Error('No valid weights provided'))

    for (const target of providedAddresses) {
      this.assert(participantAddresses.includes(target), new Error(`Weight provided for non-participant: ${target}`))
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.weights = this._asObject(cloned.weights)

    for (const participant of participantAddresses) {
      if (Number.isFinite(parsed[participant]) && parsed[participant] > 0) {
        cloned.weights[participant] = parsed[participant]
      } else if (!(Number(cloned.weights[participant]) > 0)) {
        cloned.weights[participant] = 1
      }
    }

    const stateAfter = this._computeBillState(cloned)
    cloned.settled = this._syncSettledMap(cloned, stateAfter)

    await this._logActivity(cloned, 'bill_weights_updated', {
      id,
      weights: cloned.weights
    })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_weights_updated:', { id, weights: cloned.weights })
  }

  async billBalance() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    if (bill === null) {
      console.log('bill_balance: not found', id)
      return
    }

    const names = this._getParticipantNameMap(bill)
    const state = this._computeBillState(bill)

    const rows = state.participantAddresses.map((address) => ({
      address,
      name: names[address] || null,
      weight: state.participantWeights[address] || 1,
      due: state.dueByAddress[address] || 0,
      paid: state.paidByAddress[address] || 0,
      remaining: state.remainingByAddress[address] || 0,
      overpaid: state.overpaidByAddress[address] || 0,
      settled: (state.remainingByAddress[address] || 0) <= 0
    }))

    const out = {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      closed: !!bill.closed,
      archived: !!bill.archived,
      total: state.total,
      totalPaid: state.totalPaid,
      outstanding: state.outstanding,
      allSettled: state.allSettled,
      rows
    }

    console.log('bill_balance:', out)
  }

  async billActivity() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    if (bill === null) {
      console.log('bill_activity: not found', id)
      return
    }

    const limit = this.value?.limit ?? 20
    const activity = Array.isArray(bill.activity) ? bill.activity : []
    const out = activity.slice(Math.max(0, activity.length - limit))

    console.log('bill_activity:', out)
  }

  async billArchive() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can archive'))
    this.assert(!bill.archived, new Error('Bill is already archived'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.archived = true
    cloned.closed = true

    await this._logActivity(cloned, 'bill_archived', { id })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_archived:', { id })
  }

  async billUnarchive() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can unarchive'))
    this.assert(!!bill.archived, new Error('Bill is not archived'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.archived = false

    await this._logActivity(cloned, 'bill_unarchived', { id })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_unarchived:', { id })
  }

  async billEditItem() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.closed, new Error('Bill is closed'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._isEditorOrCreator(bill, actor), new Error('Only creator/editor can edit items'))

    const idx = this.value.item_index
    const items = Array.isArray(bill.items) ? bill.items : []
    this.assert(idx >= 0 && idx < items.length, new Error('Invalid item index'))

    const hasUpdate = this.value.description !== undefined || this.value.amount !== undefined || this.value.split_between !== undefined
    this.assert(hasUpdate, new Error('At least one field (description, amount, split_between) required'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.items = items.slice()
    const item = Object.assign({}, cloned.items[idx])

    if (this.value.description !== undefined) {
      const description = String(this.value.description).trim()
      this.assert(description.length > 0, new Error('Description required'))
      item.description = description
    }

    if (this.value.amount !== undefined) {
      const amount = Number(this.value.amount)
      this.assert(Number.isFinite(amount) && amount >= 0, new Error('Amount must be non-negative'))
      item.amount = this._roundMoney(amount)
    }

    if (this.value.split_between !== undefined) {
      const splitBetween = this._parseAddressCsv(this.value.split_between)
      const participants = this._getParticipantAddresses(bill)
      for (const addr of splitBetween) {
        this.assert(participants.includes(addr), new Error(`split_between contains non-participant: ${addr}`))
      }
      if (splitBetween.length > 0) {
        item.split_between = splitBetween
      } else {
        delete item.split_between
      }
    }

    cloned.items[idx] = item
    await this._logActivity(cloned, 'bill_item_edited', { id, item_index: idx, description: item.description, amount: item.amount })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_item_edited:', { id, item_index: idx, description: item.description, amount: item.amount })
  }

  async billDebt() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    if (bill === null) {
      console.log('bill_debt: not found', id)
      return
    }

    const names = this._getParticipantNameMap(bill)
    const state = this._computeBillState(bill)

    // net = paid - due: positive = creditor (overpaid), negative = debtor (underpaid)
    const nets = {}
    for (const addr of state.participantAddresses) {
      nets[addr] = this._roundMoney((state.paidByAddress[addr] || 0) - (state.dueByAddress[addr] || 0))
    }

    const debtors = state.participantAddresses
      .filter(a => nets[a] < 0)
      .map(a => ({ address: a, name: names[a] || null, balance: nets[a] }))
      .sort((a, b) => a.balance - b.balance)

    const creditors = state.participantAddresses
      .filter(a => nets[a] > 0)
      .map(a => ({ address: a, name: names[a] || null, balance: nets[a] }))
      .sort((a, b) => b.balance - a.balance)

    const transfers = []
    let i = 0
    let j = 0
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i]
      const creditor = creditors[j]
      const amount = this._roundMoney(Math.min(Math.abs(debtor.balance), creditor.balance))
      if (amount > 0) {
        transfers.push({ from: debtor.address, from_name: debtor.name, to: creditor.address, to_name: creditor.name, amount })
      }
      debtor.balance = this._roundMoney(debtor.balance + amount)
      creditor.balance = this._roundMoney(creditor.balance - amount)
      if (Math.abs(debtor.balance) < 0.005) i++
      if (Math.abs(creditor.balance) < 0.005) j++
    }

    console.log('bill_debt:', {
      id: bill.id,
      title: bill.title,
      currency: bill.currency,
      total: state.total,
      outstanding: state.outstanding,
      allSettled: state.allSettled,
      transfers
    })
  }

  async billCopy() {
    const sourceId = this.value.id
    const source = await this.get(`bill:${sourceId}`)
    this.assert(source !== null, new Error('Source bill not found'))

    const counter = (await this.get('bill_counter')) ?? 0
    const nextId = counter + 1
    const creatorAddress = this._normalizeAddress(this.address) || null

    const rawTags = this.value.tags !== undefined ? this.value.tags : (Array.isArray(source.tags) ? source.tags.join(',') : '')
    const tags = this._parseTags(rawTags)
    const currency = (this.value.currency && String(this.value.currency).trim()) || source.currency

    // Copy items, strip split_between (participants differ in the new bill)
    const items = (Array.isArray(source.items) ? source.items : []).map(it => ({
      description: String(it.description ?? ''),
      amount: this._roundMoney(Number(it.amount) || 0)
    }))

    const bill = {
      id: nextId,
      title: this.value.title,
      currency,
      creator_name: this.value.creator_name,
      creator_address: creatorAddress,
      participants: [{ address: creatorAddress, name: this.value.creator_name }],
      items,
      settled: {},
      payments: {},
      notes: [],
      closed: false,
      archived: false,
      tags,
      weights: creatorAddress ? { [creatorAddress]: 1 } : {},
      activity: []
    }

    await this._logActivity(bill, 'bill_copied', { id: nextId, source_id: sourceId, title: bill.title, item_count: items.length })

    await this.put(`bill:${nextId}`, bill)
    await this.put('bill_counter', nextId)

    let ids = (await this.get('bill_ids')) ?? []
    ids = [nextId].concat(Array.isArray(ids) ? ids : []).slice(0, 50)
    await this.put('bill_ids', ids)

    console.log('bill_copied:', { id: nextId, source_id: sourceId, title: bill.title, item_count: items.length, currency })
  }

  async billDeadline() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    this.assert(bill.creator_address === addr, new Error('Only creator can set deadline'))

    const deadline = this.value.deadline !== undefined ? String(this.value.deadline).trim() : ''

    const cloned = this._cloneBillForWrite(bill)
    if (deadline.length > 0) {
      cloned.deadline = deadline
    } else {
      delete cloned.deadline
    }

    await this._logActivity(cloned, 'bill_deadline_set', { id, deadline: deadline || null })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_deadline_set:', { id, deadline: deadline || null })
  }

  async billRename() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const addr = this._normalizeAddress(this.address)
    this.assert(this._getParticipantAddresses(bill).includes(addr), new Error('Not a participant'))

    const name = String(this.value.name ?? '').trim()
    this.assert(name.length > 0, new Error('Name required'))

    const cloned = this._cloneBillForWrite(bill)
    cloned.participants = (Array.isArray(cloned.participants) ? cloned.participants : []).map(p => {
      if (this._normalizeAddress(p?.address) === addr) return Object.assign({}, p, { name })
      return p
    })

    await this._logActivity(cloned, 'bill_participant_renamed', { id, address: addr, name })

    await this.put(`bill:${id}`, cloned)
    console.log('bill_participant_renamed:', { id, address: addr, name })
  }

  async billAddEditor() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))
    this.assert(!bill.archived, new Error('Bill is archived'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._normalizeAddress(bill.creator_address) === actor, new Error('Only creator can add editors'))

    const editor = this._normalizeAddress(this.value.editor_address)
    this.assert(editor.length > 0, new Error('Editor address required'))
    this.assert(editor !== actor, new Error('Creator is already implied'))

    const cloned = this._cloneBillForWrite(bill)
    const editors = Array.isArray(cloned.editors) ? cloned.editors.slice() : []
    if (!editors.some((e) => this._normalizeAddress(e) === editor)) editors.push(editor)
    cloned.editors = editors.slice(0, 20)

    await this._logActivity(cloned, 'bill_editor_added', { id, editor_address: editor })
    await this.put(`bill:${id}`, cloned)
    console.log('bill_editor_added:', { id, editor_address: editor })
  }

  async billRemoveEditor() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._normalizeAddress(bill.creator_address) === actor, new Error('Only creator can remove editors'))

    const editor = this._normalizeAddress(this.value.editor_address)
    this.assert(editor.length > 0, new Error('Editor address required'))

    const cloned = this._cloneBillForWrite(bill)
    const editors = Array.isArray(cloned.editors) ? cloned.editors.slice() : []
    cloned.editors = editors.filter((e) => this._normalizeAddress(e) !== editor)

    await this._logActivity(cloned, 'bill_editor_removed', { id, editor_address: editor })
    await this.put(`bill:${id}`, cloned)
    console.log('bill_editor_removed:', { id, editor_address: editor })
  }

  async billListEditors() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    if (bill === null) {
      console.log('bill_editors: not found', id)
      return
    }
    const editors = Array.isArray(bill.editors) ? bill.editors : []
    console.log('bill_editors:', { id, editors })
  }

  async billAnchorReceipt() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._isEditorOrCreator(bill, actor), new Error('Only creator/editor can anchor receipts'))

    const hash = String(this.value.hash || '').trim()
    this.assert(hash.length >= 8, new Error('Hash required'))
    const note = this.value.note !== undefined ? String(this.value.note || '').trim() : ''

    const cloned = this._cloneBillForWrite(bill)
    const receipts = Array.isArray(cloned.receipts) ? cloned.receipts.slice() : []
    if (receipts.length >= 20) receipts.shift()
    receipts.push({
      hash,
      note: note || null,
      by: actor,
      at: (await this.get('currentTime')) ?? null
    })
    cloned.receipts = receipts

    await this._logActivity(cloned, 'bill_receipt_anchored', { id, hash })
    await this.put(`bill:${id}`, cloned)
    console.log('bill_receipt_anchored:', { id, hash })
  }

  async billSetInvite() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._normalizeAddress(bill.creator_address) === actor, new Error('Only creator can set invite'))

    const code = String(this.value.code || '').trim()
    this.assert(code.length >= 3, new Error('Invite code too short'))

    let expiresAt = null
    const ttl = this.value.ttl_sec
    const now = await this.get('currentTime')
    if (ttl !== undefined && Number.isFinite(Number(ttl)) && Number(ttl) > 0 && now !== null && now !== undefined) {
      expiresAt = Number(now) + (Number(ttl) * 1000)
    }

    const cloned = this._cloneBillForWrite(bill)
    cloned.invite_code = code
    cloned.invite_expires_at = expiresAt

    await this._logActivity(cloned, 'bill_invite_set', { id, expires_at: expiresAt })
    await this.put(`bill:${id}`, cloned)
    console.log('bill_invite_set:', { id, code, expires_at: expiresAt })
  }

  async billJoinCode() {
    const code = String(this.value.code || '').trim()
    const name = String(this.value.name || '').trim()
    this.assert(code.length >= 3, new Error('Invite code required'))
    this.assert(name.length > 0, new Error('Name required'))

    const addr = this._normalizeAddress(this.address)
    this.assert(addr.length > 0, new Error('Address required'))

    const ids = (await this.get('bill_ids')) ?? []
    const list = Array.isArray(ids) ? ids : []

    let found = null
    for (const id of list) {
      const bill = await this.get(`bill:${id}`)
      if (bill === null) continue
      if (bill.invite_code !== code) continue
      if (bill.closed || bill.archived) continue
      const exp = bill.invite_expires_at ?? null
      const now = await this.get('currentTime')
      if (exp && now && Number(now) > Number(exp)) continue
      found = bill
      break
    }
    this.assert(found !== null, new Error('No active bill for this invite code'))

    const id = found.id
    const exists = Array.isArray(found.participants) && found.participants.some((p) => this._normalizeAddress(p?.address) === addr)
    if (exists) {
      console.log('bill_join_code: already a participant')
      return
    }

    const cloned = this._cloneBillForWrite(found)
    cloned.participants = Array.isArray(cloned.participants) ? cloned.participants.slice() : []
    cloned.participants.push({ address: addr, name })

    cloned.weights = this._asObject(cloned.weights)
    if (!(Number(cloned.weights[addr]) > 0)) cloned.weights[addr] = 1

    await this._logActivity(cloned, 'bill_joined_by_code', { id, name, address: addr })
    await this.put(`bill:${id}`, cloned)
    console.log('bill_joined:', { id, name, address: addr })
  }

  async templateSave() {
    const id = this.value.id
    const bill = await this.get(`bill:${id}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._normalizeAddress(bill.creator_address) === actor, new Error('Only creator can save template'))

    const name = String(this.value.name || '').trim()
    this.assert(name.length > 0, new Error('Template name required'))

    const counter = (await this.get('template_counter')) ?? 0
    const nextId = counter + 1
    const tpl = {
      id: nextId,
      name,
      from_bill_id: id,
      title: bill.title,
      currency: bill.currency,
      tags: Array.isArray(bill.tags) ? bill.tags : [],
      created_by: actor,
      created_at: (await this.get('currentTime')) ?? null
    }

    await this.put(`template:${nextId}`, tpl)
    await this.put('template_counter', nextId)
    let ids = (await this.get('template_ids')) ?? []
    ids = [nextId].concat(Array.isArray(ids) ? ids : []).slice(0, 50)
    await this.put('template_ids', ids)

    console.log('template_saved:', tpl)
  }

  async templateCreate() {
    const templateId = this.value.template_id
    const tpl = await this.get(`template:${templateId}`)
    this.assert(tpl !== null, new Error('Template not found'))

    const counter = (await this.get('bill_counter')) ?? 0
    const nextId = counter + 1
    const tags = Array.isArray(tpl.tags) ? tpl.tags : []
    const creatorAddress = this._normalizeAddress(this.address) || null
    const title = this.value.title !== undefined ? String(this.value.title).trim() : String(tpl.title || '').trim()
    this.assert(title.length > 0, new Error('Title required'))

    const bill = {
      id: nextId,
      title,
      currency: String(tpl.currency || '').trim() || 'USD',
      creator_name: this.value.creator_name,
      creator_address: creatorAddress,
      participants: [{ address: creatorAddress, name: this.value.creator_name }],
      items: [],
      settled: {},
      payments: {},
      notes: [],
      editors: [],
      receipts: [],
      invite_code: null,
      invite_expires_at: null,
      closed: false,
      archived: false,
      tags,
      weights: creatorAddress ? { [creatorAddress]: 1 } : {},
      activity: []
    }

    await this._logActivity(bill, 'bill_created_from_template', { id: nextId, template_id: templateId, title })
    await this.put(`bill:${nextId}`, bill)
    await this.put('bill_counter', nextId)

    let billIds = (await this.get('bill_ids')) ?? []
    billIds = [nextId].concat(Array.isArray(billIds) ? billIds : []).slice(0, 50)
    await this.put('bill_ids', billIds)

    console.log('bill_created:', { id: nextId, title: bill.title, currency: bill.currency, tags })
  }

  async templateGet() {
    const templateId = this.value.template_id
    const tpl = await this.get(`template:${templateId}`)
    console.log('template_get:', tpl)
  }

  async templateList() {
    const limit = this.value?.limit ?? 10
    const ids = (await this.get('template_ids')) ?? []
    const list = Array.isArray(ids) ? ids.slice(0, limit) : []
    const out = []
    for (const id of list) {
      const tpl = await this.get(`template:${id}`)
      if (tpl !== null) out.push(tpl)
    }
    console.log('template_list:', out)
  }

  async groupCreate() {
    const name = String(this.value.name || '').trim()
    this.assert(name.length > 0, new Error('Group name required'))
    const actor = this._normalizeAddress(this.address)

    const counter = (await this.get('group_counter')) ?? 0
    const nextId = counter + 1
    const group = {
      id: nextId,
      name,
      creator_address: actor || null,
      bill_ids: [],
      created_at: (await this.get('currentTime')) ?? null
    }
    await this.put(`group:${nextId}`, group)
    await this.put('group_counter', nextId)
    let ids = (await this.get('group_ids')) ?? []
    ids = [nextId].concat(Array.isArray(ids) ? ids : []).slice(0, 50)
    await this.put('group_ids', ids)
    console.log('group_created:', group)
  }

  async groupAddBill() {
    const groupId = this.value.group_id
    const billId = this.value.bill_id
    const group = await this.get(`group:${groupId}`)
    this.assert(group !== null, new Error('Group not found'))
    const bill = await this.get(`bill:${billId}`)
    this.assert(bill !== null, new Error('Bill not found'))

    const actor = this._normalizeAddress(this.address)
    this.assert(this._normalizeAddress(group.creator_address) === actor, new Error('Only group creator can add bills'))

    const cloned = this.protocol.safeClone(group)
    this.assert(cloned !== null, new Error('Clone failed'))
    const list = Array.isArray(cloned.bill_ids) ? cloned.bill_ids.slice() : []
    if (!list.includes(billId)) list.push(billId)
    cloned.bill_ids = list.slice(0, 50)

    await this.put(`group:${groupId}`, cloned)
    console.log('group_bill_added:', { group_id: groupId, bill_id: billId })
  }

  async groupGet() {
    const groupId = this.value.group_id
    const group = await this.get(`group:${groupId}`)
    if (group === null) {
      console.log('group_get: not found', groupId)
      return
    }
    const billIds = Array.isArray(group.bill_ids) ? group.bill_ids : []
    const bills = []
    for (const id of billIds) {
      const b = await this.get(`bill:${id}`)
      if (b !== null) bills.push({ id: b.id, title: b.title, currency: b.currency, closed: !!b.closed, archived: !!b.archived })
    }
    console.log('group_get:', Object.assign({}, group, { bills }))
  }

  async groupList() {
    const limit = this.value?.limit ?? 10
    const ids = (await this.get('group_ids')) ?? []
    const list = Array.isArray(ids) ? ids.slice(0, limit) : []
    const out = []
    for (const id of list) {
      const g = await this.get(`group:${id}`)
      if (g !== null) out.push(g)
    }
    console.log('group_list:', out)
  }
}

export default SampleContract
