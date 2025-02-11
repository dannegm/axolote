import ReactMarkdown from 'react-markdown';

export function AnalysisResult({ markdown }) {
    return (
        <div className='bg-white p-4 rounded-lg shadow'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}
