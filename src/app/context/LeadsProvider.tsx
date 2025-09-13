import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Lead, Opportunity } from '../domain/types';
import * as api from '../services/mockApi';

type State = {
  leads: Lead[];
  opportunities: Opportunity[];
  loading: boolean;
  error?: string;
  ui: {
    search: string;
    statusFilter: 'all' | string;
    sortByScoreDesc: boolean;
    selectedLead?: Lead;
    saving: boolean;
  };
};

type Action =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: { leads: Lead[]; opportunities: Opportunity[] } }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SELECT_LEAD'; payload?: Lead }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: 'all' | string }
  | { type: 'SET_SORT_SCORE_DESC'; payload: boolean }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS'; payload: Lead }
  | { type: 'SAVE_ERROR'; payload: string }
  | { type: 'CONVERT_SUCCESS'; payload: Opportunity };

const initial: State = {
  leads: [],
  opportunities: [],
  loading: true,
  ui: { search: '', statusFilter: 'all', sortByScoreDesc: true, saving: false },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: undefined };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        error: undefined,
        leads: action.payload.leads,
        opportunities: action.payload.opportunities,
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SELECT_LEAD':
      return { ...state, ui: { ...state.ui, selectedLead: action.payload } };
    case 'SET_SEARCH':
      return { ...state, ui: { ...state.ui, search: action.payload } };
    case 'SET_STATUS_FILTER':
      return { ...state, ui: { ...state.ui, statusFilter: action.payload } };
    case 'SET_SORT_SCORE_DESC':
      return { ...state, ui: { ...state.ui, sortByScoreDesc: action.payload } };
    case 'SAVE_START':
      return { ...state, ui: { ...state.ui, saving: true } };
    case 'SAVE_SUCCESS':
      return {
        ...state,
        leads: state.leads.map((l) => (l.id === action.payload.id ? action.payload : l)),
        ui: { ...state.ui, saving: false, selectedLead: action.payload },
      };
    case 'SAVE_ERROR':
      return { ...state, ui: { ...state.ui, saving: false }, error: action.payload };
    case 'CONVERT_SUCCESS':
      return { ...state, opportunities: [...state.opportunities, action.payload] };
    default:
      return state;
  }
}

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'LOAD_START' });
        const [leads, opportunities] = await Promise.all([
          api.getLeads(),
          api.getOpportunities(),
        ]);
        dispatch({ type: 'LOAD_SUCCESS', payload: { leads, opportunities } });
      } catch (e: any) {
        dispatch({ type: 'LOAD_ERROR', payload: e.message ?? 'Erro ao carregar' });
      }
    })();
  }, []);

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLeads() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider');
  return ctx;
}
