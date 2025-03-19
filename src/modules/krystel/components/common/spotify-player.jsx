import { useQuery } from '@tanstack/react-query';
import base64 from 'base-64';
import { Play, ExternalLink } from 'lucide-react';

import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

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

export default function SpotifyPlayer({ uri }) {
    const quote = useQuote();
    const postPlay = usePostAction({ action: 'play', settings: quote?.settings });

    const { trackId } = parseSpotifyUri(uri);
    const { data } = useGetTrackInfo(trackId);

    const playerInfo = {
        cover: data?.album.images[0].url || '#',
        album: data?.album.name || '--',
        title: data?.name || '--',
        artist: data?.artists[0].name || '--',
        externalUrl: `${data?.external_urls.spotify || '#'}?si=axolote`, //
    };

    const handlePlay = () => {
        postPlay();
    };

    return (
        <div className='block w-48 md:w-52 -mt-20 md:-mt-24 -mb-4 bg-zinc-900 text-white overflow-hidden rounded-lg shadow-lg font-sans'>
            {/* Album Art */}
            <div className='relative aspect-square grow p-3'>
                <div className='relative w-full h-full'>
                    <img
                        src={playerInfo.cover}
                        alt={playerInfo.album}
                        className='absolute inset-0 w-full h-full object-cover rounded-md'
                    />
                    <a
                        className='absolute w-10 h-10 inset-0 m-auto bg-black/50 text-white hover:bg-black/70 hover:text-white rounded-md p-2 flex items-center justify-center'
                        href={playerInfo.externalUrl}
                        target='_blank'
                        onClick={handlePlay}
                    >
                        <Play className='h-8 w-8' />
                    </a>
                </div>
            </div>

            {/* Player Info and Controls */}
            <div className='bg-zinc-800 p-3 gap-4 flex items-center justify-between'>
                <div className='grow text-left'>
                    <h3 className='font-semibold text-sm truncate'>{playerInfo.title}</h3>
                    <p className='text-xs text-zinc-400 truncate'>{playerInfo.artist}</p>
                </div>
                <a
                    className='bg-green-500 hover:bg-green-600 text-black px-3 py-[0.45rem] rounded-full text-xs flex items-center gap-1'
                    href={playerInfo.externalUrl}
                    target='_blank'
                >
                    <ExternalLink size={14} />
                    <span className='hidden md:block'>Spotify</span>
                </a>
            </div>
        </div>
    );
}
