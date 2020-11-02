<template>
  <div>
    <Plotly
      :data="plotly.data"
      :layout="plotly.layout"
      :display-mode-bar="false"
      :disable-zoom="true"
    ></Plotly>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Plotly } from "vue-plotly";
import ExponentialService from "./ExponentialService";
import { DailyCasesData } from "@/data/DailyCasesData";

const inhabitantsPerCanton: { [x: string]: number } = {
  AG: 685642,
  AI: 55432,
  AR: 16127,
  BE: 1039101,
  BL: 289404,
  BS: 195783,
  FR: 321717,
  GE: 504031,
  GL: 40582,
  GR: 198988,
  JU: 73563,
  LU: 413048,
  NE: 176467,
  NW: 43076,
  OW: 37924,
  SG: 510670,
  SH: 82337,
  SO: 275177,
  SZ: 160457,
  TG: 279493,
  TI: 351471,
  UR: 36694,
  VD: 804861,
  VS: 345394,
  ZG: 127612,
  ZH: 1538848,
  CH: 8603899
};

@Component({
  components: {
    Plotly
  }
})
export default class DailyCasesPlot extends Vue {
  @Prop()
  private selectedCantons!: string[];

  @Prop()
  private data!: DailyCasesData;

  @Prop()
  private days!: number;

  get plotly() {
    const plotly: any = {
      data: [],
      layout: {}
    };

    if (!this.data) {
      return plotly;
    }

    plotly.data = this.selectedCantons.map(canton => ({
      x: ([] as string[]).concat(...Object.keys(this.data![canton + "_diff"])),
      y: ([] as (number | null)[]).concat(
        ...Object.values(this.data![canton + "_diff"]).map(x => {
          if (x === null) {
            return null;
          }
          return x;
        })
      ),
      name: `Neue Fälle pro Tag in ${canton}`,
      type: "bar"
    }));

    const exponentialFunction = ExponentialService.estimateExponential(
      this.data,
      this.selectedCantons,
      this.days
    );

    plotly.data.push({
      x: ([] as string[])
        .concat(...Object.keys(this.data!["CH_diff"]))
        .slice(-this.days),
      y: ([] as number[]).concat(
        ...exponentialFunction.points.map((x: number[]) => x[1])
      ),
      name: "Exponentieller Fit"
    });

    plotly.layout.barmode = "stack";

    plotly.layout.legend = {
      orientation: "h"
    };

    const currentDate = new Date();
    const endDateFormatted = `${currentDate.getFullYear()}-${currentDate.getMonth() +
      1}-${currentDate.getDate()}`;
    const startDate = new Date(
      currentDate.getTime() - (this.days + 14) * 86400 * 1000
    );
    const startDateFormatted = `${startDate.getFullYear()}-${startDate.getMonth() +
      1}-${startDate.getDate()}`;

    console.log([startDateFormatted, endDateFormatted]);

    plotly.layout.xaxis = {
      range: [startDateFormatted, endDateFormatted],
      fixedrange: true,
      type: "date"
    };

    plotly.layout.yaxis = {
      autorange: true,
      fixedrange: true,
      type: "linear"
    };

    console.log(plotly);

    return plotly;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
