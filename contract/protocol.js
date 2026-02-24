import {Protocol} from "trac-peer";
import { bufferToBigInt, bigIntToDecimalString } from "trac-msb/src/utils/amountSerialization.js";
import b4a from "b4a";
import PeerWallet from "trac-wallet";
import fs from "fs";

const stableStringify = (value) => {
  if (value === null || value === undefined) return 'null';
  if (typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  const keys = Object.keys(value).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
};

const normalizeInvitePayload = (payload) => {
  return {
    channel: String(payload?.channel ?? ''),
    inviteePubKey: String(payload?.inviteePubKey ?? '').trim().toLowerCase(),
    inviterPubKey: String(payload?.inviterPubKey ?? '').trim().toLowerCase(),
    inviterAddress: payload?.inviterAddress ?? null,
    issuedAt: Number(payload?.issuedAt),
    expiresAt: Number(payload?.expiresAt),
    nonce: String(payload?.nonce ?? ''),
    version: Number.isFinite(payload?.version) ? Number(payload.version) : 1,
  };
};

const normalizeWelcomePayload = (payload) => {
  return {
    channel: String(payload?.channel ?? ''),
    ownerPubKey: String(payload?.ownerPubKey ?? '').trim().toLowerCase(),
    text: String(payload?.text ?? ''),
    issuedAt: Number(payload?.issuedAt),
    version: Number.isFinite(payload?.version) ? Number(payload.version) : 1,
  };
};

const parseInviteArg = (raw) => {
  if (!raw) return null;
  let text = String(raw || '').trim();
  if (!text) return null;
  if (text.startsWith('@')) {
    try {
      text = fs.readFileSync(text.slice(1), 'utf8').trim();
    } catch (_e) {
      return null;
    }
  }
  if (text.startsWith('b64:')) text = text.slice(4);
  if (text.startsWith('{')) {
    try {
      return JSON.parse(text);
    } catch (_e) {}
  }
  try {
    const decoded = b4a.toString(b4a.from(text, 'base64'));
    return JSON.parse(decoded);
  } catch (_e) {}
  return null;
};

const parseWelcomeArg = (raw) => {
  if (!raw) return null;
  let text = String(raw || '').trim();
  if (!text) return null;
  if (text.startsWith('@')) {
    try {
      text = fs.readFileSync(text.slice(1), 'utf8').trim();
    } catch (_e) {
      return null;
    }
  }
  if (text.startsWith('b64:')) text = text.slice(4);
  if (text.startsWith('{')) {
    try {
      return JSON.parse(text);
    } catch (_e) {}
  }
  try {
    const decoded = b4a.toString(b4a.from(text, 'base64'));
    return JSON.parse(decoded);
  } catch (_e) {}
  return null;
};

class SampleProtocol extends Protocol {

  constructor(peer, base, options = {}) {
    super(peer, base, options);
  }

  async extendApi() {
    this.api.getSampleData = function () {
      return 'Some sample data';
    };
  }

  /**
   * ReceiptSplit: map tx commands to contract functions.
   * Commands: bill_create, bill_join, bill_add_item, bill_remove_item, bill_settle, bill_close,
   *          bill_leave, bill_note, bill_get, bill_export, bill_list, bill_stats
   */
  mapTxCommand(command) {
    let obj = { type: '', value: null };
    const json = this.safeJsonParse(command);
    if (!json || typeof json !== 'object') return null;

    if (json.op === 'bill_create') {
      obj.type = 'billCreate';
      obj.value = {
        title: json.title ?? '',
        currency: json.currency ?? '',
        creator_name: json.creator_name ?? '',
        tags: json.tags ?? ''
      };
      return obj;
    }
    if (json.op === 'bill_join') {
      obj.type = 'billJoin';
      obj.value = { id: json.id ?? 0, name: json.name ?? '' };
      return obj;
    }
    if (json.op === 'bill_add_item') {
      obj.type = 'billAddItem';
      obj.value = {
        id: json.id ?? 0,
        description: json.description ?? '',
        amount: json.amount ?? 0
      };
      return obj;
    }
    if (json.op === 'bill_remove_item') {
      obj.type = 'billRemoveItem';
      obj.value = { id: json.id ?? 0, item_index: json.item_index ?? 0 };
      return obj;
    }
    if (json.op === 'bill_assign_item') {
      obj.type = 'billAssignItem';
      obj.value = { id: json.id ?? 0, item_index: json.item_index ?? 0, assignees: json.assignees ?? '' };
      return obj;
    }
    if (json.op === 'bill_set_payer') {
      obj.type = 'billSetPayer';
      obj.value = { id: json.id ?? 0, item_index: json.item_index ?? 0, payer_address: json.payer_address ?? '' };
      return obj;
    }
    if (json.op === 'bill_set_split_mode') {
      obj.type = 'billSetSplitMode';
      obj.value = { id: json.id ?? 0, mode: json.mode ?? '' };
      return obj;
    }
    if (json.op === 'bill_set_weight') {
      obj.type = 'billSetWeight';
      obj.value = { id: json.id ?? 0, weight: json.weight ?? 1 };
      return obj;
    }
    if (json.op === 'bill_settle') {
      obj.type = 'billSettle';
      obj.value = { id: json.id ?? 0, proof: json.proof ?? '' };
      return obj;
    }
    if (json.op === 'bill_close') {
      obj.type = 'billClose';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_leave') {
      obj.type = 'billLeave';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_note') {
      obj.type = 'billNote';
      obj.value = { id: json.id ?? 0, text: json.text ?? '' };
      return obj;
    }
    if (json.op === 'bill_get') {
      obj.type = 'billGet';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_export') {
      obj.type = 'billExport';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_balances') {
      obj.type = 'billBalances';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_list') {
      obj.type = 'billList';
      obj.value = {
        limit: json.limit ?? 10,
        currency: json.currency ?? '',
        tag: json.tag ?? '',
        creator_address: json.creator_address ?? ''
      };
      return obj;
    }
    if (json.op === 'bill_stats') {
      obj.type = 'billStats';
      obj.value = {};
      return obj;
    }
    if (json.op === 'bill_update') {
      obj.type = 'billUpdate';
      obj.value = { id: json.id ?? 0 };
      if (json.title !== undefined) obj.value.title = json.title;
      if (json.currency !== undefined) obj.value.currency = json.currency;
      if (json.tags !== undefined) obj.value.tags = json.tags;
      return obj;
    }
    if (json.op === 'bill_unsettle') {
      obj.type = 'billUnsettle';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_reopen') {
      obj.type = 'billReopen';
      obj.value = { id: json.id ?? 0 };
      return obj;
    }
    if (json.op === 'bill_tip') {
      obj.type = 'billTip';
      obj.value = { id: json.id ?? 0 };
      if (json.amount !== undefined) obj.value.amount = json.amount;
      if (json.percent !== undefined) obj.value.percent = json.percent;
      return obj;
    }
    return null;
  }

  async printOptions() {
    console.log(' ');
    console.log('- ReceiptSplit Commands:');
    console.log('- /tx --command \'{ "op": "bill_create", "title": "Dinner", "currency": "USD", "creator_name": "Alice", "tags": "food,team" }\'');
    console.log('- /tx --command \'{ "op": "bill_join", "id": 1, "name": "Bob" }\'');
    console.log('- /tx --command \'{ "op": "bill_add_item", "id": 1, "description": "Pizza", "amount": 30 }\'');
    console.log('- /tx --command \'{ "op": "bill_remove_item", "id": 1, "item_index": 0 }\'');
    console.log('- /tx --command \'{ "op": "bill_assign_item", "id": 1, "item_index": 0, "assignees": "trac1...,trac1..." }\'');
    console.log('- /tx --command \'{ "op": "bill_set_payer", "id": 1, "item_index": 0, "payer_address": "trac1..." }\'');
    console.log('- /tx --command \'{ "op": "bill_set_split_mode", "id": 1, "mode": "weights" }\'');
    console.log('- /tx --command \'{ "op": "bill_set_weight", "id": 1, "weight": 2 }\'');
    console.log('- /tx --command \'{ "op": "bill_settle", "id": 1, "proof": "txid-abc123" }\'');
    console.log('- /tx --command \'{ "op": "bill_close", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_leave", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_note", "id": 1, "text": "Paid in cash" }\'');
    console.log('- /tx --command \'{ "op": "bill_get", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_balances", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_export", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_list", "limit": 10, "currency": "USD", "tag": "food" }\'');
    console.log('- /tx --command \'{ "op": "bill_stats" }\'');
    console.log('- /tx --command \'{ "op": "bill_update", "id": 1, "title": "New Title", "currency": "EUR", "tags": "food" }\'');
    console.log('- /tx --command \'{ "op": "bill_unsettle", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_reopen", "id": 1 }\'');
    console.log('- /tx --command \'{ "op": "bill_tip", "id": 1, "amount": 10 }\'');
    console.log('- /tx --command \'{ "op": "bill_tip", "id": 1, "percent": 18 }\'');
    console.log(' ');
    console.log('- Utilities:');
    console.log('- /get --key " " [--confirmed true|false] | reads subnet state key (confirmed defaults to true).');
    console.log('- /msb | prints MSB txv + lengths (local MSB node view).');
    console.log('- /sc_join --channel " " [--invite] [--welcome] | join an ephemeral sidechannel (no autobase).');
    console.log('- /sc_open --channel " " [--via " "] [--invite] [--welcome] | request others to open a sidechannel.');
    console.log('- /sc_send --channel " " --message " " [--invite] | send message over sidechannel.');
    console.log('- /sc_invite --channel " " --pubkey " " [--ttl] [--welcome] | create a signed invite.');
    console.log('- /sc_welcome --channel " " --text " " | create a signed welcome.');
    console.log('- /sc_stats | show sidechannel channels + connection count.');
  }

  async customCommand(input) {
    await super.tokenizeInput(input);
    if (this.input.startsWith("/get")) {
      const m = input.match(/(?:^|\s)--key(?:=|\s+)(\"[^\"]+\"|'[^']+'|\S+)/);
      const raw = m ? m[1].trim() : null;
      if (!raw) {
        console.log('Usage: /get --key " " [--confirmed true|false] [--unconfirmed 1]');
        return;
      }
      const key = raw.replace(/^\"(.*)\"$/, "$1").replace(/^'(.*)'$/, "$1");
      const confirmedMatch = input.match(/(?:^|\s)--confirmed(?:=|\s+)(\S+)/);
      const unconfirmedMatch = input.match(/(?:^|\s)--unconfirmed(?:=|\s+)?(\S+)?/);
      const confirmed = unconfirmedMatch ? false : confirmedMatch ? confirmedMatch[1] === "true" || confirmedMatch[1] === "1" : true;
      const v = confirmed ? await this.getSigned(key) : await this.get(key);
      console.log(v);
      return;
    }
    if (this.input.startsWith("/msb")) {
      const txv = await this.peer.msbClient.getTxvHex();
      const peerMsbAddress = this.peer.msbClient.pubKeyHexToAddress(this.peer.wallet.publicKey);
      const entry = await this.peer.msbClient.getNodeEntryUnsigned(peerMsbAddress);
      const balance = entry?.balance ? bigIntToDecimalString(bufferToBigInt(entry.balance)) : 0;
      const feeBuf = this.peer.msbClient.getFee();
      const fee = feeBuf ? bigIntToDecimalString(bufferToBigInt(feeBuf)) : 0;
      const validators = this.peer.msbClient.getConnectedValidatorsCount();
      console.log({
        networkId: this.peer.msbClient.networkId,
        msbBootstrap: this.peer.msbClient.bootstrapHex,
        txv,
        msbSignedLength: this.peer.msbClient.getSignedLength(),
        msbUnsignedLength: this.peer.msbClient.getUnsignedLength(),
        connectedValidators: validators,
        peerMsbAddress,
        peerMsbBalance: balance,
        msbFee: fee,
      });
      return;
    }
    if (this.input.startsWith("/sc_join")) {
      const args = this.parseArgs(input);
      const name = args.channel || args.ch || args.name;
      const inviteArg = args.invite || args.invite_b64 || args.invitebase64;
      const welcomeArg = args.welcome || args.welcome_b64 || args.welcomebase64;
      if (!name) {
        console.log('Usage: /sc_join --channel " " [--invite] [--welcome]');
        return;
      }
      if (!this.peer.sidechannel) {
        console.log('Sidechannel not initialized.');
        return;
      }
      let invite = null;
      if (inviteArg) {
        invite = parseInviteArg(inviteArg);
        if (!invite) {
          console.log('Invalid invite. Pass JSON, base64, or @file.');
          return;
        }
      }
      let welcome = null;
      if (welcomeArg) {
        welcome = parseWelcomeArg(welcomeArg);
        if (!welcome) {
          console.log('Invalid welcome. Pass JSON, base64, or @file.');
          return;
        }
      }
      if (invite || welcome) {
        this.peer.sidechannel.acceptInvite(String(name), invite, welcome);
      }
      const ok = await this.peer.sidechannel.addChannel(String(name));
      if (!ok) {
        console.log('Join denied (invite required or invalid).');
        return;
      }
      console.log('Joined sidechannel:', name);
      return;
    }
    if (this.input.startsWith("/sc_send")) {
      const args = this.parseArgs(input);
      const name = args.channel || args.ch || args.name;
      const message = args.message || args.msg;
      const inviteArg = args.invite || args.invite_b64 || args.invitebase64;
      const welcomeArg = args.welcome || args.welcome_b64 || args.welcomebase64;
      if (!name || message === undefined) {
        console.log('Usage: /sc_send --channel " " --message " " [--invite] [--welcome]');
        return;
      }
      if (!this.peer.sidechannel) {
        console.log('Sidechannel not initialized.');
        return;
      }
      let invite = null;
      if (inviteArg) {
        invite = parseInviteArg(inviteArg);
        if (!invite) {
          console.log('Invalid invite. Pass JSON, base64, or @file.');
          return;
        }
      }
      let welcome = null;
      if (welcomeArg) {
        welcome = parseWelcomeArg(welcomeArg);
        if (!welcome) {
          console.log('Invalid welcome. Pass JSON, base64, or @file.');
          return;
        }
      }
      if (invite || welcome) {
        this.peer.sidechannel.acceptInvite(String(name), invite, welcome);
      }
      const ok = await this.peer.sidechannel.addChannel(String(name));
      if (!ok) {
        console.log('Send denied (invite required or invalid).');
        return;
      }
      const sent = this.peer.sidechannel.broadcast(String(name), message, invite ? { invite } : undefined);
      if (!sent) {
        console.log('Send denied (owner-only or invite required).');
      }
      return;
    }
    if (this.input.startsWith("/sc_open")) {
      const args = this.parseArgs(input);
      const name = args.channel || args.ch || args.name;
      const via = args.via || args.channel_via;
      const inviteArg = args.invite || args.invite_b64 || args.invitebase64;
      const welcomeArg = args.welcome || args.welcome_b64 || args.welcomebase64;
      if (!name) {
        console.log('Usage: /sc_open --channel " " [--via " "] [--invite] [--welcome]');
        return;
      }
      if (!this.peer.sidechannel) {
        console.log('Sidechannel not initialized.');
        return;
      }
      let invite = null;
      if (inviteArg) {
        invite = parseInviteArg(inviteArg);
        if (!invite) {
          console.log('Invalid invite. Pass JSON, base64, or @file.');
          return;
        }
      }
      let welcome = null;
      if (welcomeArg) {
        welcome = parseWelcomeArg(welcomeArg);
        if (!welcome) {
          console.log('Invalid welcome. Pass JSON, base64, or @file.');
          return;
        }
      } else if (typeof this.peer.sidechannel.getWelcome === 'function') {
        welcome = this.peer.sidechannel.getWelcome(String(name));
      }
      const viaChannel = via || this.peer.sidechannel.entryChannel || null;
      if (!viaChannel) {
        console.log('No entry channel configured. Pass --via " ".');
        return;
      }
      this.peer.sidechannel.requestOpen(String(name), String(viaChannel), invite, welcome);
      console.log('Requested channel:', name);
      return;
    }
    if (this.input.startsWith("/sc_invite")) {
      const args = this.parseArgs(input);
      const channel = args.channel || args.ch || args.name;
      const invitee = args.pubkey || args.invitee || args.peer || args.key;
      const ttlRaw = args.ttl || args.ttl_sec || args.ttl_s;
      const welcomeArg = args.welcome || args.welcome_b64 || args.welcomebase64;
      if (!channel || !invitee) {
        console.log('Usage: /sc_invite --channel " " --pubkey " " [--ttl] [--welcome]');
        return;
      }
      if (!this.peer.sidechannel) {
        console.log('Sidechannel not initialized.');
        return;
      }
      if (this.peer?.wallet?.ready) {
        try {
          await this.peer.wallet.ready;
        } catch (_e) {}
      }
      const walletPub = this.peer?.wallet?.publicKey;
      const inviterPubKey = walletPub
        ? typeof walletPub === 'string'
          ? walletPub.trim().toLowerCase()
          : b4a.toString(walletPub, 'hex')
        : null;
      if (!inviterPubKey) {
        console.log('Wallet not ready; cannot sign invite.');
        return;
      }
      let inviterAddress = null;
      try {
        if (this.peer?.msbClient) {
          inviterAddress = this.peer.msbClient.pubKeyHexToAddress(inviterPubKey);
        }
      } catch (_e) {}
      const issuedAt = Date.now();
      let ttlMs = null;
      if (ttlRaw !== undefined) {
        const ttlSec = Number.parseInt(String(ttlRaw), 10);
        ttlMs = Number.isFinite(ttlSec) ? Math.max(ttlSec, 0) * 1000 : null;
      } else if (Number.isFinite(this.peer.sidechannel.inviteTtlMs) && this.peer.sidechannel.inviteTtlMs > 0) {
        ttlMs = this.peer.sidechannel.inviteTtlMs;
      } else {
        ttlMs = 0;
      }
      if (!ttlMs || ttlMs <= 0) {
        console.log('Invite TTL is required. Pass --ttl or set --sidechannel-invite-ttl.');
        return;
      }
      const expiresAt = issuedAt + ttlMs;
      const payload = normalizeInvitePayload({
        channel: String(channel),
        inviteePubKey: String(invitee).trim().toLowerCase(),
        inviterPubKey,
        inviterAddress,
        issuedAt,
        expiresAt,
        nonce: Math.random().toString(36).slice(2, 10),
        version: 1,
      });
      const message = stableStringify(payload);
      const msgBuf = b4a.from(message);
      let sig = this.peer.wallet.sign(msgBuf);
      let sigHex = '';
      if (typeof sig === 'string') {
        sigHex = sig;
      } else if (sig && sig.length > 0) {
        sigHex = b4a.toString(sig, 'hex');
      }
      if (!sigHex) {
        const walletSecret = this.peer?.wallet?.secretKey;
        const secretBuf = walletSecret
          ? b4a.isBuffer(walletSecret)
            ? walletSecret
            : typeof walletSecret === 'string'
              ? b4a.from(walletSecret, 'hex')
              : b4a.from(walletSecret)
          : null;
        if (secretBuf) {
          const sigBuf = PeerWallet.sign(msgBuf, secretBuf);
          if (sigBuf && sigBuf.length > 0) {
            sigHex = b4a.toString(sigBuf, 'hex');
          }
        }
      }
      let welcome = null;
      if (welcomeArg) {
        welcome = parseWelcomeArg(welcomeArg);
        if (!welcome) {
          console.log('Invalid welcome. Pass JSON, base64, or @file.');
          return;
        }
      } else if (typeof this.peer.sidechannel.getWelcome === 'function') {
        welcome = this.peer.sidechannel.getWelcome(String(channel));
      }
      const invite = { payload, sig: sigHex, welcome: welcome || undefined };
      const inviteJson = JSON.stringify(invite);
      const inviteB64 = b4a.toString(b4a.from(inviteJson), 'base64');
      if (!sigHex) {
        console.log('Failed to sign invite; wallet secret key unavailable.');
        return;
      }
      console.log(inviteJson);
      console.log('invite_b64:', inviteB64);
      return;
    }
    if (this.input.startsWith("/sc_welcome")) {
      const args = this.parseArgs(input);
      const channel = args.channel || args.ch || args.name;
      const text = args.text || args.message || args.msg;
      if (!channel || text === undefined) {
        console.log('Usage: /sc_welcome --channel " " --text " "');
        return;
      }
      if (!this.peer.sidechannel) {
        console.log('Sidechannel not initialized.');
        return;
      }
      if (this.peer?.wallet?.ready) {
        try {
          await this.peer.wallet.ready;
        } catch (_e) {}
      }
      const walletPub = this.peer?.wallet?.publicKey;
      const ownerPubKey = walletPub
        ? typeof walletPub === 'string'
          ? walletPub.trim().toLowerCase()
          : b4a.toString(walletPub, 'hex')
        : null;
      if (!ownerPubKey) {
        console.log('Wallet not ready; cannot sign welcome.');
        return;
      }
      const payload = normalizeWelcomePayload({
        channel: String(channel),
        ownerPubKey,
        text: String(text),
        issuedAt: Date.now(),
        version: 1,
      });
      const message = stableStringify(payload);
      const msgBuf = b4a.from(message);
      let sig = this.peer.wallet.sign(msgBuf);
      let sigHex = '';
      if (typeof sig === 'string') {
        sigHex = sig;
      } else if (sig && sig.length > 0) {
        sigHex = b4a.toString(sig, 'hex');
      }
      if (!sigHex) {
        const walletSecret = this.peer?.wallet?.secretKey;
        const secretBuf = walletSecret
          ? b4a.isBuffer(walletSecret)
            ? walletSecret
            : typeof walletSecret === 'string'
              ? b4a.from(walletSecret, 'hex')
              : b4a.from(walletSecret)
          : null;
        if (secretBuf) {
          const sigBuf = PeerWallet.sign(msgBuf, secretBuf);
          if (sigBuf && sigBuf.length > 0) {
            sigHex = b4a.toString(sigBuf, 'hex');
          }
        }
      }
      if (!sigHex) {
        console.log('Failed to sign welcome; wallet secret key unavailable.');
        return;
      }
      const welcome = { payload, sig: sigHex };
      try {
        this.peer.sidechannel.acceptInvite(String(channel), null, welcome);
      } catch (_e) {}
      const welcomeJson = JSON.stringify(welcome);
      const welcomeB64 = b4a.toString(b4a.from(welcomeJson), 'base64');
      console.log(welcomeJson);
      console.log('welcome_b64:', welcomeB64);
      return;
    }
    if (this.input.startsWith("/sc_stats")) {
      if (!this.peer.sidechannel) {
        console.log('Sidechannel not initialized.');
        return;
      }
      const channels = Array.from(this.peer.sidechannel.channels.keys());
      const connectionCount = this.peer.sidechannel.connections.size;
      console.log({ channels, connectionCount });
      return;
    }
    if (this.input.startsWith("/print")) {
      const splitted = this.parseArgs(input);
      console.log(splitted.text);
    }
  }
}

export default SampleProtocol;
