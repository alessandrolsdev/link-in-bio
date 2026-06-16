import { isBoolean, isNumber, isRecord, isString } from "@/lib/guards";

export interface LanyardActivity {
  type: number;
  name: string;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    small_image?: string;
  };
}

export interface LanyardSpotifyPresence {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardData {
  discord_user: {
    username: string;
    avatar: string;
    id: string;
    discriminator: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: LanyardSpotifyPresence | null;
  activities: LanyardActivity[];
}

export interface LanyardRestUserResponse {
  success: boolean;
  data: {
    listening_to_spotify: boolean;
    spotify: {
      song: string;
      artist: string;
    } | null;
  };
}

type LanyardSocketHelloMessage = {
  op: 1;
  d: {
    heartbeat_interval: number;
  };
};

type LanyardSocketDispatchMessage = {
  op: 0;
  t: "INIT_STATE" | "PRESENCE_UPDATE";
  d: unknown;
};

export type LanyardSocketMessage =
  | LanyardSocketHelloMessage
  | LanyardSocketDispatchMessage;

function parseActivity(value: unknown): LanyardActivity | null {
  if (!isRecord(value) || !isNumber(value.type) || !isString(value.name)) {
    return null;
  }

  const timestamps =
    isRecord(value.timestamps) &&
    ((value.timestamps.start === undefined || isNumber(value.timestamps.start)) &&
      (value.timestamps.end === undefined || isNumber(value.timestamps.end)))
      ? {
          start: isNumber(value.timestamps.start) ? value.timestamps.start : undefined,
          end: isNumber(value.timestamps.end) ? value.timestamps.end : undefined,
        }
      : undefined;

  const assets =
    isRecord(value.assets) &&
    ((value.assets.large_image === undefined || isString(value.assets.large_image)) &&
      (value.assets.small_image === undefined || isString(value.assets.small_image)))
      ? {
          large_image: isString(value.assets.large_image) ? value.assets.large_image : undefined,
          small_image: isString(value.assets.small_image) ? value.assets.small_image : undefined,
        }
      : undefined;

  return {
    type: value.type,
    name: value.name,
    state: isString(value.state) ? value.state : undefined,
    details: isString(value.details) ? value.details : undefined,
    timestamps,
    assets,
  };
}

function parseSpotifyPresence(value: unknown): LanyardSpotifyPresence | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.track_id) ||
    !isRecord(value.timestamps) ||
    !isNumber(value.timestamps.start) ||
    !isNumber(value.timestamps.end) ||
    !isString(value.song) ||
    !isString(value.artist) ||
    !isString(value.album_art_url) ||
    !isString(value.album)
  ) {
    return null;
  }

  return {
    track_id: value.track_id,
    timestamps: {
      start: value.timestamps.start,
      end: value.timestamps.end,
    },
    song: value.song,
    artist: value.artist,
    album_art_url: value.album_art_url,
    album: value.album,
  };
}

export function parseLanyardPresenceData(value: unknown): LanyardData | null {
  if (!isRecord(value) || !isRecord(value.discord_user)) return null;

  const { discord_user: discordUser } = value;
  if (
    !isString(discordUser.username) ||
    !isString(discordUser.avatar) ||
    !isString(discordUser.id) ||
    !isString(discordUser.discriminator)
  ) {
    return null;
  }

  if (
    value.discord_status !== "online" &&
    value.discord_status !== "idle" &&
    value.discord_status !== "dnd" &&
    value.discord_status !== "offline"
  ) {
    return null;
  }

  if (
    !isBoolean(value.active_on_discord_web) ||
    !isBoolean(value.active_on_discord_desktop) ||
    !isBoolean(value.active_on_discord_mobile) ||
    !isBoolean(value.listening_to_spotify) ||
    !Array.isArray(value.activities)
  ) {
    return null;
  }

  const activities = value.activities
    .map(parseActivity)
    .filter((activity): activity is LanyardActivity => activity !== null);

  const spotify =
    value.spotify === null ? null : parseSpotifyPresence(value.spotify);
  if (value.spotify !== null && spotify === null) return null;

  return {
    discord_user: {
      username: discordUser.username,
      avatar: discordUser.avatar,
      id: discordUser.id,
      discriminator: discordUser.discriminator,
    },
    discord_status: value.discord_status,
    active_on_discord_web: value.active_on_discord_web,
    active_on_discord_desktop: value.active_on_discord_desktop,
    active_on_discord_mobile: value.active_on_discord_mobile,
    listening_to_spotify: value.listening_to_spotify,
    spotify,
    activities,
  };
}

export function parseLanyardRestUserResponse(
  value: unknown
): LanyardRestUserResponse | null {
  if (!isRecord(value) || !isBoolean(value.success) || !isRecord(value.data)) {
    return null;
  }

  const spotify =
    value.data.spotify === null
      ? null
      : isRecord(value.data.spotify) &&
          isString(value.data.spotify.song) &&
          isString(value.data.spotify.artist)
        ? {
            song: value.data.spotify.song,
            artist: value.data.spotify.artist,
          }
        : null;

  if (!isBoolean(value.data.listening_to_spotify)) {
    return null;
  }

  if (value.data.spotify !== null && spotify === null) {
    return null;
  }

  return {
    success: value.success,
    data: {
      listening_to_spotify: value.data.listening_to_spotify,
      spotify,
    },
  };
}

export function parseLanyardSocketMessage(
  value: unknown
): LanyardSocketMessage | null {
  if (!isRecord(value) || !isNumber(value.op)) return null;

  if (
    value.op === 1 &&
    isRecord(value.d) &&
    isNumber(value.d.heartbeat_interval)
  ) {
    return {
      op: 1,
      d: {
        heartbeat_interval: value.d.heartbeat_interval,
      },
    };
  }

  if (
    value.op === 0 &&
    (value.t === "INIT_STATE" || value.t === "PRESENCE_UPDATE")
  ) {
    return {
      op: 0,
      t: value.t,
      d: value.d,
    };
  }

  return null;
}
