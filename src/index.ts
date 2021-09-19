import { useEffect, useMemo, useRef } from "react";

type PreviousArg<T, D extends readonly any[]> =
  | { hasPrevious: false }
  | { hasPrevious: true; value: T; deps: D };

export default function useMemoWithPrevious<
  T,
  D extends readonly any[] = readonly []
>(factory: (arg: PreviousArg<T, D>) => T, deps: D): T {
  const previousArg = useRef<PreviousArg<T, D>>({ hasPrevious: false });

  const value = useMemo(() => factory(previousArg.current), deps);

  useEffect(() => {
    previousArg.current = { hasPrevious: true, value, deps };
  }, [value]);

  return value;
}
