<script lang="ts">
  import Link from "../common/Link.svelte";

  type Props = {
    error: string;
  };

  let { error }: Props = $props();
</script>

<h2>We kwamen een error tegen terwijl we de vragenlijst zochten</h2>
<div>{error}</div>
<div
  >probeer een andere vragenlijst te selecteren: <Link path="">hier</Link></div
>
