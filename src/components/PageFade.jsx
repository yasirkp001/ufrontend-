import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageFade = ({ children }) => {
    const location = useLocation();
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Trigger fade-out then fade-in on route change
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(false);
        const timer = setTimeout(() => setShow(true), 150); // duration matches CSS transition
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className={show ? 'fade-in' : 'fade-out'}>
            {children}
        </div>
    );
};

export default PageFade;
