import { buildQueryParams } from '@/modules/core/helpers/utils';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export const clientApi = () => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const auth = { 'x-dnn-tracker': token };
    const json = { ...auth, 'Content-Type': 'application/json' };

    const request = async (path, options = {}) => {
        const resp = await fetch(`${BASE_URL}${path}`, options);
        if (!resp.ok) throw new Error('Network error');
        return resp.json();
    };

    return {
        pickQuote: ({ quoteId, skipActions }) =>
            request(
                `/krystel/pick${buildQueryParams({ 'quote.id': quoteId, 'skip-actions': skipActions })}`,
                { headers: auth },
            ),

        getCards: ({ skipActions } = {}) =>
            request(`/krystel${buildQueryParams({ 'skip-actions': skipActions })}`, {
                headers: auth,
            }),

        getSecretCards: ({ includes } = {}) =>
            request(`/krystel?includes=${includes.join(',')}`, { headers: auth }),

        getPosts: ({ includes } = {}) =>
            request(`/krystel/posts${buildQueryParams({ includes })}`, { headers: auth }),

        getLogs: () => request('/krystel/actions?limit=250', { headers: auth }),

        verifyAuth: () => request('/krystel/auth/validate', { headers: json }),

        createQuote: ({ quote, published_at = new Date() }) =>
            request('/krystel', {
                method: 'POST',
                headers: json,
                body: JSON.stringify({ quote, published_at }),
            }),

        deleteQuote: ({ quoteId }) =>
            request(`/krystel/${quoteId}`, { method: 'DELETE', headers: auth }),

        toggleQuote: ({ quoteId, show }) =>
            request(`/krystel/${quoteId}`, {
                method: 'PUT',
                headers: json,
                body: JSON.stringify({ show }),
            }),

        destroyQuote: ({ quoteId }) =>
            request(`/krystel/${quoteId}/destroy`, { method: 'DELETE', headers: auth }),

        restoreQuote: ({ quoteId }) =>
            request(`/krystel/${quoteId}`, {
                method: 'PUT',
                headers: json,
                body: JSON.stringify({ deleted_at: null }),
            }),

        createPost: payload =>
            request('/krystel/posts', {
                method: 'POST',
                headers: json,
                body: JSON.stringify(payload),
            }),

        deletePost: postId =>
            request(`/krystel/posts/${postId}`, { method: 'DELETE', headers: auth }),

        destroyPost: postId =>
            request(`/krystel/posts/${postId}/destroy`, { method: 'DELETE', headers: auth }),

        clearLogs: () => request('/krystel/actions', { method: 'DELETE', headers: auth }),

        deleteLog: actionId => request(`/actions/${actionId}`, { method: 'DELETE', headers: auth }),

        postAction: ({ action, quoteId, settings, userAgent = 'unknown' }) =>
            request(`/krystel/${quoteId}/action/${action}?code=${settings}&ua=${userAgent}`, {
                method: 'POST',
                headers: auth,
            }),

        postPageView: ({ page, userAgent = 'unknown' }) =>
            request(`/krystel/none/action/page_view?ua=${userAgent}`, {
                method: 'POST',
                headers: json,
                body: JSON.stringify({ page }),
            }),

        track: ({ sid, referrer, userAgent = 'unknown' }) =>
            fetch(`${BASE_URL}/krystel/track?sid=${sid}&ua=${userAgent}`, {
                method: 'POST',
                referrer,
                headers: auth,
            }),
    };
};
