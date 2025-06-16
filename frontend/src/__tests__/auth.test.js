import { isTokenExpired } from "../auth";

const createToken = (exp) => {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  return `${header}.${payload}.signature`;
};

describe("isTokenExpired", () => {
  it("returns false for a token with a future expiration", () => {
    const exp = Math.floor(Date.now() / 1000) + 60;
    const token = createToken(exp);
    expect(isTokenExpired(token)).toBe(false);
  });

  it("returns true for a token with a past expiration", () => {
    const exp = Math.floor(Date.now() / 1000) - 60;
    const token = createToken(exp);
    expect(isTokenExpired(token)).toBe(true);
  });
});
