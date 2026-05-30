import { useDocumentMarqueeTitle } from '@/modules/core/hooks/use-document-marquee-title';

export const MarkgorithmPage = () => {
    useDocumentMarqueeTitle(
        '✨ MARCOS CID DE LA PAZ ✨  :::  🚀 SUPER MEGA FULLSTACK DEVELOPER 🚀  :::  🌐 HTML  :::  🎨 CSS  :::  ⚡ JS  :::  🟢 NODE  :::  ⚛️ REACT  :::',
    );
    return <iframe src='/markgorithm.html' className='fixed inset-0 size-full border-none' />;
};
