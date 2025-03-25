import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { buildQueryParams } from '@/modules/core/helpers/utils';

const CACHE_TIME = 1000 * 60 * 10;

const RAINING_CODES = [
    176, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359, 386, 389, 185, 263, 266, 281, 284,
];
const SLEET_CODES = [182, 317, 362, 365];
const SNOWING_CODES = [179, 227, 323, 326, 329, 332, 335, 338, 368, 371, 392, 395];

const STORMS_CODES = [200, 386, 389, 392, 395];

const INTENSITIES = [
    {
        intensity: 'light',
        codes: [
            176, 293, 296, 353, 386, 185, 263, 266, 281, 179, 323, 326, 368, 392, 182, 317, 362,
        ],
        snow: {
            snowflakeCount: 240,
            speed: [0.5, 1.5],
            wind: [-0.3, 0.3],
            radius: [0.5, 1.0],
            fog: 0.3,
        },
        rain: {
            numDrops: 100,
            fog: 0.3,
            volume: 0.1,
        },
    },
    {
        intensity: 'moderate',
        codes: [299, 302, 356, 389, 284, 227, 332, 335, 371, 395, 320, 365],
        snow: {
            snowflakeCount: 320,
            speed: [0.5, 2.5],
            wind: [-0.5, 0.5],
            radius: [1.5, 3.5],
            fog: 0.45,
        },
        rain: {
            numDrops: 500,
            fog: 0.45,
            volume: 0.25,
        },
    },
    {
        intensity: 'heavy',
        codes: [305, 308, 359, 338],
        snow: {
            snowflakeCount: 520,
            speed: [1.5, 3.5],
            wind: [-0.5, 3.5],
            radius: [1.0, 2.5],
            fog: 0.6,
        },
        rain: {
            numDrops: 750,
            fog: 0.6,
            volume: 0.5,
        },
    },
];

const fetchIP = async () => {
    const IPINFO_TOKEN = import.meta.env.NEXT_PUBLIC_IPINFO_TOKEN;
    const resp = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);

    if (!resp.ok) {
        return [null, { message: 'Error getting IP info.' }];
    }

    const data = await resp.json();

    return [data, null];
};

export const weatherstackStrategy = () => ({
    weatherQuery: async () => {
        const HOSTNAME = 'http://api.weatherstack.com';
        const API_KEY = import.meta.env.NEXT_PUBLIC_WEATHERSTACK_KEY;

        const queryParams = buildQueryParams({
            access_key: API_KEY,
            query: 'fetch:ip',
            units: 'm',
        });

        const resp = await fetch(`${HOSTNAME}/current${queryParams}`);

        if (!resp.ok) {
            throw new Error('Network error');
        }

        return resp.json();
    },
    weatherCodeTransform: (data = {}) => Number(data?.current?.weather_code || 0),
});

export const weatherstackWorldWeatherOnline = () => ({
    weatherQuery: async () => {
        const [ipData, ipError] = await fetchIP();

        if (ipError) {
            throw new Error(ipError?.message);
        }

        const HOSTNAME = 'https://api.worldweatheronline.com';
        const API_KEY = import.meta.env.NEXT_PUBLIC_WORLDWEATHERONLINE_KEY;

        const queryParams = buildQueryParams({
            key: API_KEY,
            q: ipData?.ip,
            format: 'json',
            num_of_days: 1,
        });

        const resp = await fetch(`${HOSTNAME}/premium/v1/weather.ashx${queryParams}`);

        if (!resp.ok) {
            throw new Error('Network error');
        }

        return resp.json();
    },
    weatherCodeTransform: (data = {}) =>
        Number(data?.data?.current_condition?.[0]?.weatherCode || 0),
});

export default function useWeather(weatherStrategy = weatherstackWorldWeatherOnline) {
    const { weatherQuery, weatherCodeTransform } = weatherStrategy();

    const [raining, setRaining] = useState(false);
    const [snowing, setSnowing] = useState(false);
    const [sleet, setSleet] = useState(false);
    const [thunder, setThunder] = useState(false);
    const [intensity, setIntensity] = useState(null);

    const query = useQuery({
        queryKey: ['weather'],
        queryFn: weatherQuery,
        staleTime: CACHE_TIME,
        cacheTime: CACHE_TIME,
    });

    useEffect(() => {
        if (query?.data) {
            const weatherCode = weatherCodeTransform(query?.data);
            if (RAINING_CODES.includes(weatherCode)) {
                setRaining(true);
            }
            if (SLEET_CODES.includes(weatherCode)) {
                setSleet(true);
            }
            if (SNOWING_CODES.includes(weatherCode)) {
                setSnowing(true);
            }
            if (STORMS_CODES.includes(weatherCode)) {
                setThunder(true);
            }

            const currentIntensity = INTENSITIES.find(item => item.codes.includes(weatherCode));
            setIntensity(currentIntensity);
        }
    }, [query?.data]);

    return {
        ...query,
        raining,
        snowing,
        sleet,
        thunder,
        intensity,
    };
}
