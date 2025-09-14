import Toolbar from './app/components/Toolbar';
import LeadsTable from './app/components/LeadsTable';
import OpportunitiesTable from './app/components/OpportunitiesTable';
import LeadDetailPanel from './app/components/LeadDetailPanel';
import { useLeads } from './app/context/useLeads';

export default function App() {
  const { state } = useLeads();

  return (
    <div className="min-h-screen w-full4 bg-gray-50 p-6">
      <div className='mx-auto max-w-5xl bg-white rounded-xl shadow p-4'>
        <header className="mx-auto mb-2 flex items-center justify-between border-b border-gray-300 pb-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="Mini Seller Console"
              className="h-8 w-8 shrink-0"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-2xl font-semibold text-black">Mini Seller Console</h1>
          </div>
          <span className="text-sm text-gray-500">Leads: {state.leads.length}</span>
        </header>

        <main className="mx-auto">
          <h2 className="text-xl font-medium mb-2">Leads</h2>
          <Toolbar />
          <LeadsTable />
          <OpportunitiesTable />
        </main>
      </div>

      <LeadDetailPanel />
    </div>
  );
}
