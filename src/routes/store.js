import { writable } from "svelte/store";

export const data = writable([]);
export const attributes = writable({});

export const title = writable("Title");
export const subtitle = writable("Subtitle");
export const width = writable(640);
export const height = writable(400);
export const gapSize = writable(6);

export const marginLeft = writable(0);
export const marginBottom = writable(0);
export const marginTop = writable(0);