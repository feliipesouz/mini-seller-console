export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export type OpportunityStage =
  | 'Prospecting'
  | 'Qualification'
  | 'Proposal'
  | 'Closed Won'
  | 'Closed Lost';

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}
