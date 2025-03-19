import { useQuery } from '@tanstack/react-query';
import base64 from 'base-64';

const CLIENT_ID = import.meta.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

const parseSpotifyUri = uri => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!regex.test(uri)) return { trackId: null };

    const url = new URL(uri);
    const parts = url.pathname.split('/');

    return {
        type: parts.at(-2),
        trackId: parts.at(-1),
    };
};

const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({ grant_type: 'client_credentials' }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`),
        },
    });

    if (!response.ok) throw new Error('Failed to fetch token');
    return response.json();
};

const getTrackInfo = async (trackId, token) => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch track info');
    return response.json();
};

const useGetTrackInfo = trackId => {
    const {
        data: tokenData,
        error: tokenError,
        isLoading: tokenLoading,
    } = useQuery({
        queryKey: ['token'],
        queryFn: getToken,
    });

    const {
        data: trackData,
        error: trackError,
        isLoading: trackLoading,
    } = useQuery({
        queryKey: ['track', trackId],
        queryFn: () => getTrackInfo(trackId, tokenData?.access_token),
        enabled: !!tokenData,
    });

    return {
        data: trackData,
        error: tokenError || trackError,
        isLoading: tokenLoading || trackLoading,
    };
};

export default function SpotifyPreview({ uri }) {
    const { trackId } = parseSpotifyUri(uri);
    const { data } = useGetTrackInfo(trackId);

    const playerInfo = {
        cover: data?.album.images[0].url || '#',
        album: data?.album.name || '--',
        title: data?.name || '--',
        artist: data?.artists[0].name || '--',
        externalUrl: `${data?.external_urls.spotify || '#'}?si=axolote`, //
    };

    return (
        <div className='w-min flex gap-3 p-2 items-center bg-zinc-800 text-white overflow-hidden rounded-lg shadow-lg font-sans'>
            {/* Album Art */}
            <div className='relative size-12 aspect-square'>
                <div className='relative w-full h-full'>
                    <img
                        src={playerInfo.cover}
                        alt={playerInfo.album}
                        className='absolute inset-0 w-full h-full object-cover rounded-md'
                    />
                </div>
            </div>

            {/* Player Info and Controls */}
            <div className='flex-1 gap-4 flex items-center justify-between pr-4'>
                <div className='text-left'>
                    <h3 className='font-semibold text-sm truncate'>{playerInfo.title}</h3>
                    <p className='text-xs text-zinc-400 truncate'>{playerInfo.artist}</p>
                </div>
            </div>
        </div>
    );
}
