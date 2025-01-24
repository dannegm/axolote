import '../../app/globals.css';

import { cn } from '@/helpers/utils';
import Fonts from '@/providers/fonts';
import Providers from '@/providers/providers';

export default function KrystelLayout({ children }) {
    return (
        <html lang='en' className='light'>
            <body className={cn('antialiased')}>
                <Fonts>
                    <Providers>{children}</Providers>
                </Fonts>
            </body>
        </html>
    );
}
