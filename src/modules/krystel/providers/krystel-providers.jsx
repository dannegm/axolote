import Providers from '@/modules/core/providers/providers';
import ToastProvider from '@/modules/core/providers/toast-provider';
import OverlaysProvider from '@/modules/krystel/providers/overlays-provider';

export default function KrystelProviders({ children }) {
    return (
        <Providers>
            <ToastProvider>
                <OverlaysProvider allowRoutes={['/krystel']}>{children}</OverlaysProvider>
            </ToastProvider>
        </Providers>
    );
}
