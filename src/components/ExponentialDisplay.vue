<template>
  <div class="jumbotron mt-4 text-center">
    <form class="form-inline d-flex justify-content-center py-4">
      <div class="lead">Ist das Wachstum für die letzten</div>
      <select
        class="custom-select mx-2 form-inline"
        id="inlineFormCustomSelect"
        :value="days"
        @change="daysChanged($event)"
      >
        <option selected>Wähl deine Anzahl Tage...</option>
        <option value="30">30</option>
        <option value="90">60</option>
        <option value="90">90</option>
      </select>
      <div class="lead">Tage exponentiell?</div>
    </form>

    <h1 class="display-4">{{ exponents.equation[0] > 0 ? "Ja" : "Nein" }}</h1>

    <small>{{ exponents.string }}</small>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import regression from "regression";
import ExponentialService from "./ExponentialService";
import { DailyCasesData } from "@/data/DailyCasesData";

@Component({})
export default class ExponentialDisplay extends Vue {
  @Prop()
  private selectedCantons!: string[];

  @Prop()
  private data!: DailyCasesData;

  @Prop()
  private days!: number;

  get exponents() {
    return ExponentialService.estimateExponential(
      this.data,
      this.selectedCantons,
      this.days
    );
  }

  daysChanged(value: any) {
    this.$emit("update:days", Number(value.target.value));
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
