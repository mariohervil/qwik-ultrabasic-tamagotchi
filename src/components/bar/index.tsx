import { component$, useSignal } from "@builder.io/qwik";
import { BarProps } from "~/interfaces/barprops";

export const bar = component$<BarProps>((props) => {
  const count = useSignal(0);
  return <div onClick$={(ev) => {}}></div>;
});
