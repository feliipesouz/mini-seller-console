import rawLeads from '../../assets/leads.json';
import type { Lead, LeadStatus, Opportunity } from '../domain/types';

const LS_LEADS = 'leads';
const LS_OPPS = 'opportunities';

function normalizeStatus(s: string | undefined): LeadStatus {
  const v = String(s ?? 'new').toLowerCase();
  const allowed: LeadStatus[] = ['new', 'contacted', 'qualified', 'unqualified'];
  return (allowed as string[]).includes(v) ? (v as LeadStatus) : 'new';
}

const leadsSeed: Lead[] = (rawLeads).map((l, i) => ({
  id: String(l?.id ?? `L-${i + 1}`),
  name: String(l?.name ?? ''),
  company: String(l?.company ?? ''),
  email: String(l?.email ?? ''),
  source: String(l?.source ?? ''),
  score: Number(l?.score ?? 0),
  status: normalizeStatus(l?.status),
}));

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function read<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function getLeads(): Promise<Lead[]> {
  await sleep(300);
  const exists = localStorage.getItem(LS_LEADS);
  if (!exists) write(LS_LEADS, leadsSeed);
  return read<Lead[]>(LS_LEADS, leadsSeed);
}

function maybeFail() {
  if (Math.random() < 0.15) throw new Error('Network error (simulado)');
}

export async function updateLead(updated: Lead): Promise<Lead> {
  await sleep(400);
  maybeFail();

  const leads = read<Lead[]>(LS_LEADS, []);
  const idx = leads.findIndex((l) => l.id === updated.id);
  if (idx === -1) throw new Error('Lead não encontrado');

  leads[idx] = updated;
  write(LS_LEADS, leads);
  return updated;
}

export async function convertLeadToOpportunity(lead: Lead): Promise<Opportunity> {
  await sleep(500);
  maybeFail();

  const opps = read<Opportunity[]>(LS_OPPS, []);
  const opp: Opportunity = {
    id: crypto.randomUUID(),
    name: lead.name,
    stage: 'Prospecting',
    amount: undefined,
    accountName: lead.company,
  };
  opps.push(opp);
  write(LS_OPPS, opps);
  return opp;
}

export async function getOpportunities(): Promise<Opportunity[]> {
  await sleep(250);
  return read<Opportunity[]>(LS_OPPS, []);
}
