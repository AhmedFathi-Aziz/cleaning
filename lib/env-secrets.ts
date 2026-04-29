export async function getConfiguredAdminPassword(): Promise<string | undefined> {
  const { getBindings } = await import("./cf-bindings");
  const env = await getBindings();
  return env?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
}
