import { buildQueryParams } from '@/modules/core/helpers/utils';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export const pickQuoteQuery = ({ quoteId, skipActions, token, ...options }) => ({
    ...options,
    queryKey: ['quotes', quoteId, skipActions],
    queryFn: async () => {
        const params = buildQueryParams({ 'quote.id': quoteId, 'skip-actions': skipActions });
        const resp = await fetch(`${BASE_URL}/krystel/pick${params}`, {
            headers: { 'x-dnn-tracker': token },
        });
        if (!resp.ok) throw new Error('Network error');
        return resp.json();
    },
});

export const cardsQuery = ({ skipActions, token, ...options }) => ({
    ...options,
    queryKey: ['cards'],
    queryFn: async () => {
        const params = buildQueryParams({ 'skip-actions': skipActions });
        const resp = await fetch(`${BASE_URL}/krystel${params}`, {
            headers: { 'x-dnn-tracker': token },
        });
        if (!resp.ok) throw new Error('Network error');
        return resp.json();
    },
});

export const secretCardsQuery = ({ includes, token, ...options }) => ({
    ...options,
    queryKey: ['cards'],
    queryFn: async () => {
        const resp = await fetch(`${BASE_URL}/krystel?includes=${includes.join(',')}`, {
            headers: { 'x-dnn-tracker': token },
        });
        if (!resp.ok) throw new Error('Network error');
        return resp.json();
    },
});

export const postsQuery = ({ includes, token, ...options }) => ({
    ...options,
    queryKey: ['posts'],
    queryFn: async () => {
        const params = buildQueryParams({ includes });
        const resp = await fetch(`${BASE_URL}/krystel/posts${params}`, {
            headers: { 'x-dnn-tracker': token },
        });
        if (!resp.ok) throw new Error('Network error');
        return resp.json();
    },
});

export const logsQuery = ({ token, ...options }) => ({
    ...options,
    queryKey: ['actions'],
    queryFn: async () => {
        const resp = await fetch(`${BASE_URL}/krystel/actions?limit=250`, {
            headers: { 'x-dnn-tracker': token },
        });
        if (!resp.ok) throw new Error('Network error');
        return resp.json();
    },
});

export const verifyAuthQuery = ({ token, ...options }) => ({
    ...options,
    queryKey: ['cards', 'posts'],
    queryFn: async () => {
        const resp = await fetch(`${BASE_URL}/krystel/auth/validate`, {
            headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
        });
        if (!resp.ok) throw new Error('Error logging in');
        return resp.json();
    },
});
