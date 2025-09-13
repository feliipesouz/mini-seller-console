import { UseLeads } from '../context/LeadsProvider';
import type { LeadStatus } from '../domain/types';

const STATUSES: readonly LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'unqualified',
] as const;

export default function Toolbar() {
  const { state, dispatch } = UseLeads();
  const { search, statusFilter, sortByScoreDesc } = state.ui;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as LeadStatus | 'all';
    dispatch({ type: 'SET_STATUS_FILTER', payload: value });
  };

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <input
        placeholder="Search name or company"
        className="border rounded-md px-3 py-2"
        value={search}
        onChange={handleSearch}
      />

      <select
        className="border rounded-md px-3 py-2"
        value={statusFilter}
        onChange={handleStatus}
      >
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={sortByScoreDesc}
          onChange={(e) =>
            dispatch({ type: 'SET_SORT_SCORE_DESC', payload: e.target.checked })
          }
        />
        Sort by score (desc)
      </label>
    </div>
  );
}
