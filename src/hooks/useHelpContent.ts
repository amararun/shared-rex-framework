import { useState, useEffect } from 'react';

interface HelpContent {
  quickStart: string;
  tips: string;
  links: string;
}

export function useHelpContent(helpContentId: string | null) {
  const [content, setContent] = useState<HelpContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      if (!helpContentId) {
        setContent(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/help/${helpContentId}/quick-start.md`);
        if (!response.ok) throw new Error('Failed to load content');
        
        const quickStart = await response.text();
        
        const tipsResponse = await fetch(`/help/${helpContentId}/tips.md`);
        const tips = await tipsResponse.text();
        
        const linksResponse = await fetch(`/help/${helpContentId}/links.md`);
        const links = await linksResponse.text();

        setContent({
          quickStart,
          tips,
          links
        });
      } catch (error) {
        console.error('Error loading help content:', error);
        setContent({
          quickStart: "Failed to load quick start guide.",
          tips: "Failed to load tips.",
          links: "Failed to load links."
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [helpContentId]);

  return { content, isLoading };
} 