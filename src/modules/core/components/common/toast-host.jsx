import { useToast } from '@/modules/core/providers/toast-provider';
import Toast from './toast';

export default function ToastHost() {
    const { toastCollection, handleAccept, handleCancel } = useToast();

    return (
        <div className='fixed bottom-14 w-full flex flex-col items-center gap-2 z-max transition-all duration-150'>
            {toastCollection?.map(toast => (
                <Toast
                    key={toast.id}
                    content={toast.content}
                    hidden={toast.hidden}
                    duration={toast.duration}
                    persist={toast.persist}
                    hasOnAccept={toast.onAccept}
                    hasOnCancel={toast.onCancel}
                    onAccept={() => handleAccept(toast.id)}
                    onCancel={() => handleCancel(toast.id)}
                />
            ))}
        </div>
    );
}
