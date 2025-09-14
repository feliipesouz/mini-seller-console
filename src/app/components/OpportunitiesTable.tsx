import { useLeads } from "../context/useLeads";

export default function OpportunitiesTable() {
  const { state } = useLeads();
  const rows = state.opportunities;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-3">Opportunities ({rows.length})</h2>
      <div className='max-w-5xl bg-white rounded-xl shadow p-4'>
        {rows.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma oportunidade criada ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b border-gray-300">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Stage</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Account</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{o.name}</td>
                    <td className="py-2 pr-4">{o.stage}</td>
                    <td className="py-2 pr-4">
                      {o.amount != null ? o.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '—'}
                    </td>
                    <td className="py-2 pr-4">{o.accountName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
