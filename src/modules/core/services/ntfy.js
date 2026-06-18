const APP_TOPIC = import.meta.env.NEXT_PUBLIC_APP_TOPIC;

export class Ntfy {
    constructor(topic) {
        this.topic = topic;

        const ntfyUrl = `https://ntfy.sh/${topic}`;
        this.ntfyUrl = ntfyUrl;
    }

    async pushSimple({ message }) {
        console.info(`Sending simple: ${message}`);
        try {
            await fetch(this.ntfyUrl, { method: 'POST', body: message });
            console.info(`Sent simple: ${message}`);
        } catch (err) {
            console.error('Error sending notification', err);
        }
    }

    async pushRich({ title, message, tags, click = undefined }) {
        console.info(`Sending rich: ${title}`);

        const fallbackTitle = title || 'Axolote';
        const headers = {
            Title: fallbackTitle,
            Tags: tags || 'white_circle',
            Markdown: 'yes',
        };

        if (click) {
            headers.Click = click;
        }

        try {
            await fetch(this.ntfyUrl, { method: 'POST', body: message, headers });
            console.info(`Sent rinch: ${fallbackTitle} | ${message}`);
        } catch (err) {
            console.error('Error sending notification', err);
        }
    }
}

export default new Ntfy(APP_TOPIC);
