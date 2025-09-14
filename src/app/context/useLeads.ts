import { useContext } from 'react';
import { LeadsCtx } from './leadsContext';

export function useLeads() {
  const ctx = useContext(LeadsCtx);
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider');
  return ctx;
}
