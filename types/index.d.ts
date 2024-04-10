import type { CSGOGSI } from 'csgogsi';
import type { DOTA2GSI } from 'dotagsi';

type Arguments = {
  config: any,
  CSGOGSI: CSGOGSI
  DOTAGSI: DOTA2GSI
}


type AddonInput = ({
  type: "text" | "team" | "image" | "images" | "match" | "player" | "checkbox" | "color";
  name: string;
  label: string;
} | {
  values: {
      name: string;
      label: string;
  }[];
  type: "select" | "action";
  name: string;
  label: string;
});

type OnConfigChange = (config: AddonInput) => void;

type OnActionCallback = (action: string, callback: (value: string) => void) => void;

type OnStartCallback = (
  args: Arguments & { close: () => Promise<boolean>, onConfigChange: (callback: OnConfigChange) => void, onAction: OnActionCallback },
) => void;

type OnEndCallback = (args: Arguments) => void;

type LoadConfigCallback = (config: AddonInput) => AddonInput;

declare global {
  const onStart: (callback: OnStartCallback) => void;
  const onClose: (callback: OnEndCallback) => void;
  const loadConfig: (callback: LoadConfigCallback) => void;
}

export { };