export default function QuoteText({ author, children }) {
    return (
        <blockquote className='font-playfair w-full block px-3 py-2 bg-stone-300/50 mix-blend-luminosity text-left italic border-l-4 border-l-rose-300/50'>
            {children}
            {author && <span className='block before:content-["—"] text-right'>{author}</span>}
        </blockquote>
    );
}
