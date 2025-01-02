import { cookies } from 'next/headers';
import { createSimpleMemoryHandler } from '@/helpers/handlers';
import { getRandomQuote, quoteFromSettings } from '@/services/quotes';

const getQuote = (code, cookieStore) => {
    const memoryHanderl = createSimpleMemoryHandler();

    if (code) {
        return quoteFromSettings(code);
    }

    return getRandomQuote(memoryHanderl);
};

export const GET = async request => {
    const ip = request.headers.get('x-forwarded-for');
    console.log('IP: ', ip);
    const searchParams = new URLSearchParams(request.url.split('?')[1]);

    const cookieStore = await cookies();
    const code = searchParams.get('code');
    const quote = getQuote(code, cookieStore);

    return Response.json(quote);
};
