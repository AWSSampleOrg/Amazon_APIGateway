const ENDPOINT = import.meta.env.VITE_API_GATEWAY_ENDPOINT;

const execute = async (method: string, headers?: HeadersInit) => {
  try {
    const response = await fetch(ENDPOINT, {
      method,
      headers,
    });
    console.log({
      method,
      headers,
      status: response.status,
      body: await response.json(),
    });
  } catch (error) {
    console.error(error);
  }
};

document
  .querySelector("#executeButton")
  ?.addEventListener("click", async () => {
    const commonHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    await execute("GET");
    await execute("GET", commonHeaders);
    await execute("POST");
    await execute("POST", commonHeaders);
    await execute("DELETE");
    await execute("DELETE", commonHeaders);
  });
