import { useMemo } from 'react';
import { applySearchFilterSort } from '../domain/selectors';
import { useLeads } from '../context/useLeads';

export default function LeadsTable() {
  const { state, dispatch } = useLeads();
  const { leads, ui } = state;

  const rows = useMemo(
    () => applySearchFilterSort(leads, ui.search, ui.statusFilter, ui.sortByScoreDesc),
    [leads, ui.search, ui.statusFilter, ui.sortByScoreDesc]
  );

  if (state.loading) return <p className="p-3 text-sm text-gray-500">Loading…</p>;
  if (state.error) return <p className="p-3 text-sm text-red-600">Error: {state.error}</p>;
  if (rows.length === 0) return <p className="p-3 text-sm text-gray-500">No results.</p>;

  return (
    <div className="overflow-x-auto max-w-5xl bg-white rounded-xl shadow p-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-300">
            <th className="py-2 pr-4">ID</th>
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Company</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Source</th>
            <th className="py-2 pr-4">Score</th>
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr
              key={l.id}
              className="border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer"
              onClick={() => dispatch({ type: 'SELECT_LEAD', payload: l })}
            >
              <td className="py-2 pr-4">{l.id}</td>
              <td className="py-2 pr-4">{l.name}</td>
              <td className="py-2 pr-4">{l.company}</td>
              <td className="py-2 pr-4">{l.email}</td>
              <td className="py-2 pr-4">{l.source}</td>
              <td className="py-2 pr-4">{l.score}</td>
              <td className="py-2 pr-4">
                <span className="inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5">
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
