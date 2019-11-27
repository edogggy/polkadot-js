// Copyright 2019 @polkadot/extension-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Generated via (in api) `yarn chain:info --ws wss://mainnet1.edgewa.re`

import { IdentityTypes } from './edgeware-node-types/dist/identity';
import { SignalingTypes } from './edgeware-node-types/dist/signaling';
import { TreasuryRewardTypes } from './edgeware-node-types/dist/treasuryReward';
import { VotingTypes } from './edgeware-node-types/dist/voting';

export default {
  chain: 'Edgeware',
  genesisHash: '0xda60008770287b5eb4f9b5241317ac4c7e42c3c3d8e85fbbfa2a88705394d75e',
  icon: 'substrate',
  specVersion: 20,
  ss58Format: 42,
  tokenDecimals: 18,
  tokenSymbol: 'EDG',
  types: {
    Keys: 'SessionKeys3',
    ...IdentityTypes,
    ...SignalingTypes,
    ...TreasuryRewardTypes,
    ...VotingTypes
  },
  metaCalls: 'bWV0YQdcGFN5c3RlbQABGChmaWxsX2Jsb2NrAAQhASBBIGJpZyBkaXNwYXRjaCB0aGF0IHdpbGwgZGlzYWxsb3cgYW55IG90aGVyIHRyYW5zYWN0aW9uIHRvIGJlIGluY2x1ZGVkLhhyZW1hcmsEHF9yZW1hcmsUQnl0ZXMEbCBNYWtlIHNvbWUgb24tY2hhaW4gcmVtYXJrLjhzZXRfaGVhcF9wYWdlcwQUcGFnZXMMdTY0BPwgU2V0IHRoZSBudW1iZXIgb2YgcGFnZXMgaW4gdGhlIFdlYkFzc2VtYmx5IGVudmlyb25tZW50J3MgaGVhcC4gc2V0X2NvZGUEDG5ldxRCeXRlcwRIIFNldCB0aGUgbmV3IGNvZGUuLHNldF9zdG9yYWdlBBRpdGVtczRWZWM8S2V5VmFsdWU+BGwgU2V0IHNvbWUgaXRlbXMgb2Ygc3RvcmFnZS4wa2lsbF9zdG9yYWdlBBBrZXlzIFZlYzxLZXk+BHggS2lsbCBzb21lIGl0ZW1zIGZyb20gc3RvcmFnZS4AABBBdXJhAAEAAAAkVGltZXN0YW1wAAEEDHNldAQMbm93PENvbXBhY3Q8TW9tZW50PiRYIFNldCB0aGUgY3VycmVudCB0aW1lLgBZASBUaGlzIGNhbGwgc2hvdWxkIGJlIGludm9rZWQgZXhhY3RseSBvbmNlIHBlciBibG9jay4gSXQgd2lsbCBwYW5pYyBhdCB0aGUgZmluYWxpemF0aW9u2CBwaGFzZSwgaWYgdGhpcyBjYWxsIGhhc24ndCBiZWVuIGludm9rZWQgYnkgdGhhdCB0aW1lLgBFASBUaGUgdGltZXN0YW1wIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gdGhlIHByZXZpb3VzIG9uZSBieSB0aGUgYW1vdW50IHNwZWNpZmllZCBieUQgYE1pbmltdW1QZXJpb2RgLgDYIFRoZSBkaXNwYXRjaCBvcmlnaW4gZm9yIHRoaXMgY2FsbCBtdXN0IGJlIGBJbmhlcmVudGAuAAAoQXV0aG9yc2hpcAABBChzZXRfdW5jbGVzBChuZXdfdW5jbGVzLFZlYzxIZWFkZXI+BGQgUHJvdmlkZSBhIHNldCBvZiB1bmNsZXMuAAAcSW5kaWNlcwABAAAAIEJhbGFuY2VzAAEMIHRyYW5zZmVyCBBkZXN0HEFkZHJlc3MUdmFsdWVAQ29tcGFjdDxCYWxhbmNlPlzYIFRyYW5zZmVyIHNvbWUgbGlxdWlkIGZyZWUgYmFsYW5jZSB0byBhbm90aGVyIGFjY291bnQuAAkBIGB0cmFuc2ZlcmAgd2lsbCBzZXQgdGhlIGBGcmVlQmFsYW5jZWAgb2YgdGhlIHNlbmRlciBhbmQgcmVjZWl2ZXIuIQEgSXQgd2lsbCBkZWNyZWFzZSB0aGUgdG90YWwgaXNzdWFuY2Ugb2YgdGhlIHN5c3RlbSBieSB0aGUgYFRyYW5zZmVyRmVlYC4VASBJZiB0aGUgc2VuZGVyJ3MgYWNjb3VudCBpcyBiZWxvdyB0aGUgZXhpc3RlbnRpYWwgZGVwb3NpdCBhcyBhIHJlc3VsdLQgb2YgdGhlIHRyYW5zZmVyLCB0aGUgYWNjb3VudCB3aWxsIGJlIHJlYXBlZC4AGQEgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIG11c3QgYmUgYFNpZ25lZGAgYnkgdGhlIHRyYW5zYWN0b3IuACwgIyA8d2VpZ2h0PjEBIC0gRGVwZW5kZW50IG9uIGFyZ3VtZW50cyBidXQgbm90IGNyaXRpY2FsLCBnaXZlbiBwcm9wZXIgaW1wbGVtZW50YXRpb25zIGZvcswgICBpbnB1dCBjb25maWcgdHlwZXMuIFNlZSByZWxhdGVkIGZ1bmN0aW9ucyBiZWxvdy5pASAtIEl0IGNvbnRhaW5zIGEgbGltaXRlZCBudW1iZXIgb2YgcmVhZHMgYW5kIHdyaXRlcyBpbnRlcm5hbGx5IGFuZCBubyBjb21wbGV4IGNvbXB1dGF0aW9uLgBMIFJlbGF0ZWQgZnVuY3Rpb25zOgBRASAgIC0gYGVuc3VyZV9jYW5fd2l0aGRyYXdgIGlzIGFsd2F5cyBjYWxsZWQgaW50ZXJuYWxseSBidXQgaGFzIGEgYm91bmRlZCBjb21wbGV4aXR5Li0BICAgLSBUcmFuc2ZlcnJpbmcgYmFsYW5jZXMgdG8gYWNjb3VudHMgdGhhdCBkaWQgbm90IGV4aXN0IGJlZm9yZSB3aWxsIGNhdXNl1CAgICAgIGBUOjpPbk5ld0FjY291bnQ6Om9uX25ld19hY2NvdW50YCB0byBiZSBjYWxsZWQu3CAgIC0gUmVtb3ZpbmcgZW5vdWdoIGZ1bmRzIGZyb20gYW4gYWNjb3VudCB3aWxsIHRyaWdnZXJZASAgICAgYFQ6OkR1c3RSZW1vdmFsOjpvbl91bmJhbGFuY2VkYCBhbmQgYFQ6Ok9uRnJlZUJhbGFuY2VaZXJvOjpvbl9mcmVlX2JhbGFuY2VfemVyb2AuADAgIyA8L3dlaWdodD4sc2V0X2JhbGFuY2UMDHdobxxBZGRyZXNzIG5ld19mcmVlQENvbXBhY3Q8QmFsYW5jZT4wbmV3X3Jlc2VydmVkQENvbXBhY3Q8QmFsYW5jZT40lCBTZXQgdGhlIGJhbGFuY2VzIG9mIGEgZ2l2ZW4gYWNjb3VudC4AIQEgVGhpcyB3aWxsIGFsdGVyIGBGcmVlQmFsYW5jZWAgYW5kIGBSZXNlcnZlZEJhbGFuY2VgIGluIHN0b3JhZ2UuIGl0IHdpbGwJASBhbHNvIGRlY3JlYXNlIHRoZSB0b3RhbCBpc3N1YW5jZSBvZiB0aGUgc3lzdGVtIChgVG90YWxJc3N1YW5jZWApLhkBIElmIHRoZSBuZXcgZnJlZSBvciByZXNlcnZlZCBiYWxhbmNlIGlzIGJlbG93IHRoZSBleGlzdGVudGlhbCBkZXBvc2l0LOggaXQgd2lsbCByZXNldCB0aGUgYWNjb3VudCBub25jZSAoYHN5c3RlbTo6QWNjb3VudE5vbmNlYCkuALQgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIGlzIGByb290YC4ALCAjIDx3ZWlnaHQ+gCAtIEluZGVwZW5kZW50IG9mIHRoZSBhcmd1bWVudHMuxCAtIENvbnRhaW5zIGEgbGltaXRlZCBudW1iZXIgb2YgcmVhZHMgYW5kIHdyaXRlcy4wICMgPC93ZWlnaHQ+OGZvcmNlX3RyYW5zZmVyDBhzb3VyY2UcQWRkcmVzcxBkZXN0HEFkZHJlc3MUdmFsdWVAQ29tcGFjdDxCYWxhbmNlPghRASBFeGFjdGx5IGFzIGB0cmFuc2ZlcmAsIGV4Y2VwdCB0aGUgb3JpZ2luIG11c3QgYmUgcm9vdCBhbmQgdGhlIHNvdXJjZSBhY2NvdW50IG1heSBiZSwgc3BlY2lmaWVkLgAAHFN0YWtpbmcAATQQYm9uZAwoY29udHJvbGxlchxBZGRyZXNzFHZhbHVlSENvbXBhY3Q8QmFsYW5jZU9mPhRwYXllZURSZXdhcmREZXN0aW5hdGlvbjxlASBUYWtlIHRoZSBvcmlnaW4gYWNjb3VudCBhcyBhIHN0YXNoIGFuZCBsb2NrIHVwIGB2YWx1ZWAgb2YgaXRzIGJhbGFuY2UuIGBjb250cm9sbGVyYCB3aWxshCBiZSB0aGUgYWNjb3VudCB0aGF0IGNvbnRyb2xzIGl0LgAxASBgdmFsdWVgIG11c3QgYmUgbW9yZSB0aGFuIHRoZSBgbWluaW11bV9iYWxhbmNlYCBzcGVjaWZpZWQgYnkgYFQ6OkN1cnJlbmN5YC4AJQEgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIG11c3QgYmUgX1NpZ25lZF8gYnkgdGhlIHN0YXNoIGFjY291bnQuACwgIyA8d2VpZ2h0PtQgLSBJbmRlcGVuZGVudCBvZiB0aGUgYXJndW1lbnRzLiBNb2RlcmF0ZSBjb21wbGV4aXR5LiAgLSBPKDEpLmggLSBUaHJlZSBleHRyYSBEQiBlbnRyaWVzLgBtASBOT1RFOiBUd28gb2YgdGhlIHN0b3JhZ2Ugd3JpdGVzIChgU2VsZjo6Ym9uZGVkYCwgYFNlbGY6OnBheWVlYCkgYXJlIF9uZXZlcl8gY2xlYW5lZCB1bmxlc3MlASB0aGUgYG9yaWdpbmAgZmFsbHMgYmVsb3cgX2V4aXN0ZW50aWFsIGRlcG9zaXRfIGFuZCBnZXRzIHJlbW92ZWQgYXMgZHVzdC4wICMgPC93ZWlnaHQ+KGJvbmRfZXh0cmEEOG1heF9hZGRpdGlvbmFsSENvbXBhY3Q8QmFsYW5jZU9mPjhlASBBZGQgc29tZSBleHRyYSBhbW91bnQgdGhhdCBoYXZlIGFwcGVhcmVkIGluIHRoZSBzdGFzaCBgZnJlZV9iYWxhbmNlYCBpbnRvIHRoZSBiYWxhbmNlIHVwNCBmb3Igc3Rha2luZy4AUQEgVXNlIHRoaXMgaWYgdGhlcmUgYXJlIGFkZGl0aW9uYWwgZnVuZHMgaW4geW91ciBzdGFzaCBhY2NvdW50IHRoYXQgeW91IHdpc2ggdG8gYm9uZC5lASBVbmxpa2UgW2Bib25kYF0gb3IgW2B1bmJvbmRgXSB0aGlzIGZ1bmN0aW9uIGRvZXMgbm90IGltcG9zZSBhbnkgbGltaXRhdGlvbiBvbiB0aGUgYW1vdW50TCB0aGF0IGNhbiBiZSBhZGRlZC4AVQEgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIG11c3QgYmUgX1NpZ25lZF8gYnkgdGhlIHN0YXNoLCBub3QgdGhlIGNvbnRyb2xsZXIuACwgIyA8d2VpZ2h0PuggLSBJbmRlcGVuZGVudCBvZiB0aGUgYXJndW1lbnRzLiBJbnNpZ25pZmljYW50IGNvbXBsZXhpdHkuICAtIE8oMSkuQCAtIE9uZSBEQiBlbnRyeS4wICMgPC93ZWlnaHQ+GHVuYm9uZAQUdmFsdWVIQ29tcGFjdDxCYWxhbmNlT2Y+XFUBIFNjaGVkdWxlIGEgcG9ydGlvbiBvZiB0aGUgc3Rhc2ggdG8gYmUgdW5sb2NrZWQgcmVhZHkgZm9yIHRyYW5zZmVyIG91dCBhZnRlciB0aGUgYm9uZAEBIHBlcmlvZCBlbmRzLiBJZiB0aGlzIGxlYXZlcyBhbiBhbW91bnQgYWN0aXZlbHkgYm9uZGVkIGxlc3MgdGhhbiUBIFQ6OkN1cnJlbmN5OjptaW5pbXVtX2JhbGFuY2UoKSwgdGhlbiBpdCBpcyBpbmNyZWFzZWQgdG8gdGhlIGZ1bGwgYW1vdW50LgBJASBPbmNlIHRoZSB1bmxvY2sgcGVyaW9kIGlzIGRvbmUsIHlvdSBjYW4gY2FsbCBgd2l0aGRyYXdfdW5ib25kZWRgIHRvIGFjdHVhbGx5IG1vdmXAIHRoZSBmdW5kcyBvdXQgb2YgbWFuYWdlbWVudCByZWFkeSBmb3IgdHJhbnNmZXIuAD0BIE5vIG1vcmUgdGhhbiBhIGxpbWl0ZWQgbnVtYmVyIG9mIHVubG9ja2luZyBjaHVua3MgKHNlZSBgTUFYX1VOTE9DS0lOR19DSFVOS1NgKT0BIGNhbiBjby1leGlzdHMgYXQgdGhlIHNhbWUgdGltZS4gSW4gdGhhdCBjYXNlLCBbYENhbGw6OndpdGhkcmF3X3VuYm9uZGVkYF0gbmVlZPwgdG8gYmUgY2FsbGVkIGZpcnN0IHRvIHJlbW92ZSBzb21lIG9mIHRoZSBjaHVua3MgKGlmIHBvc3NpYmxlKS4AVQEgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIG11c3QgYmUgX1NpZ25lZF8gYnkgdGhlIGNvbnRyb2xsZXIsIG5vdCB0aGUgc3Rhc2guAJggU2VlIGFsc28gW2BDYWxsOjp3aXRoZHJhd191bmJvbmRlZGBdLgAsICMgPHdlaWdodD5BASAtIEluZGVwZW5kZW50IG9mIHRoZSBhcmd1bWVudHMuIExpbWl0ZWQgYnV0IHBvdGVudGlhbGx5IGV4cGxvaXRhYmxlIGNvbXBsZXhpdHkumCAtIENvbnRhaW5zIGEgbGltaXRlZCBudW1iZXIgb2YgcmVhZHMuZQEgLSBFYWNoIGNhbGwgKHJlcXVpcmVzIHRoZSByZW1haW5kZXIgb2YgdGhlIGJvbmRlZCBiYWxhbmNlIHRvIGJlIGFib3ZlIGBtaW5pbXVtX2JhbGFuY2VgKXEBICAgd2lsbCBjYXVzZSBhIG5ldyBlbnRyeSB0byBiZSBpbnNlcnRlZCBpbnRvIGEgdmVjdG9yIChgTGVkZ2VyLnVubG9ja2luZ2ApIGtlcHQgaW4gc3RvcmFnZS6lASAgIFRoZSBvbmx5IHdheSB0byBjbGVhbiB0aGUgYWZvcmVtZW50aW9uZWQgc3RvcmFnZSBpdGVtIGlzIGFsc28gdXNlci1jb250cm9sbGVkIHZpYSBgd2l0aGRyYXdfdW5ib25kZWRgLkAgLSBPbmUgREIgZW50cnkuKCA8L3dlaWdodD5Ed2l0aGRyYXdfdW5ib25kZWQAQC0BIFJlbW92ZSBhbnkgdW5sb2NrZWQgY2h1bmtzIGZyb20gdGhlIGB1bmxvY2tpbmdgIHF1ZXVlIGZyb20gb3VyIG1hbmFnZW1lbnQuADUBIFRoaXMgZXNzZW50aWFsbHkgZnJlZXMgdXAgdGhhdCBiYWxhbmNlIHRvIGJlIHVzZWQgYnkgdGhlIHN0YXNoIGFjY291bnQgdG8gZG9MIHdoYXRldmVyIGl0IHdhbnRzLgBVASBUaGUgZGlzcGF0Y2ggb3JpZ2luIGZvciB0aGlzIGNhbGwgbXVzdCBiZSBfU2lnbmVkXyBieSB0aGUgY29udHJvbGxlciwgbm90IHRoZSBzdGFzaC4AbCBTZWUgYWxzbyBbYENhbGw6OnVuYm9uZGBdLgAsICMgPHdlaWdodD5VASAtIENvdWxkIGJlIGRlcGVuZGVudCBvbiB0aGUgYG9yaWdpbmAgYXJndW1lbnQgYW5kIGhvdyBtdWNoIGB1bmxvY2tpbmdgIGNodW5rcyBleGlzdC5FASAgSXQgaW1wbGllcyBgY29uc29saWRhdGVfdW5sb2NrZWRgIHdoaWNoIGxvb3BzIG92ZXIgYExlZGdlci51bmxvY2tpbmdgLCB3aGljaCBpc/QgIGluZGlyZWN0bHkgdXNlci1jb250cm9sbGVkLiBTZWUgW2B1bmJvbmRgXSBmb3IgbW9yZSBkZXRhaWwueQEgLSBDb250YWlucyBhIGxpbWl0ZWQgbnVtYmVyIG9mIHJlYWRzLCB5ZXQgdGhlIHNpemUgb2Ygd2hpY2ggY291bGQgYmUgbGFyZ2UgYmFzZWQgb24gYGxlZGdlcmAuyCAtIFdyaXRlcyBhcmUgbGltaXRlZCB0byB0aGUgYG9yaWdpbmAgYWNjb3VudCBrZXkuMCAjIDwvd2VpZ2h0PiB2YWxpZGF0ZQQUcHJlZnM4VmFsaWRhdG9yUHJlZnMs6CBEZWNsYXJlIHRoZSBkZXNpcmUgdG8gdmFsaWRhdGUgZm9yIHRoZSBvcmlnaW4gY29udHJvbGxlci4A3CBFZmZlY3RzIHdpbGwgYmUgZmVsdCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBuZXh0IGVyYS4AVQEgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIG11c3QgYmUgX1NpZ25lZF8gYnkgdGhlIGNvbnRyb2xsZXIsIG5vdCB0aGUgc3Rhc2guACwgIyA8d2VpZ2h0PuggLSBJbmRlcGVuZGVudCBvZiB0aGUgYXJndW1lbnRzLiBJbnNpZ25pZmljYW50IGNvbXBsZXhpdHkumCAtIENvbnRhaW5zIGEgbGltaXRlZCBudW1iZXIgb2YgcmVhZHMuyCAtIFdyaXRlcyBhcmUgbGltaXRlZCB0byB0aGUgYG9yaWdpbmAgYWNjb3VudCBrZXkuMCAjIDwvd2VpZ2h0PiBub21pbmF0ZQQcdGFyZ2V0czBWZWM8QWRkcmVzcz4sEQEgRGVjbGFyZSB0aGUgZGVzaXJlIHRvIG5vbWluYXRlIGB0YXJnZXRzYCBmb3IgdGhlIG9yaWdpbiBjb250cm9sbGVyLgDcIEVmZmVjdHMgd2lsbCBiZSBmZWx0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG5leHQgZXJhLgBVASBUaGUgZGlzcGF0Y2ggb3JpZ2luIGZvciB0aGlzIGNhbGwgbXVzdCBiZSBfU2lnbmVkXyBieSB0aGUgY29udHJvbGxlciwgbm90IHRoZSBzdGFzaC4ALCAjIDx3ZWlnaHQ+JQEgLSBUaGUgdHJhbnNhY3Rpb24ncyBjb21wbGV4aXR5IGlzIHByb3BvcnRpb25hbCB0byB0aGUgc2l6ZSBvZiBgdGFyZ2V0c2AsmCB3aGljaCBpcyBjYXBwZWQgYXQgYE1BWF9OT01JTkFUSU9OU2Au2CAtIEJvdGggdGhlIHJlYWRzIGFuZCB3cml0ZXMgZm9sbG93IGEgc2ltaWxhciBwYXR0ZXJuLjAgIyA8L3dlaWdodD4UY2hpbGwALMggRGVjbGFyZSBubyBkZXNpcmUgdG8gZWl0aGVyIHZhbGlkYXRlIG9yIG5vbWluYXRlLgDcIEVmZmVjdHMgd2lsbCBiZSBmZWx0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG5leHQgZXJhLgBVASBUaGUgZGlzcGF0Y2ggb3JpZ2luIGZvciB0aGlzIGNhbGwgbXVzdCBiZSBfU2lnbmVkXyBieSB0aGUgY29udHJvbGxlciwgbm90IHRoZSBzdGFzaC4ALCAjIDx3ZWlnaHQ+6CAtIEluZGVwZW5kZW50IG9mIHRoZSBhcmd1bWVudHMuIEluc2lnbmlmaWNhbnQgY29tcGxleGl0eS5UIC0gQ29udGFpbnMgb25lIHJlYWQuyCAtIFdyaXRlcyBhcmUgbGltaXRlZCB0byB0aGUgYG9yaWdpbmAgYWNjb3VudCBrZXkuMCAjIDwvd2VpZ2h0PiRzZXRfcGF5ZWUEFHBheWVlRFJld2FyZERlc3RpbmF0aW9uLLggKFJlLSlzZXQgdGhlIHBheW1lbnQgdGFyZ2V0IGZvciBhIGNvbnRyb2xsZXIuANwgRWZmZWN0cyB3aWxsIGJlIGZlbHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbmV4dCBlcmEuAFUBIFRoZSBkaXNwYXRjaCBvcmlnaW4gZm9yIHRoaXMgY2FsbCBtdXN0IGJlIF9TaWduZWRfIGJ5IHRoZSBjb250cm9sbGVyLCBub3QgdGhlIHN0YXNoLgAsICMgPHdlaWdodD7oIC0gSW5kZXBlbmRlbnQgb2YgdGhlIGFyZ3VtZW50cy4gSW5zaWduaWZpY2FudCBjb21wbGV4aXR5LpggLSBDb250YWlucyBhIGxpbWl0ZWQgbnVtYmVyIG9mIHJlYWRzLsggLSBXcml0ZXMgYXJlIGxpbWl0ZWQgdG8gdGhlIGBvcmlnaW5gIGFjY291bnQga2V5LjAgIyA8L3dlaWdodD44c2V0X2NvbnRyb2xsZXIEKGNvbnRyb2xsZXIcQWRkcmVzcyyQIChSZS0pc2V0IHRoZSBjb250cm9sbGVyIG9mIGEgc3Rhc2guANwgRWZmZWN0cyB3aWxsIGJlIGZlbHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbmV4dCBlcmEuAFUBIFRoZSBkaXNwYXRjaCBvcmlnaW4gZm9yIHRoaXMgY2FsbCBtdXN0IGJlIF9TaWduZWRfIGJ5IHRoZSBzdGFzaCwgbm90IHRoZSBjb250cm9sbGVyLgAsICMgPHdlaWdodD7oIC0gSW5kZXBlbmRlbnQgb2YgdGhlIGFyZ3VtZW50cy4gSW5zaWduaWZpY2FudCBjb21wbGV4aXR5LpggLSBDb250YWlucyBhIGxpbWl0ZWQgbnVtYmVyIG9mIHJlYWRzLsggLSBXcml0ZXMgYXJlIGxpbWl0ZWQgdG8gdGhlIGBvcmlnaW5gIGFjY291bnQga2V5LjAgIyA8L3dlaWdodD5Mc2V0X3ZhbGlkYXRvcl9jb3VudAQMbmV3MENvbXBhY3Q8dTMyPgSAIFRoZSBpZGVhbCBudW1iZXIgb2YgdmFsaWRhdG9ycy40Zm9yY2Vfbm9fZXJhcwAUsCBGb3JjZSB0aGVyZSB0byBiZSBubyBuZXcgZXJhcyBpbmRlZmluaXRlbHkuACwgIyA8d2VpZ2h0PkAgLSBObyBhcmd1bWVudHMuMCAjIDwvd2VpZ2h0PjRmb3JjZV9uZXdfZXJhABhNASBGb3JjZSB0aGVyZSB0byBiZSBhIG5ldyBlcmEgYXQgdGhlIGVuZCBvZiB0aGUgbmV4dCBzZXNzaW9uLiBBZnRlciB0aGlzLCBpdCB3aWxsIGJloCByZXNldCB0byBub3JtYWwgKG5vbi1mb3JjZWQpIGJlaGF2aW91ci4ALCAjIDx3ZWlnaHQ+QCAtIE5vIGFyZ3VtZW50cy4wICMgPC93ZWlnaHQ+RHNldF9pbnZ1bG5lcmFibGVzBCh2YWxpZGF0b3JzOFZlYzxBY2NvdW50SWQ+BMwgU2V0IHRoZSB2YWxpZGF0b3JzIHdobyBjYW5ub3QgYmUgc2xhc2hlZCAoaWYgYW55KS4AABxTZXNzaW9uAAEEIHNldF9rZXlzCBBrZXlzEEtleXMUcHJvb2YUQnl0ZXMo5CBTZXRzIHRoZSBzZXNzaW9uIGtleShzKSBvZiB0aGUgZnVuY3Rpb24gY2FsbGVyIHRvIGBrZXlgLiEBIEFsbG93cyBhbiBhY2NvdW50IHRvIHNldCBpdHMgc2Vzc2lvbiBrZXkgcHJpb3IgdG8gYmVjb21pbmcgYSB2YWxpZGF0b3IuxCBUaGlzIGRvZXNuJ3QgdGFrZSBlZmZlY3QgdW50aWwgdGhlIG5leHQgc2Vzc2lvbi4A1CBUaGUgZGlzcGF0Y2ggb3JpZ2luIG9mIHRoaXMgZnVuY3Rpb24gbXVzdCBiZSBzaWduZWQuACwgIyA8d2VpZ2h0PoggLSBPKGxvZyBuKSBpbiBudW1iZXIgb2YgYWNjb3VudHMuWCAtIE9uZSBleHRyYSBEQiBlbnRyeS4wICMgPC93ZWlnaHQ+AAAkRGVtb2NyYWN5AAFEHHByb3Bvc2UIIHByb3Bvc2FsIFByb3Bvc2FsFHZhbHVlSENvbXBhY3Q8QmFsYW5jZU9mPhigIFByb3Bvc2UgYSBzZW5zaXRpdmUgYWN0aW9uIHRvIGJlIHRha2VuLgAsICMgPHdlaWdodD4gIC0gTygxKS6AIC0gVHdvIERCIGNoYW5nZXMsIG9uZSBEQiBlbnRyeS4wICMgPC93ZWlnaHQ+GHNlY29uZAQgcHJvcG9zYWxIQ29tcGFjdDxQcm9wSW5kZXg+GKAgUHJvcG9zZSBhIHNlbnNpdGl2ZSBhY3Rpb24gdG8gYmUgdGFrZW4uACwgIyA8d2VpZ2h0PiAgLSBPKDEpLkAgLSBPbmUgREIgZW50cnkuMCAjIDwvd2VpZ2h0PhB2b3RlCCRyZWZfaW5kZXhgQ29tcGFjdDxSZWZlcmVuZHVtSW5kZXg+EHZvdGUQVm90ZRw1ASBWb3RlIGluIGEgcmVmZXJlbmR1bS4gSWYgYHZvdGUuaXNfYXllKClgLCB0aGUgdm90ZSBpcyB0byBlbmFjdCB0aGUgcHJvcG9zYWw7vCBvdGhlcndpc2UgaXQgaXMgYSB2b3RlIHRvIGtlZXAgdGhlIHN0YXR1cyBxdW8uACwgIyA8d2VpZ2h0PiAgLSBPKDEpLnwgLSBPbmUgREIgY2hhbmdlLCBvbmUgREIgZW50cnkuMCAjIDwvd2VpZ2h0Pihwcm94eV92b3RlCCRyZWZfaW5kZXhgQ29tcGFjdDxSZWZlcmVuZHVtSW5kZXg+EHZvdGUQVm90ZRxRASBWb3RlIGluIGEgcmVmZXJlbmR1bSBvbiBiZWhhbGYgb2YgYSBzdGFzaC4gSWYgYHZvdGUuaXNfYXllKClgLCB0aGUgdm90ZSBpcyB0byBlbmFjdPggdGhlIHByb3Bvc2FsOyAgb3RoZXJ3aXNlIGl0IGlzIGEgdm90ZSB0byBrZWVwIHRoZSBzdGF0dXMgcXVvLgAsICMgPHdlaWdodD4gIC0gTygxKS58IC0gT25lIERCIGNoYW5nZSwgb25lIERCIGVudHJ5LjAgIyA8L3dlaWdodD5AZW1lcmdlbmN5X2NhbmNlbAQkcmVmX2luZGV4PFJlZmVyZW5kdW1JbmRleAhRASBTY2hlZHVsZSBhbiBlbWVyZ2VuY3kgY2FuY2VsbGF0aW9uIG9mIGEgcmVmZXJlbmR1bS4gQ2Fubm90IGhhcHBlbiB0d2ljZSB0byB0aGUgc2FtZTAgcmVmZXJlbmR1bS5AZXh0ZXJuYWxfcHJvcG9zZQQgcHJvcG9zYWwgUHJvcG9zYWwIMQEgU2NoZWR1bGUgYSByZWZlcmVuZHVtIHRvIGJlIHRhYmxlZCBvbmNlIGl0IGlzIGxlZ2FsIHRvIHNjaGVkdWxlIGFuIGV4dGVybmFsMCByZWZlcmVuZHVtLmRleHRlcm5hbF9wcm9wb3NlX21ham9yaXR5BCBwcm9wb3NhbCBQcm9wb3NhbBRZASBTY2hlZHVsZSBhIG1ham9yaXR5LWNhcnJpZXMgcmVmZXJlbmR1bSB0byBiZSB0YWJsZWQgbmV4dCBvbmNlIGl0IGlzIGxlZ2FsIHRvIHNjaGVkdWxlYCBhbiBleHRlcm5hbCByZWZlcmVuZHVtLgBNASBVbmxpa2UgYGV4dGVybmFsX3Byb3Bvc2VgLCBibGFja2xpc3RpbmcgaGFzIG5vIGVmZmVjdCBvbiB0aGlzIGFuZCBpdCBtYXkgcmVwbGFjZSBhnCBwcmUtc2NoZWR1bGVkIGBleHRlcm5hbF9wcm9wb3NlYCBjYWxsLmBleHRlcm5hbF9wcm9wb3NlX2RlZmF1bHQEIHByb3Bvc2FsIFByb3Bvc2FsFEkBIFNjaGVkdWxlIGEgbmVnYXRpdmUtdHVybm91dC1iaWFzIHJlZmVyZW5kdW0gdG8gYmUgdGFibGVkIG5leHQgb25jZSBpdCBpcyBsZWdhbCB0b4Qgc2NoZWR1bGUgYW4gZXh0ZXJuYWwgcmVmZXJlbmR1bS4ATQEgVW5saWtlIGBleHRlcm5hbF9wcm9wb3NlYCwgYmxhY2tsaXN0aW5nIGhhcyBubyBlZmZlY3Qgb24gdGhpcyBhbmQgaXQgbWF5IHJlcGxhY2UgYZwgcHJlLXNjaGVkdWxlZCBgZXh0ZXJuYWxfcHJvcG9zZWAgY2FsbC4oZmFzdF90cmFjaww0cHJvcG9zYWxfaGFzaBBIYXNoNHZvdGluZ19wZXJpb2QsQmxvY2tOdW1iZXIUZGVsYXksQmxvY2tOdW1iZXIgUQEgU2NoZWR1bGUgdGhlIGN1cnJlbnRseSBleHRlcm5hbGx5LXByb3Bvc2VkIG1ham9yaXR5LWNhcnJpZXMgcmVmZXJlbmR1bSB0byBiZSB0YWJsZWRlASBpbW1lZGlhdGVseS4gSWYgdGhlcmUgaXMgbm8gZXh0ZXJuYWxseS1wcm9wb3NlZCByZWZlcmVuZHVtIGN1cnJlbnRseSwgb3IgaWYgdGhlcmUgaXMgb25l7CBidXQgaXQgaXMgbm90IGEgbWFqb3JpdHktY2FycmllcyByZWZlcmVuZHVtIHRoZW4gaXQgZmFpbHMuAPggLSBgcHJvcG9zYWxfaGFzaGA6IFRoZSBoYXNoIG9mIHRoZSBjdXJyZW50IGV4dGVybmFsIHByb3Bvc2FsLi0BIC0gYHZvdGluZ19wZXJpb2RgOiBUaGUgcGVyaW9kIHRoYXQgaXMgYWxsb3dlZCBmb3Igdm90aW5nIG9uIHRoaXMgcHJvcG9zYWwuVQEgLSBgZGVsYXlgOiBUaGUgbnVtYmVyIG9mIGJsb2NrIGFmdGVyIHZvdGluZyBoYXMgZW5kZWQgaW4gYXBwcm92YWwgYW5kIHRoaXMgc2hvdWxkIGJl8CAgIGVuYWN0ZWQuIEluY3JlYXNlZCB0byBgRW1lcmdlbmN5Vm90aW5nUGVyaW9kYCBpZiB0b28gbG93LjR2ZXRvX2V4dGVybmFsBDRwcm9wb3NhbF9oYXNoEEhhc2gEvCBWZXRvIGFuZCBibGFja2xpc3QgdGhlIGV4dGVybmFsIHByb3Bvc2FsIGhhc2guRGNhbmNlbF9yZWZlcmVuZHVtBCRyZWZfaW5kZXhgQ29tcGFjdDxSZWZlcmVuZHVtSW5kZXg+BFQgUmVtb3ZlIGEgcmVmZXJlbmR1bS40Y2FuY2VsX3F1ZXVlZAwQd2hlblBDb21wYWN0PEJsb2NrTnVtYmVyPhR3aGljaDBDb21wYWN0PHUzMj4Qd2hhdGBDb21wYWN0PFJlZmVyZW5kdW1JbmRleD4EoCBDYW5jZWwgYSBwcm9wb3NhbCBxdWV1ZWQgZm9yIGVuYWN0bWVudC4kc2V0X3Byb3h5BBRwcm94eSRBY2NvdW50SWQUmCBTcGVjaWZ5IGEgcHJveHkuIENhbGxlZCBieSB0aGUgc3Rhc2guACwgIyA8d2VpZ2h0PlggLSBPbmUgZXh0cmEgREIgZW50cnkuMCAjIDwvd2VpZ2h0PjByZXNpZ25fcHJveHkAFJggQ2xlYXIgdGhlIHByb3h5LiBDYWxsZWQgYnkgdGhlIHByb3h5LgAsICMgPHdlaWdodD5AIC0gT25lIERCIGNsZWFyLjAgIyA8L3dlaWdodD4wcmVtb3ZlX3Byb3h5BBRwcm94eSRBY2NvdW50SWQUmCBDbGVhciB0aGUgcHJveHkuIENhbGxlZCBieSB0aGUgc3Rhc2guACwgIyA8d2VpZ2h0PkAgLSBPbmUgREIgY2xlYXIuMCAjIDwvd2VpZ2h0PiBkZWxlZ2F0ZQgIdG8kQWNjb3VudElkKGNvbnZpY3Rpb24oQ29udmljdGlvbhQ8IERlbGVnYXRlIHZvdGUuACwgIyA8d2VpZ2h0PlggLSBPbmUgZXh0cmEgREIgZW50cnkuMCAjIDwvd2VpZ2h0Pih1bmRlbGVnYXRlABREIFVuZGVsZWdhdGUgdm90ZS4ALCAjIDx3ZWlnaHQ+ICAtIE8oMSkuMCAjIDwvd2VpZ2h0PgAAHENvdW5jaWwAARAsc2V0X21lbWJlcnMELG5ld19tZW1iZXJzOFZlYzxBY2NvdW50SWQ+EFEBIFNldCB0aGUgY29sbGVjdGl2ZSdzIG1lbWJlcnNoaXAgbWFudWFsbHkgdG8gYG5ld19tZW1iZXJzYC4gQmUgbmljZSB0byB0aGUgY2hhaW4gYW5kXCBwcm92aWRlIGl0IHByZS1zb3J0ZWQuAFggUmVxdWlyZXMgcm9vdCBvcmlnaW4uHGV4ZWN1dGUEIHByb3Bvc2FsIFByb3Bvc2FsDPQgRGlzcGF0Y2ggYSBwcm9wb3NhbCBmcm9tIGEgbWVtYmVyIHVzaW5nIHRoZSBgTWVtYmVyYCBvcmlnaW4uAKwgT3JpZ2luIG11c3QgYmUgYSBtZW1iZXIgb2YgdGhlIGNvbGxlY3RpdmUuHHByb3Bvc2UIJHRocmVzaG9sZFBDb21wYWN0PE1lbWJlckNvdW50PiBwcm9wb3NhbCBQcm9wb3NhbBAsICMgPHdlaWdodD6QIC0gQm91bmRlZCBzdG9yYWdlIHJlYWRzIGFuZCB3cml0ZXMuuCAtIEFyZ3VtZW50IGB0aHJlc2hvbGRgIGhhcyBiZWFyaW5nIG9uIHdlaWdodC4wICMgPC93ZWlnaHQ+EHZvdGUMIHByb3Bvc2FsEEhhc2gUaW5kZXhYQ29tcGFjdDxQcm9wb3NhbEluZGV4PhxhcHByb3ZlEGJvb2wQLCAjIDx3ZWlnaHQ+jCAtIEJvdW5kZWQgc3RvcmFnZSByZWFkIGFuZCB3cml0ZXMuVQEgLSBXaWxsIGJlIHNsaWdodGx5IGhlYXZpZXIgaWYgdGhlIHByb3Bvc2FsIGlzIGFwcHJvdmVkIC8gZGlzYXBwcm92ZWQgYWZ0ZXIgdGhlIHZvdGUuMCAjIDwvd2VpZ2h0PgAAJEVsZWN0aW9ucwABKDRzZXRfYXBwcm92YWxzDBR2b3RlcyRWZWM8Ym9vbD4UaW5kZXhIQ29tcGFjdDxWb3RlSW5kZXg+EGhpbnQgU2V0SW5kZXhgYQEgU2V0IGNhbmRpZGF0ZSBhcHByb3ZhbHMuIEFwcHJvdmFsIHNsb3RzIHN0YXkgdmFsaWQgYXMgbG9uZyBhcyBjYW5kaWRhdGVzIGluIHRob3NlIHNsb3RzQCBhcmUgcmVnaXN0ZXJlZC4AwCBMb2NrcyB0aGUgdG90YWwgYmFsYW5jZSBvZiBjYWxsZXIgaW5kZWZpbml0ZWx5LikBIE9ubHkgW2ByZXRyYWN0X3ZvdGVyYF0gb3IgW2ByZWFwX2luYWN0aXZlX3ZvdGVyYF0gY2FuIHVubG9jayB0aGUgYmFsYW5jZS4A1CBgaGludGAgYXJndW1lbnQgaXMgaW50ZXJwcmV0ZWQgZGlmZmVyZW50bHkgYmFzZWQgb246RQEgLSBpZiBgb3JpZ2luYCBpcyBzZXR0aW5nIGFwcHJvdmFscyBmb3IgdGhlIGZpcnN0IHRpbWU6IFRoZSBpbmRleCB3aWxsIGJlIGNoZWNrZWSwIGZvciBiZWluZyBhIHZhbGlkIF9ob2xlXyBpbiB0aGUgdm90ZXIgbGlzdC5NASAgIC0gaWYgdGhlIGhpbnQgaXMgY29ycmVjdGx5IHBvaW50aW5nIHRvIGEgaG9sZSwgbm8gZmVlIGlzIGRlZHVjdGVkIGZyb20gYG9yaWdpbmAuiQEgICAtIE90aGVyd2lzZSwgdGhlIGNhbGwgd2lsbCBzdWNjZWVkIGJ1dCB0aGUgaW5kZXggaXMgaWdub3JlZCBhbmQgc2ltcGx5IGEgcHVzaCB0byB0aGUgbGFzdCBjaHVua4EBICAgd2l0aCBmcmVlIHNwYWNlIGhhcHBlbnMuIElmIHRoZSBuZXcgcHVzaCBjYXVzZXMgYSBuZXcgY2h1bmsgdG8gYmUgY3JlYXRlZCwgYSBmZWUgaW5kaWNhdGVkIGJ5dCAgIFtgVm90aW5nRmVlYF0gaXMgZGVkdWN0ZWQuXQEgLSBpZiBgb3JpZ2luYCBpcyBhbHJlYWR5IGEgdm90ZXI6IHRoZSBpbmRleCBfX211c3RfXyBiZSB2YWxpZCBhbmQgcG9pbnQgdG8gdGhlIGNvcnJlY3TUIHBvc2l0aW9uIG9mIHRoZSBgb3JpZ2luYCBpbiB0aGUgY3VycmVudCB2b3RlcnMgbGlzdC4ArQEgTm90ZSB0aGF0IGFueSB0cmFpbGluZyBgZmFsc2VgIHZvdGVzIGluIGB2b3Rlc2AgaXMgaWdub3JlZDsgSW4gYXBwcm92YWwgdm90aW5nLCBub3Qgdm90aW5nIGZvciBhIGNhbmRpZGF0ZXQgYW5kIHZvdGluZyBmYWxzZSwgYXJlIGVxdWFsLgAsICMgPHdlaWdodD4gIC0gTygxKS6cIC0gVHdvIGV4dHJhIERCIGVudHJpZXMsIG9uZSBEQiBjaGFuZ2UuBQEgLSBBcmd1bWVudCBgdm90ZXNgIGlzIGxpbWl0ZWQgaW4gbGVuZ3RoIHRvIG51bWJlciBvZiBjYW5kaWRhdGVzLjAgIyA8L3dlaWdodD5McHJveHlfc2V0X2FwcHJvdmFscwwUdm90ZXMkVmVjPGJvb2w+FGluZGV4SENvbXBhY3Q8Vm90ZUluZGV4PhBoaW50IFNldEluZGV4GJUBIFNldCBjYW5kaWRhdGUgYXBwcm92YWxzIGZyb20gYSBwcm94eS4gQXBwcm92YWwgc2xvdHMgc3RheSB2YWxpZCBhcyBsb25nIGFzIGNhbmRpZGF0ZXMgaW4gdGhvc2Ugc2xvdHNAIGFyZSByZWdpc3RlcmVkLgAsICMgPHdlaWdodD7wIC0gU2FtZSBhcyBgc2V0X2FwcHJvdmFsc2Agd2l0aCBvbmUgYWRkaXRpb25hbCBzdG9yYWdlIHJlYWQuMCAjIDwvd2VpZ2h0PkxyZWFwX2luYWN0aXZlX3ZvdGVyEDhyZXBvcnRlcl9pbmRleDBDb21wYWN0PHUzMj4Md2hvHEFkZHJlc3Mkd2hvX2luZGV4MENvbXBhY3Q8dTMyPkhhc3N1bWVkX3ZvdGVfaW5kZXhIQ29tcGFjdDxWb3RlSW5kZXg+MGEBIFJlbW92ZSBhIHZvdGVyLiBGb3IgaXQgbm90IHRvIGJlIGEgYm9uZC1jb25zdW1pbmcgbm8tb3AsIGFsbCBhcHByb3ZlZCBjYW5kaWRhdGUgaW5kaWNlc3EBIG11c3Qgbm93IGJlIGVpdGhlciB1bnJlZ2lzdGVyZWQgb3IgcmVnaXN0ZXJlZCB0byBhIGNhbmRpZGF0ZSB0aGF0IHJlZ2lzdGVyZWQgdGhlIHNsb3QgYWZ0ZXKgIHRoZSB2b3RlciBnYXZlIHRoZWlyIGxhc3QgYXBwcm92YWwgc2V0LgAVASBCb3RoIGluZGljZXMgbXVzdCBiZSBwcm92aWRlZCBhcyBleHBsYWluZWQgaW4gW2B2b3Rlcl9hdGBdIGZ1bmN0aW9uLgABASBNYXkgYmUgY2FsbGVkIGJ5IGFueW9uZS4gUmV0dXJucyB0aGUgdm90ZXIgZGVwb3NpdCB0byBgc2lnbmVkYC4ALCAjIDx3ZWlnaHQ+ICAtIE8oMSkunCAtIFR3byBmZXdlciBEQiBlbnRyaWVzLCBvbmUgREIgY2hhbmdlLjAgIyA8L3dlaWdodD40cmV0cmFjdF92b3RlcgQUaW5kZXgwQ29tcGFjdDx1MzI+KC0BIFJlbW92ZSBhIHZvdGVyLiBBbGwgdm90ZXMgYXJlIGNhbmNlbGxlZCBhbmQgdGhlIHZvdGVyIGRlcG9zaXQgaXMgcmV0dXJuZWQuAAkBIFRoZSBpbmRleCBtdXN0IGJlIHByb3ZpZGVkIGFzIGV4cGxhaW5lZCBpbiBbYHZvdGVyX2F0YF0gZnVuY3Rpb24uAD0BIEFsc28gcmVtb3ZlcyB0aGUgbG9jayBvbiB0aGUgYmFsYW5jZSBvZiB0aGUgdm90ZXIuIFNlZSBbYGRvX3NldF9hcHByb3ZhbHMoKWBdLgAsICMgPHdlaWdodD4gIC0gTygxKS6cIC0gVHdvIGZld2VyIERCIGVudHJpZXMsIG9uZSBEQiBjaGFuZ2UuMCAjIDwvd2VpZ2h0PkBzdWJtaXRfY2FuZGlkYWN5BBBzbG90MENvbXBhY3Q8dTMyPjR4IFN1Ym1pdCBvbmVzZWxmIGZvciBjYW5kaWRhY3kuABEBIEFjY291bnQgbXVzdCBoYXZlIGVub3VnaCB0cmFuc2ZlcnJhYmxlIGZ1bmRzIGluIGl0IHRvIHBheSB0aGUgYm9uZC4AIQEgTk9URTogaWYgYG9yaWdpbmAgaGFzIGFscmVhZHkgYXNzaWduZWQgYXBwcm92YWxzIHZpYSBbYHNldF9hcHByb3ZhbHNgXSxFASBpdCB3aWxsIE5PVCBoYXZlIGFueSB1c2FibGUgZnVuZHMgdG8gcGFzcyBjYW5kaWRhY3kgYm9uZCBhbmQgbXVzdCBmaXJzdCByZXRyYWN0LjEBIE5vdGUgdGhhdCBzZXR0aW5nIGFwcHJvdmFscyB3aWxsIGxvY2sgdGhlIGVudGlyZSBiYWxhbmNlIG9mIHRoZSB2b3RlciB1bnRpbHggcmV0cmFjdGlvbiBvciBiZWluZyByZXBvcnRlZC4ALCAjIDx3ZWlnaHQ+YCAtIEluZGVwZW5kZW50IG9mIGlucHV0LlAgLSBUaHJlZSBEQiBjaGFuZ2VzLjAgIyA8L3dlaWdodD44cHJlc2VudF93aW5uZXIMJGNhbmRpZGF0ZRxBZGRyZXNzFHRvdGFsSENvbXBhY3Q8QmFsYW5jZU9mPhRpbmRleEhDb21wYWN0PFZvdGVJbmRleD4gZQEgQ2xhaW0gdGhhdCBgc2lnbmVkYCBpcyBvbmUgb2YgdGhlIHRvcCBTZWxmOjpjYXJyeV9jb3VudCgpICsgY3VycmVudF92b3RlKCkuMSBjYW5kaWRhdGVzLqEBIE9ubHkgd29ya3MgaWYgdGhlIGBibG9ja19udW1iZXIgPj0gY3VycmVudF92b3RlKCkuMGAgYW5kIGA8IGN1cnJlbnRfdm90ZSgpLjAgKyBwcmVzZW50YXRpb25fZHVyYXRpb24oKWB4IGBzaWduZWRgIHNob3VsZCBoYXZlIGF0IGxlYXN0ACwgIyA8d2VpZ2h0PlQgLSBPKHZvdGVycykgY29tcHV0ZS5EIC0gT25lIERCIGNoYW5nZS4wICMgPC93ZWlnaHQ+RHNldF9kZXNpcmVkX3NlYXRzBBRjb3VudDBDb21wYWN0PHUzMj4MZQEgU2V0IHRoZSBkZXNpcmVkIG1lbWJlciBjb3VudDsgaWYgbG93ZXIgdGhhbiB0aGUgY3VycmVudCBjb3VudCwgdGhlbiBzZWF0cyB3aWxsIG5vdCBiZSB1cEkBIGVsZWN0aW9uIHdoZW4gdGhleSBleHBpcmUuIElmIG1vcmUsIHRoZW4gYSBuZXcgdm90ZSB3aWxsIGJlIHN0YXJ0ZWQgaWYgb25lIGlzIG5vdFQgYWxyZWFkeSBpbiBwcm9ncmVzcy40cmVtb3ZlX21lbWJlcgQMd2hvHEFkZHJlc3MQIQEgUmVtb3ZlIGEgcGFydGljdWxhciBtZW1iZXIgZnJvbSB0aGUgc2V0LiBUaGlzIGlzIGVmZmVjdGl2ZSBpbW1lZGlhdGVseS4AIQEgTm90ZTogQSB0YWxseSBzaG91bGQgaGFwcGVuIGluc3RhbnRseSAoaWYgbm90IGFscmVhZHkgaW4gYSBwcmVzZW50YXRpb25BASBwZXJpb2QpIHRvIGZpbGwgdGhlIHNlYXQgaWYgcmVtb3ZhbCBtZWFucyB0aGF0IHRoZSBkZXNpcmVkIG1lbWJlcnMgYXJlIG5vdCBtZXQuZHNldF9wcmVzZW50YXRpb25fZHVyYXRpb24EFGNvdW50UENvbXBhY3Q8QmxvY2tOdW1iZXI+CFkBIFNldCB0aGUgcHJlc2VudGF0aW9uIGR1cmF0aW9uLiBJZiB0aGVyZSBpcyBjdXJyZW50bHkgYSB2b3RlIGJlaW5nIHByZXNlbnRlZCBmb3IsIHdpbGxgIGludm9rZSBgZmluYWxpemVfdm90ZWAuRHNldF90ZXJtX2R1cmF0aW9uBBRjb3VudFBDb21wYWN0PEJsb2NrTnVtYmVyPghRASBTZXQgdGhlIHByZXNlbnRhdGlvbiBkdXJhdGlvbi4gSWYgdGhlcmUgaXMgY3VycmVudCBhIHZvdGUgYmVpbmcgcHJlc2VudGVkIGZvciwgd2lsbGAgaW52b2tlIGBmaW5hbGl6ZV92b3RlYC4AADxGaW5hbGl0eVRyYWNrZXIAAQQoZmluYWxfaGludAQQaGludFBDb21wYWN0PEJsb2NrTnVtYmVyPgj0IEhpbnQgdGhhdCB0aGUgYXV0aG9yIG9mIHRoaXMgYmxvY2sgdGhpbmtzIHRoZSBiZXN0IGZpbmFsaXplZGwgYmxvY2sgaXMgdGhlIGdpdmVuIG51bWJlci4AABxHcmFuZHBhAAEESHJlcG9ydF9taXNiZWhhdmlvcgQcX3JlcG9ydBRCeXRlcwRkIFJlcG9ydCBzb21lIG1pc2JlaGF2aW9yLgAAIFRyZWFzdXJ5AAEMNHByb3Bvc2Vfc3BlbmQIFHZhbHVlSENvbXBhY3Q8QmFsYW5jZU9mPixiZW5lZmljaWFyeRxBZGRyZXNzJC0BIFB1dCBmb3J3YXJkIGEgc3VnZ2VzdGlvbiBmb3Igc3BlbmRpbmcuIEEgZGVwb3NpdCBwcm9wb3J0aW9uYWwgdG8gdGhlIHZhbHVlNQEgaXMgcmVzZXJ2ZWQgYW5kIHNsYXNoZWQgaWYgdGhlIHByb3Bvc2FsIGlzIHJlamVjdGVkLiBJdCBpcyByZXR1cm5lZCBvbmNlIHRoZVQgcHJvcG9zYWwgaXMgYXdhcmRlZC4ALCAjIDx3ZWlnaHQ+ICAtIE8oMSkuZCAtIExpbWl0ZWQgc3RvcmFnZSByZWFkcy6UIC0gT25lIERCIGNoYW5nZSwgb25lIGV4dHJhIERCIGVudHJ5LjAgIyA8L3dlaWdodD48cmVqZWN0X3Byb3Bvc2FsBCxwcm9wb3NhbF9pZFhDb21wYWN0PFByb3Bvc2FsSW5kZXg+HPwgUmVqZWN0IGEgcHJvcG9zZWQgc3BlbmQuIFRoZSBvcmlnaW5hbCBkZXBvc2l0IHdpbGwgYmUgc2xhc2hlZC4ALCAjIDx3ZWlnaHQ+ICAtIE8oMSkuZCAtIExpbWl0ZWQgc3RvcmFnZSByZWFkcy5AIC0gT25lIERCIGNsZWFyLjAgIyA8L3dlaWdodD5AYXBwcm92ZV9wcm9wb3NhbAQscHJvcG9zYWxfaWRYQ29tcGFjdDxQcm9wb3NhbEluZGV4PiBdASBBcHByb3ZlIGEgcHJvcG9zYWwuIEF0IGEgbGF0ZXIgdGltZSwgdGhlIHByb3Bvc2FsIHdpbGwgYmUgYWxsb2NhdGVkIHRvIHRoZSBiZW5lZmljaWFyeawgYW5kIHRoZSBvcmlnaW5hbCBkZXBvc2l0IHdpbGwgYmUgcmV0dXJuZWQuACwgIyA8d2VpZ2h0PiAgLSBPKDEpLmQgLSBMaW1pdGVkIHN0b3JhZ2UgcmVhZHMuRCAtIE9uZSBEQiBjaGFuZ2UuMCAjIDwvd2VpZ2h0PgAAJENvbnRyYWN0cwABFDx1cGRhdGVfc2NoZWR1bGUEIHNjaGVkdWxlIFNjaGVkdWxlDLQgVXBkYXRlcyB0aGUgc2NoZWR1bGUgZm9yIG1ldGVyaW5nIGNvbnRyYWN0cy4ADQEgVGhlIHNjaGVkdWxlIG11c3QgaGF2ZSBhIGdyZWF0ZXIgdmVyc2lvbiB0aGFuIHRoZSBzdG9yZWQgc2NoZWR1bGUuIHB1dF9jb2RlCCRnYXNfbGltaXQwQ29tcGFjdDxHYXM+EGNvZGUUQnl0ZXMIXQEgU3RvcmVzIHRoZSBnaXZlbiBiaW5hcnkgV2FzbSBjb2RlIGludG8gdGhlIGNoYWluJ3Mgc3RvcmFnZSBhbmQgcmV0dXJucyBpdHMgYGNvZGVoYXNoYC7UIFlvdSBjYW4gaW5zdGFudGlhdGUgY29udHJhY3RzIG9ubHkgd2l0aCBzdG9yZWQgY29kZS4QY2FsbBAQZGVzdBxBZGRyZXNzFHZhbHVlSENvbXBhY3Q8QmFsYW5jZU9mPiRnYXNfbGltaXQwQ29tcGFjdDxHYXM+EGRhdGEUQnl0ZXMcCQEgTWFrZXMgYSBjYWxsIHRvIGFuIGFjY291bnQsIG9wdGlvbmFsbHkgdHJhbnNmZXJyaW5nIHNvbWUgYmFsYW5jZS4AKQEgKiBJZiB0aGUgYWNjb3VudCBpcyBhIHNtYXJ0LWNvbnRyYWN0IGFjY291bnQsIHRoZSBhc3NvY2lhdGVkIGNvZGUgd2lsbCBiZbAgZXhlY3V0ZWQgYW5kIGFueSB2YWx1ZSB3aWxsIGJlIHRyYW5zZmVycmVkLhkBICogSWYgdGhlIGFjY291bnQgaXMgYSByZWd1bGFyIGFjY291bnQsIGFueSB2YWx1ZSB3aWxsIGJlIHRyYW5zZmVycmVkLkkBICogSWYgbm8gYWNjb3VudCBleGlzdHMgYW5kIHRoZSBjYWxsIHZhbHVlIGlzIG5vdCBsZXNzIHRoYW4gYGV4aXN0ZW50aWFsX2RlcG9zaXRgLBUBIGEgcmVndWxhciBhY2NvdW50IHdpbGwgYmUgY3JlYXRlZCBhbmQgYW55IHZhbHVlIHdpbGwgYmUgdHJhbnNmZXJyZWQuGGNyZWF0ZRAkZW5kb3dtZW50SENvbXBhY3Q8QmFsYW5jZU9mPiRnYXNfbGltaXQwQ29tcGFjdDxHYXM+JGNvZGVfaGFzaCBDb2RlSGFzaBBkYXRhFEJ5dGVzKKkBIENyZWF0ZXMgYSBuZXcgY29udHJhY3QgZnJvbSB0aGUgYGNvZGVoYXNoYCBnZW5lcmF0ZWQgYnkgYHB1dF9jb2RlYCwgb3B0aW9uYWxseSB0cmFuc2ZlcnJpbmcgc29tZSBiYWxhbmNlLgCEIENyZWF0aW9uIGlzIGV4ZWN1dGVkIGFzIGZvbGxvd3M6AEEBIC0gVGhlIGRlc3RpbmF0aW9uIGFkZHJlc3MgaXMgY29tcHV0ZWQgYmFzZWQgb24gdGhlIHNlbmRlciBhbmQgaGFzaCBvZiB0aGUgY29kZS4FASAtIFRoZSBzbWFydC1jb250cmFjdCBhY2NvdW50IGlzIGNyZWF0ZWQgYXQgdGhlIGNvbXB1dGVkIGFkZHJlc3MubQEgLSBUaGUgYGN0b3JfY29kZWAgaXMgZXhlY3V0ZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIG5ld2x5LWNyZWF0ZWQgYWNjb3VudC4gQnVmZmVyIHJldHVybmVkXQEgICBhZnRlciB0aGUgZXhlY3V0aW9uIGlzIHNhdmVkIGFzIHRoZSBgY29kZWAgb2YgdGhlIGFjY291bnQuIFRoYXQgY29kZSB3aWxsIGJlIGludm9rZWSoICAgdXBvbiBhbnkgY2FsbCByZWNlaXZlZCBieSB0aGlzIGFjY291bnQufCAtIFRoZSBjb250cmFjdCBpcyBpbml0aWFsaXplZC48Y2xhaW1fc3VyY2hhcmdlCBBkZXN0JEFjY291bnRJZChhdXhfc2VuZGVyRE9wdGlvbjxBY2NvdW50SWQ+FHEBIEFsbG93cyBibG9jayBwcm9kdWNlcnMgdG8gY2xhaW0gYSBzbWFsbCByZXdhcmQgZm9yIGV2aWN0aW5nIGEgY29udHJhY3QuIElmIGEgYmxvY2sgcHJvZHVjZXIVASBmYWlscyB0byBkbyBzbywgYSByZWd1bGFyIHVzZXJzIHdpbGwgYmUgYWxsb3dlZCB0byBjbGFpbSB0aGUgcmV3YXJkLgA5ASBJZiBjb250cmFjdCBpcyBub3QgZXZpY3RlZCBhcyBhIHJlc3VsdCBvZiB0aGlzIGNhbGwsIG5vIGFjdGlvbnMgYXJlIHRha2VuIGFuZKwgdGhlIHNlbmRlciBpcyBub3QgZWxpZ2libGUgZm9yIHRoZSByZXdhcmQuAAAQU3VkbwABDBBzdWRvBCBwcm9wb3NhbCBQcm9wb3NhbCg5ASBBdXRoZW50aWNhdGVzIHRoZSBzdWRvIGtleSBhbmQgZGlzcGF0Y2hlcyBhIGZ1bmN0aW9uIGNhbGwgd2l0aCBgUm9vdGAgb3JpZ2luLgDQIFRoZSBkaXNwYXRjaCBvcmlnaW4gZm9yIHRoaXMgY2FsbCBtdXN0IGJlIF9TaWduZWRfLgAsICMgPHdlaWdodD4gIC0gTygxKS5kIC0gTGltaXRlZCBzdG9yYWdlIHJlYWRzLmAgLSBPbmUgREIgd3JpdGUgKGV2ZW50KS7UIC0gVW5rbm93biB3ZWlnaHQgb2YgZGVyaXZhdGl2ZSBgcHJvcG9zYWxgIGV4ZWN1dGlvbi4wICMgPC93ZWlnaHQ+HHNldF9rZXkEDG5ldxxBZGRyZXNzJHUBIEF1dGhlbnRpY2F0ZXMgdGhlIGN1cnJlbnQgc3VkbyBrZXkgYW5kIHNldHMgdGhlIGdpdmVuIEFjY291bnRJZCAoYG5ld2ApIGFzIHRoZSBuZXcgc3VkbyBrZXkuANAgVGhlIGRpc3BhdGNoIG9yaWdpbiBmb3IgdGhpcyBjYWxsIG11c3QgYmUgX1NpZ25lZF8uACwgIyA8d2VpZ2h0PiAgLSBPKDEpLmQgLSBMaW1pdGVkIHN0b3JhZ2UgcmVhZHMuRCAtIE9uZSBEQiBjaGFuZ2UuMCAjIDwvd2VpZ2h0PhxzdWRvX2FzCAx3aG8cQWRkcmVzcyBwcm9wb3NhbCBQcm9wb3NhbCxRASBBdXRoZW50aWNhdGVzIHRoZSBzdWRvIGtleSBhbmQgZGlzcGF0Y2hlcyBhIGZ1bmN0aW9uIGNhbGwgd2l0aCBgU2lnbmVkYCBvcmlnaW4gZnJvbUQgYSBnaXZlbiBhY2NvdW50LgDQIFRoZSBkaXNwYXRjaCBvcmlnaW4gZm9yIHRoaXMgY2FsbCBtdXN0IGJlIF9TaWduZWRfLgAsICMgPHdlaWdodD4gIC0gTygxKS5kIC0gTGltaXRlZCBzdG9yYWdlIHJlYWRzLmAgLSBPbmUgREIgd3JpdGUgKGV2ZW50KS7UIC0gVW5rbm93biB3ZWlnaHQgb2YgZGVyaXZhdGl2ZSBgcHJvcG9zYWxgIGV4ZWN1dGlvbi4wICMgPC93ZWlnaHQ+AAAgSW1PbmxpbmUAAQQkaGVhcnRiZWF0CCRoZWFydGJlYXQkSGVhcnRiZWF0JHNpZ25hdHVyZSRTaWduYXR1cmUAAAAgT2ZmZW5jZXMAAQAAAEhBdXRob3JpdHlEaXNjb3ZlcnkAAQAAACBJZGVudGl0eQABJCByZWdpc3Rlcgg0aWRlbnRpdHlfdHlwZTBJZGVudGl0eVR5cGUgaWRlbnRpdHkgSWRlbnRpdHkQDQEgQSBmdW5jdGlvbiB0aGF0IHJlZ2lzdGVycyBhbiBpZGVudGl0eV90eXBlIGFuZCBpZGVudGl0eSBmb3IgYSB1c2VyABUBIENoZWNrcyB3aGV0aGVyIHRoZSAoaWRlbnRpdHlfdHlwZSwgaWRlbnRpdHkpIHBhaXIgZXhpc3RzIGFuZCBjcmVhdGVzCQEgdGhlIHJlY29yZCBpZiBub3cuIFRoZSByZWNvcmQgaXMgaW5kZXhlZCBieSB0aGUgaGFzaCBvZiB0aGUgcGFpci4YYXR0ZXN0CDRpZGVudGl0eV9oYXNoEEhhc2gsYXR0ZXN0YXRpb24sQXR0ZXN0YXRpb24UwCBBIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhbiBpZGVudGl0eSBhdHRlc3RhdGlvbgAZASBBdHRlc3RhdGlvbiBpcyBvbmx5IHZhbGlkIGlmIHRoZSBpZGVudGl0eSBpcyBpbiB0aGUgYXR0ZXN0YXRpb24gcGhhc2UJASBhbmQgaXMgdmVyaWZpZWQgb2ZmLWNoYWluIHVzaW5nIGFuIG9mZi1jaGFpbiB3b3JrZXIgbm9kZS4gQ3VycmVudPAgaW1wbGVtZW50YXRpb24gb3ZlcndyaXRlcyBhbGwgcHJvb2ZzIGlmIHNhZmV0eSBjaGVja3MgcGFzcy5McmVnaXN0ZXJfYW5kX2F0dGVzdAw0aWRlbnRpdHlfdHlwZTBJZGVudGl0eVR5cGUgaWRlbnRpdHkgSWRlbnRpdHksYXR0ZXN0YXRpb24sQXR0ZXN0YXRpb24QFQEgQSBmdW5jdGlvbiB0aGF0IHJlZ2lzdGVycyBhbmQgYXR0ZXN0cyB0byBhbiBpZGVudGl0eSBzaW11bHRhbmVvdXNseS4AHQEgQWxsb3dzIG1vcmUgZWZmaWNpZW50IHJlZ2lzdHJhdGlvbiBhbmQgYXR0ZXN0YXRpb24gcHJvY2Vzc2luZyBzaW5jZSBpdHQgcmVxdWlyZXMgb25seSAxIHRyYW5zYWN0aW9uLhh2ZXJpZnkINGlkZW50aXR5X2hhc2gQSGFzaDh2ZXJpZmllcl9pbmRleAx1MzIQyCBBIGZ1bmN0aW9uIHRoYXQgdmVyaWZpZXMgYW4gaWRlbnRpdHkgYXR0ZXN0YXRpb24uBCAFASBUaGUgdmVyaWZpY2F0aW9uIGlzIGhhbmRsZWQgYnkgYSBzZXQgb2Ygc2VlZGVkIHZlcmlmaWVycyB3aG8gcnVuyCB0aGUgb2ZmLWNoYWluIHdvcmtlciBub2RlIHRvIHZlcmlmeSBhdHRlc3RhdGlvbnMuEGRlbnkINGlkZW50aXR5X2hhc2gQSGFzaDh2ZXJpZmllcl9pbmRleAx1MzIQwCBBIGZ1bmN0aW9uIHRoYXQgZGVuaWVzIGFuIGlkZW50aXR5IGF0dGVzdGF0aW9uLgQgBQEgVGhlIHZlcmlmaWNhdGlvbiBpcyBoYW5kbGVkIGJ5IGEgc2V0IG9mIHNlZWRlZCB2ZXJpZmllcnMgd2hvIHJ1bsggdGhlIG9mZi1jaGFpbiB3b3JrZXIgbm9kZSB0byB2ZXJpZnkgYXR0ZXN0YXRpb25zLix2ZXJpZnlfbWFueQg8aWRlbnRpdHlfaGFzaGVzJFZlYzxIYXNoPjh2ZXJpZmllcl9pbmRleAx1MzIEiCBWZXJpZnkgbWFueSB2ZXJpZmljYXRpb24gcmVxdWVzdHMkZGVueV9tYW55CDxpZGVudGl0eV9oYXNoZXMkVmVjPEhhc2g+OHZlcmlmaWVyX2luZGV4DHUzMgSAIERlbnkgbWFueSB2ZXJpZmljYXRpb24gcmVxdWVzdHMwYWRkX21ldGFkYXRhEDRpZGVudGl0eV9oYXNoEEhhc2gYYXZhdGFyFEJ5dGVzMGRpc3BsYXlfbmFtZRRCeXRlcxx0YWdsaW5lFEJ5dGVzBIggQWRkIG1ldGFkYXRhIHRvIHNlbmRlcidzIGFjY291bnQuGHJldm9rZQQ0aWRlbnRpdHlfaGFzaBBIYXNoBPwgUmV2b2tlIGFuIGlkZW50aXR5IGZyb20gdGhlIGNyZWF0b3Ivc2VuZGVyIG9mIHN1Y2ggYW4gaWRlbnRpdHkAABhWb3RpbmcAAQgYY29tbWl0CBx2b3RlX2lkDHU2NBhjb21taXQsVm90ZU91dGNvbWUUJQEgQSBmdW5jdGlvbiBmb3IgY29tbWl0LXJldmVhbCB2b3Rpbmcgc2NoZW1lcyB0aGF0IGFkZHMgYSB2b3RlIGNvbW1pdG1lbnQuABUBIEEgdm90ZSBjb21taXRtZW50IGlzIGZvcm1hdHRlZCB1c2luZyB0aGUgbmF0aXZlIGhhc2ggZnVuY3Rpb24uIFRoZXJlGQEgYXJlIGN1cnJlbnRseSBubyBjcnlwdG9lY29ub21pYyBwdW5pc2htZW50cyBhZ2FpbnN0IG5vdCByZXZlYWxpbmcgdGhlMCBjb21taXRtZW50LhhyZXZlYWwMHHZvdGVfaWQMdTY0EHZvdGVAVmVjPFZvdGVPdXRjb21lPhhzZWNyZXRMT3B0aW9uPFZvdGVPdXRjb21lPgxJASBBIGZ1bmN0aW9uIHRoYXQgcmV2ZWFscyBhIHZvdGUgY29tbWl0bWVudCBvciBzZXJ2ZXMgYXMgdGhlIGdlbmVyYWwgdm90ZSBmdW5jdGlvbi4APQEgVGhlcmUgYXJlIGN1cnJlbnRseSBubyBjcnlwdG9lY29ub21pYyBpbmNlbnRpdmVzIGZvciByZXZlYWxpbmcgY29tbWl0ZWQgdm90ZXMuAAAkU2lnbmFsaW5nAAEIPGNyZWF0ZV9wcm9wb3NhbBQUdGl0bGU0UHJvcG9zYWxUaXRsZSBjb250ZW50c0BQcm9wb3NhbENvbnRlbnRzIG91dGNvbWVzQFZlYzxWb3RlT3V0Y29tZT4kdm90ZV90eXBlQHZvdGluZzo6Vm90ZVR5cGUodGFsbHlfdHlwZUR2b3Rpbmc6OlRhbGx5VHlwZQSIIENyZWF0ZXMgYSBuZXcgc2lnbmFsaW5nIHByb3Bvc2FsLkBhZHZhbmNlX3Byb3Bvc2FsBDRwcm9wb3NhbF9oYXNoEEhhc2gICQEgQWR2YW5jZSBhIHNpZ25hbGluZyBwcm9wb3NhbCBpbnRvIHRoZSAidm90aW5nIiBvciAiY29tbWl0IiBzdGFnZS74IENhbiBvbmx5IGJlIHBlcmZvcm1lZCBieSB0aGUgb3JpZ2luYWwgYXV0aG9yIG9mIHRoZSBwcm9wb3NhbC4AADhUcmVhc3VyeVJld2FyZAABAAAA'
};
