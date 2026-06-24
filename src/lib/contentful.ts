import type { Slide } from '@/components/Carousel';
import { normalizePage } from '@/lib/api-utils';

interface ContentfulEntry {
  fields?: Record<string, unknown>;
}

interface ContentfulResponse {
  items?: ContentfulEntry[];
  total?: number;
}

export interface QuotePageResult {
  slides: Slide[];
  page: number;
  pageCount: number;
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
    .filter((item): item is Slide => item !== null); // Filter out null values
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

// Fetches a page of quotes from Contentful, normalizes the page number, and returns the slides along with pagination information.
export async function getQuotesPage(page = 0, limit = 3): Promise<QuotePageResult> {
  const { spaceId, token } = getContentfulConfig();

  const initialData = await requestQuotePage(spaceId, token, page, limit);
  const total = typeof initialData.total === 'number' ? initialData.total : 0;
  const pageCount = total > 0 ? Math.ceil(total / limit) : 0;

  if (pageCount === 0) {
    return { slides: [], page: 0, pageCount: 0 };
  }

  const normalizedPage = normalizePage(page, pageCount);

  return {
    slides: parseQuotes(initialData),
    page: normalizedPage,
    pageCount,
  };
}
