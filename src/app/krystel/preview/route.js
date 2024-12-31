import { quoteFromSettings } from '@/services/quotes';
import { ImageResponse } from 'next/og';

import {
    Cake,
    Gift,
    PartyPopper,
    Snowflake,
    Candy,
    Clover,
    Cookie,
    Cat,
    Flower,
    Gem,
    Lollipop,
    MoonStar,
    Origami,
    Sparkles,
} from 'lucide-react';

export const icons = {
    Candy,
    Cake,
    Gift,
    PartyPopper,
    Snowflake,
    Clover,
    Cookie,
    Cat,
    Flower,
    Gem,
    Lollipop,
    MoonStar,
    Origami,
    Sparkles,
};

export async function GET(request) {
    const searchParams = new URL(request.url).searchParams;
    const code = searchParams.get('code') || '16:12:21:18:8';

    const { quote, icon, border } = quoteFromSettings(code);

    const Icon = icons[icon];

    const pacifico = fetch(
        'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6Mk.woff2',
    ).then(res => res.arrayBuffer());

    const fontData = await pacifico;

    return new ImageResponse(
        (
            <div
                style={{
                    backgroundImage: border,
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1.5rem',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: 'calc(100% - 1.5rem)',
                        borderRadius: '0.375rem',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        color: '#2d3748',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2rem',
                            justifyContent: 'center',
                            padding: '2.5rem',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'Pacifico, sans-serif',
                                fontSize: '1.875rem', // text-3xl
                                textAlign: 'center',
                            }}
                        >
                            Krystel,
                        </p>

                        {Icon && (
                            <div style={{ display: 'block' }}>
                                <Icon size={64} style={{ color: 'currentColor' }} />
                            </div>
                        )}

                        <p
                            style={{
                                fontFamily: 'Delius, sans-serif',
                                fontSize: '1.25rem', // text-xl
                                textAlign: 'center',
                                fontWeight: '500',
                                lineHeight: '1.75rem', // leading-relaxed
                            }}
                        >
                            {quote}
                        </p>

                        <p
                            style={{
                                fontFamily: 'Pacifico, sans-serif',
                                fontSize: '1.25rem', // text-xl
                                textAlign: 'center',
                            }}
                        >
                            Feliz cumple.
                        </p>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'pacifico',
                    data: fontData,
                    style: 'normal',
                    weight: 400,
                },
            ],
        },
    );
}
