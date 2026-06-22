import type { Slide } from '@/components/Carousel';

interface ContentfulEntry {
  fields?: Record<string, unknown>;
}

interface ContentfulResponse {
  items?: ContentfulEntry[];
}

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getContentfulConfig() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !token) {
    throw new Error('Missing Contentful environment variables: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are required.');
  }

  return { spaceId, token };
}

export async function getRandomQuotes(limit = 3): Promise<Slide[]> {
  const { spaceId, token } = getContentfulConfig();
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${token}&content_type=quotes`;

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Contentful request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as ContentfulResponse;

  const quotes = (data.items ?? [])
    .map((item) => {
      const fields = item.fields;
      if (!fields) {
        return null;
      }

      const quote = typeof fields.quote === 'string' ? fields.quote.trim() : null;
      const author = typeof fields.author === 'string' ? fields.author.trim() : null;

      if (!quote || !author) {
        return null;
      }

      return { quote, author } satisfies Slide;
    })
    .filter((item): item is Slide => item !== null);

  if (quotes.length <= limit) {
    return quotes;
  }

  return shuffle(quotes).slice(0, limit);
}
