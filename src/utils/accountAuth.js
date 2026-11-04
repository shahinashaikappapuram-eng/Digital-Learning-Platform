export const readAccountRoster = (storageKey, accountType) => {
  const savedRoster = localStorage.getItem(storageKey);
  if (!savedRoster) return [];

  let roster;
  try {
    roster = JSON.parse(savedRoster);
  } catch {
    throw new Error(`Saved ${accountType} records are invalid. Please clear the corrupted account data and try again.`);
  }

  if (!Array.isArray(roster)) {
    throw new Error(`Saved ${accountType} records are invalid. Please clear the corrupted account data and try again.`);
  }

  return roster;
};

export const findAccountByCredentials = (roster, identifier, password) => {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  return roster.find((account) => {
    if (!account || typeof account !== "object") return false;
    const id = typeof account.id === "string" ? account.id.toLowerCase() : "";
    const email = typeof account.email === "string" ? account.email.trim().toLowerCase() : "";
    return (id === normalizedIdentifier || email === normalizedIdentifier) &&
      account.password === password;
  });
};

export const createAccountId = (prefix, roster) => {
  let id;
  do {
    const uniqueValue = globalThis.crypto?.randomUUID?.() ||
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    id = `${prefix}-${uniqueValue}`;
  } while (roster.some((account) => account?.id === id));

  return id;
};
