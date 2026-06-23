import type { Slide } from '@/components/Carousel';
import { normalizePage } from '@/lib/api-utils';

interface ContentfulEntry {
  fields?: Record<string, unknown>;
}

interface ContentfulResponse {
  items?: ContentfulEntry[];
  total?: number;
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

function parseQuotes(data: ContentfulResponse): Slide[] {
  return (data.items ?? [])
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
}

async function requestQuotePage(spaceId: string, token: string, page: number, limit: number) {
  const skip = page * limit;
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${token}&content_type=quotes&order=sys.createdAt&limit=${limit}&skip=${skip}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Contentful request failed with status ${response.status}.`);
  }

  return (await response.json()) as ContentfulResponse;
}

export interface QuotePageResult {
  slides: Slide[];
  page: number;
  pageCount: number;
}

export async function getQuotesPage(page = 0, limit = 3): Promise<QuotePageResult> {
  const safeLimit = Math.max(1, Math.floor(limit));
  const safePage = Math.max(0, Math.floor(page));
  const { spaceId, token } = getContentfulConfig();

  const initialData = await requestQuotePage(spaceId, token, safePage, safeLimit);
  const total = typeof initialData.total === 'number' ? initialData.total : 0;
  const pageCount = total > 0 ? Math.ceil(total / safeLimit) : 0;

  if (pageCount === 0) {
    return { slides: [], page: 0, pageCount: 0 };
  }

  const normalizedPage = normalizePage(safePage, pageCount);

  return {
    slides: parseQuotes(initialData),
    page: normalizedPage,
    pageCount,
  };
}

export async function getRandomQuotes(limit?: number): Promise<Slide[]> {
  const { spaceId, token } = getContentfulConfig();
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${token}&content_type=quotes`;

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Contentful request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as ContentfulResponse;
  const quotes = parseQuotes(data);

  if (typeof limit !== 'number' || limit < 1) {
    return shuffle(quotes);
  }

  if (quotes.length <= limit) {
    return quotes;
  }

  return shuffle(quotes).slice(0, limit);
}
