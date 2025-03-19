import withResponsive from '@/modules/krystel/hocs/withResponsive';
import MousePerspectiveCard from './mouse-perspective-card';
import DevicePerspectiveCard from './device-perspective-card';

const PerspectiveCard = withResponsive({
    mobile: DevicePerspectiveCard,
    default: MousePerspectiveCard,
});

export default PerspectiveCard;
