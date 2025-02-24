import { cn } from '@/modules/core/helpers/utils';
import Providers from '@/modules/core/providers/providers';
import BreakpointIndicator from '@/modules/core/components/common/breakpoint-indicator';

import Fonts from '@/modules/krystel/providers/fonts';

export default function KrystelLayout({ children }) {
    return (
        <html lang='en' className='light'>
            <body className={cn('antialiased')}>
                <Fonts>
                    <Providers>
                        <BreakpointIndicator />
                        {children}
                    </Providers>
                </Fonts>
            </body>
        </html>
    );
}
