import umami from '@umami/node';

umami.init({
    websiteId: import.meta.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    hostUrl: import.meta.env.NEXT_PUBLIC_UMAMI_WEBSITE_HOST_URL,
});

export { umami };
