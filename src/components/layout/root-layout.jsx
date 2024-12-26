import '../../app/globals.css';
import { Pacifico, Delius } from 'next/font/google';

import { cn } from '@/helpers/utils';
import Providers from '@/providers/providers';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'], variable: '--font-pacifico' });
const delius = Delius({ weight: '400', subsets: ['latin'], variable: '--font-delius' });

export default function RootLayout({ children }) {
    return (
        <html lang='en' className='light'>
            <body className={cn(pacifico.variable, delius.variable, 'antialiased')}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
