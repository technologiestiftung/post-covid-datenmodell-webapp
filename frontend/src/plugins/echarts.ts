import { use } from "echarts/core";
import {
  LineChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type {
  LineSeriesOption,
} from "echarts/charts";
import type {
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
} from "echarts/components";
import VChart from "vue-echarts";
import { registerTheme } from "echarts";

use([
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  LineChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | GridComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | LineSeriesOption
>;

registerTheme("theme", {
  // seriesCnt: "4",
  // backgroundColor: "rgba(64,64,64,0.5)",
  // titleColor: "#ffaf51",
  // subtitleColor: "#eeeeee",
  // textColorShow: false,
  // textColor: "#333",
  // markTextColor: "#333333",
  color: ["#FA94AA","#5959B5", "#FA94AA", "#C6DEE6"],
  // borderColor: "#ccc",
  // borderWidth: "0",
  // visualMapColor: ["#ff715e", "#ffee51", "#797fba"],
  // legendTextColor: "#999999",
  // kColor: "#ffee51",
  // kColor0: "#ffffff",
  // kBorderColor: "#ff715e",
  // kBorderColor0: "#797fba",
  // kBorderWidth: "1",
  // lineWidth: "3",
  // symbolSize: "8",
  // symbol: "emptyCircle",
  // symbolBorderWidth: "2",
  // lineSmooth: false,
  // graphLineWidth: "1",
  // graphLineColor: "#888888",
  // mapLabelColor: "#ffffff",
  // mapLabelColorE: "#ffee51",
  // mapBorderColor: "#999999",
  // mapBorderColorE: "#ffaf51",
  // mapBorderWidth: 0.5,
  // mapBorderWidthE: 1,
  // mapAreaColor: "#555555",
  // mapAreaColorE: "rgba(255,175,81,0.5)",
});

export default VChart;
