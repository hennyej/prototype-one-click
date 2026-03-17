import { Case } from '../types/case';

class CaseStore {
  private listeners: Set<() => void> = new Set();
  private cases: Case[] = [];

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  getCases(): Case[] {
    return [...this.cases];
  }

  addCase(newCase: Case) {
    this.cases = [newCase, ...this.cases];
    this.notify();
  }

  updateCaseStatus(id: string, status: Case['status']) {
    this.cases = this.cases.map(c => 
      c.id === id ? { ...c, status } : c
    );
    this.notify();
  }

  deleteCase(id: string) {
    this.cases = this.cases.filter(c => c.id !== id);
    this.notify();
  }
}

export const caseStore = new CaseStore();
