type Runtime = 'nodejs' | 'edge' | 'browser';

export function runtimeCheck(): Runtime {
  const isNodeJS = process?.env.NEXT_RUNTIME === 'nodejs' && 'nodejs';
  const isEdge = process?.env.NEXT_RUNTIME === 'edge' && 'edge';
  const isClient = typeof window !== 'undefined' && 'browser';

  const result = [isNodeJS, isEdge, isClient].filter(Boolean)[0] as Runtime;
  return result;
}
