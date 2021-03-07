<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div class="row flex flex-center">
      <div style="font-size: 10vh">
        404
      </div>

      <div class="text-h6" style="opacity:.4">
        Oops. Nothing here...
      </div>
      <q-separator />
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
