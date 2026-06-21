type Environment = Record<string, string | undefined>;

function requireEnv(name: string, env: Environment) {
  const value = env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}.`);
  return value;
}

function positiveNumber(name: string, fallback: number, env: Environment) {
  const raw = env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number.`);
  }
  return value;
}

export function getShopbaseAdminConfig(env: Environment = process.env) {
  return {
    storeUrl: (env.SHOPBASE_STORE_URL || "https://buudy.onshopbase.com").replace(/\/+$/, ""),
    apiKey: requireEnv("SHOPBASE_API_KEY", env),
    password: requireEnv("SHOPBASE_PASSWORD", env),
  };
}

export function getGooglePurchaseConfig(env: Environment = process.env) {
  return {
    customerId: requireEnv("GOOGLE_ADS_CUSTOMER_ID", env).replace(/\D/g, ""),
    conversionActionId: requireEnv(
      "GOOGLE_ADS_PURCHASE_CONVERSION_ACTION_ID",
      env,
    ).replace(/\D/g, ""),
    serviceAccountEmail: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL", env),
    serviceAccountPrivateKey: requireEnv(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
      env,
    ).replace(/\\n/g, "\n"),
    conversionValueInr: positiveNumber(
      "GOOGLE_ADS_PURCHASE_VALUE_INR",
      10000,
      env,
    ),
  };
}

export function requireCronAuthorization(
  authorization: string | null,
  env: Environment = process.env,
) {
  const secret = requireEnv("CRON_SECRET", env);
  if (authorization !== `Bearer ${secret}`) {
    throw new Error("Unauthorized cron request.");
  }
}
