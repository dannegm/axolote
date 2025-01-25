import { cn } from '@/modules/core/helpers/utils';

import Providers from '@/modules/core/providers/providers';

export default function RootLayout({ className, children }) {
    return (
        <html lang='en' className='light'>
            <body className={cn('antialiased', className)}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
