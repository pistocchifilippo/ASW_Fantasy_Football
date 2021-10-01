<template>
  <v-card
    v-if="this.squad.length > 0"
    flat
    dense
    class="mobile-lineup desktop-field pa-0 field"
  >
    <FieldRow class="ma-0" :positions="[]" />
    <FieldRow
      class="ma-0"
      :positions="[2, 4]"
      :players="this.squad.slice(1, 2).concat(this.squad.slice(8, 9))"
    />
    <FieldRow
      class="ma-0"
      :positions="[3]"
      :players="this.squad.slice(5, 6)"
    />
    <FieldRow
      class="ma-0"
      :positions="[2]"
      :players="this.squad.slice(2, 3)"
    />
    <FieldRow
      class="ma-0 field-row-central"
      :positions="[1, 3, 4]"
      :players="
        this.lineup
          .slice(0, 1)
          .concat(this.squad.slice(6, 7))
          .concat(this.squad.slice(9, 10))
      "
    />
    <FieldRow
      class="ma-0"
      :positions="[2]"
      :players="this.squad.slice(3, 4)"
    />
    <FieldRow
      class="ma-0"
      :positions="[3]"
      :players="this.squad.slice(7, 8)"
    />
    <FieldRow
      class="ma-0"
      :positions="[2, 4]"
      :players="this.squad.slice(4, 5).concat(this.squad.slice(10, 11))"
    />
    <FieldRow class="ma-0" :positions="[]" />
  </v-card>
</template>

<script>
import FieldRow from "./FieldRow.vue";

export default {
  components: {
    FieldRow,
  },
  props: ["lineup"],
  data: () => ({
    squad: Array,
  }),
  created() {},
  methods: {},
};
</script>