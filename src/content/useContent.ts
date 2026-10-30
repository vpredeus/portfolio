import { useEffect, useState } from 'react';
import type { PortfolioContent } from './types';

// The preview and the future Sheets endpoint share the same response format.
const url = import.meta.env.VITE_CONTENT_API_URL || '/content/preview.json';

export function useContent() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    async function load() {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Content request failed');
        const data: PortfolioContent = await response.json();
        if (
          !data.profile?.name ||
          !data.profile.email ||
          !Array.isArray(data.profile.links) ||
          !Array.isArray(data.about?.paragraphs) ||
          !Array.isArray(data.projects) ||
          !Array.isArray(data.studies) ||
          !data.contact?.resumeUrl
        )
          throw new Error('Invalid content');
        if (active) {
          setContent(data);
          setStatus('ready');
        }
      } catch {
        if (active) setStatus('error');
      } finally {
        window.clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [attempt]);
  function retry() {
    setStatus('loading');
    setAttempt((n) => n + 1);
  }
  return { content, status, retry };
}
