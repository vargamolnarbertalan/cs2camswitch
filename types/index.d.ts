import type { CSGOGSI } from 'csgogsi';

type Arguments = {
  config: any,
  CSGOGSI: CSGOGSI
}

type AddonInput = any;

type OnConfigChange = (config: AddonInput) => void;

type OnStartCallback = (
  args: Arguments & { close: () => Promise<boolean>, onConfigChange: (callback: OnConfigChange) => void },
) => void;

type OnEndCallback = (args: Arguments) => void;

type LoadConfigCallback = (config: AddonInput) => AddonInput;

declare global {
  const onStart: (callback: OnStartCallback) => void;
  const onClose: (callback: OnEndCallback) => void;
  const loadConfig: (callback: LoadConfigCallback) => void;
}

export { };