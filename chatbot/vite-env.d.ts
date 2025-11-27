
interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL_ENG: string;
  readonly VITE_WEBHOOK_URL_ES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}