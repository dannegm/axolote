import { Helmet } from 'react-helmet';

import useDocumentClassNames from '@/modules/core/hooks/use-document-class-names';
import Providers from '@/modules/core/providers/providers';
import BreakpointIndicator from '@/modules/core/components/common/breakpoint-indicator';
import ToastHost from '@/modules/core/components/common/toast-host';

import Menu from './menu';

export default function Layout({ title, children }) {
    useDocumentClassNames({
        root: 'light',
        body: 'antialiased',
    });
    return (
        <Providers>
            <Helmet defaultTitle='Krystel' titleTemplate='Krystel - %s'>
                {title && <title>{title}</title>}
            </Helmet>

            <Menu />
            <ToastHost />
            <BreakpointIndicator />

            {children}
        </Providers>
    );
}
