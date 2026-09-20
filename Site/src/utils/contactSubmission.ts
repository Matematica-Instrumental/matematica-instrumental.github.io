interface FormspreeResponse {
  errors?: unknown[];
}

type FetchImplementation = typeof fetch;

function hasFormspreeErrors(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const { errors } = value as FormspreeResponse;
  return Array.isArray(errors) && errors.length > 0;
}

export async function submitContactFormData(
  endpoint: string,
  payload: FormData,
  fetchImplementation: FetchImplementation = fetch,
): Promise<boolean> {
  const response = await fetchImplementation(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: payload,
  });

  const responseData: unknown = await response.json().catch(() => null);

  return response.ok && !hasFormspreeErrors(responseData);
}
