import Toolbar from './app/components/Toolbar';
import LeadsTable from './app/components/LeadsTable';
import OpportunitiesTable from './app/components/OpportunitiesTable';
import { UseLeads } from './app/context/LeadsProvider';
import LeadDetailPanel from './app/components/LeadDetailPanel';

export default function App() {
  const { state } = UseLeads();

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <header className="mx-auto w-full mb-6 flex items-center justify-between max-w-5xl">
        <h1 className="text-2xl font-semibold text-black">Mini Seller Console</h1>
        <span className="text-sm text-gray-500">Leads: {state.leads.length}</span>
      </header>

      <main className="mx-auto max-w-5xl bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium mb-2">Leads</h2>
        <Toolbar />
        <LeadsTable />
        <OpportunitiesTable />
      </main>

      <LeadDetailPanel />
    </div>
  );
}
