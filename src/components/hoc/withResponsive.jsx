'use client';

export default function withResponsive({ mobile: MobileComponent, default: DefaultComponent }) {
    return ({ children, ...props }) => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        return isMobile ? (
            <MobileComponent {...props}>{children}</MobileComponent>
        ) : (
            <DefaultComponent {...props}>{children}</DefaultComponent>
        );
    };
}
