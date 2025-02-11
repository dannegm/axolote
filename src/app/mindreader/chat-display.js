'use client';

import { useEffect, useState } from 'react';

export function ChatDisplay({ chatContent }) {
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');

    useEffect(() => {
        const lines = chatContent.split('\n');
        const parsedMessages = [];
        let firstSender = '';

        for (const line of lines) {
            const match = line.match(/\[(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})\] (.+?): (.+)/);
            if (match) {
                const [, date, messageSender, content] = match;
                if (!firstSender) {
                    firstSender = messageSender;
                    setSender(firstSender);
                } else if (messageSender !== firstSender && !receiver) {
                    setReceiver(messageSender);
                }
                parsedMessages.push({ date, sender: messageSender, content });
            }
        }

        setMessages(parsedMessages);
    }, [chatContent, receiver]);

    return (
        <div className='bg-gray-100 p-4 rounded-lg shadow overflow-y-auto h-[600px]'>
            <h2 className='text-xl font-bold mb-4'>Conversación</h2>
            <div className='flex flex-col space-y-4'>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender === sender ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div className='max-w-[70%]'>
                            <div
                                className={`p-2 rounded-lg ${
                                    message.sender === sender ? 'bg-blue-200' : 'bg-green-200'
                                }`}
                            >
                                {message.content}
                            </div>
                            <div className='text-xs text-gray-500 mt-1'>
                                {message.date} - {message.sender}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
