import { Helmet } from 'react-helmet';

import useDocumentClassNames from '@/modules/core/hooks/use-document-class-names';
import BreakpointIndicator from '@/modules/core/components/common/breakpoint-indicator';
import KrystelProviders from '@/modules/krystel/providers/krystel-providers';
import ToastHost from '@/modules/core/components/common/toast-host';

import Menu from './menu';

export default function Layout({ title, children }) {
    useDocumentClassNames({
        root: 'light',
        body: 'antialiased',
    });
    return (
        <KrystelProviders>
            <Helmet defaultTitle='Krystel' titleTemplate='Krystel - %s'>
                {title && <title>{title}</title>}
            </Helmet>

            <Menu />
            <ToastHost />
            <BreakpointIndicator />

            {children}
        </KrystelProviders>
    );
}
