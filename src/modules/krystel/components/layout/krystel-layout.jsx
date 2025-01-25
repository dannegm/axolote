import { cn } from '@/modules/core/helpers/utils';
import Providers from '@/modules/core/providers/providers';
import Fonts from '@/modules/krystel/providers/fonts';

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
