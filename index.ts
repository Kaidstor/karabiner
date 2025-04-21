import fs from "fs";

import type { KarabinerRules } from "./types";
import { createHyperSubLayers, app, browser } from "./utils";

// для bluetooth клавиатуры и auto ansi
const custom = {
  devices: [
    {
      identifiers: {
        device_address: "cf-f9-08-a8-41-c1",
        is_keyboard: true,
        is_pointing_device: true,
      },
      ignore: false,
    },
  ],
  virtual_hid_keyboard: { keyboard_type_v2: "ansi" },
} as any;

const rules: KarabinerRules[] = [
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },

  ...createHyperSubLayers({
    j: app("Ghostty"),
    // b = "B"rowse
    b: {
      a: browser("animedia.lol"),
      y: browser("youtube.com"),
      g: browser("gitlab.rebrandy"),
      n: browser("nam-nam.ru/stolovaya-sibinformbyuro/products"),
      v: browser("http://localhost:8000/dashboard/#/"),
      m: browser("monkeytype.com/"),
      8: browser("next.music.yandex.ru/"),
      h: browser("console.hetzner.cloud/projects/4308753/servers"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      2: app("Ghostty"),
      g: app("ChatGPT"),
      t: app("/System/Volumes/Data/Applications/tcp-client"),
      n: app("Obsidian"),
      c: app("Telegram"),
      a: app("Arc"),
      // v: app("Visual Studio Code"),
      v: app("Cursor"),
      w: app("Warp"),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
          ...custom,
        },
      ],
    },
    null,
    2,
  ),
);
