import * as React from "react";
import { highlightContextProps } from '@portfolio/aperture';

export const highlightContext = React.createContext<highlightContextProps | null>(null);

export const useHighlight = () => {
	const context = React.useContext(highlightContext);

	if (!context) {
		throw new Error('useHighlightContext must be used within a <Highlight.Root>'); 
	}

	return context;
};

export default { highlightContext, useHighlight };