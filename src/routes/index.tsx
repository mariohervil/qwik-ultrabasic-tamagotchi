import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Bar } from "~/components/bar";
export default component$(() => {
  const hunger = useSignal(100);
  const happiness = useSignal(100);
  const health = useSignal(100);
  const age = useSignal(0);
  const isDead = useSignal("");
  useVisibleTask$(() => {
    const interval = setInterval(() => {
      age.value++;
      hunger.value = Math.max(0, hunger.value - 5);
      health.value = Math.max(0, health.value - 5);
      happiness.value = Math.max(0, happiness.value - 5);
    }, 3000);
    // return clearInterval(interval);
  });

  useVisibleTask$(({ track }) => {
    track(function () {
      hunger.value;
      health.value;
      happiness.value;
    });
    if (hunger.value <= 0 || health.value <= 0 || happiness.value <= 0) {
      isDead.value = "Your tamagotchi died";
    }
  });
  const feed = $(() => {
    hunger.value = Math.min(100, hunger.value + 10);
    health.value = Math.min(100, health.value + 5);
    happiness.value = Math.min(100, happiness.value + 5);
  });
  const sleep = $(() => {
    hunger.value = Math.max(0, hunger.value - 5);
    health.value = Math.min(100, health.value + 10);
    happiness.value = Math.max(0, happiness.value - 5);
  });
  const play = $(() => {
    hunger.value = Math.max(0, hunger.value - 5);
    health.value = Math.min(100, health.value - 5);
    happiness.value = Math.max(0, happiness.value + 20);
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h1
            style={{ color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            Age
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              width: "fit-content",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {age}
          </h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Bar stat="Hunger" value={hunger.value} />
          <Bar stat="Health" value={health.value} />
          <Bar stat="Happiness" value={happiness.value} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "60px",
        }}
      >
        <button onClick$={feed}>Feed</button>
        <button onClick$={sleep}>Sleep</button>
        <button onClick$={play}>Play</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {isDead.value + ""}
      </div>
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
