export function add(a: number, b: number): number {
  return a + b;
}
import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

serve((req: Request) => new Response("Hello World"));
// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
