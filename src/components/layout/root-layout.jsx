import '../../app/globals.css';
import { cn } from '@/helpers/utils';

import Providers from '@/providers/providers';

export default function RootLayout({ className, children }) {
    return (
        <html lang='en' className='light'>
            <body className={cn('antialiased', className)}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
