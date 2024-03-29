import { useEffect, useState } from 'react';

export interface Location {
    src: string;
}

export const useMobileVideoOverlayLocation = () => {
    const [location, setLocation] = useState<Location>();

    useEffect(() => {
        const init = async () => {
            const src = new URLSearchParams(window.location.search).get('src');

            if (!src) {
                return;
            }

            setLocation({ src });
        };
        init();
    }, []);

    return location;
};
