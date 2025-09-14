import { useLeads } from '../context/useLeads';
import type { LeadStatus } from '../domain/types';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const STATUSES: readonly LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'unqualified',
] as const;

export default function Toolbar() {
  const { state, dispatch } = useLeads();
  const { search, statusFilter, sortByScoreDesc } = state.ui;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as LeadStatus | 'all';
    dispatch({ type: 'SET_STATUS_FILTER', payload: value });
  };

  return (
    <div className="mb-3 flex flex-wrap items-center gap-20">
      <div className="relative">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
          aria-hidden="true"
        />
        <label htmlFor="search" className="sr-only">Search name or company</label>
        <input
          id="search"
          type="text"
          placeholder="Search name or company"
          className="h-9 w-72 rounded-md border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none
                 focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className='flex gap-4'>
        <select
          className="border text-sm border-gray-200 rounded-md px-3 py-1.5"
          value={statusFilter}
          onChange={handleStatus}
        >
          <option value="all">Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label className="inline-flex items-center gap-1 text-sm text-gray-600">
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
    </div>
  );
}
