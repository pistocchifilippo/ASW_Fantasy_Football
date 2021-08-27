<template>
    <div>
      <v-btn href="https://github.com/pistocchifilippo/ASW_Fantasy_Football" target="_blank"
        color="white"
        text
        rounded
        style="font-family:Guardian Headline;font-weight:bold;"
        class="my-2 mobile-footer">About us
      </v-btn>
      <span class="mobile-subtitle"
        style="font-family:Guardian Headline;font-weight:bold;color:white;">
          <v-icon color="white" size="10pt">mdi-copyright</v-icon> 
      Copyright 2021 Perugini-Pistocchi  </span>
    </div>
</template>


<script>
  export default {
    title:'Footer',
    name: 'Footer',
    props: {
        title: {
          type: String,
          required: true,
        },
      },
    data: () => ({ }),
  };
</script>