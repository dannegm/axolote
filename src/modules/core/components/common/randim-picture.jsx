import { randomPick } from '@/modules/core/helpers/arrays';

export default function RandomPicture({ className, pictures }) {
    const selectedPicture = randomPick(pictures);

    return <img className={className} src={selectedPicture} alt='' />;
}
