import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { BarProps } from "~/interfaces/barprops";

export const Bar = component$<BarProps>((props) => {
  const barColor = useStore({
    color: "lightgreen",
  });

  useVisibleTask$(({ track }) => {
    console.log(barColor.color);
    track(() => props.value);
    if (props.value >= 60) {
      barColor.color = "lightgreen";
    } else if (props.value < 60 && props.value > 30) {
      barColor.color = "yellow";
    } else {
      barColor.color = "red";
    }
  });

  return (
    <div class="bar-container">
      <div class="bar-label">{props.stat}</div>
      <div class="bar">
        <div
          style={{
            width: `${props.value}%`,
            backgroundColor: `${barColor.color}`,
            height: "100%",
            transition: "width 0.5s ease",
          }}
        ></div>
      </div>
      <div class="bar-value">{props.value}%</div>
    </div>
  );
});
