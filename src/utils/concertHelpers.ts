/**
 * Concert Data Helpers
 * Utilities to transform concert JSON data for components
 */

interface ConcertRaw {
  id: string;
  date: string;
  time: string;
  venue: { en: string; es: string };
  city: string;
  country: { en: string; es: string };
  address: string;
  program: Array<{
    composer: string;
    work: { en: string; es: string };
  }>;
  description: { en: string; es: string };
  duration: string;
  ticketsUrl: string | null;
  price: {
    amount: number;
    currency: string;
    free: boolean;
  };
  status: 'available' | 'past' | 'sold-out';
  image: string;
}

interface ConcertSimple {
  date: string;
  venue: string;
  city: string;
  country: string;
  program: string[];
}

/**
 * Transform raw concert data to simple format for FeaturedConcerts component
 */
export function transformConcertsForPreview(
  concerts: ConcertRaw[],
  lang: 'en' | 'es',
  limit: number = 3
): ConcertSimple[] {
  // Filtrar solo conciertos disponibles (no pasados)
  const upcomingConcerts = concerts
    .filter(concert => concert.status === 'available')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);

  // Transformar a formato simple
  return upcomingConcerts.map(concert => ({
    date: formatConcertDate(concert.date, lang),
    venue: concert.venue[lang],
    city: concert.city,
    country: concert.country[lang],
    program: concert.program.map(
      item => `${item.composer}: ${item.work[lang]}`
    ),
  }));
}

/**
 * Format date for display
 */
function formatConcertDate(dateStr: string, lang: 'en' | 'es'): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const locale = lang === 'en' ? 'en-US' : 'es-ES';
  return date.toLocaleDateString(locale, options);
}

/**
 * Get all concerts (for full concerts page)
 */
export function getAllConcerts(
  concerts: ConcertRaw[],
  lang: 'en' | 'es'
): ConcertSimple[] {
  return concerts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(concert => ({
      date: formatConcertDate(concert.date, lang),
      venue: concert.venue[lang],
      city: concert.city,
      country: concert.country[lang],
      program: concert.program.map(
        item => `${item.composer}: ${item.work[lang]}`
      ),
    }));
}
