import { connection } from 'next/server';
import { HomePageClient } from './HomePageClient';
import { getRandomQuotes } from '@/lib/contentful';
import type { Slide } from '@/components/Carousel';

export default async function Home() {
  await connection();

  let slides: Slide[] = [];
  try {
    slides = await getRandomQuotes(3);
  } catch (error) {
    console.error('Failed to load quotes from Contentful', error);
  }

  return <HomePageClient slides={slides} />;
}
