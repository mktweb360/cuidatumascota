// Bloques de anuncios que existen de verdad en la cuenta de AdSense (pub-6063067965030118).
// Los identificadores que no estén aquí no se pintan: hasta tener bloques creados, los anuncios
// los coloca Auto ads con el script del layout. Para activar un bloque manual, añade su ID.
export const ACTIVE_SLOTS: string[] = [];

export function isActiveSlot(slot: string): boolean {
  return ACTIVE_SLOTS.includes(slot);
}
