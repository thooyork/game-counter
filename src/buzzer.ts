export function setupBuzzer(element: HTMLDivElement, resetElement: HTMLDivElement) {

    let counter = 20;
    let animationFrameId: number | null = null;
    let lastTimestamp: number | null = null;
    element.innerHTML = `${counter}`;


    const getBackgroundColor = (counter: number): string => {
        counter = Math.max(0, Math.min(20, counter));

        if (counter > 10) {
            // Green to Orange (20s to 10s)
            const red = Math.round((20 - counter) * (255 / 10)); // Red goes from 0 to 255
            const green = Math.round(255 - (counter - 10) * (90 / 10)); // Green goes from 255 to 165
            return `rgb(${red}, ${green}, 0)`; // Blue is always 0
        } else {
            // Orange to Red (10s to 0s)
            const green = Math.round(165 - (10 - counter) * (165 / 10)); // Green goes from 165 to 0
            return `rgb(255, ${green}, 0)`; // Red stays 255, Blue is always 0
        }
    }

    const color = getBackgroundColor(counter);
    element.style.backgroundColor = color;

    const setCounter = (count: number) => {
        counter = count
        element.innerHTML = `${counter}`;
    }

    const tick = (timestamp: number) => {
        if (lastTimestamp === null) {
            lastTimestamp = timestamp;
        }

        const elapsed = timestamp - lastTimestamp;
        if (elapsed >= 1000) {
            lastTimestamp = timestamp;
            const color = getBackgroundColor(counter);
            element.style.backgroundColor = color;

            if (counter > 0) {
                setCounter(counter - 1);
            } else {
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                    lastTimestamp = null;
                }
                return;
            }
        }
        animationFrameId = requestAnimationFrame(tick);
    };

    const count = () => {
        animationFrameId = null;
        lastTimestamp = null;
        const color = getBackgroundColor(counter);
        element.style.backgroundColor = color;

        if (animationFrameId === null) {
            animationFrameId = requestAnimationFrame(tick);
        }
    };

    const resetCounter = () => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            lastTimestamp = null;
        }
        setCounter(20);
        const color = getBackgroundColor(20);
        element.style.backgroundColor = color;
    }

    element.addEventListener('click', () => {
        resetCounter();
        count();
    });

    resetElement.addEventListener('click', () => {
        resetCounter();
    });
}
