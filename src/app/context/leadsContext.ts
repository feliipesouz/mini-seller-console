import { createContext } from 'react';
import type { Lead, LeadStatus, Opportunity } from '../domain/types';

export type State = {
  leads: Lead[];
  opportunities: Opportunity[];
  loading: boolean;
  error?: string;
  ui: {
    search: string;
    statusFilter: 'all' | LeadStatus;
    sortByScoreDesc: boolean;
    selectedLead?: Lead;
    saving: boolean;
  };
};

export type Action =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: { leads: Lead[]; opportunities: Opportunity[] } }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SELECT_LEAD'; payload?: Lead }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: 'all' | LeadStatus }
  | { type: 'SET_SORT_SCORE_DESC'; payload: boolean }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS'; payload: Lead; meta?: { closePanel?: boolean } }
  | { type: 'SAVE_ERROR'; payload: string }
  | { type: 'CONVERT_SUCCESS'; payload: Opportunity };

export type LeadsContext = { state: State; dispatch: React.Dispatch<Action> };

export const LeadsCtx = createContext<LeadsContext | null>(null);
