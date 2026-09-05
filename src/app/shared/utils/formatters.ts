export const dinero = (valor: number): string => new Intl.NumberFormat('es-EC', {
  style: 'currency', currency: 'USD',
}).format(valor);
export const fechaCorta = (valor: string): string => new Intl.DateTimeFormat('es-EC', {
  dateStyle: 'medium', timeStyle: 'short',
}).format(new Date(valor));
export const mensajeError = (error: unknown): string => {
  const e = error as { error?: { message?: string; title?: string }; message?: string; status?: number };
  if (e.status === 0) return 'No fue posible conectar con la API. Verifica que el backend esté ejecutándose y permita CORS.';
  return e.error?.message ?? e.error?.title ?? e.message ?? 'Ocurrió un error inesperado.';
};
