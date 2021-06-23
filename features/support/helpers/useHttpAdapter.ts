export default function useHttpAdapter(): boolean {
  return !!process.env.SHOUTY_HTTP_ADAPTERS
}