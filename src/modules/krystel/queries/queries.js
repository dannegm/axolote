import { clientApi } from '@/modules/krystel/services/client-api';

export const pickQuoteQuery = ({ quoteId, skipActions, ...options }) => ({
    ...options,
    queryKey: ['quotes', quoteId, skipActions],
    queryFn: () => clientApi().pickQuote({ quoteId, skipActions }),
});

export const cardsQuery = ({ skipActions, ...options }) => ({
    ...options,
    queryKey: ['cards'],
    queryFn: () => clientApi().getCards({ skipActions }),
});

export const secretCardsQuery = ({ includes, ...options }) => ({
    ...options,
    queryKey: ['cards'],
    queryFn: () => clientApi().getSecretCards({ includes }),
});

export const postsQuery = ({ includes, ...options }) => ({
    ...options,
    queryKey: ['posts'],
    queryFn: () => clientApi().getPosts({ includes }),
});

export const logsQuery = ({ ...options } = {}) => ({
    ...options,
    queryKey: ['actions'],
    queryFn: () => clientApi().getLogs(),
});

export const verifyAuthQuery = ({ ...options } = {}) => ({
    ...options,
    queryKey: ['cards', 'posts'],
    queryFn: () => clientApi().verifyAuth(),
});
