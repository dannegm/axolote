(() => {
    const KNOWN_KEYS = [
        'app:tracker',
        'settings:show_secrets',
        'settings:show_quick_settings',
        'settings:logs:show',
        'settings:logs:realtime',
        'settings:skip_actions',
        'settings:debug_mode',
        'settings:show_breakpoint_indicator',
        'settings:cards:ignore_conditional_quotes',
        'settings:cards:includes_future',
        'settings:cards:includes_deleted',
        'settings:cards:skip_fools_day',
        'settings:posts:indev',
        'settings:posts:includes_indev',
        'settings:posts:includes_deleted',
        'viewer:actions_direction',
        'editor:content',
        'editor:configs',
        'editor:drafts',
        'editor:auto_scroll',
        'editor:show_card_viewport',
    ];

    const parse = raw => {
        try { return JSON.parse(raw); } catch { return raw; }
    };

    // Collect known keys + any extra keys that match the app's namespaces
    const extraKeys = Object.keys(localStorage).filter(k =>
        !KNOWN_KEYS.includes(k) &&
        /^(settings:|viewer:|editor:|app:)/.test(k)
    );

    const allKeys = [...KNOWN_KEYS, ...extraKeys];

    const result = {};
    for (const key of allKeys) {
        const raw = localStorage.getItem(key);
        if (raw !== null) result[key] = parse(raw);
    }

    console.log(JSON.stringify(result, null, 2));
    return result;
})();
