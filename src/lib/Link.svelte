<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Paths } from "../stores/router";
  import type { MPHColours } from "../types";

  type Props = {
    path: Paths;
    children: Snippet;
  };

  type PartialProps = Partial<{
    params: Record<string, string>;
    colour: MPHColours;
    width: "auto" | "100%";
  }>;

  const {
    path,
    children,
    params,
    colour,
    width = "auto",
  }: Props & PartialProps = $props();

  const paramsToString = (p: Record<string, string> | undefined) => {
    if (!p) return "";
    let s = "";
    for (const i in p) {
      console.log(i);
      s += `&${i}=${p[i]}`;
    }
    return s;
  };
</script>

<a
  href="?route={path}{paramsToString(params)}"
  style="{colour && `--colour: var(--c-${colour})`}; width: {width}"
  >{@render children()}</a
>
