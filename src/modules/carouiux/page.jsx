import { Helmet } from 'react-helmet-async';

export const CarouiuxPage = () => {
    return (
        <>
            <Helmet>
                <title>Carolina Guzman · Lead Product Designer</title>
            </Helmet>
            <iframe
                src='https://pub-baf4593c07314de0915628b467cc75c5.r2.dev/carouiux.html'
                className='fixed inset-0 size-full border-none'
            />
        </>
    );
};
