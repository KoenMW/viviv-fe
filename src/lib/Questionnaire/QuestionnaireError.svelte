<script lang="ts">
  type Props = {
    error: string;
  };

  let { error }: Props = $props();
</script>

<h2>We kwamen een error tegen terwijl we de vragenlijst zochten</h2>
<div>{error}</div>
