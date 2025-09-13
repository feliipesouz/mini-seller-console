import { useMemo } from 'react';
import { UseLeads } from '../context/LeadsProvider';
import { applySearchFilterSort } from '../domain/selectors';

export default function LeadsTable() {
  const { state, dispatch } = UseLeads();
  const { leads, ui } = state;

  const rows = useMemo(
    () => applySearchFilterSort(leads, ui.search, ui.statusFilter, ui.sortByScoreDesc),
    [leads, ui.search, ui.statusFilter, ui.sortByScoreDesc]
  );

  if (state.loading) return <p className="p-3 text-sm text-gray-500">Loading…</p>;
  if (state.error) return <p className="p-3 text-sm text-red-600">Error: {state.error}</p>;
  if (rows.length === 0) return <p className="p-3 text-sm text-gray-500">Nenhum resultado.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 border-b">
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
              className="border-b last:border-0 hover:bg-gray-50 cursor-pointer"
              onClick={() => dispatch({ type: 'SELECT_LEAD', payload: l })}
            >
              <td className="py-2 pr-4">{l.id}</td>
              <td className="py-2 pr-4">{l.name}</td>
              <td className="py-2 pr-4">{l.company}</td>
              <td className="py-2 pr-4">{l.email}</td>
              <td className="py-2 pr-4">{l.source}</td>
              <td className="py-2 pr-4">{l.score}</td>
              <td className="py-2 pr-4">
                <span className="inline-flex items-center rounded-full border px-2 py-0.5">
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
