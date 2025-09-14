import React, { useEffect, useReducer } from 'react';
import { LeadsCtx, type Action, type State } from './leadsContext';
import { getErrorMessage } from '../domain/errors';
import * as api from '../services/mockApi';

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
      return { ...state, loading: false, error: undefined, ...action.payload };
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
        leads: state.leads.map(l => (l.id === action.payload.id ? action.payload : l)),
        ui: {
          ...state.ui,
          saving: false,
          selectedLead: action.meta?.closePanel ? undefined : action.payload,
        },
      };
    case 'SAVE_ERROR':
      return { ...state, ui: { ...state.ui, saving: false }, error: action.payload };
    case 'CONVERT_SUCCESS':
      return { ...state, opportunities: [...state.opportunities, action.payload] };
    default:
      return state;
  }
}

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'LOAD_START' });
        const [leads, opportunities] = await Promise.all([api.getLeads(), api.getOpportunities()]);
        dispatch({ type: 'LOAD_SUCCESS', payload: { leads, opportunities } });
      } catch (e: unknown) {
        dispatch({ type: 'LOAD_ERROR', payload: getErrorMessage(e, 'Erro ao carregar') });
      }
    })();
  }, []);

  return <LeadsCtx.Provider value={{ state, dispatch }}>{children}</LeadsCtx.Provider>;
}
