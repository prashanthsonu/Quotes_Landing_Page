import { NextResponse } from 'next/server';
import { getQuotesPage } from '@/lib/contentful';
import { parseIntParam, clamp } from '@/lib/api-utils';
import { DEFAULT_QUOTES_LIMIT, MAX_QUOTES_LIMIT, MIN_QUOTES_LIMIT } from '@/lib/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(0, parseIntParam(searchParams.get('page'), 0));
  const limit = clamp(parseIntParam(searchParams.get('limit'), DEFAULT_QUOTES_LIMIT), MIN_QUOTES_LIMIT, MAX_QUOTES_LIMIT);

  try {
    const result = await getQuotesPage(page, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch quote page', error);
    return NextResponse.json({ message: 'Failed to fetch quote page' }, { status: 500 });
  }
}
