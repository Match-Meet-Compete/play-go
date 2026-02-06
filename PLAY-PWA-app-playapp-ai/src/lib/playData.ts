import { load, save, uid } from "./storage";

export type Sport = "Football" | "Rugby" | "Gym" | "Tennis" | "Basketball" | "Padel";

export type User = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  university: string;
  city: string;
  sports: Sport[];
  photo?: string; // data url
};

export type Like = { from: string; to: string; createdAt: number };
export type Match = { id: string; a: string; b: string; createdAt: number };
export type Message = { id: string; matchId: string; from: string; text: string; createdAt: number };

const KEY = {
  me: "play.me",
  users: "play.users",
  likes: "play.likes",
  matches: "play.matches",
  messages: "play.messages",
  referral: "play.referral"
};

export function getMeId(): string | null {
  return load<string | null>(KEY.me, null);
}

export function setMeId(id: string | null) {
  save(KEY.me, id);
}

export function getReferral(): string | null {
  return load<string | null>(KEY.referral, null);
}

export function setReferral(code: string | null) {
  save(KEY.referral, code);
}

export function seedUsersIfEmpty() {
  const users = load<User[]>(KEY.users, []);
  if (users.length) return;

  const seeded: User[] = [
    { id: uid("u"), name: "Maya", handle: "maya_runs", bio: "Padel & gym. Always down for a session.", university: "Cardiff Met", city: "Cardiff", sports: ["Padel","Gym"] },
    { id: uid("u"), name: "Tom", handle: "tom_10", bio: "Football 5-a-side. Wednesdays?", university: "Cardiff Uni", city: "Cardiff", sports: ["Football"] },
    { id: uid("u"), name: "Sasha", handle: "sash_lifts", bio: "Strength training + rugby background.", university: "Cardiff Uni", city: "Cardiff", sports: ["Gym","Rugby"] },
    { id: uid("u"), name: "Adeel", handle: "adeel_hoops", bio: "Basketball runs and a good vibe.", university: "Cardiff Met", city: "Cardiff", sports: ["Basketball"] },
    { id: uid("u"), name: "Ella", handle: "ella_serves", bio: "Tennis + coffee after. Proper.", university: "Cardiff Uni", city: "Cardiff", sports: ["Tennis"] },
  ];
  save(KEY.users, seeded);
}

export function getUsers(): User[] {
  return load<User[]>(KEY.users, []);
}

export function upsertUser(user: User) {
  const users = getUsers();
  const ix = users.findIndex(u => u.id === user.id);
  if (ix >= 0) users[ix] = user;
  else users.push(user);
  save(KEY.users, users);
}

export function getUser(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function getLikes(): Like[] {
  return load<Like[]>(KEY.likes, []);
}

export function addLike(from: string, to: string) {
  const likes = getLikes();
  if (!likes.find(l => l.from === from && l.to === to)) {
    likes.push({ from, to, createdAt: Date.now() });
    save(KEY.likes, likes);
  }
}

export function getMatches(): Match[] {
  return load<Match[]>(KEY.matches, []);
}

export function ensureMatch(a: string, b: string): Match {
  const matches = getMatches();
  const existing = matches.find(m => (m.a === a && m.b === b) || (m.a === b && m.b === a));
  if (existing) return existing;
  const created: Match = { id: uid("m"), a, b, createdAt: Date.now() };
  matches.unshift(created);
  save(KEY.matches, matches);
  return created;
}

export function getMessages(): Message[] {
  return load<Message[]>(KEY.messages, []);
}

export function addMessage(matchId: string, from: string, text: string) {
  const messages = getMessages();
  messages.push({ id: uid("msg"), matchId, from, text, createdAt: Date.now() });
  save(KEY.messages, messages);
}
