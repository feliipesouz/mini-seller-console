import leads from './assets/leads.json';
import type { Lead } from './app/domain/types';

export default function App() {
  const data = leads as Lead[];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <header className="mx-auto w-full mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Mini Seller Console</h1>
        <span className="text-sm text-gray-500"></span>
      </header>

      <main className="mx-auto max-w-5xl bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium mb-3">Leads ({data.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((l) => (
                <tr key={l.id} className="border-b text-black last:border-0">
                  <td className="py-2 pr-4">{l.id}</td>
                  <td className="py-2 pr-4">{l.name}</td>
                  <td className="py-2 pr-4">{l.company}</td>
                  <td className="py-2 pr-4">{l.email}</td>
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
      </main>
    </div>
  );
}