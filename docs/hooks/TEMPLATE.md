# Hook Name

## Overview
Brief description of what the hook does and when to use it.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `param1` | `string` | Yes | - | Description of param1 |
| `param2` | `Options` | No | `{}` | Description of param2 |

## Return Value

```typescript
interface ReturnType {
  data: DataType;
  isLoading: boolean;
  error: Error | null;
  // ... other returned values
}
```

## Usage Example

```tsx
import { useHookName } from '@/hooks/useHookName';

export default function MyComponent() {
  const { data, isLoading, error } = useHookName('param1', {
    option1: true,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <div>{data}</div>;
}
```

## Dependencies
List any external dependencies or other hooks this hook depends on:
- Firebase Auth
- React Query
- etc.

## Side Effects
Describe any side effects this hook has:
- API calls
- Local storage updates
- Event listeners

## Performance Considerations
Note any performance implications or optimization strategies:
- Memoization
- Debouncing
- Cache invalidation

## Related Hooks
List any related or complementary hooks:
- useHookA
- useHookB

## Notes
Any additional information, edge cases, or known limitations. 