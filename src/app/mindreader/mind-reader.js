'use client';
import { useState } from 'react';
import { WhatsAppAnalyzerForm } from './whatsapp-analyzer-form';
import { AnalysisResult } from './analysis-result';

export default function MindReader() {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalysisComplete = result => {
        setAnalysisResult(result);
    };

    return (
        <div className='px-4 md:p-0 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto'>
            <h1 className='text-2xl font-bold my-4'>WhatsGPT</h1>

            <WhatsAppAnalyzerForm onAnalysisComplete={handleAnalysisComplete} />

            {analysisResult && (
                <div className='mt-4 mb-8'>
                    <AnalysisResult markdown={analysisResult} />
                </div>
            )}
        </div>
    );
}
