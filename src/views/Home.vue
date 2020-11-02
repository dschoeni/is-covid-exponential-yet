<template>
  <div class="home" v-if="data">
    <ExponentialDisplay
      :selectedCantons="selectedCantons"
      :data="data"
      :days.sync="days"
    />
    <label>Kanton(e) wählen:</label>
    <multiselect
      v-model="selectedCantons"
      :options="cantons"
      :multiple="true"
    ></multiselect>
    <DailyCasesPlot
      :selectedCantons="selectedCantons"
      :data="data"
      :days="days"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DailyCasesPlot from "@/components/DailyCasesPlot.vue";
import ExponentialDisplay from "@/components/ExponentialDisplay.vue";
import Multiselect from "vue-multiselect";
import { DailyCasesData } from "@/data/DailyCasesData";

@Component({
  components: {
    Multiselect,
    DailyCasesPlot,
    ExponentialDisplay
  }
})
export default class Home extends Vue {
  data?: DailyCasesData | null = null;
  days = 30;

  async mounted() {
    const { data: receivedData } = await this.axios.get<DailyCasesData>(
      "https://raw.githubusercontent.com/daenuprobst/covid19-cases-switzerland/master/covid19_cases_switzerland_openzh.json"
    );
    this.data = receivedData;
  }

  selectedCantons = ["CH"];

  get cantons() {
    return [
      "AG",
      "AI",
      "AR",
      "BE",
      "BL",
      "BS",
      "FR",
      "GE",
      "GL",
      "GR",
      "JU",
      "LU",
      "NE",
      "NW",
      "OW",
      "SG",
      "SH",
      "SO",
      "SZ",
      "TG",
      "TI",
      "UR",
      "VD",
      "VS",
      "ZG",
      "ZH",
      "CH"
    ];
  }
}
</script>
