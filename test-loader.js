export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts') && !url.includes('node_modules')) {
    const { source } = await nextLoad(url, context);
    // Replace import.meta.env with globalThis.__env__ for testing
    const modifiedSource = source.toString().replace(/import\.meta\.env/g, '(globalThis.__env__ || {})');
    return {
      format: context.format,
      shortCircuit: true,
      source: modifiedSource
    };
  }
  return nextLoad(url, context);
}
