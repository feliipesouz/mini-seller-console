import type { Lead } from './types';

export function applySearchFilterSort(
  leads: Lead[],
  search: string,
  statusFilter: 'all' | string,
  sortByScoreDesc: boolean
) {
  const s = search.trim().toLowerCase();
  let out = leads;

  if (s) {
    out = out.filter((l) =>
      l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s)
    );
  }

  if (statusFilter !== 'all') {
    out = out.filter((l) => l.status === statusFilter);
  }

  if (sortByScoreDesc) {
    out = [...out].sort((a, b) => b.score - a.score);
  }

  return out;
}
