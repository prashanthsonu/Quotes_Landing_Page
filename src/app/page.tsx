import { connection } from 'next/server';
import { HomePageClient } from './HomePageClient';
import { getQuotesPage } from '@/lib/contentful';
import type { Slide } from '@/components/Carousel';

export default async function Home() {
  await connection();

  let slides: Slide[] = [];
  let pageCount = 0;

  try {
    const quotePage = await getQuotesPage(0, 3);
    slides = quotePage.slides;
    pageCount = quotePage.pageCount;
  } catch (error) {
    console.error('Failed to load quotes from Contentful', error);
  }

  return <HomePageClient slides={slides} initialPageCount={pageCount} />;
}
