import { useEffect, useState } from 'react';
import { isValidEmail } from '../domain/validators';
import { UseLeads } from '../context/LeadsProvider';
import { updateLead, convertLeadToOpportunity } from '../services/mockApi';
import { getErrorMessage } from '../domain/errors';
import type { Lead, LeadStatus } from '../domain/types';

export default function LeadDetailPanel() {
  const { state, dispatch } = UseLeads();
  const lead = state.ui.selectedLead;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus>('new');

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
    }
  }, [lead]);

  if (!lead) return null;

  const currentLead: Lead = lead;

  const canSave =
    isValidEmail(email) &&
    (email !== currentLead.email || status !== currentLead.status) &&
    !state.ui.saving;

  async function onSave() {
    const updated: Lead = {
      id: currentLead.id,
      name: currentLead.name,
      company: currentLead.company,
      email,
      source: currentLead.source,
      score: currentLead.score,
      status,
    };

    const snapshot: Lead = {
      id: currentLead.id,
      name: currentLead.name,
      company: currentLead.company,
      email: currentLead.email,
      source: currentLead.source,
      score: currentLead.score,
      status: currentLead.status,
    };

    dispatch({ type: 'SAVE_START' });
    try {
      const res = await updateLead(updated);
      dispatch({ type: 'SAVE_SUCCESS', payload: res });
    } catch (e: unknown) {
      dispatch({ type: 'SAVE_SUCCESS', payload: snapshot });
      dispatch({ type: 'SAVE_ERROR', payload: getErrorMessage(e, 'Falha ao salvar') });
      alert('Falha ao salvar (simulado). Alterações revertidas.');
    }
  }

  async function onConvert() {
    try {
      const opp = await convertLeadToOpportunity(currentLead);
      dispatch({ type: 'CONVERT_SUCCESS', payload: opp });
      alert('Lead convertido em Opportunity!');
    } catch (e: unknown) {
      alert(`Falha ao converter (simulado). ${getErrorMessage(e)}`);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40"
        onClick={() => dispatch({ type: 'SELECT_LEAD', payload: undefined })}
      />
      <aside className="fixed right-0 inset-y-0 w-full max-w-md bg-white shadow-xl p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{lead.name}</h2>
          <button
            className="text-sm text-gray-500"
            onClick={() => dispatch({ type: 'SELECT_LEAD', payload: undefined })}
          >
            Close
          </button>
        </header>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail(email) && (
              <p className="text-xs text-red-600 mt-1">Email inválido</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value as LeadStatus)
              }
            >
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="qualified">qualified</option>
              <option value="unqualified">unqualified</option>
            </select>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-md border"
            onClick={() => dispatch({ type: 'SELECT_LEAD', payload: undefined })}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-50"
            onClick={onSave}
            disabled={!canSave}
          >
            {state.ui.saving ? 'Saving…' : 'Save'}
          </button>
          <button
            className="ml-auto px-3 py-2 rounded-md bg-emerald-600 text-white"
            onClick={onConvert}
          >
            Convert Lead
          </button>
        </div>
      </aside>
    </>
  );
}