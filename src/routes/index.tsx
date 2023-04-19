import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BarProps } from "~/interfaces/barprops";
export default component$(() => {
  const hunger = useSignal(100);
  const happiness = useSignal(100);
  const health = useSignal(100);
  const age = useSignal(0);
  useVisibleTask$(async () => {
    const interval = setInterval(() => {
      age.value++;
      hunger.value = Math.max(0, hunger.value - 5);
      health.value = Math.max(100, health.value - 5);
      happiness.value = Math.max(0, happiness.value - 5);
    }, 3000);
    // return clearInterval(interval);
  });
  const feed = () => {
    hunger.value = Math.min(100, hunger.value + 10);
    health.value = Math.min(100, health.value + 5);
    happiness.value = Math.min(100, happiness.value + 5);
  };
  const sleep = () => {
    hunger.value = Math.max(0, hunger.value - 5);
    health.value = Math.min(100, health.value + 10);
    happiness.value = Math.max(0, happiness.value - 5);
  };
  const play = () => {
    hunger.value = Math.max(0, hunger.value - 5);
    health.value = Math.min(100, health.value - 5);
    happiness.value = Math.max(0, happiness.value + 20);
  };
  return (
    <>
      <div>{age}</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Tamagotchi",
  meta: [
    {
      name: "description",
      content: "Tamagotchi",
    },
  ],
};
