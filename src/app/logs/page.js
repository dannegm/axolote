import ClearLogsButton from './components/clear-logs-button';
import QuotesLoader from './components/quotes-loader';

export default function Logs() {
    return (
        <>
            <QuotesLoader />
            <ClearLogsButton />
        </>
    );
}
