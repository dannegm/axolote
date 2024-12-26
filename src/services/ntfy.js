import axios from 'axios';

const APP_TOPIC = process.env.NEXT_PUBLIC_APP_TOPIC;

class Ntfy {
    constructor(topic) {
        this.topic = topic;

        const ntfyUrl = `https://ntfy.sh/${topic}`;
        this.ntfyUrl = ntfyUrl;
    }

    async pushSimple({ message }) {
        console.info(`Sending simple: ${message}`);
        try {
            await axios.post(this.ntfyUrl, message);
            console.info(`Sent simple: ${message}`);
        } catch (err) {
            console.error('Error sending notification', err);
        }
    }

    async pushRich({ title, message, tags }) {
        console.info(`Sending rich: ${title}`);
        try {
            const fallbackTitle = title || 'Axolote';
            await axios.post(this.ntfyUrl, message, {
                headers: {
                    Title: fallbackTitle,
                    Tags: tags || 'white_circle',
                    Markdown: 'yes',
                },
            });
            console.info(`Sent rinch: ${fallbackTitle} | ${message}`);
        } catch (err) {
            console.error('Error sending notification', err);
        }
    }
}

export default new Ntfy(APP_TOPIC);
