import type { DiagnosticData } from '../types/diagnostic';

const STORAGE_KEY = 'diagnostic_session';

export function saveSession(data: DiagnosticData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving session', e);
  }
}

export function loadSession(): DiagnosticData | null {
  try {
    const item = sessionStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error loading session', e);
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(STORAGE_KEY);
}
