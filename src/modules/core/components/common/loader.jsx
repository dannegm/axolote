import PuffLoader from 'react-spinners/PuffLoader';
import { cn } from '@/modules/core/helpers/utils';

export default function Loader({ className }) {
    return (
        <div className={cn('fixed inset-0 flex items-center justify-center', className)}>
            <PuffLoader />
        </div>
    );
}
