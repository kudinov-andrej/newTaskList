import React from 'react';

declare module 'react' {
    interface HTMLProps<T> {
        [key: string]: any;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [key: string]: any;
        }
    }
}

/// <reference types="vite/client" />