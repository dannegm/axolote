import { createCookieMemoryHandler } from '@/helpers/handlers';
import { getRandomQuote, quoteFromSettings } from '@/services/quotes';
import { cookies } from 'next/headers';

const getQuote = (code, cookieStore) => {
    const memoryHanderl = createCookieMemoryHandler(cookieStore);

    if (code) {
        return quoteFromSettings(code);
    }

    return getRandomQuote(memoryHanderl);
};

export const dynamic = 'force-dynamic';

export const GET = async request => {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);

    const cookieStore = await cookies();
    const code = searchParams.get('code');
    const quote = getQuote(code, cookieStore);

    return Response.json(quote);
};
