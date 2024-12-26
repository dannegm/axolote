'use client';

import MousePerspectiveCard from '@/components/common/mouse-perspective-card';
import DevicePerspectiveCard from '@/components/common/device-perspective-card';
import withResponsive from '@/components/hoc/withResponsive';

const PerspectiveCard = withResponsive({
    mobile: DevicePerspectiveCard,
    default: MousePerspectiveCard,
});

export default PerspectiveCard;
