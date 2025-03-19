import useLocalStorage from '@/modules/core/hooks/use-local-storage';

export default function useDrafts(key = 'drafts') {
    const [drafts, setDrafts] = useLocalStorage('drafts', []);

    const saveDraft = content => {
        setDrafts([{ id: Date.now(), created_at: new Date().toISOString(), content }, ...drafts]);
    };

    const pickDraft = id => {
        const draft = drafts.find(d => d.id === id);
        if (!draft) return null;
        setDrafts(drafts.filter(d => d.id !== id));
        return draft;
    };

    const removeDraft = id => {
        setDrafts(drafts.filter(d => d.id !== id));
    };

    const clearDrafts = () => {
        setDrafts([]);
    };

    return { drafts, saveDraft, pickDraft, removeDraft, clearDrafts };
}
