import { Helmet } from 'react-helmet-async';

export const CarouiuxPage = () => {
    return (
        <>
            <Helmet>
                <title>Carouiux</title>
            </Helmet>
            <iframe
                src='https://pub-baf4593c07314de0915628b467cc75c5.r2.dev/pages/carouiux.html'
                className='fixed inset-0 size-full border-none'
            />
        </>
    );
};
